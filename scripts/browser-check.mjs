import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {spawn} from 'node:child_process';
const evidence=path.resolve('editorial/browser');await fs.mkdir(evidence,{recursive:true});
const base='http://127.0.0.1:4173/';
const prefix='http://127.0.0.1:4174/course/ch09/';
const server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:'4174',BASE_PATH:'/course/ch09'},stdio:'pipe'});
const report={passed:false,errors:[],pages:[],searches:[],lightboxes:[],prefix:null,fileMode:null,print:null};
function check(ok,msg){if(!ok)throw new Error(msg)}
let browser;
try{
 for(let i=0;i<100;i++){try{if((await fetch(prefix)).ok)break;}catch{}await new Promise(r=>setTimeout(r,100));}
 browser=await chromium.launch({headless:true});
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const page=await context.newPage();
 page.on('pageerror',e=>report.errors.push('runtime: '+e.message));
 page.on('requestfailed',r=>report.errors.push('request: '+r.url()+' '+r.failure()?.errorText));
 const responses=[];page.on('response',r=>{if(r.status()>=400)responses.push(r.status()+' '+r.url())});
 await page.goto(base,{waitUntil:'networkidle'});
 check(await page.locator('.contents a').count()===11,'Home must show ten sections and appendix');
 await page.screenshot({path:path.join(evidence,'home-desktop.png')});
 await page.locator('.primary').click();await page.waitForLoadState('networkidle');
 check(await page.locator('article').count()===11,'Continuous book must contain all sections');
 const math=await page.locator('.katex').count();check(math>=1400,'Full math content missing');
 for(const term of ['施密特','复正规','实正规','极分解','奇异值','最小二乘','广义逆']){
  await page.locator('#search').fill(term);const links=page.locator('#results a');check(await links.count()>0,'Search empty '+term);
  const href=await links.first().getAttribute('href');const id=href.split('#')[1];check(await page.locator('[id="'+id+'"]').count()===1,'Search anchor missing '+id);
  report.searches.push({term,hits:await links.count(),first:href});
 }
 await page.locator('#search').fill('');
 const reps=['schmidt-proof','complex-spectral','real-plane-lemma','positive-square-root','polar-singular','svd-proof','least-squares','normal-equations','summary','cheatsheet-comparison'];
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:width===390?844:1000});
  await page.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  for(const id of reps){
   await page.locator('#'+id).evaluate(el=>el.scrollIntoView());
   await page.waitForTimeout(80);
   const size=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth}));
   check(size.scroll<=size.viewport+1,'Full-page overflow '+width+' '+id+': '+JSON.stringify(size));
   const filename=id+'-'+width+'.png';await page.screenshot({path:path.join(evidence,filename)});
   report.pages.push({id,width,overflow:false,screenshot:'editorial/browser/'+filename});
  }
 }
 await page.setViewportSize({width:1440,height:1000});
 for(const a of await page.locator('article a[data-lightbox]').all()){
  await a.scrollIntoViewIfNeeded();const before=await page.evaluate(()=>scrollY);
  await a.click();await page.waitForFunction(()=>{const i=document.querySelector('#lightbox img');return i.complete&&i.naturalWidth>0});
  check(await page.locator('#lightbox').evaluate(el=>el.open),'Lightbox failed to open');
  const img=await page.locator('#lightbox img').evaluate(el=>({src:el.getAttribute('src'),width:el.naturalWidth}));
  await page.keyboard.press('Escape');check(!await page.locator('#lightbox').evaluate(el=>el.open),'Escape failed');
  check(Math.abs((await page.evaluate(()=>scrollY))-before)<2,'Lost reading position');
  report.lightboxes.push(img);
 }
 const missing=await page.locator('article img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src));
 check(!missing.length,'Missing images '+missing);
 await page.setViewportSize({width:390,height:844});
 await page.locator('#toc-toggle').click();check(await page.locator('aside').isVisible(),'Mobile TOC did not open');
 await page.locator('nav a[href="book.html#s9-10"]').click();check(!await page.locator('aside').isVisible(),'Mobile TOC did not close');
 check((await page.url()).endsWith('#s9-10'),'Mobile chapter navigation wrong');
 await page.setViewportSize({width:1440,height:1000});
 await page.emulateMedia({media:'print'});
 report.print={headerHidden:!await page.locator('header').isVisible(),sidebarHidden:!await page.locator('aside').isVisible(),articles:await page.locator('article').count()};
 check(report.print.headerHidden&&report.print.sidebarHidden,'Print navigation visible');
 await page.locator('#cheatsheet').evaluate(e=>e.scrollIntoView());
 await page.screenshot({path:path.join(evidence,'print-cheatsheet.png')});
 await page.emulateMedia({media:'screen'});
 await page.goto(prefix+'book.html#s9-9',{waitUntil:'networkidle'});
 await page.locator('#search').fill('广义逆');await page.locator('#results a').first().click();
 report.prefix={url:page.url(),math:await page.locator('.katex').count(),css:await page.locator('main').evaluate(e=>getComputedStyle(e).marginLeft)};
 check(report.prefix.url.startsWith(prefix),'Prefix search navigation escaped prefix');
 check(report.prefix.math===math&&report.prefix.css!=='0px','Prefix assets not loaded');
 const offline=await browser.newContext({offline:true,viewport:{width:1440,height:1000}});
 const filepage=await offline.newPage();const fileErrors=[];filepage.on('pageerror',e=>fileErrors.push(e.message));
 await filepage.goto(pathToFileURL(path.resolve('dist/book.html')).href,{waitUntil:'load'});
 await filepage.locator('#search').fill('施密特');
 const fig=filepage.locator('#fig-schmidt img');await fig.scrollIntoViewIfNeeded();await fig.evaluate(i=>i.decode());
 report.fileMode={math:await filepage.locator('.katex').count(),searchHits:await filepage.locator('#results a').count(),image:await fig.evaluate(i=>i.naturalWidth),errors:fileErrors};
 check(report.fileMode.math===math&&report.fileMode.searchHits>0&&report.fileMode.image>0&&!fileErrors.length,'Offline file mode failed');
 report.responses=responses;report.math=math;check(!responses.length&&!report.errors.length,'Browser errors reported');
 report.passed=true;
}catch(e){report.errors.push(e.stack);process.exitCode=1}
finally{await browser?.close();server.kill();await fs.writeFile('editorial/browser-result.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2))}
