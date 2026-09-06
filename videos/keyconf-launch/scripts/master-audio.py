"""Render the authored stem timing and volume envelopes, then apply clean gain."""
from pathlib import Path
from html.parser import HTMLParser
import json, subprocess
import numpy as np
import soundfile as sf
root=Path(__file__).resolve().parents[1];sr=48000;duration=36
class AudioClips(HTMLParser):
 def __init__(self):super().__init__();self.clips=[]
 def handle_starttag(self,tag,attrs):
  if tag=='audio':self.clips.append(dict(attrs))
parser=AudioClips();parser.feed((root/'index.html').read_text());mix=np.zeros((duration*sr,2))
for clip in parser.clips:
 if clip.get('data-fx-chain'):raise ValueError('Add FX rendering before mastering a clip with data-fx-chain')
 signal,rate=sf.read(root/clip['src'],always_2d=True)
 if rate!=sr:raise ValueError(f'Expected 48 kHz source: {clip["src"]}')
 start=round(float(clip['data-start'])*sr);count=min(len(signal),round(float(clip['data-duration'])*sr),len(mix)-start)
 gain=np.full(count,float(clip.get('data-volume',1)))
 for lane in json.loads(clip.get('data-automation','{"lanes":[]}'))['lanes']:
  if lane['target']!='volume':raise ValueError('Add support before rendering a new effect lane')
  points=lane['points']
  if any(any(key in point for key in ['curve','viaX','viaY']) for point in points):raise ValueError('This master supports linear volume envelopes only')
  gain*=np.interp(np.arange(count)/sr,[p['t'] for p in points],[p['v'] for p in points])
 mix[start:start+count]+=signal[:count]*gain[:,None]
pre=root/'renders/premaster.wav';pre.parent.mkdir(exist_ok=True);sf.write(pre,mix,sr,subtype='PCM_24')
def measure(path):
 process=subprocess.run(['ffmpeg','-hide_banner','-i',str(path),'-af','loudnorm=I=-18:TP=-1.2:LRA=11:print_format=json','-f','null','-'],capture_output=True,text=True,check=True)
 return json.JSONDecoder().raw_decode(process.stderr[process.stderr.rfind('{'):])[0]
before=measure(pre);gain_db=min(-18-float(before['input_i']),-1.2-float(before['input_tp']))
mix*=10**(gain_db/20)
output=root/'assets/audio/master.wav';sf.write(output,mix,sr,subtype='PCM_24');after=measure(output)
report={'method':'Constant gain only. No compression, limiting, EQ, or pitch shift.','gainDb':gain_db,'sampleRate':sr,'channels':2,'duration':duration,'sourceMeasurement':before,'masterMeasurement':after}
(root/'docs/audio-master.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'gainDb':gain_db,'integratedLUFS':after['input_i'],'truePeakDbTP':after['input_tp']},indent=2))
