from pathlib import Path
import json,subprocess
import numpy as np
import soundfile as sf
root=Path(__file__).resolve().parents[1];sr=48000
source=root/'assets/audio/source';source.mkdir(exist_ok=True)
def decode(name):
 b=subprocess.check_output(['ffmpeg','-v','error','-i',str(source/name),'-f','f32le','-ac','1','-ar',str(sr),'-'])
 return np.frombuffer(b,dtype='<f4')
press=[decode(f'press_key{i}.mp3') for i in range(1,6)];space=decode('press_space.mp3');release=decode('release_key.mp3')
mix=np.zeros((6*sr,2));take=json.loads((root/'assets/audio/typing-cues.json').read_text())
for i,event in enumerate(take['events']):
 t=event['time']-take['sourceClipStart']
 if t<0 or t>=5.85:continue
 pan=(i%5-2)*.075
 for signal,time,gain in [(space if event['key']==' ' else press[i%5],t,1.2),(release,t+.075,.65)]:
  at=int(time*sr);n=min(len(signal),len(mix)-at)
  mix[at:at+n]+=signal[:n,None]*np.array([np.sqrt((1-pan)/2),np.sqrt((1+pan)/2)])[None,:]*gain
sf.write(root/'assets/audio/typing-keys.wav',mix,sr,subtype='PCM_24')
(root/'assets/audio/typing-cues.json').write_text(json.dumps(take,indent=2))
print('Typing audio peak:',np.max(np.abs(mix)))
