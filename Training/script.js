/* ============================================================
   TRAINING APP — script.js
   Jules · U18 · Ski de fond / Trail / Vélo / Beach Body
   Saison 2026 — reprise 21 avril après pause post-course
   ============================================================ */

'use strict';

/* ─── CONSTANTS ─── */
const STORAGE_KEY = 'jules_training_2026';
const TODAY = new Date();

const SPORTS = ['Ski de fond','Running / Trail','Vélo de route','Ski-roue','Muscu / Gainage','Natation','Autre'];

const SPORT_COLORS = {
  'Ski de fond':      { bg:'rgba(77,184,255,0.12)', text:'#4db8ff', dot:'#4db8ff' },
  'Running / Trail':  { bg:'rgba(90,223,138,0.12)', text:'#5adf8a', dot:'#5adf8a' },
  'Vélo de route':    { bg:'rgba(240,168,50,0.12)', text:'#f0a832', dot:'#f0a832' },
  'Ski-roue':         { bg:'rgba(176,144,255,0.12)', text:'#b090ff', dot:'#b090ff' },
  'Muscu / Gainage':  { bg:'rgba(255,127,96,0.12)', text:'#ff7f60', dot:'#ff7f60' },
  'Natation':         { bg:'rgba(77,184,255,0.12)', text:'#60c8ff', dot:'#60c8ff' },
  'Autre':            { bg:'rgba(138,143,139,0.12)', text:'#8a8f8b', dot:'#8a8f8b' },
};

const RPE_COLORS = [
  '#3aad5e','#4dc46b','#6dcf7a','#9ddb8a',
  '#f0c830','#f0a832','#e07820',
  '#d85040','#c03030','#a01818'
];

/* ─── PLAN DATA ─── */
// Vacances scolaires approximatives 2026 (France zone B/C)
// Pâques: 11-27 avril | Été: fin juin-début sept | Toussaint: fin oct | Noël: fin déc
const SCHOOL_HOLIDAYS = [
  // Pâques 2026
  { start:'2026-04-11', end:'2026-04-26' },
  // Été 2026
  { start:'2026-07-05', end:'2026-09-01' },
  // Toussaint 2026
  { start:'2026-10-24', end:'2026-11-02' },
  // Noël 2026
  { start:'2026-12-19', end:'2027-01-04' },
];

