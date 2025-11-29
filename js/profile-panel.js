(function () {
  if (!window.CosmodexProfile) window.CosmodexProfile = {};
  const api = window.CosmodexProfile;

  const existing = document.getElementById('profile-panel');
  if (existing) {
    api.toggle = () => existing.classList.toggle('open');
    window.addEventListener('cosmodex:toggle-profile', api.toggle);
    return;
  }

  const overlay = document.createElement('div');
  overlay.id = 'profile-overlay';
  overlay.className = 'cdx-prof-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const panel = document.createElement('aside');
  panel.id = 'profile-panel';
  panel.className = 'cdx-prof-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Profile');

  const stored = localStorage.getItem('cosmodex_avatar') || 'helmet_teal.png';
  const candidates = [
    `assets/avatars/${stored}`,
    `Badges/${stored}`,
    `assets/planets/planet_earth.png`,
  ];
  const ava = candidates.find(Boolean);

  panel.innerHTML = `
    <header class="cdx-prof-header">
      <img class="cdx-ava" src="${ava}" alt="">
      <div class="cdx-meta">
        <h3 class="cdx-title">Explorer</h3>
        <div class="cdx-bar"><span class="cdx-fill" style="width: 40%"></span></div>
        <div class="cdx-sub">Lv 1 • 0/100</div>
      </div>
      <button class="cdx-close" aria-label="Close">✕</button>
    </header>

    <section class="cdx-prof-grid">
      <div class="cdx-card"><div class="cdx-k">XP</div><div class="cdx-v" id="cdx-xp">0</div></div>
      <div class="cdx-card"><div class="cdx-k">Level</div><div class="cdx-v" id="cdx-lv">1</div></div>
      <div class="cdx-card"><div class="cdx-k">Quests</div><div class="cdx-v" id="cdx-q">0</div></div>
      <div class="cdx-card"><div class="cdx-k">Time</div><div class="cdx-v" id="cdx-t">00:00:00</div></div>
    </section>

    <section class="cdx-prof-sec">
      <h4>Badges</h4>
      <div class="cdx-badges">
        <img src="Badges/iss_spotter.png" alt="" onerror="this.style.display='none'">
        <img src="Badges/rocket_scientist.png" alt="" onerror="this.style.display='none'">
        <img src="Badges/stargazer.png" alt="" onerror="this.style.display='none'">
        <img src="Badges/orbit_master.png" alt="" onerror="this.style.display='none'">
      </div>
    </section>
  `;

  document.body.appendChild(overlay);
  document.body.appendChild(panel);

  function open() {
    overlay.classList.add('on');
    panel.classList.add('open');
  }
  function close() {
    panel.classList.remove('open');
    overlay.classList.remove('on');
  }
  api.toggle = () => panel.classList.contains('open') ? close() : open();

  overlay.addEventListener('click', close);
  panel.querySelector('.cdx-close').addEventListener('click', close);
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });

  window.addEventListener('cosmodex:toggle-profile', api.toggle);
})();
