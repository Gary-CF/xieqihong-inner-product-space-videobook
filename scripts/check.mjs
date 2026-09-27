import fs from 'node:fs/promises';import path from 'node:path';const root=path.resolve('dist');const errors=[];
for(const file of ['index.html','book.html']){const html=await fs.readFile(path.join(root,file),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);if(new Set(ids).size!==ids.length)errors.push(file+' duplicate IDs');
for(const [,url] of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){if(/^(https?:|data:|mailto:)/.test(url))continue;const [rel,hash]=url.split('#');const target=rel?path.resolve(root,rel):path.join(root,file);
try{await fs.access(target);if(hash){const t=await fs.readFile(target,'utf8');if(!t.includes('id="'+hash+'"'))errors.push(file+' missing anchor '+url)}}catch{errors.push(file+' missing file '+url)}}
if(/SCREENSHOT:|katex-error|C:\\Users|\/home\/[^/]+\/|wsl.localhost/.test(html))errors.push(file+' unresolved placeholder, math error or private path');
}
console.log(JSON.stringify({passed:errors.length===0,errors},null,2));if(errors.length)process.exitCode=1;
