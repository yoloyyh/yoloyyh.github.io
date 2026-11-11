(() => {
  let travelling = false;
  window.enterArchive = () => {
    if (travelling) return;
    const archive = document.getElementById('archive');
    const rider = document.getElementById('journey-rider');
    const finish = () => {
      if (!travelling) return;
      travelling = false;
      clearTimeout(timeout);
      clearTimeout(departure);
      rider.removeEventListener('animationend', onEnd);
      rider.classList.remove('is-flying');
      document.body.classList.remove('journey-active');
      archive.classList.add('interior-open');
      window.scrollTo(0, 0);
      document.getElementById('back-castle').focus({preventScroll:true});
    };
    const onEnd = event => { if (event.target === rider) finish(); };
    travelling = true;
    let timeout, departure;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(); return; }
    window.scrollTo(0, 0);
    const door = archive.querySelector('.castle-door').getBoundingClientRect();
    rider.style.setProperty('--door-x', `${door.left + door.width / 2}px`);
    rider.style.setProperty('--door-y', `${door.top + door.height / 2}px`);
    rider.addEventListener('animationend', onEnd);
    document.body.classList.add('journey-active');
    departure = setTimeout(() => { if (travelling) rider.classList.add('is-flying'); }, 1100);
    timeout = setTimeout(finish, 5000);
  };
})();
