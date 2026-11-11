import {readdir, readFile, stat, writeFile, rename, access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath, pathToFileURL} from 'node:url';
import path from 'node:path';
const roots=['ai-efficiency','ai-safety'];
async function walk(dir) {let items;try{items=await readdir(dir,{withFileTypes:true})}catch(error){if(error.code==='ENOENT')return [];throw error}let result=[];for(const item of items){if(item.name.startsWith('.'))continue;const p=path.join(dir,item.name);if(item.isDirectory())result.push(...await walk(p));else if(item.isFile()&&item.name.endsWith('.md'))result.push(p)}return result}
const field=(front,key)=>{const m=front.match(new RegExp(`^${key}:\\s*(.+)$`,'m'));return m?m[1].trim().replace(/^['"]|['"]$/g,''):''};
function originalUrl(front){for(const key of ['resolved_source_url','source_url']){const raw=field(front,key);try{const u=new URL(raw);if(u.protocol==='https:'||u.protocol==='http:')return u.href}catch{}}return ''}
function isPublic(front){
 const explicit=front.match(/^public:\s*([^\r\n#]+?)(?:\s*#.*)?\s*$/m);
 if(explicit){const value=explicit[1].trim().toLowerCase();if(value==='false')return false;if(value==='true')return true}
 const tags=front.match(/^tags:\s*\[([^\]\r\n]*)\]\s*(?:#.*)?$/m);
 if(tags&&tags[1].split(',').some(tag=>tag.trim().replace(/^['"]|['"]$/g,'').replace(/^#/,'')==='public'))return true;
 const multiline=front.match(/^tags:\s*\r?\n((?:[ \t]+-[^\r\n]*\r?\n?)*)/m);
 return !!multiline&&multiline[1].split(/\r?\n/).some(line=>/^[ \t]+-\s*['"]?#?public['"]?\s*(?:#.*)?$/.test(line));
}
export async function buildArticles(vault,{publicOnly=false}={}){const articles=[];for(const domain of roots){const base=path.join(vault,'wikis',domain);for(const file of await walk(base)){const raw=await readFile(file,'utf8');const m=raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);const front=m?m[1]:'';const publish=isPublic(front);if(publicOnly&&!publish)continue;const content=(m?raw.slice(m[0].length):raw).trim();if(!content)continue;const title=field(front,'title')||(content.match(/^#\s+(.+)$/m)||[])[1]||path.basename(file,'.md');const st=await stat(file);const date=field(front,'updated')||field(front,'created')||st.mtime.toISOString().slice(0,10);articles.push({id:createHash('sha256').update(path.relative(vault,file)).digest('hex').slice(0,16),title,domain,date,public:publish,sourceUrl:originalUrl(front),content})}}articles.sort((a,b)=>b.date.localeCompare(a.date)||a.title.localeCompare(b.title,'zh-CN'));return {generatedAt:new Date().toISOString(),articles}}
export async function readSiteArticles(dir){const articles=[];for(const file of await walk(dir)){const raw=await readFile(file,'utf8');const m=raw.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?/);if(!m||!isPublic(m[1]))continue;const front=m[1],content=raw.slice(m[0].length).trim();if(!content)continue;const title=field(front,'title')||(content.match(/^#\s+(.+)$/m)||[])[1]||path.basename(file,'.md');const st=await stat(file);articles.push({id:createHash('sha256').update('site:'+path.relative(dir,file)).digest('hex').slice(0,16),title,domain:'ai-efficiency',date:field(front,'updated')||st.mtime.toISOString().slice(0,10),public:true,sourceUrl:originalUrl(front),content})}return articles}
export function serializePublicArticles(data){return `window.PUBLIC_ARTICLES = ${JSON.stringify(data).replace(/</g,'\\u003c')};\n`}
export function serializeArticles(data){return `window.LOCAL_ARTICLES = ${JSON.stringify(data).replace(/</g,'\\u003c')};\n`}
async function main(){
 const vault=process.env.OBSIDIAN_VAULT||'/Users/bytedance/Desktop/workspace';
 const output=process.env.PREVIEW_OUTPUT||path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../articles-preview.js');
 const publicOutput=process.env.PUBLIC_OUTPUT||path.join(path.dirname(output),'articles-public.js');
 const siteContent=process.env.SITE_CONTENT_DIR||path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../content');
 await access(vault);let lastContent='';
 async function save(file,content){const tmp=file+'.tmp';await writeFile(tmp,content,{mode:0o600});await rename(tmp,file)}
 async function sync(){const data=await buildArticles(vault);const siteArticles=await readSiteArticles(siteContent);const current=JSON.stringify([data.articles,siteArticles]);if(current===lastContent)return;const published={generatedAt:data.generatedAt,articles:[...siteArticles,...data.articles.filter(a=>a.public)].sort((a,b)=>b.date.localeCompare(a.date)||a.title.localeCompare(b.title,'zh-CN'))};await save(publicOutput,serializePublicArticles(published));await save(output,serializeArticles(data));lastContent=current;console.log(`本地预览已更新：${data.articles.length} 篇 AI 笔记；公开标记 ${published.articles.length} 篇`)}
 await sync();if(process.argv.includes('--watch')){let running=false;const interval=Math.max(100,Number(process.env.KNOWLEDGE_POLL_MS)||30000);setInterval(async()=>{if(running)return;running=true;try{await sync()}catch(err){console.error(err.message)}finally{running=false}},interval);console.log('正在定期检查 AI 目录变化；仅更新本地预览和标记为 public 的导出。')}
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href)main().catch(error=>{console.error(error.message);process.exitCode=1});
