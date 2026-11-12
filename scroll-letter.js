(() => {
  let timer=0, active=null;
  function cancel(){clearTimeout(timer);timer=0;window.stopLetterWriting?.();if(active)active.classList.remove('letter-opening','letter-closing');active=null}
  function open(modal){cancel();active=modal;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;modal.classList.add('letter-opening');timer=setTimeout(()=>{if(active!==modal)return;const content=modal.querySelector('p');if(content)content.style.clipPath='inset(0 100% 0 0)';modal.classList.remove('letter-opening');window.startLetterWriting?.(modal)},1300)}
  function close(modal,done){if(modal.classList.contains('letter-closing'))return;cancel();if(matchMedia('(prefers-reduced-motion: reduce)').matches){done();return}active=modal;modal.classList.add('letter-closing');timer=setTimeout(()=>{modal.classList.remove('letter-closing');active=null;done()},1000)}
  window.letterScroll={open,close,cancel};
})();
