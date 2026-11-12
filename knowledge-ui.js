(() => {
 const space=document.getElementById('knowledge-space'), list=document.getElementById('knowledge-list'), detail=document.getElementById('knowledge-detail'), grid=document.getElementById('knowledge-grid'), search=document.getElementById('knowledge-search');
 let activeArticle=null, returnTo='archive', lastVersion=window.PUBLIC_ARTICLES?.generatedAt||'';
 function articles(){return Array.isArray(window.PUBLIC_ARTICLES?.articles)?window.PUBLIC_ARTICLES.articles.filter(article=>article.public===true):[]}
 function originalLink(article){try{const u=new URL(article.sourceUrl);return ['https:','http:'].includes(u.protocol)?u.href:''}catch{return ''}}
 function sourceAnchor(article){const url=originalLink(article);if(!url)return null;const a=document.createElement('a');a.className='knowledge-source';a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='阅读原文 ↗';return a}
 function renderList(){
  const all=articles(),q=search.value.trim().toLocaleLowerCase();const filtered=all.filter(a=>(a.title+' '+a.content).toLocaleLowerCase().includes(q));document.getElementById('knowledge-count').textContent=`${filtered.length} 篇文章`;document.getElementById('knowledge-empty').hidden=filtered.length>0;grid.replaceChildren();
  for(const a of filtered){const card=document.createElement('article');card.className='knowledge-card';const source=sourceAnchor(a);if(source)card.append(source);const btn=document.createElement('button');btn.type='button';btn.className='knowledge-open';const glyph=document.createElement('span');glyph.className='knowledge-glyph';glyph.setAttribute('aria-hidden','true');let hash=0;for(const c of a.id)hash=(hash*31+c.charCodeAt(0))>>>0;glyph.style.setProperty('--glyph-hue',String(hash%360));const initial=document.createElement('span');initial.textContent=(a.title.match(/[\p{L}\p{N}]/u)||['✦'])[0].toLocaleUpperCase();const number=document.createElement('small');number.textContent=String(all.indexOf(a)+1).padStart(2,'0');glyph.append(initial,number);const text=document.createElement('span');text.className='knowledge-card-content';const small=document.createElement('small');small.textContent=(a.domain==='ai-safety'?'AI 安全':'AI 学习')+' · '+a.date;const title=document.createElement('h2');title.textContent=a.title;const preview=document.createElement('p');preview.textContent=a.content.replace(/^#.*$/gm,'').replace(/[#*`\[\]]/g,'').replace(/\s+/g,' ').trim().slice(0,110);text.append(small,title,preview);btn.append(glyph,text);btn.addEventListener('click',()=>showDetail(a.id));card.append(btn);grid.append(card)}
 }
 function make(tag,value){const el=document.createElement(tag);el.textContent=value;return el}
 function showDetail(id){const a=articles().find(x=>x.id===id);if(!a){showList();return}activeArticle=id;list.hidden=true;detail.hidden=false;detail.replaceChildren();const head=document.createElement('div');head.className='detail-header';const back=make('button','← 返回文章列表');back.type='button';back.className='project-back';back.onclick=showList;const kicker=make('p',a.domain==='ai-safety'?'AI 安全 / 阅读笔记':'AI 学习 / 阅读笔记');kicker.className='project-kicker';head.append(back,kicker,make('h1',a.title),make('p',a.date));const body=document.createElement('article');body.className='knowledge-body';body.innerHTML=window.renderArticleMarkup(a.content,a.title);body.querySelectorAll('a[href]').forEach(link=>{link.target='_blank';link.rel='noopener noreferrer'});const source=sourceAnchor(a);detail.append(head);if(source){source.classList.add('knowledge-source-detail');detail.append(source)}detail.append(body);window.scrollTo(0,0)}
 function showList(){activeArticle=null;list.hidden=false;detail.hidden=true;renderList();window.scrollTo(0,0)}
 window.openKnowledge=()=>{returnTo=document.querySelector('.world.active')?.id||'archive';document.querySelectorAll('.world').forEach(w=>w.style.display='none');space.classList.add('visible');document.body.classList.add('in-projects');search.value='';showList()};
 document.getElementById('knowledge-back-world').addEventListener('click',()=>{space.classList.remove('visible');document.body.classList.remove('in-projects');document.getElementById(returnTo).style.display='';window.refreshCastleScene?.();window.scrollTo(0,0)});search.addEventListener('input',renderList);
 // Local file previews refresh the same public-only data used by the published site.
 if(location.protocol==='file:')setInterval(()=>{const tag=document.createElement('script');tag.src='articles-public.js?updated='+Date.now();tag.onload=()=>{tag.remove();if(window.PUBLIC_ARTICLES?.generatedAt!==lastVersion){lastVersion=window.PUBLIC_ARTICLES?.generatedAt||'';if(space.classList.contains('visible'))activeArticle?showDetail(activeArticle):renderList()}};tag.onerror=()=>tag.remove();document.head.append(tag)},15000);
 const scene=document.getElementById('archive-interior');
 function anchorHotspots(){
  const width=scene.clientWidth,height=scene.clientHeight;if(!width||!height)return;
  const positionX=window.innerWidth<=720?.58:.5;
  for(const [selector,pointX,pointY] of [['.one',.18,.47],['.two',.70,.73],['.three',.48,.86],['.four',.64,.45]]){
   const el=scene.querySelector(selector),dot=el.querySelector('.hotspot-dot');el.style.right='auto';el.style.transform='translateY(-50%)';
   const place=window.InteriorPosition.placeHotspot({width,height,imageWidth:1670,imageHeight:942,positionX,pointX,pointY,buttonWidth:el.offsetWidth,dotOffset:dot.offsetLeft+dot.offsetWidth/2});
   el.style.left=place.left+'px';el.style.top=place.top+'px';
  }
 }
 window.addEventListener('resize',anchorHotspots);new MutationObserver(anchorHotspots).observe(document.getElementById('archive'),{attributes:true,attributeFilter:['class']});
 document.getElementById('language-toggle').addEventListener('click',()=>requestAnimationFrame(anchorHotspots));
 if(typeof ResizeObserver!=='undefined')new ResizeObserver(anchorHotspots).observe(scene);
 anchorHotspots();
})();