const PLAN = [
  {
    id:'transition',
    name:'Transition & Bases Été',
    period:'21 avril → 31 mai',
    color:'#5adf8a',
    icon:'🌱',
    desc:'Reprise en douceur post-saison ski. Intro vélo de route, renfo cheville, gainage. Pas de pression.',
    weeks:[
      {
        title:'Semaine 17 (21-26 avr) — Reprise très douce',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'25min footing très léger Z1 — remettre les jambes en route doucement', rpe:'3/10'},
          {day:'Mer', sport:'Vélo de route', content:'1h vélo de route Z1 — découverte, aucun effort, prendre ses marques', rpe:'3/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'Circuit A léger — 15min gainage + proprioception cheville (voir onglet Techniques)', rpe:'3/10'},
          {day:'Sam', sport:'Vélo de route', content:'1h30 vélo de route Z2 — sortie tranquille, terrain plat de préférence', rpe:'4/10'},
        ]
      },
      {
        title:'Semaine 18 (27 avr - 3 mai) — Montée progressive',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'35min footing Z2 avec 5min à allure légèrement plus rapide à la fin', rpe:'4/10'},
          {day:'Mer', sport:'Vélo de route', content:'1h30 vélo Z2 — terrain varié, intro petites côtes (garder cardio < 155bpm)', rpe:'5/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'Circuit B (force) — 25min : gainage + squats gobelet + fentes + dips chaise', rpe:'5/10'},
          {day:'Sam', sport:'Vélo de route', content:'2h vélo Z2 — première vraie sortie longue. Manger 1 barre dès 45min.', rpe:'5/10'},
        ]
      },
      {
        title:'Semaine 19 (4-10 mai) — Confirmation',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'45min footing Z2 + 10min allure trail (terrain naturel si possible)', rpe:'5/10'},
          {day:'Mer', sport:'Vélo de route', content:'1h30 vélo Z2 — focus position sur le vélo, cadence fluide ~85-90 RPM', rpe:'5/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'Circuit A — 20min gainage + squats pistol débutant + équilibre cheville bosu', rpe:'4/10'},
          {day:'Sam', sport:'Vélo de route', content:'2h30 vélo Z2 — sortie longue avec un peu de dénivelé. Hydratation ++', rpe:'6/10'},
          {day:'Dim', sport:'Running / Trail', content:'50min trail découverte Z2 — profiter de la nature, pas de chrono', rpe:'5/10'},
        ]
      },
      {
        title:'Semaine 20 (11-17 mai) — Consolidation',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'50min : échauff 10min + 4×4min allure seuil (récup 2min) + retour calme', rpe:'7/10'},
          {day:'Mer', sport:'Vélo de route', content:'2h vélo Z2 — sortie semi-longue avec 2 bonnes côtes', rpe:'6/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'Circuit Beach Body A — 30min (voir Techniques). Focus abdos + bras.', rpe:'5/10'},
          {day:'Sam', sport:'Vélo de route', content:'3h vélo Z2 — grosse sortie longue. Objectif : tester l\'endurance vélo.', rpe:'6/10'},
        ]
      },
      {
        title:'Semaine 21 (18-24 mai) — Semi-récup',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'40min footing Z2 tranquille — récup active', rpe:'4/10'},
          {day:'Mer', sport:'Vélo de route', content:'1h30 vélo Z1-Z2 — sortie plaisir', rpe:'4/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'Circuit B force — 25min', rpe:'5/10'},
          {day:'Sam', sport:'Vélo de route', content:'2h vélo Z2 sortie classique', rpe:'5/10'},
        ]
      },
      {
        title:'Semaine 22 (25-31 mai) — Charge',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'1h trail avec 15min allure montée — focus montées de côte bras + jambes', rpe:'7/10'},
          {day:'Mer', sport:'Vélo de route', content:'2h vélo avec 2×15min Z3 (récup 10min) — début travail intensité vélo', rpe:'7/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'Circuit Beach Body B — 30min (abdos, bras, épaules)', rpe:'6/10'},
          {day:'Sam', sport:'Vélo de route', content:'3h30 vélo Z2 — sortie longue socle', rpe:'6/10'},
          {day:'Dim', sport:'Running / Trail', content:'1h15 trail avec dénivelé positif. Chercher du terrain montagneux.', rpe:'6/10'},
        ]
      },
    ]
  },
  {
    id:'ete',
    name:'Été — Volume & Forme',
    period:'1 juin → 31 août',
    color:'#f0a832',
    icon:'☀️',
    desc:'Pic de forme pour l\'été. Trail courses à venir, vélo longues sorties, Beach Body en parallèle. Vacances scolaires = liberté totale des créneaux.',
    weeks:[
      {
        title:'Juin — Montée intensité trail + vélo',
        type:'vacances',
        sessions:[
          {day:'Lun', sport:'Running / Trail', content:'1h trail — 30min Z2 + 4×5min Z4 récup 2min. Montées travaillées.', rpe:'7/10'},
          {day:'Mar', sport:'Muscu / Gainage', content:'Circuit Beach Body A — 35min (abdos, gainage, bras)', rpe:'6/10'},
          {day:'Mer', sport:'Vélo de route', content:'3h vélo Z2 avec 2 cols ou montées > 10min — sortie longue sérieuse', rpe:'7/10'},
          {day:'Jeu', sport:'Running / Trail', content:'Repos actif ou 30min récup Z1 léger', rpe:'2/10'},
          {day:'Ven', sport:'Muscu / Gainage', content:'Circuit Beach Body B — 35min (poitrine, dos, épaules, abdos)', rpe:'6/10'},
          {day:'Sam', sport:'Vélo de route', content:'4h vélo Z2 — grande sortie longue. Objectif prépa endurance été.', rpe:'7/10'},
          {day:'Dim', sport:'Running / Trail', content:'1h30 trail montagneux — plaisir, dénivelé, pas de vitesse', rpe:'6/10'},
        ]
      },
      {
        title:'Juillet — Pic volume (vacances)',
        type:'vacances',
        sessions:[
          {day:'Lun', sport:'Vélo de route', content:'4h vélo Z2 — sortie longue socle de la semaine', rpe:'7/10'},
          {day:'Mar', sport:'Running / Trail', content:'1h15 trail : 40min Z2 + 6×3min Z4 (récup 90sec) + 15min cool down', rpe:'8/10'},
          {day:'Mer', sport:'Muscu / Gainage', content:'Circuit Beach Body complet — 40min (full body + focus abdos)', rpe:'7/10'},
          {day:'Jeu', sport:'Vélo de route', content:'2h vélo Z1 récup active — roulage tranquille', rpe:'3/10'},
          {day:'Ven', sport:'Running / Trail', content:'1h trail avec côtes — 8×1min à fond en côte récup redescente', rpe:'8/10'},
          {day:'Sam', sport:'Vélo de route', content:'4h30-5h vélo Z2 — grande sortie. Prépa endurance maximale.', rpe:'7/10'},
          {day:'Dim', sport:'Running / Trail', content:'2h trail montagneux — longue sortie plaisir avec dénivelé > 500m', rpe:'7/10'},
        ]
      },
      {
        title:'Août — Consolidation + affûtage courses',
        type:'vacances',
        sessions:[
          {day:'Lun', sport:'Vélo de route', content:'3h vélo Z2 — consolidation', rpe:'6/10'},
          {day:'Mar', sport:'Running / Trail', content:'1h trail spécifique course : allure compétition sur 20-25min au milieu', rpe:'8/10'},
          {day:'Mer', sport:'Muscu / Gainage', content:'Circuit Beach Body A allégé — 25min. Entretien avant fin de saison.', rpe:'5/10'},
          {day:'Jeu', sport:'Running / Trail', content:'Repos ou 30min récup très léger', rpe:'2/10'},
          {day:'Ven', sport:'Vélo de route', content:'2h vélo Z2 sortie entretien', rpe:'5/10'},
          {day:'Sam', sport:'Running / Trail', content:'COURSE ou simulation course : effort compétitif 45-60min', rpe:'9/10'},
          {day:'Dim', sport:'Vélo de route', content:'Récup active : 1h vélo très tranquille Z1', rpe:'2/10'},
        ]
      },
    ]
  },
  {
    id:'prep-hiver',
    name:'Préparation hiver ski',
    period:'1 sept → 31 déc',
    color:'#4db8ff',
    icon:'⛷️',
    desc:'Foncier long, entretien muscu, retour progressif vers la neige et les compétitions hiver.',
    weeks:[
      {
        title:'Septembre — Maintien + foncier',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'1h footing Z2 progressif — poser les bases foncier hiver', rpe:'5/10'},
          {day:'Mer', sport:'Vélo de route', content:'2h vélo Z2 — maintien endurance, profiter derniers beaux jours', rpe:'6/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'30min force : squat gobelet / RDL / tractions / gainage', rpe:'6/10'},
          {day:'Sam', sport:'Vélo de route', content:'3h vélo Z2 — sortie longue socle', rpe:'6/10'},
          {day:'Dim', sport:'Running / Trail', content:'1h30 trail — terrain varié, entretien', rpe:'6/10'},
        ]
      },
      {
        title:'Octobre — Foncier intensif pré-neige',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'1h10 : 50min Z2 + 2×8min tempo seuil (récup 3min)', rpe:'7/10'},
          {day:'Mer', sport:'Ski-roue', content:'Ski-roue ou roller — simulation ski de fond technique', rpe:'6/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'35min force spécifique ski : squats, poussées bâton élastique, gainage lombaire', rpe:'6/10'},
          {day:'Sam', sport:'Ski-roue', content:'2h15 ski-roue Z2 — sortie longue technique', rpe:'6/10'},
          {day:'Dim', sport:'Running / Trail', content:'1h30 trail avec côtes — entretien explosivité jambes', rpe:'6/10'},
        ]
      },
      {
        title:'Novembre — Retour vers la neige',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'1h avec 4×10min au seuil (récup 2min) — excellent pour ski fond', rpe:'7/10'},
          {day:'Mer', sport:'Ski de fond', content:'Club : si neige → ski de fond ! Sinon ski-roue/roller', rpe:'7/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'30min spécifique ski : gainage + circuits explosivité jambes + poussées', rpe:'6/10'},
          {day:'Sam', sport:'Ski de fond', content:'Club : premières sorties ski sur neige', rpe:'7/10'},
          {day:'Dim', sport:'Running / Trail', content:'Selon enneigement : trail ou ski Z2 récup', rpe:'5/10'},
        ]
      },
      {
        title:'Décembre — Saison ski lancée',
        type:'scolaire',
        sessions:[
          {day:'Mar soir', sport:'Running / Trail', content:'40min footing ou ski light — entretien', rpe:'5/10'},
          {day:'Mer', sport:'Ski de fond', content:'Entraînement club ski de fond', rpe:'7/10'},
          {day:'Ven matin', sport:'Muscu / Gainage', content:'20min gainage + renfo cheville — entretien uniquement', rpe:'4/10'},
          {day:'Sam', sport:'Ski de fond', content:'Entraînement club ski de fond — sortie longue', rpe:'7/10'},
          {day:'Dim', sport:'Ski de fond', content:'Compétitions ski de fond — saison lancée !', rpe:'8/10'},
        ]
      },
    ]
  },
];

