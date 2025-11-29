(function(){
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let scrim = document.querySelector('.cdx-scrim');
  if (!scrim) {
    scrim = document.createElement('div');
    scrim.className = 'cdx-scrim';
    document.body.appendChild(scrim);
  }

  const target = document.querySelector('.container') || document.querySelector('main');

  function enter(){
    root.classList.remove('cdx-preload');
    if (!reduce) root.classList.add('cdx-ready');
    scrim.classList.remove('on');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(enter), { once:true });
  } else {
    requestAnimationFrame(enter);
  }

  if (reduce) return;

  
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;
    if (a.hasAttribute('download') || a.target === '_blank' ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;

    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return;                        
    if (url.pathname === location.pathname && url.hash) return;        

    e.preventDefault();

    if (target) target.classList.add('cdx-exit');
    scrim.classList.add('on');

    setTimeout(() => { location.href = url.href; }, 210);
  });

  window.addEventListener('pageshow', (e) => {
    if (target) target.classList.remove('cdx-exit');
    scrim.classList.remove('on');
    if (e.persisted) root.classList.add('cdx-ready');
  });
})();
