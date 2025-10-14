// Public/js/pagefx.js
// No-flash navigation: fade a scrim OVER the page instead of fading the page to black.
(function(){
  const root = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Create one scrim once
  let scrim = document.querySelector('.cdx-scrim');
  if (!scrim) {
    scrim = document.createElement('div');
    scrim.className = 'cdx-scrim';
    document.body.appendChild(scrim);
  }

  // Optional: pick a content wrapper we can micro-scale on exit
  const target = document.querySelector('.container') || document.querySelector('main');

  // Enter: remove preload, ensure scrim is off
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

  // Intercept only safe nav links (same-origin, no _blank/download/hash)
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a) return;

    const href = a.getAttribute('href');
    if (!href || href === '#' || href.startsWith('javascript:')) return;
    if (a.hasAttribute('download') || a.target === '_blank' ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;

    const url = new URL(href, location.href);
    if (url.origin !== location.origin) return;                        // external
    if (url.pathname === location.pathname && url.hash) return;        // in-page anchor

    e.preventDefault();

    // Exit: darken scrim over the current frame (no black flash)
    if (target) target.classList.add('cdx-exit');
    scrim.classList.add('on');

    setTimeout(() => { location.href = url.href; }, 210);
  });

  // If restored from BFCache, reset states
  window.addEventListener('pageshow', (e) => {
    if (target) target.classList.remove('cdx-exit');
    scrim.classList.remove('on');
    if (e.persisted) root.classList.add('cdx-ready');
  });
})();
