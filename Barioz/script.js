/* ═══════════════════════════════════════════════════════════════
   Espace Nordique du Barioz — script.js v3.1
   Toutes fonctionnalités :
   ✅ Navigation + hash routing + back/forward
   ✅ Météo Open-Meteo (neige 24h, isotherme 0°C, qualité neige)
   ✅ Google Sheets via Apps Script + fallbacks CSV robustes
   ✅ Statut foyer en temps réel (OUVERT / FERMÉ dynamique)
   ✅ État de la route depuis le Google Sheet
   ✅ Calculateur de tarifs interactif
   ✅ Webcam auto-refresh 60s
   ✅ Accessibilité (aria, alt, roles)
   ✅ Loader + gestion erreurs gracieuse
   ✅ Auto-refresh données toutes les 15 min
═══════════════════════════════════════════════════════════════ */

// ════════════════════════════════════════════════════
// CONFIGURATION CENTRALE
// ════════════════════════════════════════════════════
const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyzpH3msOatusrPekH-1doTWO1xoUGrMWJgo2KTXVIi4vGuFlIF1TMV40uT8EFiWKSF/exec',
  SHEET_ID:        '1DPKFwYiECT1NEeNHAdjZnwYRcfeaWX4FdM6AX2x4U_E',
  LAT:             45.32476187,
  LON:             6.04727947,
  ELEVATION:       1400,
  WEBCAM_URL:      'https://cretdupoulet.epok.network/cret_du_poulet.jpg',
  FOYER_OPEN:      9,
  FOYER_CLOSE:     17,
  REFRESH_MS:      15 * 60 * 1000,  // 15 min
};

// ════════════════════════════════════════════════════
// CODES WMO MÉTÉO
// ════════════════════════════════════════════════════
const WMO = {
  labels: { 0:'Dégagé',1:'Peu nuageux',2:'Nuageux',3:'Couvert',45:'Brouillard',48:'Brouillard givrant',51:'Bruine légère',53:'Bruine',55:'Bruine forte',61:'Pluie légère',63:'Pluie',65:'Forte pluie',71:'Neige légère',73:'Neige',75:'Forte neige',77:'Grésil',80:'Averses légères',81:'Averses',82:'Averses fortes',85:'Neige en averses',86:'Forte neige en averses',95:'Orage',96:'Orage + grêle',99:'Orage violent' },
  icons:  { 0:'☀️',1:'🌤',2:'⛅',3:'☁️',45:'🌫',48:'🌫',51:'🌦',53:'🌦',55:'🌧',61:'🌧',63:'🌧',65:'🌧',71:'🌨',73:'❄️',75:'❄️',77:'🌨',80:'🌦',81:'🌧',82:'⛈',85:'🌨',86:'❄️',95:'⛈',96:'⛈',99:'⛈' }
};
const DAYS = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'];

// ════════════════════════════════════════════════════
// DONNÉES DE DÉMO (fallback si tout échoue)
// ════════════════════════════════════════════════════
const DEMO = {
  statut:'OUVERT', message:'', dernierDamage:'N/A', heureDamage:'',
  etatRoute:'Renseignez-vous au foyer avant de partir',
  foyerOuvertA:9, foyerFermeA:17,
  zones:[
    {nom:'Foyer Bas (1400m)',     hauteur:'45', qualite:'Bonne',      tendance:'Stable'},
    {nom:'Foyer Haut (1600m)',    hauteur:'65', qualite:'Très bonne', tendance:'Hausse'},
    {nom:'Crêt du Poulet (1726m)',hauteur:'85', qualite:'Excellente', tendance:'Stable'},
  ],
  pistes:[
    {nom:'Crève-Cœur',    niveau:'Vert',  type:'Classique', statut:'OUVERTE', km:'2.5', notes:''},
    {nom:'Les Môilles',   niveau:'Vert',  type:'Skating',   statut:'OUVERTE', km:'4.5', notes:''},
    {nom:'Piste du refuge',niveau:'Bleu', type:'Classique', statut:'OUVERTE', km:'8',   notes:'Accès refuge'},
    {nom:'Les Ramiettes', niveau:'Bleu',  type:'Skating',   statut:'OUVERTE', km:'6',   notes:''},
    {nom:'Belle Aiguette',niveau:'Bleu',  type:'Classique', statut:'OUVERTE', km:'5.5', notes:''},
    {nom:'La Grande Teppe',niveau:'Rouge',type:'Classique', statut:'OUVERTE', km:'7',   notes:''},
    {nom:'Le Levant',     niveau:'Rouge', type:'Skating',   statut:'OUVERTE', km:'9',   notes:''},
    {nom:'Les Crêtes',    niveau:'Noir',  type:'Skating',   statut:'FERMEE',  km:'6',   notes:'Enneigement insuffisant'},
  ]
};