/* ─── TECHNIQUES DATA ─── */
const TECHNIQUES = [
  {
    id:'circuit-a',
    name:'Circuit A — Gainage & Proprioception',
    sport:'Muscu / Gainage',
    duration:'15-20 min',
    color:'#5adf8a',
    freq:'2×/semaine',
    desc:'Circuit fondation : stabilité core et cheville. À faire même si t\'as la flemme — 15min ça se fait toujours.',
    exercises:[
      {name:'Planche frontale',         sets:'3 × 45sec',   note:'→ progression 60sec, puis planche dynamique'},
      {name:'Planche latérale',         sets:'3 × 30sec/côté', note:'Hanche haute, corps aligné'},
      {name:'Dead bug',                 sets:'3 × 10 reps', note:'Très lent, coller le bas du dos au sol'},
      {name:'Pont fessier',             sets:'3 × 15 reps', note:'→ progression unilatéral sur une jambe'},
      {name:'Équilibre unipodal',       sets:'3 × 30sec/jambe', note:'→ yeux fermés → coussin de proprio → bosu'},
      {name:'Alphabet cheville',        sets:'2 × / pied',  note:'Dessiner A-Z avec le pied en l\'air'},
      {name:'Relevés de pointe unilatéral', sets:'3 × 15 / pied', note:'Excentrique lent : 3sec descente'},
    ]
  },
  {
    id:'circuit-b',
    name:'Circuit B — Force Fonctionnelle',
    sport:'Muscu / Gainage',
    duration:'25-30 min',
    color:'#ff7f60',
    freq:'2×/semaine',
    desc:'Circuit force : construire les jambes, dos, bras. Charges légères au début, progression sur 2 mois.',
    exercises:[
      {name:'Squat gobelet',            sets:'3 × 12',      note:'Haltère ou sac à dos lesté — genou dans l\'axe'},
      {name:'Fentes marchées',          sets:'3 × 10/jambe', note:'→ fentes sautées alternées en progression'},
      {name:'Dips (chaise)',            sets:'3 × 12',      note:'→ Dips barres parallèles. Triceps + pectoraux'},
      {name:'Tractions (barre)',        sets:'3 × max',     note:'Assisté si besoin. Objectif : 3 × 8 en 2 mois'},
      {name:'Pompes déclinées',         sets:'3 × 12',      note:'Pieds sur chaise — accent haut poitrine'},
      {name:'Mountain climbers',        sets:'3 × 30sec',   note:'Contrôlés, pas de rebond — gainage dynamique'},
      {name:'Romanian Deadlift (RDL)', sets:'3 × 10',       note:'Haltères légers — ischio-jambiers + bas du dos'},
    ]
  },
  {
    id:'beach-body-a',
    name:'Beach Body A — Abdos & Gainage',
    sport:'Muscu / Gainage',
    duration:'30-35 min',
    color:'#f0a832',
    freq:'2×/semaine en été',
    desc:'Focus esthétique plage : abdos visibles + gainage profond. Pas besoin de matériel. Intensité progressive.',
    exercises:[
      {name:'Crunch bicycle',           sets:'3 × 20',      note:'Rotation complète, coude vers genou opposé'},
      {name:'Leg raises',               sets:'3 × 15',      note:'Jambes tendues, dos au sol, bas du dos plaqué'},
      {name:'Planche avec rotation',    sets:'3 × 10/côté', note:'Rotation hanches, bras tendu vers le ciel'},
      {name:'V-up',                     sets:'3 × 12',      note:'Corps forme de V, mains et pieds se rejoignent'},
      {name:'Side plank with dip',      sets:'3 × 12/côté', note:'Hanches montent et descendent'},
      {name:'Flutter kicks',            sets:'3 × 30sec',   note:'Petits battements, bas du dos collé au sol'},
      {name:'Dragon flag (progressif)', sets:'3 × 6',       note:'Commencer avec les genoux pliés'},
    ]
  },
  {
    id:'beach-body-b',
    name:'Beach Body B — Bras & Épaules',
    sport:'Muscu / Gainage',
    duration:'30-35 min',
    color:'#b090ff',
    freq:'2×/semaine en été',
    desc:'Bras définis + épaules larges pour l\'été. Se combine avec Circuit A pour une séance complète.',
    exercises:[
      {name:'Pompes classiques',        sets:'4 × max',     note:'Explosives à la montée, lentes à la descente'},
      {name:'Pompes diamant',           sets:'3 × 12',      note:'Mains rapprochées — focus triceps'},
      {name:'Pike push-up',             sets:'3 × 10',      note:'Corps en V inversé — épaules (comme développé)'},
      {name:'Tractions supination',     sets:'3 × max',     note:'Prise paumes vers soi — focus biceps'},
      {name:'Dips',                     sets:'3 × 12',      note:'Amplitude complète — triceps + deltoïde ant.'},
      {name:'Planche→pompe',            sets:'3 × 8',       note:'Enchaîner position planche → pompe'},
      {name:'Seal row (sol)',           sets:'3 × 12',      note:'Allongé ventre, tirer les haltères vers les côtes'},
    ]
  },
  {
    id:'trail-tech',
    name:'Technique Trail',
    sport:'Running / Trail',
    duration:'Pendant la séance',
    color:'#5adf8a',
    freq:'À intégrer dans toutes les sorties trail',
    desc:'Points clés pour progresser en trail sans se blesser. Particulièrement important pour les débuts.',
    exercises:[
      {name:'Montées de côte',          sets:'Cadence élevée', note:'Petits pas rapides, bras qui travaillent, regard 3m devant'},
      {name:'Descentes techniques',     sets:'Contrôle',    note:'Genoux fléchis, corps en avant, regard loin. Appuis actifs.'},
      {name:'Renfo côtes spécifique',   sets:'8×30sec',     note:'Montées très courtes à fond — explosivité jambes'},
      {name:'Foulée naturelle',         sets:'Attaque milieu pied', note:'Éviter l\'attaque talon. Cadence > 170 pas/min.'},
      {name:'Alimentation course',      sets:'1 gel / 40min', note:'S\'entraîner avec les gels en sortie longue dès maintenant'},
    ]
  },
  {
    id:'velo-tech',
    name:'Technique Vélo de Route',
    sport:'Vélo de route',
    duration:'Pendant la sortie',
    color:'#f0a832',
    freq:'À appliquer dès maintenant',
    desc:'Pour progresser vite sur le vélo et éviter les douleurs dues à une mauvaise position ou mauvaise gestion d\'effort.',
    exercises:[
      {name:'Position sur le vélo',     sets:'Vérification', note:'Dos plat ou légèrement courbé. Coudes fléchis. Jambe quasi-tendue en bas.'},
      {name:'Cadence de pédalage',      sets:'85-95 RPM',   note:'Pédaler rond, pas en force. Éviter les à-coups.'},
      {name:'Gestion de l\'effort Z2', sets:'Cardio 130-150bpm', note:'Tu dois pouvoir parler pendant la sortie longue'},
      {name:'Alimentation vélo',        sets:'1 barre / 45min', note:'Commencer à manger dès 30min — ne pas attendre la fringale'},
      {name:'Hydratation',              sets:'500ml / heure', note:'Minimum. Doubler par forte chaleur.'},
      {name:'Montées en danseuse',      sets:'Sprints courts', note:'S\'entraîner à alterner assis/danseuse dans les cols'},
    ]
  },
  {
    id:'cheville',
    name:'Protocole Cheville',
    sport:'Muscu / Gainage',
    duration:'3-5 min par jour',
    color:'#4db8ff',
    freq:'TOUS LES SOIRS — 6 semaines minimum',
    desc:'Indispensable pour solidifier les chevilles fragiles. À faire systématiquement, même les jours sans entraînement. 3 minutes seulement.',
    exercises:[
      {name:'Rotations cheville',       sets:'20 × / pied', note:'Amplitude max, sens horaire et anti-horaire'},
      {name:'Équilibre unipodal',       sets:'30sec / pied', note:'→ yeux fermés après 2 semaines'},
      {name:'Relevés de pointe',        sets:'10 × unilatéral', note:'Montée explosive, descente 3sec excentrique'},
      {name:'Étirement mollet debout',  sets:'2 × 30sec/côté', note:'Talon bien posé au sol, jambe tendue'},
    ]
  },
];

