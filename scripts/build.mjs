import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import MarkdownIt from 'markdown-it';
import katex from 'katex';
const root=fileURLToPath(new URL('..',import.meta.url));
const out=path.join(root,'dist');await fs.mkdir(out,{recursive:true});
const md=new MarkdownIt({html:true,typographer:false});
const sections=[];let mathCount=0;
const dimensions=JSON.parse(await fs.readFile(path.join(root,'assets/figure-dimensions.json'),'utf8'));
const sources=JSON.parse(await fs.readFile(path.join(root,'editorial/source-ranges.json'),'utf8').catch(()=>'{}'));
const files=(await fs.readdir(path.join(root,'content'))).filter(x=>x.endsWith('.md')).sort();
for(const file of files){
 const src=await fs.readFile(path.join(root,'content',file),'utf8');
 const heading=src.match(/^# (.+) \{#([^}]+)\}/m);if(!heading)throw Error('Missing chapter anchor: '+file);
 const slots=[];let text=src.replace(/\\\[([\s\S]*?)\\\]|\\\(([\s\S]*?)\\\)/g,(_,block,inline)=>{
  const html=katex.renderToString(block??inline,{displayMode:block!==undefined,throwOnError:true,output:'htmlAndMathml',strict:'error'});
  const token='MATHSLOT'+slots.length+'END';slots.push(html);mathCount++;return token;
 });
 text=text.replace(/^(#{1,6}) (.+?) \{#([^}]+)\}$/gm,(_,h,t,id)=>'<h'+h.length+' id="'+id+'">'+t+'</h'+h.length+'>');
 text=text.replace(/<!-- source:P(\d+):(\d+)-(\d+):([^>]+) -->/g,(_,p,a,b,label)=>{
  const key='P'+p+':'+a+'-'+b;const timing=sources[key]||'原始字幕cue定位';
  return '<details class="source"><summary>来源 · P'+p+' · '+label+'</summary><p>BV1mJ411r7ZB，P'+p+'，transcript.raw.json，C'+a.padStart(6,'0')+'—C'+b.padStart(6,'0')+'；'+timing+'。原ASR时间用于范围定位，非逐字对齐。<a href="https://www.bilibili.com/video/BV1mJ411r7ZB/?p='+p+'">查看原课程 P'+p+'</a></p></details>';
 });
 let html=md.render(text).replace(/MATHSLOT(\d+)END/g,(_,i)=>slots[Number(i)]);
 html=html.replace(/<img\b[^>]*>/g,tag=>{const src=tag.match(/src="([^"]+)"/)?.[1];const d=dimensions[src];return d?tag.slice(0,-1)+' width="'+d[0]+'" height="'+d[1]+'">':tag;});
 const subheads=[...html.matchAll(/<h([23]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)];
 if(subheads.length){
 const local='<details class="chapter-toc"><summary>本节导读与目录</summary><div>'+subheads.map(h=>'<a href="#'+h[2]+'">'+h[3]+'</a>').join('')+'</div></details>';
 html=html.replace(/(<h1[^>]*>[\s\S]*?<\/h1>)/,'$1'+local);
 }
 sections.push({file,title:heading[1],id:heading[2],html,src,plain:src.replace(/<[^>]+>/g,' ').replace(/\{#[^}]+\}/g,'')});
}
const nav=sections.map(s=>'<a href="book.html#'+s.id+'">'+s.title+'</a>').join('');
const header='<header><a class="brand" href="index.html">谢启鸿 · 高等代数</a><a href="book.html">全章阅读</a><a href="book.html#summary">总结与速查</a><button id="toc-toggle" aria-expanded="false">目录</button><button onclick="window.print()">打印</button></header>';
function page(title,body,cls=''){return '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>'+title+'</title><link rel="stylesheet" href="assets/katex/katex.min.css"><link rel="stylesheet" href="assets/style.css"><script defer src="assets/app.js"></script></head><body class="'+cls+'">'+header+'<aside><div class="aside-label">第九章 · 内积空间</div><label for="search">搜索本章</label><input id="search" type="search" placeholder="如：正交投影、极分解"><div id="results" aria-live="polite"></div><nav>'+nav+'</nav></aside><main>'+body+'</main><dialog id="lightbox"><button id="close-lightbox" aria-label="关闭图片">关闭 ×</button><img alt=""><p></p></dialog><script src="assets/search-data.js"></script></body></html>'}
await fs.writeFile(path.join(out,'book.html'),page('第9章 内积空间 · 连续阅读',sections.map(s=>'<article data-chapter="'+s.id+'">'+s.html+'</article>').join('')));
const intro='<div class="hero"><p class="eyebrow">复旦大学 · 谢启鸿高等代数学课程</p><h1>内积空间</h1><p class="lead">从几何的长度与正交，走向算子的谱结构与矩阵分解。</p><div class="actions"><a class="primary" href="book.html">阅读全文 →</a><a href="book.html#summary">总结与核心 Cheatsheet →</a></div></div><h2>阅读说明</h2><p>正文保留课程的推导、例子与几何直觉。内积第一变量线性，公式可复制；每个主题附课次与原始字幕定位。图片可点击放大，Esc 返回原阅读位置；手机上长公式和表格可左右滑动。搜索支持中文正文，全部数学字体和脚本随站点提供。</p><h2>正式目录</h2><div class="contents">'+nav+'</div><h2>资料与整理说明</h2><p>课程来源为谢启鸿老师B站课程视频，板书版权归谢帅作用，本网页仅供学习参考。原课未证而由编者补足的内容明确标注，来源疑点在受影响位置说明。</p><p><a href="https://www.cnblogs.com/torsor/p/16843108.html">官方教材介绍</a> · <a href="https://www.cnblogs.com/torsor/p/4731153.html">官方课程与资料</a> · <a href="https://github.com/Luke-Evan/videobook">图文整理参考项目</a></p>';
await fs.writeFile(path.join(out,'index.html'),page('内积空间 · 谢启鸿高等代数第9章',intro,'home'));
await fs.mkdir(path.join(out,'assets'),{recursive:true});
await fs.cp(path.join(root,'assets/figures'),path.join(out,'assets/figures'),{recursive:true});
await fs.cp(path.join(root,'node_modules/katex/dist'),path.join(out,'assets/katex'),{recursive:true});
await fs.copyFile(path.join(root,'node_modules/katex/LICENSE'),path.join(out,'assets/katex/LICENSE'));
for(const name of ['style.css','app.js'])await fs.copyFile(path.join(root,'web',name),path.join(out,'assets',name));
const search=sections.flatMap(s=>{
 const headings=[...s.src.matchAll(/^#{1,3} (.+?) \{#([^}]+)\}$/gm)];
 return headings.map((h,i)=>({title:(i?s.title+' · ':'')+h[1],id:h[2],text:s.src.slice(h.index,(headings[i+1]?.index??s.src.length)).replace(/<!--[\s\S]*?-->/g,'').replace(/<[^>]*>/g,' ').replace(/\{#[^}]+\}/g,'')}));
});
await fs.writeFile(path.join(out,'assets/search-data.js'),'window.BOOK_SEARCH='+JSON.stringify(search)+';');
await fs.writeFile(path.join(root,'editorial/build-result.json'),JSON.stringify({chapters:sections.length,mathCount,files,success:true},null,2));
console.log('Built '+sections.length+' chapters; '+mathCount+' math expressions; local assets → dist/');