// ════════════════════════════════════════════════════
// NAVIGATION + HASH ROUTING
// ════════════════════════════════════════════════════
const PAGES = ['home','foyer','pistes','refuge','evenements','scolaires','histoire','enneigement','acces'];

function showPage(id) {
  if (!PAGES.includes(id)) id = 'home';

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-' + id);
  if (page) {
    page.classList.add('active');
    window.scrollTo({top:0, behavior:'smooth'});
    setTimeout(initReveal, 100);
  }

  // Fermer menu mobile
  const nav = document.getElementById('navLinks');
  if (nav) nav.classList.remove('open');

  // Hash routing pour liens partageables
  if (history.pushState) history.pushState(null, '', '#' + id);

  // Déclencher les chargements spécifiques
  if (id === 'enneigement') initEnneigement();
}

function toggleNav() {
  document.getElementById('navLinks')?.classList.toggle('open');
}

// Fermer menu si clic hors nav
document.addEventListener('click', e => {
  const nav = document.getElementById('mainNav');
  if (nav && !nav.contains(e.target)) {
    document.getElementById('navLinks')?.classList.remove('open');
  }
});

// Scroll : ombre nav + bouton retour haut
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.style.boxShadow = window.scrollY > 50 ? '0 4px 40px rgba(11,27,42,.35)' : 'none';
  document.getElementById('backToTop')?.classList.toggle('visible', window.scrollY > 400);
});

// Boutons back/forward navigateur
window.addEventListener('popstate', () => {
  const hash = location.hash.replace('#','');
  if (PAGES.includes(hash)) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const p = document.getElementById('page-' + hash);
    if (p) { p.classList.add('active'); window.scrollTo({top:0}); setTimeout(initReveal, 100); }
    if (hash === 'enneigement') initEnneigement();
  }
});

// ════════════════════════════════════════════════════
// HELPER : fetch avec timeout
// ════════════════════════════════════════════════════
async function fetchTimeout(url, opts={}, ms=7000) {
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), ms);
  try {
    const r = await fetch(url, {...opts, signal: ctrl.signal});
    clearTimeout(id);
    return r;
  } catch(e) { clearTimeout(id); throw e; }
}

// ════════════════════════════════════════════════════
// STATUT FOYER EN TEMPS RÉEL
// ════════════════════════════════════════════════════
function updateFoyerStatus(data) {
  const ouvertA    = data?.foyerOuvertA ?? CONFIG.FOYER_OPEN;
  const fermeA     = data?.foyerFermeA  ?? CONFIG.FOYER_CLOSE;
  const msgSpecial = data?.foyerMessage ?? '';

  const now  = new Date();
  const h    = now.getHours();
  const jour = now.getDay(); // 0=dim, 1=lun … 6=sam

  // ── Statut OUVERT/FERMÉ depuis le Sheet ────────────────────
  // On cherche la ligne "Foyer d'accueil" dans la section ACTIVITÉS & SERVICES.
  // Col B = OUVERT ou FERME  (indique si le foyer est ouvert AUJOURD'HUI)
  // Col C = horaires du jour (ex: "9h00 - 17h00")
  // Si la ligne est absente → fallback sur weekend/heure locale.
  let isOuvertAujourdhui = null;   // null = on ne sait pas (pas de données sheet)
  let horairesSheet = null;

  if (data?.services?.length) {
    const foyerRow = data.services.find(s =>
      s.nom && (s.nom.toLowerCase().includes('foyer') || s.nom.toLowerCase().includes('accueil'))
    );
    if (foyerRow) {
      isOuvertAujourdhui = (foyerRow.statut || '').toUpperCase() === 'OUVERT';
      if (foyerRow.horaires) horairesSheet = foyerRow.horaires;
    }
  }

  // Fallback si pas de données sheet
  if (isOuvertAujourdhui === null) {
    isOuvertAujourdhui = [0, 6].includes(jour);  // weekend par défaut
  }

  const isOpen   = isOuvertAujourdhui && h >= ouvertA && h < fermeA;
  const horaires = horairesSheet || `${ouvertA}h – ${fermeA}h`;

  // ── Message "prochaine ouverture" ──────────────────────────
  // On regarde si demain le foyer est ouvert en cherchant dans les services
  // une info ou en se basant sur le sheet.
  let nextMsg;
  if (isOpen) {
    nextMsg = `Ferme à ${fermeA}h`;
  } else if (isOuvertAujourdhui && h < ouvertA) {
    nextMsg = `Ouvre à ${ouvertA}h aujourd'hui`;
  } else {
    // Chercher si demain est ouvert dans les services (si le sheet a cette info)
    // Sinon : fallback "prochaine ouverture" basé sur le weekend
    const demainJour = (jour + 1) % 7;
    const isWeekendDemain = [0, 6].includes(demainJour);

    if (data?.services?.length) {
      // Si le sheet dit OUVERT pour foyer aujourd'hui mais heure dépassée → rouvre demain
      // Si le sheet dit FERME aujourd'hui → on ne peut pas savoir pour demain sans données
      // On affiche un message neutre et invite à appeler
      nextMsg = isWeekendDemain
        ? `Ouvre demain à ${ouvertA}h`
        : `Prochain opening : nous contacter — ☎ 04 76 71 06 47`;
    } else {
      // Sans sheet : prochaine ouverture = prochain samedi
      const joursAvantSam = jour === 6 ? 7 : (6 - jour);
      nextMsg = joursAvantSam === 1 ? `Ouvre demain à ${ouvertA}h` : `Ouvre samedi à ${ouvertA}h`;
    }
  }

  // --- Bannière page Foyer ---
  const banner = document.getElementById('foyerLiveBanner');
  if (banner) banner.className = 'foyer-live-status ' + (isOpen ? 'foyer-open' : 'foyer-closed');

  const dot = document.getElementById('foyerLiveDot');
  if (dot) dot.className = 'fls-dot ' + (isOpen ? 'open' : 'closed');

  const label = document.getElementById('foyerLiveLabel');
  if (label) label.textContent = isOpen ? '✅ Foyer OUVERT' : '❌ Foyer FERMÉ';

  const sub = document.getElementById('foyerLiveSub');
  if (sub) sub.textContent = horaires + ' · Weekends & Vacances scolaires';

  const right = document.getElementById('foyerLiveRight');
  if (right) right.textContent = nextMsg;

  // --- Carte horaires dans info-card-row ---
  const card = document.getElementById('foyerHorairesCard');
  if (card) card.textContent = horaires;

  // --- Quick info bar sur l'accueil ---
  const qi = document.getElementById('foyerStatusQI');
  if (qi) {
    qi.innerHTML = isOpen
      ? `<span style="color:#28a745;font-weight:700">● OUVERT</span> · Ferme à ${fermeA}h`
      : `<span style="color:#dc3545;font-weight:700">● FERMÉ</span> · ${nextMsg}`;
  }

  // --- Message spécial foyer (optionnel, depuis sheet) ---
  if (msgSpecial) {
    const msgEl = document.getElementById('foyerLiveRight');
    if (msgEl) msgEl.textContent = msgSpecial;
  }
}

