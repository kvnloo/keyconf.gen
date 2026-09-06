import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
await mkdir('snapshots',{recursive:true});
await mkdir('renders',{recursive:true});
await writeFile('renders/stage-preview.html', '<!doctype html><html><head><base href="../"><link rel="stylesheet" href="assets/cinematic-fonts.css"><style>body{margin:0;width:1920px;height:1080px;overflow:hidden}canvas{width:1920px;height:1080px;display:block}</style><script src="assets/cinematic-boot.js"></script></head><body><canvas id="cinematic-canvas"></canvas><script type="module" src="assets/cinematic-stage.js"></script></body></html>');
const b=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=gl-egl','--ignore-gpu-blocklist','--enable-gpu-rasterization']});
const p=await b.newPage({viewport:{width:1920,height:1080}});
p.on('pageerror',e=>console.error(e.message));
await p.goto('http://localhost:3344/renders/stage-preview.html',{waitUntil:'domcontentloaded',timeout:120000});
await p.waitForFunction(()=>window.__keyconfReady,{},{timeout:90000});
for(const t of [0.4,5.4,13.5]) {
  await p.evaluate(t=>window.__keyconfRenderAt(t),t);
  await p.screenshot({path:`snapshots/proof-${t}.png`});
}
const proofTimes=[0.4,13.5,24.5,33];
const baseline=new Map();
for(const t of [...proofTimes,...proofTimes.toReversed()]) {
  await p.evaluate(t=>window.__keyconfRenderAt(t),t);
  const hash=createHash('sha256').update(await p.screenshot()).digest('hex');
  if(baseline.has(t)&&baseline.get(t)!==hash)throw new Error(`Non-deterministic image at ${t}s`);
  baseline.set(t,hash);
}
await writeFile('snapshots/seek-proof.json',JSON.stringify({ok:true,poses:Object.fromEntries(baseline)},null,2));
await b.close();
