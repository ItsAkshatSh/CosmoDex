// CyberBites Profile Sidebar — Overview / Badges / Avatar
(function(){
  const KEY="cyberbites_profile";
  const ASSET="../Badges"; // images live in CyberBites/Badges/

  const PFP_FILES = [
    "helmet_arctic_blue.png","helmet_neon_cyan.png","helmet_aqua.png","helmet_teal.png","helmet_mint.png",
    "helmet_emerald.png","helmet_lime.png","helmet_gold.png","helmet_amber.png","helmet_sunset.png",
    "helmet_coral.png","helmet_rose.png","helmet_magenta.png","helmet_violet.png","helmet_indigo.png"
  ];
  const BADGE_FILES = {
    "ISS Spotter":"iss_spotter.png",
    "Rocket Scientist":"rocket_scientist.png",
    "Stargazer":"stargazer.png",
    "Orbit Master":"orbit_master.png",
    "Cosmic Explorer":"cosmic_explorer.png"
  };

  const defaults={
    profile:{ name:"Explorer", pfp:`${ASSET}/helmet_teal.png` },
    xp:0, level:1, streak_days:0,
    totals:{quests:0,q_all:0,q_ok:0,time_s:0},
    progress:{beginner:{done:0,total:5}, intermediate:{done:0,total:5}, advanced:{done:0,total:5}},
    badges:Object.entries(BADGE_FILES).map(([name,file],i)=>({name, img:`${ASSET}/${file}`, unlocked: i===0 }))
  };
  let state = load();

  const $ = s => document.querySelector(s);
  const h = (s, p={}) => { const el = document.createElement("div"); el.innerHTML = s.trim(); return Object.assign(el.firstElementChild, p); };
  const fmt = s => { const m = Math.floor(s/60), sec = s%60, h = Math.floor(m/60); return `${String(h).padStart(2,'0')}:${String(m%60).padStart(2,'0')}:${String(sec).padStart(2,'0')}`; };
  const need = l => l<=3?100:l<=6?150:200;
  function load(){ try{ return JSON.parse(localStorage.getItem(KEY)) || {...defaults}; }catch{ return {...defaults}; } }
  function save(){ localStorage.setItem(KEY, JSON.stringify(state)); }

  document.addEventListener("DOMContentLoaded", () => {
    placeChip();
    buildPanel();
    startTimer();
    renderOverview();
  });

  function placeChip(){
    const chip = h(`
      <button id="profile-open" class="profile-chip" aria-label="Profile">
        <img id="profile-chip-img" src="${state.profile.pfp}" alt="Open profile">
      </button>
    `);
    const nav = document.querySelector("nav");
    let actions = document.getElementById("nav-actions") || (nav && nav.querySelector(".actions,.nav-actions,.nav-right"));
    if(!actions && nav){
      actions = document.createElement("div");
      actions.id="nav-actions";
      actions.style.cssText="margin-left:auto;display:flex;align-items:center;gap:12px;";
      (nav.querySelector(".nav-inner,.container,.wrapper")||nav).appendChild(actions);
    }
    (actions || document.body).appendChild(chip);
    if(!actions){ chip.style.position="fixed"; chip.style.top="12px"; chip.style.right="12px"; chip.style.zIndex="2000"; }
    chip.addEventListener("click", toggle);
  }

  function buildPanel(){
    const overlay = h(`<div id="profile-overlay" role="presentation"></div>`);
    overlay.addEventListener("click", toggle);
    document.body.appendChild(overlay);

    const panel = h(`
      <aside id="profile-panel" role="dialog" aria-hidden="true">
        <div class="profile-header">
          <img id="profile-avatar" class="profile-avatar" src="${state.profile.pfp}" alt="Avatar (click to edit)">
          <div class="profile-meta">
            <h3 id="profile-name">${state.profile.name}</h3>
            <div class="xp-row">
              <div class="xp-bar"><span id="xp-fill" class="xp-fill"></span></div>
              <span id="xp-text" class="xp-text"></span>
            </div>
          </div>
        </div>

        <div id="profile-views" class="view" data-state="overview">
          <!-- OVERVIEW -->
          <div class="view-page overview">
            <div class="view-inner">
              <h4 class="section-title">Stats</h4>
              <section class="stats-grid">
                <div class="stat"><div class="k">XP</div><div id="s-xp" class="v">0</div></div>
                <div class="stat"><div class="k">Level</div><div id="s-lvl" class="v">1</div></div>
                <div class="stat"><div class="k">Quests</div><div id="s-quests" class="v">0</div></div>
                <div class="stat"><div class="k">Time</div><div id="s-time" class="v">00:00:00</div></div>
              </section>

              <section class="progress">
                <h4 class="section-title">Galaxy Progress</h4>
                <div class="prog-row"><span>Beginner</span><div class="bar"><span id="p-begin" class="fill"></span></div><span id="p-begin-txt">0/5</span></div>
                <div class="prog-row"><span>Intermediate</span><div class="bar"><span id="p-inter" class="fill"></span></div><span id="p-inter-txt">0/5</span></div>
                <div class="prog-row"><span>Advanced</span><div class="bar"><span id="p-adv" class="fill"></span></div><span id="p-adv-txt">0/5</span></div>
              </section>

              <section>
                <h4 class="section-title">
                  Badges
                  <span id="btn-badges" class="cta">See all →</span>
                </h4>
                <div id="badge-grid-4" class="badge-grid"></div>
              </section>
            </div>
          </div>

          <!-- BADGES -->
          <div class="view-page badges">
            <h4 class="section-title">
              All Badges
              <span id="btn-back-from-badges" class="cta">← Back</span>
            </h4>
            <div class="view-body">
              <div id="badge-grid-all" class="badge-grid-all"></div>
            </div>
          </div>

          <!-- AVATAR -->
          <div class="view-page avatar">
            <h4 class="section-title">
              Choose Avatar
              <span id="btn-back-from-avatar" class="cta">← Back</span>
            </h4>
            <div class="view-body">
              <div id="pfp-grid" class="pfp-grid"></div>
            </div>
          </div>
        </div>
      </aside>
    `);

    document.body.appendChild(panel);

    $("#btn-badges")?.addEventListener("click", ()=> switchView("badges"));
    $("#btn-back-from-badges")?.addEventListener("click", ()=> switchView("overview"));

    $("#profile-avatar")?.addEventListener("click", ()=> switchView("avatar"));
    $("#btn-back-from-avatar")?.addEventListener("click", ()=> switchView("overview"));

    // avatar choices
    const pg = $("#pfp-grid");
    PFP_FILES.forEach(file => {
      const src = `${ASSET}/${file}`;
      const item = h(`<div class="pfp-item"><img src="${src}" alt=""></div>`);
      item.addEventListener("click", () => {
        state.profile.pfp = src; save();
        $("#profile-avatar").src = src;
        const chipImg = $("#profile-chip-img");
        if (chipImg) chipImg.src = src;
        switchView("overview");
      });
      pg.appendChild(item);
    });

    document.addEventListener("keydown", e => { if(e.key==="Escape" && panel.classList.contains("open")) toggle(); });
  }

  function switchView(name){ $("#profile-views").setAttribute("data-state", name); }

  function toggle(){
    const p=$("#profile-panel"), o=$("#profile-overlay");
    const open=p.classList.contains("open");
    p.classList.toggle("open", !open);
    o.classList.toggle("open", !open);
    p.setAttribute("aria-hidden", open ? "true" : "false");
    if(!open){
      renderOverview();
      startUiTicker();
    } else {
      stopUiTicker();
    }
  }

  function renderOverview(){
    const needXp = need(state.level);
    $("#xp-fill").style.width = Math.min(100,(state.xp/needXp)*100)+"%";
    $("#xp-text").textContent = `Lv ${state.level} • ${state.xp}/${needXp}`;
    $("#s-xp").textContent = state.xp;
    $("#s-lvl").textContent = state.level;
    $("#s-quests").textContent = state.totals.quests;
    $("#s-time").textContent = fmt(state.totals.time_s);
    bar("beginner","#p-begin","#p-begin-txt");
    bar("intermediate","#p-inter","#p-inter-txt");
    bar("advanced","#p-adv","#p-adv-txt");

    // preview 4
    const g4 = $("#badge-grid-4"); g4.innerHTML="";
    state.badges.slice(0,4).forEach(b=>{
      const el = h(`<div class="badge-item" title="${b.name}"><img src="${b.img}" alt="${b.name}"></div>`);
      if(!b.unlocked) el.style.filter="grayscale(0.9) opacity(0.6)";
      g4.appendChild(el);
    });

    // all badges
    const all = $("#badge-grid-all"); all.innerHTML="";
    state.badges.forEach(b=>{
      const el = h(`<div class="badge-item" title="${b.name}"><img src="${b.img}" alt="${b.name}"></div>`);
      if(!b.unlocked) el.style.filter="grayscale(0.9) opacity(0.6)";
      all.appendChild(el);
    });
  }

  function bar(key, fillSel, txtSel){
    const p = state.progress[key] || {done:0,total:5};
    const pct = Math.round(100*(p.done/Math.max(1,p.total)));
    $(fillSel).style.width = pct + "%";
    $(txtSel).textContent = `${p.done}/${p.total}`;
  }

  // visible-tab timer
  let tick=null;
  let uiTick = null;
  function startTimer(){
    if(tick) return;
    const run=()=>{ if(!tick) tick=setInterval(()=>{ state.totals.time_s++; if(state.totals.time_s%10===0) save(); },1000); };
    const stop=()=>{ if(tick){ clearInterval(tick); tick=null; } };
    document.addEventListener("visibilitychange",()=>document.hidden?stop():run());
    if(!document.hidden) run();
  }
  function startUiTicker(){
    if (uiTick) return;
    uiTick = setInterval(()=>{
      const t = document.querySelector("#s-time");
      if (t) t.textContent = fmt(state.totals.time_s);
    }, 1000);
  }
  function stopUiTicker(){
    if (uiTick){ clearInterval(uiTick); uiTick = null; }
  }

  // tiny public API
  window.CyberBitesProfile = {
    addXP(n){ state.xp+= (n|0); if(state.xp>=need(state.level)){ state.xp-=need(state.level); state.level++; } save(); renderOverview(); },
    completeQuest(){ state.totals.quests++; save(); renderOverview(); },
    unlockBadge(name){ const b=state.badges.find(x=>x.name===name); if(b){ b.unlocked=true; save(); renderOverview(); } },
    setProgress(track,done,total){ if(state.progress[track]){ state.progress[track].done=done; state.progress[track].total=total; save(); renderOverview(); } },
    getProgress(track){ return state.progress[track] || {done: 0, total: 5}; },
    state(){ return state; }
  };
})();