// ════════════════════════════════════════════════════
// ÉTAT DE LA ROUTE
// ════════════════════════════════════════════════════
function updateRouteStatus(texte) {
  if (!texte) texte = 'Vérifiez les conditions avant de partir';

  const t = texte.toLowerCase();
  let classe = 'route-ok',  icone = '✅';
  if (t.includes('fermé') || t.includes('bloqué') || t.includes('interdit'))
    { classe = 'route-danger'; icone = '🚫'; }
  else if (t.includes('chaîne') || t.includes('pneu neige') || t.includes('attention') || t.includes('vigilance'))
    { classe = 'route-warn'; icone = '⚠️'; }

  // Toutes les cartes route dans le site
  ['routeStatusCard','routeStatusCardSnow'].forEach(id => {
    const card = document.getElementById(id);
    if (!card) return;
    card.className = 'route-status-card ' + classe;
    const iconEl = card.querySelector('.route-status-icon');
    const txtEl  = card.querySelector('.route-status-text');
    if (iconEl) iconEl.textContent = icone;
    if (txtEl)  txtEl.textContent  = texte;
  });

  // Quick info bar
  const rqi = document.getElementById('routeStatusQI');
  if (rqi) rqi.textContent = texte;
  const riqi = document.getElementById('routeIconQI');
  if (riqi) riqi.textContent = icone;

  // Icône dans la page enneigement
  const snowIcon = document.getElementById('routeStatusIconSnow');
  if (snowIcon) snowIcon.textContent = icone;
}

