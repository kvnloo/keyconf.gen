"""Original score, camera accents and recording-led key events for the revised cut."""
from pathlib import Path
import json,subprocess
import numpy as np
import soundfile as sf
root=Path(__file__).resolve().parents[1]; out=root/'assets/audio'
sr=48000; seconds=36; n=sr*seconds;rng=np.random.default_rng(72065)
score=np.zeros((n,2));keys=np.zeros_like(score);motion=np.zeros_like(score)
def place(dst,sig,at,gain=1,pan=0):
 start=round(at*sr); end=min(n,start+len(sig)); offset=max(0,-start);start=max(0,start)
 if end<=start:return
 sig=sig[offset:offset+end-start]
 if sig.ndim==1:sig=np.column_stack([sig*np.sqrt((1-pan)/2),sig*np.sqrt((1+pan)/2)])
 dst[start:end]+=sig*gain

def freq(note):return 440*2**((note-69)/12)
def tone(note,length=.9):
 t=np.arange(round(sr*length))/sr;f=freq(note)
 env=(1-np.exp(-t/.004))*np.exp(-t/.23)
 return (np.sin(2*np.pi*f*t+.7*np.exp(-t/.07)*np.sin(4*np.pi*f*t))+.16*np.sin(2*np.pi*2*f*t))*env
chords=[[50,57,60,65,69],[46,53,57,60,65],[53,60,64,67,72],[48,55,58,62,67]]
for bar in range(9):
 at=bar*4;chord=chords[bar%4]
 t=np.arange(int(sr*4.2))/sr;env=np.minimum(t/.3,1)*np.clip((4.2-t)/.7,0,1)
 pad=np.zeros((len(t),2))
 for j,note in enumerate(chord[1:]):
  for ch,detune in [(0,.9987),(1,1.0013)]:
   f=freq(note)*detune;pad[:,ch]+=(np.sin(2*np.pi*f*t+j*.4)+.09*np.sin(4*np.pi*f*t))*env*.012
 place(score,pad,at)
 for i,offset in enumerate([0,.75,1.25,1.75,2.5,3.25,3.75]):
  note=chord[[1,3,2,4,2,3,1][i]]+12
  place(score,tone(note),at+offset,.071,(-.38 if i%2==0 else .38))
 for beat in range(8):
  t=np.arange(int(sr*.34))/sr
  bass=np.sin(2*np.pi*freq(chord[0]-12)*t)*(1-np.exp(-t/.008))*np.exp(-t/.13)
  place(score,bass,at+beat*.5,.20 if beat%4==0 else .10)
  if beat in [0,3,4,6]:
   kick=np.sin(2*np.pi*(47*t+46*.025*(1-np.exp(-t/.025))))*(1-np.exp(-t/.002))*np.exp(-t/.09)
   place(score,kick,at+beat*.5,.12)
  if beat%2:
   t=np.arange(int(sr*.08))/sr;noise=rng.normal(0,1,len(t));noise=np.diff(noise,prepend=0)
   place(score,noise*np.exp(-t/.025)*(1-np.exp(-t/.001)),at+beat*.5,.006,(-.3 if beat%4==1 else .3))
for delay,gain in [(.25,.14),(.5,.07)]:
 d=round(delay*sr);score[d:]+=score[:-d,::-1].copy()*gain
score*=.48/np.max(np.abs(score));sf.write(out/'cinematic-score.wav',score,sr,subtype='PCM_24')
cache={}
def sample(name):
 if name not in cache:
  raw=subprocess.check_output(['ffmpeg','-v','error','-i',str(out/'source'/name),'-f','f32le','-ac','1','-ar',str(sr),'-'])
  cache[name]=np.frombuffer(raw,dtype='<f4').astype(float)
 return cache[name]
cues=json.loads((out/'cinematic-cues.json').read_text())
for group,events in cues.items():
 for i,e in enumerate(events):
  pan=0 if e['code']=='Space' else (i%5-2)*.12
  place(keys,sample(e['sample']),e['t'],1.3,pan)
  place(keys,sample('release_key.mp3'),e['t']+.085,.68,pan)
sf.write(out/'cinematic-keys.wav',keys,sr,subtype='PCM_24')
for at,length,gain in [(2.5,.9,.032),(6,.34,.024),(7.5,.28,.018),(9,.3,.018),(10.1,.65,.033),(14.7,.7,.028),(18.85,.25,.022),(22.75,.45,.028),(26.8,.5,.035),(30.6,.42,.028)]:
 t=np.arange(round(length*sr))/sr;u=t/length
 noise=rng.normal(0,1,len(t));noise=np.convolve(noise,np.ones(18)/18,mode='same')
 whoosh=noise*np.sin(np.pi*u)**2
 place(motion,whoosh,at,gain,-.2)
 place(motion,whoosh,at+.013,gain,.2)
sf.write(out/'cinematic-motion.wav',motion,sr,subtype='PCM_24')
(out/'cinematic-audio-notes.json').write_text(json.dumps({'score':'Original 120 BPM composition, deterministic seed72065; no external music.','keypressSource':'Gateron Ink Black, tplai/kbsim, MIT. Decoded source samples, no pitch or EQ changes.','timing':'cinematic-cues.json is shared with Three.js. Typing times come from the actual captured test. Releases use an 85ms reconstruction.','sampleRate':sr,'seconds':seconds,'keysPeak':float(np.max(np.abs(keys)))},indent=2))
print('Wrote three36-second PCM24 stereo stems.')
