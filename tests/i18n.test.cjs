const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');
function fixture(){
  const listeners={};const button={textContent:'中 / EN',attrs:{'aria-label':'Switch language'},setAttribute(k,v){this.attrs[k]=v},addEventListener(k,f){listeners[k]=f}};
  const frame={style:{setProperty(){}},addEventListener(){}};
  const texts=['你好，我是','点亮蜡烛','♫ 音乐 · 开启','9 个公开仓库 · 参与项目已核验本人提交'].map(value=>({nodeValue:value,parentElement:{tagName:'DIV'}}));
  const input={attrs:{placeholder:'搜索项目、标签或关键词','aria-label':'搜索项目'},dataset:{},hasAttribute(k){return k in this.attrs},getAttribute(k){return this.attrs[k]},setAttribute(k,v){this.attrs[k]=v}};
  const document={body:{},documentElement:{},title:'',getElementById:()=>button,createTreeWalker(){let i=0;return {nextNode(){if(i<texts.length){this.currentNode=texts[i++];return true}return false}}},querySelectorAll:()=>[input],querySelector:()=>frame};
  let callback;class MutationObserver{constructor(cb){callback=cb}observe(){}}
  const context={document,NodeFilter:{SHOW_TEXT:4},localStorage:{getItem(){return null},setItem(){}},MutationObserver,matchMedia:()=>({matches:false}),queueMicrotask:fn=>fn()};
  vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'..','i18n.js'),'utf8'),context);return {button,listeners,texts,input,document,notify:()=>callback()};
}
test('switches and restores interface text and search labels',()=>{const f=fixture();f.listeners.click();assert.equal(f.document.documentElement.lang,'en');assert.equal(f.texts[0].nodeValue,'Hello, I’m');assert.equal(f.texts[1].nodeValue,'Light the candle');assert.equal(f.texts[3].nodeValue,'9 public repositories · My authored commits verified in contributions');assert.equal(f.input.attrs.placeholder,'Search projects, tags or keywords');f.listeners.click();assert.equal(f.texts[0].nodeValue,'你好，我是');assert.equal(f.input.attrs.placeholder,'搜索项目、标签或关键词')});
test('translates interface text inserted after language switch',()=>{const f=fixture();f.listeners.click();const node={nodeValue:'熄灭蜡烛',parentElement:{tagName:'SPAN'}};f.texts.push(node);f.notify();assert.equal(node.nodeValue,'Extinguish the candle')});