// ════════════════════════════════════════════════════
// MÉTÉO OPEN-METEO (enrichie)
// ════════════════════════════════════════════════════
async function loadMeteo() {
  // Afficher skeleton loader
  const loaderEl = document.getElementById('meteoLoader');
  if (loaderEl) {
    loaderEl.style.display = 'grid';
    loaderEl.innerHTML = `
      <div class="meteo-card meteo-skeleton"><div class="meteo-icon">⏳</div><div class="meteo-label">Chargement météo…</div></div>
      <div class="meteo-card meteo-skeleton" style="opacity:.6"></div>
      <div class="meteo-card meteo-skeleton" style="opacity:.4"></div>
      <div class="meteo-card meteo-skeleton" style="opacity:.2"></div>`;
  }

  try {
    const url = [
      `https://api.open-meteo.com/v1/forecast`,
      `?latitude=${CONFIG.LAT}&longitude=${CONFIG.LON}&elevation=${CONFIG.ELEVATION}`,
      `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,precipitation,snowfall`,
      `&hourly=snowfall,freezing_level_height`,
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,snowfall_sum,precipitation_sum`,
      `&timezone=Europe%2FParis&forecast_days=5&wind_speed_unit=kmh`
    ].join('');

    const res = await fetchTimeout(url, {}, 9000);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const d = await res.json();
    if (!d.current || !d.daily) throw new Error('Données API invalides');

    const c = d.current;

    // Données actuelles
    setText('m-temp',        Math.round(c.temperature_2m) + '°C');
    setText('m-snow',        (c.precipitation ?? 0).toFixed(1) + ' mm');
    setText('m-wind',        Math.round(c.wind_speed_10m) + ' km/h');
    setText('m-humidity',    c.relative_humidity_2m + '%');
    setText('m-weatherIcon', WMO.icons[c.weather_code]  ?? '🌡');
    setText('m-weatherCode', WMO.labels[c.weather_code] ?? '—');

    // Neige cumulée 24h depuis hourly
    const hourlySnow = d.hourly?.snowfall ?? [];
    const snow24h = hourlySnow.slice(0, 24).reduce((a,b) => a + (b||0), 0);
    setText('m-snowfall24', snow24h > 0.1 ? snow24h.toFixed(1) + ' cm' : '0 cm');

    // ── Isotherme 0°C ──
    const freezing = d.hourly?.freezing_level_height?.[0];
    if (freezing != null) {
      const altM = Math.round(freezing);
      let msg = `${altM.toLocaleString('fr-FR')} m`;
      let color = 'var(--sky)';
      if (altM > CONFIG.ELEVATION + 200) { msg += ' ✅ Neige froide garantie'; color = '#4ade80'; }
      else if (altM < CONFIG.ELEVATION)  { msg += ' ⚠️ Regel au sol possible'; color = '#f87171'; }
      else                               { msg += ' → Limite à mi-domaine'; }
      const el = document.getElementById('isothermeVal');
      if (el) { el.textContent = msg; el.style.color = color; }
    }

    // ── Qualité neige estimée ──
    const temp = c.temperature_2m;
    const snowQuals = [
      { max:-8,   label:'❄️ Poudreuse sèche',    icon:'🌨', color:'#7ec8e3' },
      { max:-3,   label:'❄️ Bonne glisse',        icon:'❄️', color:'#a8e6cf' },
      { max:0,    label:'⛷ Glisse correcte',      icon:'⛷', color:'#90d4a0' },
      { max:2,    label:'💧 Neige transformée',   icon:'💧', color:'#ffd580' },
      { max:99,   label:'🌧 Lourde et mouillée',  icon:'🌧', color:'#f87171' },
    ];
    const qual = snowQuals.find(q => temp <= q.max) ?? snowQuals.at(-1);
    setText('snowQualityVal', qual.label);
    const sqc = document.getElementById('snowQualityVal');
    if (sqc) sqc.style.color = qual.color;
    const sqi = document.getElementById('snowQualityIcon');
    if (sqi) sqi.textContent = qual.icon;

    // ── Neige prévue 24–48h ──
    const s24 = d.daily?.snowfall_sum?.[0] ?? 0;
    const s48 = d.daily?.snowfall_sum?.[1] ?? 0;
    const sfv = document.getElementById('snowForecastVal');
    if (sfv) {
      if (s24 > 0 || s48 > 0) {
        sfv.textContent = `Auj. : +${s24.toFixed(0)} cm · Dem. : +${s48.toFixed(0)} cm`;
        sfv.style.color = '#4ade80';
      } else {
        sfv.textContent = 'Aucune chute prévue dans les 48h';
        sfv.style.color = 'rgba(255,255,255,.6)';
      }
    }

    // ── Prévisions 5 jours ──
    const fr = document.getElementById('forecastRow');
    if (fr && d.daily) {
      fr.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const dt    = new Date(d.daily.time[i] + 'T12:00:00');
        const day   = i === 0 ? 'Auj.' : i === 1 ? 'Dem.' : DAYS[dt.getDay()];
        const sn    = d.daily.snowfall_sum?.[i] ?? 0;
        const pluie = d.daily.precipitation_sum?.[i] ?? 0;
        const precip = sn > 0
          ? `<div class="fsnow" style="color:#7ec8e3">❄ +${sn.toFixed(0)} cm</div>`
          : pluie > 0
            ? `<div class="fsnow" style="color:#94a3b8">🌧 ${pluie.toFixed(0)} mm</div>`
            : `<div class="fsnow">—</div>`;
        fr.innerHTML += `
          <div class="forecast-day" role="article" aria-label="Prévision ${day}">
            <div class="fday">${day}</div>
            <div class="ficon" aria-hidden="true">${WMO.icons[d.daily.weather_code[i]]??'—'}</div>
            <div class="ftemp">${Math.round(d.daily.temperature_2m_max[i])}° / ${Math.round(d.daily.temperature_2m_min[i])}°</div>
            ${precip}
          </div>`;
      }
    }

    // Afficher tout
    if (loaderEl) loaderEl.style.display = 'none';
    show('meteoGrid'); show('forecastBox'); show('meteoContextBar');
    updateLastUpdate();

  } catch(err) {
    console.warn('[Barioz] Météo :', err.message);
    if (loaderEl) loaderEl.innerHTML = `
      <div class="meteo-card" style="grid-column:1/-1;text-align:center">
        <div class="meteo-icon" aria-hidden="true">⚠️</div>
        <div class="meteo-value" style="font-size:1rem">Météo indisponible</div>
        <div class="meteo-label">Vérifiez votre connexion ou réessayez</div>
      </div>`;
  }
}

// ════════════════════════════════════════════════════
// CHARGEMENT GOOGLE SHEETS (robuste, multi-fallback)
// ════════════════════════════════════════════════════
function csvParse(line) {
  const r = []; let q = false, s = '';
  for (const c of line) {
    if (c === '"') q = !q;
    else if (c === ',' && !q) { r.push(s); s = ''; }
    else s += c;
  }
  r.push(s);
  return r;
}

async function loadSheetData() {
  setText('sheetLoaderText', 'Chargement des conditions…');
  show('sheet-loader');

  const ID      = CONFIG.SHEET_ID;
  const SHEET   = 'Conditions%20des%20Pistes';
  const CSV_URL = `https://docs.google.com/spreadsheets/d/${ID}/export?format=csv&sheet=${SHEET}`;
  const GVZ_URL = `https://docs.google.com/spreadsheets/d/${ID}/gviz/tq?tqx=out:csv&sheet=${SHEET}`;
  const PRXY1   = `https://api.allorigins.win/get?url=${encodeURIComponent(GVZ_URL)}`;
  const PRXY2   = `https://corsproxy.io/?${encodeURIComponent(GVZ_URL)}`;

  // ── 1. Apps Script JSON (la meilleure source) ──────────────
  try {
    const r = await fetchTimeout(CONFIG.APPS_SCRIPT_URL, {}, 8000);
    if (r.ok) {
      const data = await r.json();
      if (data && (data.statut || data.zones || data.pistes)) {
        if (!data.services) data.services = [];
        hideLoader();
        renderConditions(data);
        return;
      }
    }
  } catch(e) { console.warn('[Barioz] Apps Script :', e.message); }

  // ── 2. CSV direct, puis proxies ────────────────────────────
  let csv = null;
  const tries = [
    () => fetchTimeout(CSV_URL, {mode:'cors'}, 5000).then(r => r.ok ? r.text() : Promise.reject()),
    () => fetchTimeout(GVZ_URL, {mode:'cors'}, 5000).then(r => r.ok ? r.text() : Promise.reject()),
    () => fetchTimeout(PRXY1, {}, 8000).then(r => r.json()).then(j => {
      if (j.contents && !j.contents.trim().startsWith('<!')) return j.contents;
      throw new Error('HTML reçu');
    }),
    () => fetchTimeout(PRXY2, {}, 8000).then(r => r.ok ? r.text() : Promise.reject()),
  ];

  for (const fn of tries) {
    if (csv) break;
    try {
      const t = await fn();
      if (t && t.length > 80 && !t.trim().startsWith('<!')) csv = t;
    } catch(_) {}
  }

  if (!csv) {
    console.warn('[Barioz] Toutes les tentatives ont échoué → mode démo');
    setText('sheetLoaderText', '⚠️ Données hors ligne — affichage exemple');
    renderConditions(DEMO);
    return;
  }

  // ── 3. Parser CSV ──────────────────────────────────────────
  try {
    const rows = csv.split('\n').map(csvParse);
    const g = (r, c) => (rows[r]?.[c] ?? '').replace(/^["'\s]+|["'\s]+$/g,'').trim();

    const data = {
      miseAJourPar:  g(5,1),
      statut:        g(7,1)  || 'OUVERT',
      message:       g(8,1),
      dernierDamage: g(9,1),
      heureDamage:   g(10,1),
      // ── Nouvelles lignes centralisées (voir doc Sheets) ──
      etatRoute:     g(12,1) || 'Dégagée',
      foyerOuvertA:  parseInt(g(13,1)) || CONFIG.FOYER_OPEN,
      foyerFermeA:   parseInt(g(14,1)) || CONFIG.FOYER_CLOSE,
      foyerMessage:  g(15,1),
      zones:  [],
      pistes: [],
    };

    // Zones enneigement → lignes 17 à 20 (index 16-19)
    for (let i = 16; i <= 19; i++) {
      if (g(i,0)) data.zones.push({
        nom: g(i,0), hauteur: g(i,1)||'—',
        qualite: g(i,2)||'—', tendance: g(i,3)||'Stable',
      });
    }
    // Pistes → lignes 24 à 37 (index 23-36)
    for (let j = 23; j <= 36; j++) {
      if (g(j,0) && g(j,1)) data.pistes.push({
        nom: g(j,0), niveau: g(j,1), type: g(j,2),
        statut: g(j,3)||'OUVERTE', km: g(j,4), notes: g(j,5),
      });
    }

    // Services → lignes 49-53 (index 48-52)
    // Col A = Activité/Service, B = OUVERT/FERME, C = Horaires, D = Notes
    data.services = [];
    for (let k = 48; k <= 52; k++) {
      const nom = g(k,0);
      if (!nom || nom.toLowerCase().includes('activité') || nom.toLowerCase().includes('service')) continue;
      data.services.push({
        nom,
        statut:   g(k,1) || 'FERME',
        horaires: g(k,2),
        notes:    g(k,3),
      });
    }

    hideLoader();
    renderConditions(data);

  } catch(e) {
    console.warn('[Barioz] Parsing CSV :', e);
    setText('sheetLoaderText', '⚠️ Erreur lecture — mode démo');
    renderConditions(DEMO);
  }
}

// ════════════════════════════════════════════════════
// RENDU DES CONDITIONS (enneigement + pistes)
// ════════════════════════════════════════════════════
function renderConditions(data) {
  // ── Bandeau statut domaine ──
  const statut = (data.statut||'OUVERT').toUpperCase();
  const scls   = {OUVERT:'status-ouvert', FERME:'status-ferme', REDUIT:'status-reduit'};
  const semo   = {OUVERT:'✅', FERME:'❌', REDUIT:'⚠️'};
  const slbl   = {OUVERT:'Domaine ouvert', FERME:'Domaine fermé', REDUIT:'Ouverture partielle'};

  setText('domaineStatutText', slbl[statut] ?? statut);

  const pill = document.getElementById('domaineStatutPill');
  if (pill) pill.innerHTML = `<span class="status-pill ${scls[statut]??''}" role="status">${semo[statut]??'ℹ️'} ${statut}</span>`;

  const dmg = data.dernierDamage
    ? 'Dernier damage : ' + data.dernierDamage + (data.heureDamage ? ' à ' + data.heureDamage : '')
    : 'Damage : informations en attente';
  setText('domaineDamageText', dmg);

  // ── Message spécial ──
  if (data.message) {
    setText('messageSpecialText', data.message);
    show('messageSpecialBox');
  } else {
    hide('messageSpecialBox');
  }

  // ── Zones enneigement ──
  const zg = document.getElementById('snowZoneGrid');
  if (zg) {
    if (data.zones?.length) {
      zg.innerHTML = data.zones.map(z => {
        const t  = (z.tendance||'').toLowerCase();
        const ti = t.includes('hausse') ? '↑' : t.includes('baisse') ? '↓' : '→';
        const tc = t.includes('hausse') ? 'zone-trend-up' : t.includes('baisse') ? 'zone-trend-down' : 'zone-trend-same';
        return `
          <div class="snow-zone-card" role="region" aria-label="${z.nom} : ${z.hauteur} cm">
            <div class="zone-name">${z.nom}</div>
            <div class="zone-height">${z.hauteur}<span class="zone-cm"> cm</span></div>
            <div class="zone-qual">${z.qualite} <span class="${tc}" aria-label="Tendance ${z.tendance}">${ti} ${z.tendance||'Stable'}</span></div>
          </div>`;
      }).join('');
    } else {
      zg.innerHTML = '<p style="color:var(--muted);font-size:.88rem;padding:1rem 0">Données non disponibles pour le moment.</p>';
    }
  }

  // ── Tableau des pistes ──
  const tbody = document.getElementById('pistesBody');
  if (tbody) {
    const dot  = {Vert:'dot-vert', Bleu:'dot-bleu', Rouge:'dot-rouge', Noir:'dot-noir'};
    const scl  = {OUVERTE:'status-ouvert', FERMEE:'status-ferme', REDUITE:'status-reduit', ENTRETIEN:'status-reduit'};
    const sic  = {OUVERTE:'✅', FERMEE:'❌', REDUITE:'⚠️', ENTRETIEN:'🔧'};

    tbody.innerHTML = data.pistes?.length
      ? data.pistes.map(p => `
          <tr>
            <td><strong>${p.nom}</strong></td>
            <td><span class="niveau-dot ${dot[p.niveau]??''}" aria-hidden="true"></span>${p.niveau}</td>
            <td>${p.type||'—'}</td>
            <td><span class="status-pill ${scl[p.statut]??''}" role="status">${sic[p.statut]??''} ${p.statut}</span></td>
            <td>${p.km ? p.km+' km' : '—'}</td>
            <td style="color:var(--muted);font-size:.8rem">${p.notes||''}</td>
          </tr>`).join('')
      : '<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:2rem">Aucune donnée disponible.</td></tr>';
  }

  // ── Compteur pistes ──
  if (data.pistes?.length) updatePisteCounter(data.pistes);

  // ── Statut foyer & route depuis les données ──
  updateFoyerStatus(data);
  updateRouteStatus(data.etatRoute);
}

// ════════════════════════════════════════════════════
// COMPTEUR DE PISTES (progress bar)
// ════════════════════════════════════════════════════
function updatePisteCounter(pistes) {
  const bar = document.getElementById('pisteCounterBar');
  if (!bar) return;

  const open   = pistes.filter(p => p.statut === 'OUVERTE').length;
  const closed = pistes.filter(p => p.statut === 'FERMEE').length;
  const total  = pistes.length;
  const pct    = total ? Math.round(open / total * 100) : 0;

  setText('pisteCountOpen',    open);
  setText('pisteCountClosed',  closed);
  setText('pisteCountTotal',   total);
  setText('pisteProgressLabel',`Taux d'ouverture — ${pct}%`);

  setTimeout(() => {
    const fill = document.getElementById('pisteProgressFill');
    if (fill) fill.style.width = pct + '%';
  }, 300);

  bar.style.display = 'flex';
}

// ════════════════════════════════════════════════════
// WEBCAM (refresh auto 60s)
// ════════════════════════════════════════════════════
function refreshWebcam() {
  const img = document.getElementById('webcamImg');
  if (!img) return;

  // Charger directement dans l'<img> visible (pas via un Image() fantôme).
  // Le reset à '' force le rechargement même si l'URL n'a pas changé.
  img.alt = 'Vue webcam en direct du Crêt du Poulet, domaine du Barioz';

  img.onload = () => {
    img.style.display = 'block';
    hide('webcamFallback');
    const upd = document.getElementById('webcamLastUpdate');
    if (upd) upd.textContent = 'Mise à jour : ' + new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  };

  img.onerror = () => {
    img.style.display = 'none';
    show('webcamFallback');
  };

  img.src = '';                                          // reset pour forcer reload
  img.src = CONFIG.WEBCAM_URL + '?t=' + Date.now();
}

setInterval(refreshWebcam, 60000);

// ════════════════════════════════════════════════════
// INIT ENNEIGEMENT (lazy, 1 seul init)
// ════════════════════════════════════════════════════
let _ennInit = false;

function initEnneigement() {
  if (_ennInit) return;
  _ennInit = true;

  loadMeteo();
  loadSheetData();
  refreshWebcam();

  // Rafraîchir toutes les 15 min
  setInterval(() => {
    loadMeteo();
    loadSheetData();
    refreshWebcam();
  }, CONFIG.REFRESH_MS);
}

function forceReloadConditions() {
  const btn = document.querySelector('[onclick="forceReloadConditions()"]');
  if (btn) { btn.textContent = '⏳ Actualisation…'; btn.disabled = true; }

  show('sheet-loader');
  setText('sheetLoaderText', 'Rechargement en cours…');

  loadMeteo();
  loadSheetData();
  refreshWebcam();

  setTimeout(() => {
    if (btn) { btn.textContent = '↻ Actualiser les données'; btn.disabled = false; }
  }, 4000);
}

// ════════════════════════════════════════════════════
// CALCULATEUR DE TARIFS INTERACTIF
// ════════════════════════════════════════════════════

// Matrice de tarifs — peut être chargée depuis le Sheet à l'avenir
const TARIFS = {
  adulte: {
    fond_skating:    { demi:22, journee:24, detail_demi:'Forfait 9€ + Location skating ½j 13€', detail_journee:'Forfait 9€ + Location skating journée 15€' },
    fond_alternatif: { demi:19, journee:21, detail_demi:'Forfait 9€ + Location alternatif ½j 10€', detail_journee:'Forfait 9€ + Location alternatif journée 12€' },
    raquettes:       { demi:8.5, journee:10.5, detail_demi:'Raquette 2,50€ + Location ½j 6€', detail_journee:'Raquette 2,50€ + Location journée 8€' },
    forfait_seul:    { demi:9, journee:9, detail_demi:'Forfait journée adulte (matériel personnel)', detail_journee:'Forfait journée adulte (matériel personnel)' },
  },
  junior: {
    fond_skating:    { demi:16, journee:18, detail_demi:'Forfait 6€ + Location skating ½j 10€', detail_journee:'Forfait 6€ + Location skating journée 12€' },
    fond_alternatif: { demi:14,  journee:16, detail_demi:'Forfait 6€ + Location alternatif ½j 8€', detail_journee:'Forfait 6€ + Location alternatif journée 10€' },
    raquettes:       { demi:5.5, journee:5.5, detail_demi:'Raquette 2,50€ + Location baby 3€', detail_journee:'Raquette 2,50€ + Location baby 3€' },
    forfait_seul:    { demi:6, journee:6, detail_demi:'Forfait journée juniors (matériel personnel)', detail_journee:'Forfait journée juniors (matériel personnel)' },
  },
  reduit: {
    fond_skating:    { demi:16.5, journee:18.5, detail_demi:'Tarif réduit 6,50€ + Location skating ½j 10€', detail_journee:'Tarif réduit 6,50€ + Location skating journée 12€' },
    fond_alternatif: { demi:14.5, journee:16.5, detail_demi:'Tarif réduit 6,50€ + Location alternatif ½j 8€', detail_journee:'Tarif réduit 6,50€ + Location alternatif journée 10€' },
    raquettes:       { demi:8.5,  journee:10.5, detail_demi:'Raquette 2,50€ + Location ½j 6€', detail_journee:'Raquette 2,50€ + Location journée 8€' },
    forfait_seul:    { demi:6.5,  journee:6.5,  detail_demi:'Tarif réduit journée (étudiant/70+)', detail_journee:'Tarif réduit journée (étudiant/70+)' },
  },
  senior: {
    fond_skating:    { demi:13, journee:15, detail_demi:'Vétéran 3€ + Location skating ½j 10€', detail_journee:'Vétéran 3€ + Location skating journée 12€' },
    fond_alternatif: { demi:11, journee:13, detail_demi:'Vétéran 3€ + Location alternatif ½j 8€', detail_journee:'Vétéran 3€ + Location alternatif journée 10€' },
    raquettes:       { demi:8.5, journee:10.5, detail_demi:'Raquette 2,50€ + Location ½j 6€', detail_journee:'Raquette 2,50€ + Location journée 8€' },
    forfait_seul:    { demi:3, journee:3, detail_demi:'Vétéran 76+ ans (matériel personnel)', detail_journee:'Vétéran 76+ ans (matériel personnel)' },
  },
};

const calcState = { profil:'adulte', activite:'fond_skating', duree:'demi' };

function initCalculateur() {
  ['calcProfil','calcActivite','calcDuree'].forEach(groupId => {
    const grp = document.getElementById(groupId);
    if (!grp) return;
    const key = groupId.replace('calc','').toLowerCase();
    grp.querySelectorAll('.calc-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        grp.querySelectorAll('.calc-opt').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        calcState[key] = btn.dataset.val;
        updateCalculateur();
      });
    });
  });
  updateCalculateur();
}

function updateCalculateur() {
  const { profil, activite, duree } = calcState;
  const amtEl = document.getElementById('calcAmount');
  const dtlEl = document.getElementById('calcDetail');
  if (!amtEl || !dtlEl) return;

  const row = TARIFS[profil]?.[activite];
  if (!row) { amtEl.textContent = '—'; dtlEl.textContent = 'Combinaison non disponible'; return; }

  const montant = row[duree];
  const detail  = row['detail_' + duree] || '';

  // Animation du chiffre
  amtEl.style.transform = 'scale(.9)';
  amtEl.style.opacity   = '0.5';
  setTimeout(() => {
    amtEl.textContent   = montant > 0 ? montant.toFixed(montant%1===0?0:2).replace('.',',') + ' €' : 'Gratuit ✅';
    amtEl.style.color   = montant === 0 ? '#4ade80' : 'var(--sky)';
    amtEl.style.transform = 'scale(1)';
    amtEl.style.opacity = '1';
  }, 120);

  dtlEl.textContent = detail;
}

// ════════════════════════════════════════════════════
// SCROLL REVEAL (IntersectionObserver)
// ════════════════════════════════════════════════════
function initReveal() {
  const els = document.querySelectorAll('.page.active .reveal:not(.visible)');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

// ════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════
function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.textContent = val;
}

function show(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (el) el.style.display = '';
}

function hide(id) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (el) el.style.display = 'none';
}