/* ─── STATE ─── */
let sessions = [];
let selectedRpe = null;
let weekOffset = 0;
let charts = {};

/* ─── STORAGE ─── */
function load() {
  try { sessions = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
  catch { sessions = []; }
}
function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

/* ─── NAV ─── */
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + id).classList.add('active');
  document.querySelectorAll(`[data-page="${id}"]`).forEach(n => n.classList.add('active'));
  closeSidebar();

  if (id === 'dashboard') renderDashboard();
  if (id === 'journal')   renderJournal();
  if (id === 'plan')      renderPlan();
  if (id === 'techniques')renderTechniques();
  if (id === 'fatigue')   renderFatigue();
}

function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.querySelector('.sidebar-overlay').classList.toggle('open');
}
function closeSidebar() {
  document.querySelector('.sidebar').classList.remove('open');
  document.querySelector('.sidebar-overlay').classList.remove('open');
}

/* ─── UTILS ─── */
function fmt(d) {
  if (typeof d === 'string') return d;
  return d.toISOString().split('T')[0];
}
function fmtDisplay(dateStr) {
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('fr-FR', {weekday:'short', day:'numeric', month:'short'});
}
function fmtHours(min) {
  if (!min) return '—';
  const h = Math.floor(min / 60);
  const m = min % 60;
  return h > 0 ? `${h}h${m ? m+'m' : ''}` : `${m}min`;
}
function getRpeColor(rpe) { return RPE_COLORS[Math.min((rpe||1)-1, 9)]; }
function isToday(dateStr) { return dateStr === fmt(TODAY); }
function isHoliday(dateStr) {
  return SCHOOL_HOLIDAYS.some(h => dateStr >= h.start && dateStr <= h.end);
}

