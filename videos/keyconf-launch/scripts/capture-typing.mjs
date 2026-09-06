import {chromium} from 'playwright';
import {writeFile} from 'node:fs/promises';
const browser=await chromium.launch({headless:true,args:['--use-gl=angle','--use-angle=gl-egl','--ignore-gpu-blocklist','--enable-gpu-rasterization']});
const context=await browser.newContext({viewport:{width:1536,height:1200},deviceScaleFactor:1,reducedMotion:'reduce',recordVideo:{dir:'capture/typing',size:{width:1536,height:1200}}});
const page=await context.newPage();page.setDefaultTimeout(90000);
const origin=Date.now();const events=[];let end=0;
try{
  page.on('pageerror',e=>console.error('PAGE',e.message));
  await page.goto(process.env.CAPTURE_URL || 'http://localhost:3000/');console.log('Loaded');
  await page.waitForFunction(()=>!document.querySelector('.model-status'));console.log('Model loaded');
  await page.getByRole('button',{name:'Customize this build',exact:true}).click();
  await page.getByRole('button',{name:'Start typing test',exact:true}).click();
  const frame=page.frameLocator('iframe[title="Monkeytype guest typing test"]');
  await frame.locator('#words .word').first().waitFor();
  await frame.getByText('words',{exact:true}).click({timeout:10000});
  await frame.locator('#words .word').first().waitFor();console.log('Word mode selected');
  await page.waitForFunction(()=>document.querySelector('.scene-host')?.dataset.renderState==='idle');
  await frame.locator('#wordsInput').focus();
  await page.evaluate(()=>window.scrollTo(0,90));
  await page.screenshot({path:'assets/stills/play.png'});
  console.log('Ready',await page.locator('.scene-host').boundingBox());
  const words=await frame.locator('#words .word').allTextContents();
  const start=(Date.now()-origin)/1000;console.log('Start',start);
  const phrase=words.slice(0,12).join(' ')+' ';
  for(const key of phrase){
    events.push({key,time:(Date.now()-origin)/1000});
    await page.keyboard.type(key,{delay:125});
  }
  await page.waitForTimeout(800);
  if(await frame.locator('#result').isVisible())throw new Error('Typing take unexpectedly reached results');
  end=(Date.now()-origin)/1000;
  await writeFile('capture/typing-events.json',JSON.stringify({start,end,events},null,2));console.log('End',end);
}catch(error){console.error(error);await page.screenshot({path:'capture/typing-failure.png'});throw error;}finally{
  const video=page.video();await context.close();await video.saveAs('assets/footage/typing-take.webm');await browser.close();
}