function hideLoader() { hide('sheet-loader'); }

function updateLastUpdate() {
  const el = document.getElementById('lastUpdateTime');
  if (el) el.textContent = 'Météo mise à jour : ' + new Date().toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
}

// ════════════════════════════════════════════════════
// CHARGEMENT RAPIDE STATUT (accueil, sans attendre Enneigement)
// ════════════════════════════════════════════════════
async function loadQuickStatus() {
  try {
    const r = await fetchTimeout(CONFIG.APPS_SCRIPT_URL, {}, 5000);
    if (r.ok) {
      const d = await r.json();
      if (d) { updateFoyerStatus(d); updateRouteStatus(d.etatRoute); return; }
    }
  } catch(_) {}
  // Fallback purement basé sur l'heure locale
  updateFoyerStatus(null);
  updateRouteStatus('Vérifiez les conditions avant de partir — ☎ 04 76 71 06 47');
}

// ════════════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  // Routing initial via hash URL
  const hash = location.hash.replace('#','');
  showPage(PAGES.includes(hash) ? hash : 'home');

  // Animations révélation
  initReveal();

  // Calculateur de tarifs
  initCalculateur();

  // Charger statut foyer & route immédiatement (tous les onglets en profitent)
  loadQuickStatus();

  // Si on arrive directement sur enneigement
  if (hash === 'enneigement') initEnneigement();
});
