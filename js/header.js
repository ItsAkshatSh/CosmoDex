
(function () {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const ROOT = /^(solar\.html|lesson\.html)$/.test(path) ? 'learn.html' : path;

  const links = [
    { href: 'learn.html',     label: 'Learn' },
    { href: 'paths.html',     label: 'Paths' },
    { href: 'community.html', label: 'Community' },
    { href: 'about.html',     label: 'About' },
  ];

  const header = document.getElementById('site-header');
  if (!header) return;

  header.innerHTML = `
    <div class="site-nav">
      <a class="brand" href="index.html" aria-label="CyberBites Home">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M3 14c.5-3.5 3.5-7.5 7-9l3 3c-1 3-5.5 7.5-8 8zm7.5-9.5c1.5-1 3.5-1.6 5.6-1.4c.2 2.1-.4 4.1-1.4 5.6l-4.2-4.2zM2 16l3.2.8l.8 3.2l2.4-2.4l-1.6-1.6L4.9 17L4 16.1L5.1 15l-1.6-1.6L2 16z"/>
        </svg>
        <span class="brand-text">CyberBites</span>
      </a>

      <nav class="nav-menu" role="navigation" aria-label="Primary">
        ${links.map(l => `
          <a class="nav-link ${ROOT === l.href ? 'active' : ''}" href="${l.href}">${l.label}</a>
        `).join('')}
      </nav>

      <div class="nav-right">
        <button id="profile-chip" class="profile-chip" aria-haspopup="dialog" aria-label="Open profile">
          <img id="profile-chip-img" src="" alt="">
        </button>
      </div>
    </div>
  `;

  const chipImg = document.getElementById('profile-chip-img');
  
  const stored = localStorage.getItem('cyberbites_avatar') || 'helmet_teal.png';
  const candidates = [
    `assets/avatars/${stored}`,   
    `Badges/${stored}`,           
    `assets/planets/planet_earth.png`
  ];
  (function setAvatar(i=0){
    if (i >= candidates.length) return;
    const test = new Image();
    test.onload  = () => chipImg.src = candidates[i];
    test.onerror = () => setAvatar(i+1);
    test.src = candidates[i];
  })();

  const chip = document.getElementById('profile-chip');
  chip.addEventListener('click', () => {
    if (window.CyberBitesProfile?.toggle) { window.CyberBitesProfile.toggle(); return; }
    if (window.toggleProfilePanel)      { window.toggleProfilePanel(); return; }
    window.dispatchEvent(new CustomEvent('cyberbites:toggle-profile')); 
    chip.classList.add('pulse'); setTimeout(()=>chip.classList.remove('pulse'), 400);
  });
})();
