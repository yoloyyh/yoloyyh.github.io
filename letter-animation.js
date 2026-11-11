(() => {
  let frame=0, content=null, quill=null;
  const music=document.getElementById('castle-audio');
  const scratch=new Audio('assets/pen-on-paper.mp3');scratch.loop=true;scratch.volume=.35;scratch.playbackRate=.9;
  function updateSound(){if(content&&!music.paused){scratch.play().catch(()=>{})}else{scratch.pause();scratch.currentTime=0}}
  music.addEventListener('play',updateSound);music.addEventListener('pause',updateSound);
  window.stopLetterWriting=()=>{cancelAnimationFrame(frame);frame=0;if(content)content.style.clipPath='';if(quill)quill.remove();content=null;quill=null;updateSound()};
  window.startLetterWriting=modal=>{
    window.stopLetterWriting();
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    content=modal.querySelector('p');
    frame=requestAnimationFrame(()=>{
      const node=content?.firstChild;
      if(!node||node.nodeType!==Node.TEXT_NODE||!node.length){window.stopLetterWriting();return}
      quill=document.createElement('span');quill.className='letter-quill';quill.setAttribute('aria-hidden','true');modal.append(quill);updateSound();
      const duration=Math.min(5500,Math.max(2000,node.length*35));let started;
      function draw(now){
        if(!content||!node.isConnected||!modal.classList.contains('open')){window.stopLetterWriting();return}
        if(started===undefined)started=now;
        const count=Math.min(node.length,Math.max(1,Math.ceil((now-started)/duration*node.length)));
        const range=document.createRange();range.setStart(node,count-1);range.setEnd(node,count);const rect=range.getBoundingClientRect();const box=content.getBoundingClientRect();
        const x=Math.max(0,Math.min(box.width,rect.right-box.left));const top=Math.max(0,rect.top-box.top);const bottom=Math.min(box.height,rect.bottom-box.top+3);
        content.style.clipPath=`polygon(0 0,100% 0,100% ${top}px,${x}px ${top}px,${x}px ${bottom}px,0 ${bottom}px)`;
        quill.style.left=`${rect.right}px`;quill.style.top=`${rect.bottom}px`;
        if(count<node.length)frame=requestAnimationFrame(draw);else window.stopLetterWriting();
      }
      frame=requestAnimationFrame(draw);
    });
  };
})();
