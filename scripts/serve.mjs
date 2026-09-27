import http from 'node:http';import fs from 'node:fs/promises';import path from 'node:path';
const root=path.resolve('dist'),port=Number(process.env.PORT||4173),prefix=process.env.BASE_PATH||'';
const mime={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript; charset=utf-8','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2','.woff':'font/woff','.ttf':'font/ttf'};
http.createServer(async(req,res)=>{try{let u=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
if(prefix){if(!u.startsWith(prefix+'/')){res.writeHead(404);return res.end('prefix not found')}u=u.slice(prefix.length);}
let target=path.resolve(root,'.'+u);if(!target.startsWith(root+path.sep)&&target!==root)throw Error('path');
if((await fs.stat(target)).isDirectory())target=path.join(target,'index.html');
res.setHeader('Content-Type',mime[path.extname(target)]||'application/octet-stream');res.end(await fs.readFile(target));}catch{res.writeHead(404);res.end('Not found')} }).listen(port,'127.0.0.1',()=>console.log('Preview http://localhost:'+port+prefix+'/'));