function getWeekDates(offset) {
  const now = new Date();
  const dow = now.getDay() === 0 ? 6 : now.getDay() - 1;
  const mon = new Date(now);
  mon.setDate(now.getDate() - dow + offset * 7);
  mon.setHours(0, 0, 0, 0);
  return Array.from({length:7}, (_, i) => {
    const d = new Date(mon); d.setDate(mon.getDate() + i); return d;
  });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2400);
}

function currentPhase() {
  const d = fmt(TODAY);
  if (d < '2026-06-01') return { name:'Transition & Bases Été', color:'#5adf8a' };
  if (d < '2026-09-01') return { name:'Été — Volume & Forme', color:'#f0a832' };
  return { name:'Préparation hiver ski', color:'#4db8ff' };
}

/* ─── RPE BAR ─── */
function buildRpeBar(containerId) {
  const bar = document.getElementById(containerId);
  if (!bar) return;
  bar.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const b = document.createElement('button');
    b.className = 'rpe-btn' + (selectedRpe === i ? ' selected' : '');
    b.textContent = i;
    if (selectedRpe === i) { b.style.background = getRpeColor(i); b.style.borderColor = 'transparent'; }
    b.onclick = () => { selectedRpe = i; buildRpeBar(containerId); };
    bar.appendChild(b);
  }
}

