(() => {
  const escape = value => value.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  window.marked.use({extensions:[{
    name:'obsidianLink', level:'inline',
    start(src){return src.indexOf('[[')},
    tokenizer(src){const m=src.match(/^\[\[([^\]\n]+)\]\]/);if(m){const parts=m[1].split('|');return {type:'obsidianLink',raw:m[0],text:parts[parts.length-1]}}},
    renderer(token){return `<span class="wiki-reference">${escape(token.text)}</span>`}
  }]});
  window.renderArticleMarkup = (source, title) => {
    let text=String(source || '');
    const first=text.match(/^#\s+([^\r\n]+)(?:\r?\n|$)/);
    if(first && first[1].trim()===title)text=text.slice(first[0].length);
    return window.DOMPurify.sanitize(window.marked.parse(text,{gfm:true}),{FORBID_TAGS:['style','iframe','form'],FORBID_ATTR:['style']});
  };
})();
