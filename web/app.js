const q=document.querySelector('#search'),results=document.querySelector('#results');
q?.addEventListener('input',()=>{results.replaceChildren();const term=q.value.trim();if(!term)return;
const all=(window.BOOK_SEARCH||[]).filter(x=>(x.title+x.text).toLowerCase().includes(term.toLowerCase()));const matches=all.sort((a,b)=>Number(b.title.toLowerCase().includes(term.toLowerCase()))-Number(a.title.toLowerCase().includes(term.toLowerCase()))).slice(0,15);
if(!matches.length){results.textContent='没有找到相关内容';return;}
for(const x of matches){const a=document.createElement('a');a.href='book.html#'+x.id;a.textContent=x.title;const p=document.createElement('p');const i=x.text.toLowerCase().indexOf(term.toLowerCase());p.textContent=x.text.slice(Math.max(0,i-25),i+85).replace(/[#*\\]/g,'');a.append(p);results.append(a);}});
document.querySelector('#toc-toggle')?.addEventListener('click',e=>{const open=document.body.classList.toggle('toc-open');e.target.setAttribute('aria-expanded',String(open));});
document.querySelector('aside')?.addEventListener('click',e=>{if(e.target.closest('a')){document.body.classList.remove('toc-open');document.querySelector('#toc-toggle').setAttribute('aria-expanded','false')}});
const dialog=document.querySelector('#lightbox');let savedScroll={x:0,y:0};
dialog?.addEventListener('close',()=>window.scrollTo({left:savedScroll.x,top:savedScroll.y,behavior:'instant'}));
document.addEventListener('click',e=>{const a=e.target.closest('[data-lightbox]');if(!a)return;e.preventDefault();savedScroll={x:scrollX,y:scrollY};dialog.querySelector('img').src=a.href;dialog.querySelector('img').alt=a.querySelector('img')?.alt||'';dialog.querySelector('p').textContent=a.closest('figure')?.querySelector('figcaption')?.textContent||'';dialog.showModal();});
document.querySelector('#close-lightbox')?.addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
