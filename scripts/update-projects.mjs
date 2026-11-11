import { writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const enc = encodeURIComponent;
export async function collectProjects({ user, get, now = new Date().toISOString() }) {
  const repos = [];
  for (let page = 1; ; page++) {
    const batch = await get(`/users/${enc(user)}/repos?type=owner&per_page=100&page=${page}`);
    if (!Array.isArray(batch)) throw new Error('Unexpected repository response');
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  const projects = [];
  for (const repo of repos) {
    if (repo.private || repo.owner?.login?.toLowerCase() !== user.toLowerCase()) continue;
    let kind = 'owned', parent = null, canonicalName = repo.full_name, contributionUrl = null, contributionBranch = null, contributionSha = null;
    if (repo.fork) {
      let found = null;
      try {
        for (let page = 1; !found; page++) {
          const branches = await get(`/repos/${enc(user)}/${enc(repo.name)}/branches?per_page=100&page=${page}`);
          if (!Array.isArray(branches)) throw new Error('Unexpected branches response');
          for (const branch of branches) {
            const commits = await get(`/repos/${enc(user)}/${enc(repo.name)}/commits?sha=${enc(branch.name)}&author=${enc(user)}&per_page=1`);
            if (!Array.isArray(commits)) throw new Error('Unexpected commits response');
            const authored = commits.find(commit => commit.author?.login?.toLowerCase() === user.toLowerCase());
            if (authored) { found = authored; contributionBranch = branch.name; break; }
          }
          if (branches.length < 100) break;
        }
      } catch (error) {
        console.warn(`Could not verify commits for ${repo.name}: ${error.message}`);
      }
      if (!found) continue;
      kind = 'fork_contributed';
      contributionUrl = found.html_url || null;
      contributionSha = found.sha || null;
      try {
        const detail = await get(`/repos/${enc(user)}/${enc(repo.name)}`);
        parent = detail.parent?.full_name ?? null;
        canonicalName = detail.source?.full_name || parent || repo.full_name;
      } catch (error) {
        console.warn(`Could not retrieve upstream for ${repo.name}: ${error.message}`);
      }
    }
    projects.push({ id: String(repo.id ?? repo.name), name: repo.name, kind, parent, canonicalName, contributionUrl, contributionBranch, contributionShas: contributionSha ? [contributionSha] : [],
      description: repo.description || '', url: repo.html_url, homepage: repo.homepage || '',
      language: repo.language || '', stars: repo.stargazers_count ?? 0, topics: repo.topics || [],
      updatedAt: repo.pushed_at || repo.updated_at || '', archived: !!repo.archived });
  }
  projects.push(...await collectExternalContributions({ user, get, now }));
  const uniqueProjects = deduplicateProjects(projects);
  uniqueProjects.sort((a, b) => (b.updatedAt || '').localeCompare(a.updatedAt || ''));
  return { user, generatedAt: now, projects: uniqueProjects };
}
async function collectExternalContributions({user,get,now}) {
  const collected = [];
  async function search(start,end) {
    const q=`author:${user} -user:${user} is:public author-date:${start}..${end}`;
    async function request(page){return get(`/search/commits?q=${enc(q)}&per_page=100&page=${page}`)}
    const first=await request(1);
    if (!Array.isArray(first.items)||!Number.isInteger(first.total_count)||first.incomplete_results) throw new Error('Incomplete GitHub commit search');
    if (first.total_count>1000) {
      const left=new Date(`${start}T00:00:00Z`),right=new Date(`${end}T00:00:00Z`);
      if(left.getTime()>=right.getTime())throw new Error(`Too many commits on ${start} to search reliably`);
      const span=Math.floor((right-left)/86400000),mid=new Date(left.getTime()+Math.floor(span/2)*86400000),next=new Date(mid.getTime()+86400000);
      const date=d=>d.toISOString().slice(0,10);
      await search(start,date(mid));await search(date(next),end);return;
    }
    collected.push(...first.items);
    for(let page=2; page<=Math.ceil(first.total_count/100); page++){
      const next=await request(page);if(!Array.isArray(next.items)||next.incomplete_results)throw new Error('Incomplete GitHub commit search');collected.push(...next.items)
    }
  }
  await search('2008-01-01',now.slice(0,10));
  const groups=new Map();
  for(const item of collected){const repo=item.repository;if(repo?.private!==false||repo.owner?.login?.toLowerCase()===user.toLowerCase()||item.author?.login?.toLowerCase()!==user.toLowerCase()||!repo.full_name||!item.sha)continue;let group=groups.get(repo.full_name.toLowerCase());if(!group){group={repo,commits:[]};groups.set(repo.full_name.toLowerCase(),group)}group.commits.push(item)}
  const output=[];
  for(const {repo,commits} of groups.values()){
    const parts=repo.full_name.split('/');if(parts.length!==2)continue;
    let detail;try{detail=await get(`/repos/${enc(parts[0])}/${enc(parts[1])}`)}catch(error){console.warn(`Could not retrieve public repository ${repo.full_name}: ${error.message}`);continue}
    if(detail.private!==false)continue;
    output.push({id:String(detail.id??detail.full_name),name:detail.name,kind:'external_contributed',parent:detail.parent?.full_name??null,canonicalName:detail.source?.full_name||detail.parent?.full_name||detail.full_name,contributionUrl:commits[0].html_url||null,contributionBranch:null,contributionShas:[...new Set(commits.map(c=>c.sha))],description:detail.description||'',url:detail.html_url,homepage:detail.homepage||'',language:detail.language||'',stars:detail.stargazers_count??0,topics:detail.topics||[],updatedAt:detail.pushed_at||detail.updated_at||'',archived:!!detail.archived})
  }
  return output;
}
export function deduplicateProjects(projects){
  const parents=projects.map((_,i)=>i),byKey=new Map(),bySha=new Map();
  const root=i=>{while(parents[i]!==i){parents[i]=parents[parents[i]];i=parents[i]}return i};
  const merge=(a,b)=>{a=root(a);b=root(b);if(a!==b)parents[b]=a};
  projects.forEach((p,i)=>{for(const key of [p.canonicalName,p.parent].filter(Boolean).map(x=>x.toLowerCase())){if(byKey.has(key))merge(i,byKey.get(key));else byKey.set(key,i)}for(const sha of p.contributionShas||[]){if(bySha.has(sha))merge(i,bySha.get(sha));else bySha.set(sha,i)}});
  const groups=new Map();projects.forEach((p,i)=>{const id=root(i);if(!groups.has(id))groups.set(id,[]);groups.get(id).push(p)});
  return [...groups.values()].map(group=>{group.sort((a,b)=>{const rank=p=>p.kind==='owned'?3:p.kind==='fork_contributed'?2:1;return rank(b)-rank(a)||(b.stars||0)-(a.stars||0)});const winner={...group[0]};winner.relatedRepositories=group.slice(1).filter(p=>p.kind==='external_contributed').map(p=>({name:p.canonicalName||p.name,url:p.url,contributionUrl:p.contributionUrl}));delete winner.contributionShas;return winner});
}
export function serializeData(data) {
  return `window.GITHUB_PROJECTS = ${JSON.stringify(data, null, 2).replace(/</g, '\\u003c')};\n`;
}
async function main() {
  const token = process.env.GITHUB_TOKEN;
  const get = async (endpoint) => {
    const response = await fetch(`https://api.github.com${endpoint}`, { headers: {
      'Accept': 'application/vnd.github+json', 'User-Agent': 'yoloyyh-portfolio',
      'X-GitHub-Api-Version': '2022-11-28', ...(token ? { Authorization: `Bearer ${token}` } : {})
    }});
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    return response.json();
  };
  const data = await collectProjects({ user: 'yoloyyh', get });
  const destination = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../projects-data.js');
  await writeFile(destination, serializeData(data));
  console.log(`Updated ${data.projects.length} public repositories`);
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