/* ══════════════════════════════════════
   DASHBOARD
══════════════════════════════════════ */
function renderDashboard() {
  const days = getWeekDates(weekOffset);
  const ws = sessions.filter(s => { const d = new Date(s.date); return d >= days[0] && d <= days[6]; });

  const totalMin = ws.reduce((a,s) => a+(s.duree||0), 0);
  const avgRpe = ws.length ? +(ws.reduce((a,s) => a+(s.rpe||0),0)/ws.length).toFixed(1) : 0;
  const charge = ws.reduce((a,s) => a+(s.duree||0)*(s.rpe||0), 0);
  const now = new Date();
  const monthCount = sessions.filter(s => { const d=new Date(s.date); return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear(); }).length;

  document.getElementById('m-vol').textContent   = fmtHours(totalMin);
  document.getElementById('m-charge').textContent = charge || '—';
  document.getElementById('m-rpe').textContent    = avgRpe || '—';
  document.getElementById('m-month').textContent  = monthCount;

  document.getElementById('week-label').textContent =
    `${days[0].getDate()}/${days[0].getMonth()+1} — ${days[6].getDate()}/${days[6].getMonth()+1}`;

  // Week grid
  const grid = document.getElementById('week-grid');
  grid.innerHTML = '';
  days.forEach(d => {
    const ds = fmt(d);
    const daySess = sessions.filter(s => s.date === ds);
    const cell = document.createElement('div');
    cell.className = 'week-cell' + (daySess.length?' has-data':'') + (isToday(ds)?' today':'');
    let dots = daySess.map(s => `<div class="week-dot" style="background:${SPORT_COLORS[s.sport]?.dot||'#888'}"></div>`).join('');
    cell.innerHTML = `<span class="week-cell-num">${d.getDate()}</span>${dots}`;
    grid.appendChild(cell);
  });

  // Alert
  const alertEl = document.getElementById('dash-alert');
  alertEl.innerHTML = '';
  if (ws.length >= 2) {
    if (avgRpe >= 9) alertEl.innerHTML = `<div class="alert red"><span class="alert-icon">⚠️</span><div>RPE moyen critique <b>${avgRpe}/10</b> — semaine de récupération obligatoire : volume −40%, aucune intensité.</div></div>`;
    else if (avgRpe >= 8) alertEl.innerHTML = `<div class="alert amber"><span class="alert-icon">⚡</span><div>RPE moyen élevé <b>${avgRpe}/10</b> — raccourcis la prochaine séance de 20% et supprime les intensités.</div></div>`;
    else if (avgRpe <= 5 && ws.length >= 3) alertEl.innerHTML = `<div class="alert green"><span class="alert-icon">✓</span><div>RPE moyen confortable <b>${avgRpe}/10</b> — tu peux ajouter 10% de volume ou une séance bonus légère.</div></div>`;
  }

  // Cheville alert
  const maxChev = ws.reduce((max,s) => Math.max(max, s.cheville||0), 0);
  if (maxChev >= 3) {
    alertEl.innerHTML += `<div class="alert amber"><span class="alert-icon">🦵</span><div>Douleur cheville signalée <b>${maxChev}/5</b> cette semaine — faire le protocole cheville TOUS LES SOIRS (voir Techniques).</div></div>`;
  }

  renderCharts(ws, days);
}

function renderCharts(ws, weekDays) {
  // Sport donut
  const cutoff = new Date(TODAY); cutoff.setDate(TODAY.getDate()-28);
  const recent = sessions.filter(s => new Date(s.date) >= cutoff);
  const totals = {};
  recent.forEach(s => { totals[s.sport] = (totals[s.sport]||0)+(s.duree||0); });
  const sports = Object.keys(totals);
  const mins = sports.map(s => totals[s]);
  const total = mins.reduce((a,b)=>a+b,0);

  const legend = document.getElementById('sport-legend');
  legend.innerHTML = sports.map((s,i) => {
    const pct = total ? Math.round(mins[i]/total*100) : 0;
    return `<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--c-text2);">
      <span style="width:10px;height:10px;border-radius:2px;background:${SPORT_COLORS[s]?.dot||'#888'};flex-shrink:0;display:inline-block;"></span>
      ${s} — ${(mins[i]/60).toFixed(1)}h (${pct}%)
    </span>`;
  }).join('');

  if (charts.sport) { charts.sport.destroy(); charts.sport=null; }
  const ctx1 = document.getElementById('chart-sport');
  if (sports.length) {
    charts.sport = new Chart(ctx1, {
      type:'doughnut',
      data:{ labels:sports, datasets:[{data:mins, backgroundColor:sports.map(s=>SPORT_COLORS[s]?.dot||'#888'), borderWidth:0, hoverOffset:4}] },
      options:{ responsive:true, maintainAspectRatio:false, plugins:{legend:{display:false}}, cutout:'68%' }
    });
  }

  // Charge line 8 weeks
  const wks = Array.from({length:8},(_,i) => {
    const d = getWeekDates(i-7);
    const ch = sessions.filter(s=>{const dd=new Date(s.date);return dd>=d[0]&&dd<=d[6];}).reduce((a,s)=>a+(s.duree||0)*(s.rpe||0),0);
    return { label:`${d[0].getDate()}/${d[0].getMonth()+1}`, charge:ch };
  });

  if (charts.charge) { charts.charge.destroy(); charts.charge=null; }
  const ctx2 = document.getElementById('chart-charge');
  charts.charge = new Chart(ctx2, {
    type:'bar',
    data:{
      labels: wks.map(w=>w.label),
      datasets:[{data:wks.map(w=>w.charge), backgroundColor:'#5adf8a44', borderColor:'#5adf8a', borderWidth:1.5, borderRadius:4, borderSkipped:false}]
    },
    options:{
      responsive:true, maintainAspectRatio:false,
      plugins:{legend:{display:false}},
      scales:{
        x:{ticks:{font:{size:10},color:'#4a4f4b'}, grid:{color:'rgba(255,255,255,.04)'}},
        y:{ticks:{font:{size:10},color:'#4a4f4b'}, grid:{color:'rgba(255,255,255,.04)'}}
      }
    }
  });
}

