import {chromium} from 'playwright';
const b=await chromium.launch({headless:false});
const p=await b.newPage({viewport:{width:1536,height:864},deviceScaleFactor:1.25,reducedMotion:'reduce'});
p.setDefaultTimeout(90000);
const ready=async()=>{
  await p.waitForFunction(()=>!document.querySelector('.model-status'));
  await p.waitForFunction(()=>document.querySelector('.scene-host')?.dataset.renderState==='idle');
};
try {
  await p.goto('http://localhost:3000/');await ready();
  for(const [id,name] of [['blush','Blush'],['midnight','Midnight']]){
    await p.getByRole('button',{name:`Preview ${name}`,exact:true}).click();await ready();
    await p.screenshot({path:`assets/stills/${id}.png`});console.log(`Captured ${name}`);
  }
  await p.getByRole('button',{name:'Preview Forest Line',exact:true}).click();await ready();
  await p.getByRole('button',{name:'Customize this build',exact:true}).click();await ready();
  await p.getByRole('link',{name:'Sound',exact:true}).click();await ready();
  await p.getByRole('button',{name:'Enable keyboard sound',exact:true}).click();
  await p.getByRole('button',{name:'Mute keyboard',exact:true}).waitFor();
  await p.getByRole('button',{name:'A Letter key',exact:true}).click();
  await p.screenshot({path:'assets/stills/sound.png'});console.log('Captured enabled Sound Lab');
} finally {await b.close()}
