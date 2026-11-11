(() => {
  const button=document.getElementById('candle-control');
  const light=new Audio('assets/candle-light.wav');
  const extinguish=new Audio('assets/candle-extinguish.wav');
  light.volume=.32;extinguish.volume=.32;
  button.addEventListener('click',()=>{
    const sound=button.getAttribute('aria-pressed')==='true'?light:extinguish;
    sound.currentTime=0;
    sound.play().catch(()=>{});
  });
})();
