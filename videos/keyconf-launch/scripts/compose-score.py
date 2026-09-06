"""Original 80 BPM score and a separate, unpitched keyboard reference audition."""
from pathlib import Path
import json, subprocess
import numpy as np
import soundfile as sf

root=Path(__file__).resolve().parents[1];out=root/'assets/audio';out.mkdir(parents=True,exist_ok=True)
sr=48000;duration=36;n=int(sr*duration);rng=np.random.default_rng(2409)
score=np.zeros((n,2),dtype=np.float64)
def add(buffer,signal,start,gain=1,pan=0):
    at=int(start*sr);length=min(len(signal),len(buffer)-at)
    if at<0 or length<=0:return
    if signal.ndim==1:
        stereo=np.column_stack([signal*np.sqrt((1-pan)/2),signal*np.sqrt((1+pan)/2)])
    else:stereo=signal
    buffer[at:at+length]+=stereo[:length]*gain
def hz(midi):return 440*2**((midi-69)/12)
def tine(midi,seconds=3):
    t=np.arange(int(sr*seconds))/sr;f=hz(midi)
    env=(1-np.exp(-t/0.002))*np.exp(-t/1.05)
    mod=1.2*np.exp(-t/.14)*np.sin(2*np.pi*f*3.998*t)
    return env*(np.sin(2*np.pi*f*t+mod)*.7 + .18*np.sin(2*np.pi*f*2*t)*np.exp(-t/.4)+.07*np.sin(2*np.pi*f*3*t)*np.exp(-t/.16))
chords=[[50,57,60,64,69],[46,53,57,60,65],[41,53,57,60,67],[48,55,60,62,67],[50,57,60,64,69],[50,57,62,64,69]]
for block,chord in enumerate(chords):
    start=block*6
    # Slow, low-harmonic stereo pad with a real attack and end release.
    t=np.arange(int(sr*6.5))/sr
    env=np.minimum(t/.55,1)*np.clip((6.5-t)/1.3,0,1)
    pad=np.zeros((len(t),2))
    for j,midi in enumerate(chord[1:]):
        f=hz(midi)
        for channel,detune in [(0,-.0015),(1,.0015)]:
            phase=2*np.pi*f*(1+detune)*t+j*.7
            pad[:,channel]+=(np.sin(phase)+.1*np.sin(2*phase))*env*.008
    add(score,pad,start)
    order=[0,2,1,3,2,4,1,3]
    for i,idx in enumerate(order):
        add(score,tine(chord[idx]+12),start+i*.75+.03,.032+(.008 if i%4==0 else 0),(-.35 if i%2==0 else .35))
    # Rounded bass pulse, intentionally quiet and short.
    for beat in range(8):
        t=np.arange(int(sr*.42))/sr
        bass=np.sin(2*np.pi*hz(chord[0]-12)*t)*(1-np.exp(-t/.006))*np.exp(-t/.13)
        add(score,bass,start+beat*.75,.07 if beat%4==0 else .028)
    # Brushed high-frequency texture, deterministic and very low in the mix.
    for beat in [1,3,5,7]:
        noise=rng.normal(0,1,int(sr*.08));noise=np.diff(noise,prepend=0)
        noise*=np.exp(-np.arange(len(noise))/sr/.022)
        add(score,noise,start+beat*.75+.375,.0015,.5 if beat%4==1 else -.5)
for delay,gain in [(.281,.19),(.563,.10)]:
    offset=int(delay*sr);score[offset:]+=score[:-offset,::-1].copy()*gain
score*=np.minimum(np.arange(n)/sr/.35,1)[:,None]
score*=np.clip((duration-np.arange(n)/sr)/1.6,0,1)[:,None]
score*=.50/max(.001,np.max(np.abs(score)))
sf.write(out/'original-score.wav',score,sr,subtype='PCM_24')

source=root/'assets/audio/source'
def decode(name):
    b=subprocess.check_output(['ffmpeg','-v','error','-i',str(source/name),'-f','f32le','-ac','1','-ar',str(sr),'-'])
    return np.frombuffer(b,dtype='<f4').astype(np.float64)
samples=[decode(f'press_key{i}.mp3') for i in range(1,6)]
release=decode('release_key.mp3');space=decode('press_space.mp3')
audition=np.zeros((int(sr*4),2));times=[.02,.21,.43,.65,.89,1.11,1.51,1.74,1.94,2.17,2.42,2.65,2.9,3.19]
for i,time in enumerate(times):
    add(audition,space if i in [5,11] else samples[i%5],time,1.4,(i%5-2)*.1)
    add(audition,release,time+.085,.75,(i%5-2)*.1)
sf.write(out/'audition.wav',audition,sr,subtype='PCM_24')
mono=np.max(np.abs(audition),axis=1);bins=[float(np.max(x)) for x in np.array_split(mono,240)]
(out/'audition-wave.json').write_text(json.dumps({'duration':4,'sampleRate':sr,'samples':bins,'source':'Gateron Ink Black, tplai/kbsim, MIT. Unpitched original sample bytes decoded; fixed gain and panning.'}))
intro=np.zeros((int(sr*6),2))
for i,time in enumerate([.2,.49,.79,1.24,2.4,3.0,4.38]):
    add(intro,samples[i%5],time,1.1,(i%3-1)*.18);add(intro,release,time+.08,.65)
sf.write(out/'intro-keys.wav',intro,sr,subtype='PCM_24')
(out/'score-notes.json').write_text(json.dumps({'score':'Original deterministic composition authored for keyconf, 80 BPM, 12 bars, no external music.','scorePeak':float(np.max(np.abs(score))),'auditionPeak':float(np.max(np.abs(audition))),'sr':sr,'duration':36},indent=2))
print((out/'score-notes.json').read_text())