/* ══════════════════════════════════════
   JOURNAL
══════════════════════════════════════ */
function renderJournal() {
  const filter = document.getElementById('filter-sport')?.value || '';
  let list = [...sessions].sort((a,b)=>b.date.localeCompare(a.date));
  if (filter) list = list.filter(s=>s.sport===filter);

  const el = document.getElementById('journal-list');
  if (!list.length) {
    el.innerHTML = `<div class="empty"><div class="empty-icon">📋</div>Aucune séance trouvée.<br>Utilise "+ Ajouter" pour commencer.</div>`;
    return;
  }

  const grouped = {};
  list.forEach(s => {
    const d = new Date(s.date);
    const k = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`;
    if (!grouped[k]) grouped[k]=[];
    grouped[k].push(s);
  });

  el.innerHTML = Object.keys(grouped).sort((a,b)=>b.localeCompare(a)).map(month => {
    const [y,m] = month.split('-');
    const mName = new Date(y,m-1,1).toLocaleDateString('fr-FR',{month:'long',year:'numeric'});
    const ms = grouped[month];
    const totMin = ms.reduce((a,s)=>a+(s.duree||0),0);
    return `<div class="card" style="margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span style="font-size:14px;font-weight:500;">${mName}</span>
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--c-text3);">${ms.length} séances · ${fmtHours(totMin)}</span>
      </div>
      ${ms.map(s=>`
        <div class="session-item">
          <div class="rpe-circle" style="background:${getRpeColor(s.rpe||5)}">${s.rpe||'?'}</div>
          <div class="sport-pill" style="background:${SPORT_COLORS[s.sport]?.bg||'rgba(255,255,255,.05)'};color:${SPORT_COLORS[s.sport]?.text||'#888'}">${s.sport}</div>
          <div class="session-body">
            <div class="session-title">${fmtDisplay(s.date)} · ${fmtHours(s.duree)}${s.distance?' · '+s.distance+'km':''}</div>
            <div class="session-sub">${s.type||''}${s.notes?' · '+s.notes.slice(0,55)+(s.notes.length>55?'…':''):''}${s.cheville>0?' · 🦵'+s.cheville+'/5':''}</div>
          </div>
          <button class="btn btn-sm btn-danger" onclick="deleteSession('${s.id}')">Suppr.</button>
        </div>
      `).join('')}
    </div>`;
  }).join('');
}

function deleteSession(id) {
  if (!confirm('Supprimer cette séance ?')) return;
  sessions = sessions.filter(s=>s.id!==id);
  save(); renderJournal(); renderDashboard();
}

/* ══════════════════════════════════════
   AJOUTER SÉANCE
══════════════════════════════════════ */
function initAddForm() {
  // Populate sport select
  const sel = document.getElementById('f-sport');
  if (sel && !sel.children.length) {
    SPORTS.forEach(s => { const o=document.createElement('option'); o.value=o.textContent=s; sel.appendChild(o); });
  }
  document.getElementById('f-date').value = fmt(TODAY);
  buildRpeBar('rpe-bar');
}

function saveSession() {
  const date    = document.getElementById('f-date').value;
  const sport   = document.getElementById('f-sport').value;
  const duree   = parseInt(document.getElementById('f-duree').value);
  const distance= parseFloat(document.getElementById('f-distance').value)||null;
  const type    = document.getElementById('f-type').value;
  const fatigue = parseInt(document.getElementById('f-fatigue').value)||null;
  const cheville= parseInt(document.getElementById('f-cheville').value)||0;
  const notes   = document.getElementById('f-notes').value.trim();

  if (!date||!sport||!duree||!selectedRpe) {
    alert('Remplis au minimum : date, sport, durée et RPE.');
    return;
  }

  sessions.push({ id:Date.now().toString(), date, sport, duree, distance, type, rpe:selectedRpe, fatigue, cheville, notes });
  save();

  // Reset
  document.getElementById('f-duree').value = '';
  document.getElementById('f-distance').value = '';
  document.getElementById('f-fatigue').value = '';
  document.getElementById('f-cheville').value = '';
  document.getElementById('f-notes').value = '';
  selectedRpe = null;
  buildRpeBar('rpe-bar');
  showToast('Séance enregistrée ✓');
}

/* ══════════════════════════════════════
   PLAN
══════════════════════════════════════ */
function renderPlan() {
  const el = document.getElementById('plan-content');
  el.innerHTML = PLAN.map(phase => `
    <div class="phase-block">
      <div class="phase-header">
        <div class="phase-dot" style="background:${phase.color}"></div>
        <div>
          <div class="phase-title">${phase.icon} ${phase.name}</div>
          <div style="font-size:12px;color:var(--c-text3);margin-top:2px;">${phase.desc}</div>
        </div>
        <div class="phase-period">${phase.period}</div>
      </div>
      ${phase.weeks.map((w,wi) => `
        <div class="week-block" id="wb-${phase.id}-${wi}">
          <div class="week-block-header" onclick="toggleWeekBlock('wb-${phase.id}-${wi}')">
            <span style="font-size:10px;padding:2px 7px;border-radius:20px;background:${w.type==='vacances'?'rgba(240,168,50,.15)':'rgba(90,223,138,.1)'};color:${w.type==='vacances'?'#f0a832':'#5adf8a'};font-family:var(--font-mono);font-size:9px;letter-spacing:.05em;">
              ${w.type==='vacances'?'VACANCES':'SCOLAIRE'}
            </span>
            <span class="week-block-title">${w.title}</span>
            <span class="week-block-meta">${w.sessions.length} séances</span>
            <span class="week-block-toggle">▼</span>
          </div>
          <div class="week-block-body">
            ${w.sessions.map(s => `
              <div class="plan-row">
                <div class="plan-day">${s.day}</div>
                <div>
                  <span class="sport-pill" style="background:${SPORT_COLORS[s.sport]?.bg||'rgba(255,255,255,.05)'};color:${SPORT_COLORS[s.sport]?.text||'#888'};font-size:10px;padding:2px 7px;border-radius:20px;display:inline-block;margin-bottom:4px;">${s.sport}</span>
                  <div class="plan-content">${s.content}</div>
                </div>
                <div class="plan-rpe-tag">RPE ${s.rpe}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `).join('');
}

function toggleWeekBlock(id) {
  document.getElementById(id).classList.toggle('open');
}

/* ══════════════════════════════════════
   TECHNIQUES
══════════════════════════════════════ */
function renderTechniques() {
  const el = document.getElementById('tech-content');
  el.innerHTML = `<div class="tech-grid">
    ${TECHNIQUES.map(t => `
      <div class="tech-card">
        <div class="tech-card-header" style="border-left:3px solid ${t.color};">
          <div>
            <div class="tech-card-title">${t.name}</div>
            <div class="tech-card-sub">${t.duration} · ${t.freq}</div>
            <div style="font-size:11px;color:var(--c-text3);margin-top:4px;line-height:1.5;">${t.desc}</div>
          </div>
        </div>
        ${t.exercises.map(ex => `
          <div class="tech-exercise">
            <div>
              <div class="tech-ex-name">${ex.name}</div>
              ${ex.note ? `<div class="tech-ex-note">${ex.note}</div>` : ''}
            </div>
            <div class="tech-ex-sets">${ex.sets}</div>
          </div>
        `).join('')}
      </div>
    `).join('')}
  </div>`;
}

/* ══════════════════════════════════════
   FATIGUE / AJUSTEMENTS
══════════════════════════════════════ */
function renderFatigue() {
  const rules = [
    {rpe:'≤ 5 / 10', fatigue:'Faible', color:'#5adf8a', bg:'var(--c-green-dim)', action:'Tu peux ajouter +10% de volume, ou une séance bonus légère (Z1 uniquement). Ton corps récupère bien.'},
    {rpe:'6-7 / 10', fatigue:'Normale', color:'#f0a832', bg:'var(--c-amber-dim)', action:'Plan nominal. C\'est la bonne zone de travail — tu progresses.'},
    {rpe:'8 / 10', fatigue:'Élevée', color:'#ff7f60', bg:'rgba(255,127,96,.1)', action:'Raccourcir la prochaine séance de 20%. Supprimer toutes les intensités (intervalles, seuil). Garder du Z1-Z2 uniquement.'},
    {rpe:'9-10 / 10', fatigue:'Critique', color:'#f06060', bg:'var(--c-red-dim)', action:'Semaine de récupération obligatoire : volume −40%, aucune intensité, sommeil prioritaire. Pas de héros.'},
  ];

  document.getElementById('fatigue-rules').innerHTML = rules.map(r => `
    <tr>
      <td><span class="ftable-rpe" style="background:${r.bg};color:${r.color};">${r.rpe}</span></td>
      <td style="color:${r.color};font-weight:500;">${r.fatigue}</td>
      <td style="color:var(--c-text2);">${r.action}</td>
    </tr>
  `).join('');

  // Compute last 8 weeks stats
  const rows = Array.from({length:8},(_,i) => {
    const days = getWeekDates(i-7);
    const ws = sessions.filter(s=>{const d=new Date(s.date);return d>=days[0]&&d<=days[6];});
    const ch = ws.reduce((a,s)=>a+(s.duree||0)*(s.rpe||0),0);
    const avRpe = ws.length ? +(ws.reduce((a,s)=>a+(s.rpe||0),0)/ws.length).toFixed(1) : 0;
    return { label:`${days[0].getDate()}/${days[0].getMonth()+1}`, ch, avRpe, count:ws.length };
  });

  document.getElementById('history-rows').innerHTML = rows.reverse().map(r => {
    let zone = r.avRpe<=5?'Faible':r.avRpe<=7?'Normale':r.avRpe<=8?'Élevée':'Critique';
    let zc = r.avRpe<=5?'#5adf8a':r.avRpe<=7?'#f0a832':r.avRpe<=8?'#ff7f60':'#f06060';
    let zbg = r.avRpe<=5?'var(--c-green-dim)':r.avRpe<=7?'var(--c-amber-dim)':'var(--c-red-dim)';
    return `<tr>
      <td style="font-family:var(--font-mono);color:var(--c-text2);">${r.label}</td>
      <td style="font-family:var(--font-mono);">${r.count}</td>
      <td><span class="ftable-rpe" style="background:${zbg};color:${zc};">${r.avRpe||'—'}</span></td>
      <td style="font-family:var(--font-mono);">${r.ch||'—'}</td>
      <td style="color:${zc};font-size:11px;">${r.avRpe?zone:'—'}</td>
    </tr>`;
  }).join('');
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', () => {
  load();

  // Phase badge
  const ph = currentPhase();
  const badge = document.getElementById('phase-badge');
  if (badge) { badge.textContent = ph.name; badge.style.background = ph.color+'22'; badge.style.color = ph.color; badge.style.borderColor = ph.color+'44'; }

  initAddForm();
  renderDashboard();
  renderPlan();
  renderTechniques();
  renderFatigue();
  renderJournal();
});
