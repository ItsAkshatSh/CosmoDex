(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let scrim = document.querySelector('.cdx-scrim');
  if (!scrim) {
    scrim = document.createElement('div');
    scrim.className = 'cdx-scrim';
    document.body.appendChild(scrim);
  }

  const target = document.querySelector('.container') || document.querySelector('main') || document.body;

  requestAnimationFrame(() => {
    scrim.classList.remove('on');
    target.classList.add('cdx-enter');
    requestAnimationFrame(() => target.classList.add('ready'));
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    const url = new URL(a.href, location.href);
    const sameOrigin = url.origin === location.origin;
    const isHash = (url.pathname === location.pathname && url.hash);
    const newTab = a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1;
    if (!sameOrigin || isHash || newTab) return;

    e.preventDefault();
    target.classList.remove('ready');  
    scrim.classList.add('on');  
    setTimeout(() => location.href = url.href, 210);
  });
})();