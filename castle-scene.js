(() => {
  const sky = document.querySelector('.archive .castle-sky');
  const world = sky.querySelector('.castle-world');
  const portalWorld = document.querySelector('.castle-portal-world');
  function alignWorld() {
    const width = sky.offsetWidth;
    const height = sky.offsetHeight;
    const scale = Math.max(width / 1670, height / 941);
    // The castle is the last background layer; earlier layers are gradients.
    const positions = getComputedStyle(sky).backgroundPositionX.split(',');
    const positionX = parseFloat(positions[positions.length - 1]) / 100;
    for (const layer of [world, portalWorld]) {
    layer.style.setProperty('--world-x', `${(width - 1670 * scale) * (Number.isFinite(positionX) ? positionX : .5)}px`);
    layer.style.setProperty('--world-y', `${(height - 941 * scale) * .5}px`);
    layer.style.setProperty('--world-scale', scale);
    }
  }
  alignWorld();
  window.addEventListener('resize', alignWorld);
})();
