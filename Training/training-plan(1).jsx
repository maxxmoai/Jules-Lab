import { useState } from "react";

const phases = [
  {
    id: "affutage",
    name: "AFFÛTAGE",
    subtitle: "VMA & Vitesse 5km Ski",
    period: "1 Mars → 5 Avril",
    color: "#E8F4FD",
    accent: "#1A6FBF",
    badge: "#D4EDFF",
    icon: "⛷️",
    weeks: [
      {
        num: "S1 (3-8 mars)",
        label: "Récup active post-gros bloc",
        sessions: [
          { day: "Mar soir", type: "Course", content: "30min footing léger Z1 (130bpm max)", rpe: "3/10" },
          { day: "Mer", type: "Ski Club", content: "Entraînement club normal", rpe: "6/10" },
          { day: "Ven matin", type: "Gainage", content: "15min gainage + proprioception cheville (A)", rpe: "4/10" },
          { day: "Sam", type: "Ski Club", content: "Entraînement club normal", rpe: "6/10" },
          { day: "Dim", type: "Course", content: "Compétition ou sortie longue ski Z2", rpe: "7/10" },
        ]
      },
      {
        num: "S2 (9-15 mars)",
        label: "Introduction travail vitesse",
        sessions: [
          { day: "Mar soir", type: "Course", content: "40min avec 6×200m à 95% VMA (récup 1'30)", rpe: "7/10" },
          { day: "Mer", type: "Ski Club", content: "Entraînement club — focus technique skating/classique", rpe: "6/10" },
          { day: "Ven matin", type: "Gainage", content: "20min circuit muscu corps entier (B)", rpe: "5/10" },
          { day: "Sam", type: "Ski Club", content: "Entraînement club — sortie longue Z2", rpe: "7/10" },
          { day: "Dim", type: "Course", content: "Compétition ou 1h ski fartlek", rpe: "8/10" },
        ]
      },
      {
        num: "S3 (16-22 mars)",
        label: "Charge VMA — semaine clé",
        sessions: [
          { day: "Mar soir", type: "Course", content: "50min : 8×400m à VMA (récup 2') — piste ou route plate", rpe: "8/10" },
          { day: "Mer", type: "Ski Club", content: "Entraînement club + côtes courtes ski", rpe: "7/10" },
          { day: "Ven matin", type: "Gainage", content: "20min gainage + squats pistol progressifs (A)", rpe: "5/10" },
          { day: "Sam", type: "Ski Club", content: "Sortie spécifique 5km ski — travail allure course", rpe: "8/10" },
          { day: "Dim", type: "Course", content: "Course ou simulation 5km à 90% allure cible", rpe: "8/10" },
        ]
      },
      {
        num: "S4 (23-29 mars)",
        label: "Consolidation + début affûtage",
        sessions: [
          { day: "Mar soir", type: "Course", content: "40min : 5×500m allure 5km ski + 10min cool down", rpe: "7/10" },
          { day: "Mer", type: "Ski Club", content: "Entraînement club — séance qualitative courte", rpe: "6/10" },
          { day: "Ven matin", type: "Gainage", content: "15min gainage léger — on commence à réduire (B)", rpe: "4/10" },
          { day: "Sam", type: "Ski Club", content: "Sortie courte technique 1h — fraîcheur maximale", rpe: "5/10" },
          { day: "Dim", type: "Repos", content: "Repos actif : marche, étirements, mobilité cheville", rpe: "2/10" },
        ]
      },
      {
        num: "S5 (30 mars - 5 avril)",
        label: "🎯 SEMAINE COMPÉTITION",
        sessions: [
          { day: "Lun", type: "Repos", content: "Repos total ou marche légère 20min", rpe: "1/10" },
          { day: "Mar soir", type: "Course", content: "25min : 4×100m vitesse + footing léger", rpe: "4/10" },
          { day: "Mer", type: "Ski Club", content: "30min sur neige — jambes, sensations, pas d'effort max", rpe: "4/10" },
          { day: "Jeu", type: "Repos", content: "Repos + préparation matériel, nutrition", rpe: "1/10" },
          { day: "Ven", type: "Activation", content: "15min ski facile + 3×30sec à allure course", rpe: "3/10" },
          { day: "Sam 4 avril", type: "🏆 COURSE", content: "5km Ski de fond — OBJECTIF A", rpe: "10/10" },
          { day: "Dim 5 avril", type: "🏆 COURSE", content: "5km Ski de fond — OBJECTIF A", rpe: "10/10" },
        ]
      },
    ]
  },
  {
    id: "transition",
    name: "TRANSITION",
    subtitle: "Récup active & Fondations",
    period: "6 Avril → 31 Mai",
    color: "#F0FAF0",
    accent: "#2D7A3A",
    badge: "#D4F4D4",
    icon: "🌱",
    weeks: [
      {
        num: "Semaines 1-2 (6-19 avril)",
        label: "Décompression post-saison ski",
        sessions: [
          { day: "Mar soir", type: "Renfo", content: "20min proprioception cheville — unilatéral, bosu, yeux fermés", rpe: "3/10" },
          { day: "Mer", type: "Cross-training", content: "45min vélo ou natation — Z1 uniquement", rpe: "3/10" },
          { day: "Ven matin", type: "Gainage", content: "20min circuit gainage (A) — on reprend sérieusement", rpe: "4/10" },
          { day: "Sam", type: "Sortie", content: "1h marche/rando ou vélo cool", rpe: "3/10" },
          { day: "Dim", type: "Libre", content: "Activité plaisir au choix", rpe: "—" },
        ]
      },
      {
        num: "Semaines 3-4 (20 avril - 3 mai)",
        label: "Reprise running progressif",
        sessions: [
          { day: "Mar soir", type: "Course", content: "35min footing Z2 — focus foulée et appuis cheville", rpe: "5/10" },
          { day: "Mer", type: "Multi-sport", content: "1h vélo route ou ski-roue (intro) Z2", rpe: "5/10" },
          { day: "Ven matin", type: "Renfo/Gainage", content: "25min : gainage + squat gobelet + fentes + mollets", rpe: "5/10" },
          { day: "Sam", type: "Sortie longue", content: "1h30 vélo ou trail découverte Z1-Z2", rpe: "5/10" },
          { day: "Dim", type: "Récup", content: "Repos ou mobilité 20min", rpe: "2/10" },
        ]
      },
      {
        num: "Mai complet",
        label: "Construction bases été",
        sessions: [
          { day: "Mar soir", type: "Course", content: "45min footing progressif avec 10min à allure trail", rpe: "6/10" },
          { day: "Mer", type: "Club", content: "Entraînement club (ski-roue ou cross-training)", rpe: "6/10" },
          { day: "Ven matin", type: "Muscu", content: "30min muscu fonctionnelle (B évolué) — charges légères", rpe: "5/10" },
          { day: "Sam", type: "Club", content: "Entraînement club — sortie longue", rpe: "6/10" },
          { day: "Dim", type: "Trail", content: "1h-1h30 trail découverte en nature — Z2 strict", rpe: "5/10" },
        ]
      },
    ]
  },
  {
    id: "ete",
    name: "ÉTÉ",
    subtitle: "Volume Multi-sports + Beach Body",
    period: "1 Juin → 31 Août",
    color: "#FFFBF0",
    accent: "#C17F00",
    badge: "#FFF3CD",
    icon: "☀️",
    weeks: [
      {
        num: "Juin",
        label: "Montée en charge progressive",
        sessions: [
          { day: "Mar soir", type: "Course/Trail", content: "50min trail Z2 + côtes. Focus appuis cheville en terrain varié", rpe: "6/10" },
          { day: "Mer", type: "Club", content: "Entraînement club ski-roue ou vélo technique", rpe: "6/10" },
          { day: "Ven matin", type: "Muscu 💪", content: "30min : Tractions 3×8 / Dips 3×10 / Gainage 3×45sec / Squat 3×12 / Fentes sautées 3×8", rpe: "6/10" },
          { day: "Sam", type: "Club", content: "Sortie longue club — vélo/ski-roue Z2 (2h+)", rpe: "6/10" },
          { day: "Dim", type: "Trail/Vélo", content: "Sortie longue au choix — construction volume", rpe: "6/10" },
        ]
      },
      {
        num: "Juillet",
        label: "Pic volume + intensité",
        sessions: [
          { day: "Mar soir", type: "Trail intensif", content: "1h : échauffement + 6×3min Z4 (récup 2min) + retour calme", rpe: "8/10" },
          { day: "Mer", type: "Club", content: "Club : ski-roue technique + intervals si dispo", rpe: "7/10" },
          { day: "Ven matin", type: "Muscu 💪", content: "30-35min : Développé militaire / Rowing / Gainage lat / Romanian Deadlift / Step-up lesté", rpe: "6/10" },
          { day: "Sam", type: "Club", content: "Sortie longue club (vélo ou ski-roue) — 2h30 Z2", rpe: "7/10" },
          { day: "Dim", type: "Trail long", content: "Trail 1h30-2h avec dénivelé — objectif future course", rpe: "7/10" },
        ]
      },
      {
        num: "Août",
        label: "Consolidation + forme affichée",
        sessions: [
          { day: "Mar soir", type: "Trail", content: "1h trail avec 20min allure seuil — terrain montagneux", rpe: "7/10" },
          { day: "Mer", type: "Club", content: "Club : objectif ski-roue compétition / sortie qualitative", rpe: "7/10" },
          { day: "Ven matin", type: "Circuit 💪🏖️", content: "35min AMRAP : Pull-ups / Dips / L-sit / Squats bulgares / Gainage dynamique / Nordic curl (ischio)", rpe: "7/10" },
          { day: "Sam", type: "Club", content: "Sortie longue club + objectif course été si dispo", rpe: "7/10" },
          { day: "Dim", type: "Trail/Vélo", content: "Sortie longue au choix — test forme, relâchement technique", rpe: "7/10" },
        ]
      },
    ]
  },
  {
    id: "prep-ski",
    name: "PRÉP HIVER",
    subtitle: "Foncier & Retour Ski",
    period: "1 Sept → 31 Déc",
    color: "#F5F0FF",
    accent: "#5B3DB8",
    badge: "#EAE0FF",
    icon: "🎿",
    weeks: [
      {
        num: "Septembre",
        label: "Maintien forme + volume foncier",
        sessions: [
          { day: "Mar soir", type: "Course", content: "1h footing Z2 progressif — on pose les bases hiver", rpe: "5/10" },
          { day: "Mer", type: "Club", content: "Club : ski-roue ou cross-training — dernières sessions été", rpe: "6/10" },
          { day: "Ven matin", type: "Muscu 💪", content: "30min force : squat, soulevé de terre roumain, tractions, gainage", rpe: "6/10" },
          { day: "Sam", type: "Club", content: "Sortie longue club 2h — Z2 strict, construction aérobie", rpe: "6/10" },
          { day: "Dim", type: "Trail/Vélo", content: "2h sortie au choix Z2 — profiter des derniers beaux jours", rpe: "6/10" },
        ]
      },
      {
        num: "Octobre",
        label: "Foncier intensif pré-neige",
        sessions: [
          { day: "Mar soir", type: "Course", content: "1h10 : 50min Z2 + 2×8min tempo seuil aérobie (récup 3min)", rpe: "7/10" },
          { day: "Mer", type: "Club", content: "Club : ski-roue ou roller technique — simulation ski de fond", rpe: "6/10" },
          { day: "Ven matin", type: "Muscu 💪", content: "35min force spécifique ski : squats, poussées bâton élastique, gainage lombaire", rpe: "6/10" },
          { day: "Sam", type: "Club", content: "Sortie longue club 2h15 — Z2, pas de frénésie", rpe: "6/10" },
          { day: "Dim", type: "Trail", content: "Trail 1h30 avec côtes — entretien explosivité jambes", rpe: "6/10" },
        ]
      },
      {
        num: "Novembre",
        label: "Transition vers la neige",
        sessions: [
          { day: "Mar soir", type: "Course", content: "1h avec 4×10min au seuil (récup 2min) — bon pour ski fond", rpe: "7/10" },
          { day: "Mer", type: "Club", content: "Club : si neige → ski! Sinon ski-roue/roller", rpe: "7/10" },
          { day: "Ven matin", type: "Muscu 💪", content: "30min spécifique ski : gainage + circuits explosivité jambes + poussées", rpe: "6/10" },
          { day: "Sam", type: "Club", content: "Club : premières sorties ski si neige, sinon ski-roue long", rpe: "7/10" },
          { day: "Dim", type: "Course/Ski", content: "Selon enneigement : trail ou ski Z2 récup", rpe: "5/10" },
        ]
      },
      {
        num: "Décembre",
        label: "Entrée en saison ski — régime hiver",
        sessions: [
          { day: "Mar soir", type: "Course", content: "40min footing ou ski light — entretien sans surcharger", rpe: "5/10" },
          { day: "Mer", type: "Ski Club ⛷️", content: "Entraînement club ski de fond — programme coach", rpe: "7/10" },
          { day: "Ven matin", type: "Gainage 💪", content: "20min gainage + renfo cheville — entretien uniquement", rpe: "4/10" },
          { day: "Sam", type: "Ski Club ⛷️", content: "Entraînement club ski de fond — sortie longue", rpe: "7/10" },
          { day: "Dim", type: "Course Ski 🏆", content: "Compétitions ski de fond — saison lancée!", rpe: "8/10" },
        ]
      },
    ]
  },
];

const muscuCircuits = [
  {
    name: "Circuit A — Gainage & Proprioception",
    duration: "15-20min",
    color: "#1A6FBF",
    exercises: [
      { name: "Planche frontale", sets: "3×45sec", note: "Progression → 60sec" },
      { name: "Planche latérale", sets: "3×30sec/côté", note: "" },
      { name: "Dead bug", sets: "3×10 reps", note: "Très lent, contrôle total" },
      { name: "Pont fessier", sets: "3×15 reps", note: "Unilatéral en progression" },
      { name: "Équilibre unipodal", sets: "3×30sec/jambe", note: "→ yeux fermés → bosu" },
      { name: "Alphabet cheville", sets: "2×/pied", note: "Dessiner A-Z en l'air avec le pied" },
    ]
  },
  {
    name: "Circuit B — Force Fonctionnelle",
    duration: "20-30min",
    color: "#2D7A3A",
    exercises: [
      { name: "Squat gobelet", sets: "3×12", note: "Haltère ou sac à dos lesté" },
      { name: "Fentes marchées", sets: "3×10/jambe", note: "→ fentes sautées en progression" },
      { name: "Dips (chaise)", sets: "3×10", note: "→ Dips parallèles" },
      { name: "Tractions (barre)", sets: "3×max", note: "Assisté si besoin, objectif 3×8" },
      { name: "Pompes déclinées", sets: "3×12", note: "Pieds sur chaise" },
      { name: "Gainage dynamique", sets: "3×30sec", note: "Mountain climbers contrôlés" },
    ]
  },
];

const adjustments = [
  { rpe: "≤5 / 10", fatigue: "Faible", action: "Tu peux ajouter 10% volume, ou une séance bonus légère", color: "#2D7A3A", bg: "#D4F4D4" },
  { rpe: "6-7 / 10", fatigue: "Normale", action: "Plan nominal — bonne charge d'entraînement", color: "#C17F00", bg: "#FFF3CD" },
  { rpe: "8 / 10", fatigue: "Élevée", action: "Raccourcir la prochaine séance de 20%, supprimer les intensités", color: "#E06C00", bg: "#FFE5CC" },
  { rpe: "9-10 / 10", fatigue: "Critique", action: "Semaine de récupération obligatoire : volume -40%, pas d'intensité", color: "#C0392B", bg: "#FDDDD8" },
];

export default function TrainingPlan() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeWeek, setActiveWeek] = useState(0);
  const [activeTab, setActiveTab] = useState("plan");

  const phase = phases[activePhase];
  const week = phase.weeks[activeWeek] || phase.weeks[0];

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)",
      minHeight: "100vh",
      color: "#e8e0d0",
      padding: "0 0 60px 0"
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #000 0%, #0a0a0f 100%)",
        borderBottom: "1px solid #2a2a3a",
        padding: "32px 24px 20px",
        textAlign: "center"
      }}>
        <div style={{ fontSize: 11, letterSpacing: 6, color: "#6a6a8a", textTransform: "uppercase", marginBottom: 8, fontFamily: "monospace" }}>
          PLAN D'ENTRAÎNEMENT ANNUEL
        </div>
        <h1 style={{
          fontSize: "clamp(22px, 5vw, 38px)",
          fontWeight: "normal",
          margin: "0 0 4px 0",
          letterSpacing: 2,
          color: "#f0ece0"
        }}>
          Saison 2026 — Athlète U18
        </h1>
        <div style={{ fontSize: 13, color: "#8a8aaa", fontFamily: "monospace", letterSpacing: 1 }}>
          Ski de fond · Trail · Vélo · Gainage
        </div>

        {/* Stats strip */}
        <div style={{
          display: "flex", gap: 0, marginTop: 24,
          justifyContent: "center", flexWrap: "wrap",
          borderTop: "1px solid #2a2a3a",
          paddingTop: 20
        }}>
          {[
            { label: "Mois planifiés", val: "10" },
            { label: "Phases", val: "4" },
            { label: "Séances muscu/sem", val: "2" },
            { label: "Objectif A", val: "4-5 Avr" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "8px 20px",
              borderRight: i < 3 ? "1px solid #2a2a3a" : "none",
              textAlign: "center"
            }}>
              <div style={{ fontSize: 20, fontWeight: "bold", color: "#f0ece0", letterSpacing: 1 }}>{s.val}</div>
              <div style={{ fontSize: 10, color: "#6a6a8a", letterSpacing: 2, textTransform: "uppercase", marginTop: 2, fontFamily: "monospace" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, padding: "16px 16px 0", justifyContent: "center" }}>
        {[
          { id: "plan", label: "📋 Plan détaillé" },
          { id: "muscu", label: "💪 Circuits Muscu" },
          { id: "suivi", label: "📊 Gestion fatigue" },
          { id: "analyse", label: "🔍 Analyse hiver" },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            background: activeTab === tab.id ? "#e8e0d0" : "transparent",
            color: activeTab === tab.id ? "#0a0a0f" : "#8a8aaa",
            border: "1px solid " + (activeTab === tab.id ? "#e8e0d0" : "#2a2a3a"),
            borderRadius: 0,
            padding: "8px 14px",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "monospace",
            letterSpacing: 1,
            transition: "all 0.2s",
            borderRight: "none"
          }}>
            {tab.label}
          </button>
        ))}
        <div style={{ border: "1px solid #2a2a3a", width: 1 }} />
      </div>

      <div style={{ padding: "20px 16px", maxWidth: 800, margin: "0 auto" }}>

        {/* PLAN TAB */}
        {activeTab === "plan" && (
          <div>
            {/* Phase selector */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
              {phases.map((p, i) => (
                <button key={p.id} onClick={() => { setActivePhase(i); setActiveWeek(0); }} style={{
                  background: activePhase === i ? p.accent : "#12121a",
                  border: "1px solid " + (activePhase === i ? p.accent : "#2a2a3a"),
                  borderRadius: 4,
                  padding: "10px 8px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s"
                }}>
                  <div style={{ fontSize: 18, marginBottom: 2 }}>{p.icon}</div>
                  <div style={{ fontSize: 9, fontFamily: "monospace", letterSpacing: 1, color: activePhase === i ? "#fff" : "#8a8aaa", textTransform: "uppercase" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 9, color: activePhase === i ? "rgba(255,255,255,0.7)" : "#5a5a7a", marginTop: 2, fontFamily: "monospace" }}>
                    {p.period}
                  </div>
                </button>
              ))}
            </div>

            {/* Phase header */}
            <div style={{
              background: "#12121a",
              border: "1px solid #2a2a3a",
              borderLeft: "3px solid " + phase.accent,
              borderRadius: 4,
              padding: "16px 20px",
              marginBottom: 16
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 28 }}>{phase.icon}</span>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: 4, color: phase.accent, fontFamily: "monospace", textTransform: "uppercase" }}>
                    Phase {activePhase + 1} — {phase.name}
                  </div>
                  <div style={{ fontSize: 18, color: "#e8e0d0", marginTop: 2 }}>{phase.subtitle}</div>
                  <div style={{ fontSize: 11, color: "#6a6a8a", fontFamily: "monospace", marginTop: 2 }}>{phase.period}</div>
                </div>
              </div>
            </div>

            {/* Week selector */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {phase.weeks.map((w, i) => (
                <button key={i} onClick={() => setActiveWeek(i)} style={{
                  background: activeWeek === i ? phase.accent : "#12121a",
                  border: "1px solid " + (activeWeek === i ? phase.accent : "#2a2a3a"),
                  borderRadius: 3,
                  padding: "6px 12px",
                  cursor: "pointer",
                  color: activeWeek === i ? "#fff" : "#8a8aaa",
                  fontSize: 11,
                  fontFamily: "monospace",
                  letterSpacing: 0.5
                }}>
                  {w.num.split(" ")[0]} {w.num.split(" ")[1] || ""}
                </button>
              ))}
            </div>

            {/* Week detail */}
            <div style={{ background: "#12121a", border: "1px solid #2a2a3a", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ background: "#1a1a2a", padding: "12px 20px", borderBottom: "1px solid #2a2a3a" }}>
                <div style={{ fontSize: 12, color: phase.accent, fontFamily: "monospace", letterSpacing: 2, textTransform: "uppercase" }}>{week.num}</div>
                <div style={{ fontSize: 15, color: "#e8e0d0", marginTop: 2 }}>🎯 {week.label}</div>
              </div>
              {week.sessions.map((s, i) => {
                const typeColors = {
                  "Course": "#1A6FBF", "Trail": "#2D7A3A", "Ski Club": "#5B3DB8",
                  "Gainage": "#C17F00", "Muscu 💪": "#C0392B", "Renfo": "#C0392B",
                  "Renfo/Gainage": "#C0392B", "Circuit 💪🏖️": "#C0392B",
                  "Repos": "#5a5a7a", "Libre": "#5a5a7a", "Récup": "#5a5a7a",
                  "Multi-sport": "#2D7A3A", "Cross-training": "#2D7A3A",
                  "Sortie longue": "#2D7A3A", "Sortie": "#2D7A3A",
                  "Trail intensif": "#C0392B", "Trail long": "#2D7A3A",
                  "Trail/Vélo": "#2D7A3A", "Activation": "#C17F00",
                  "🏆 COURSE": "#B8860B",
                  "Course/Trail": "#2D7A3A",
                  "Vélo": "#1A6FBF",
                };
                const tc = typeColors[s.type] || "#5B3DB8";
                return (
                  <div key={i} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "12px 20px",
                    borderBottom: i < week.sessions.length - 1 ? "1px solid #1a1a2a" : "none",
                    background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)"
                  }}>
                    <div style={{
                      minWidth: 80, fontSize: 10, fontFamily: "monospace",
                      color: "#6a6a8a", paddingTop: 3, letterSpacing: 1
                    }}>
                      {s.day}
                    </div>
                    <div style={{
                      background: tc + "22", border: "1px solid " + tc + "55",
                      borderRadius: 3, padding: "2px 8px", fontSize: 10,
                      color: tc, fontFamily: "monospace", whiteSpace: "nowrap",
                      minWidth: 100, textAlign: "center", letterSpacing: 0.5
                    }}>
                      {s.type}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, color: "#d0c8b8", lineHeight: 1.5 }}>{s.content}</div>
                    </div>
                    <div style={{
                      fontSize: 10, fontFamily: "monospace", color: "#5a5a7a",
                      background: "#1a1a2a", borderRadius: 3, padding: "2px 6px",
                      whiteSpace: "nowrap"
                    }}>
                      RPE {s.rpe}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MUSCU TAB */}
        {activeTab === "muscu" && (
          <div>
            <div style={{
              background: "#12121a", border: "1px solid #2a2a3a",
              borderRadius: 4, padding: "16px 20px", marginBottom: 20
            }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#6a6a8a", fontFamily: "monospace", marginBottom: 8 }}>
                PRINCIPE
              </div>
              <p style={{ color: "#b0a898", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                2 séances courtes par semaine, jamais les jours de compétition ni la veille. 
                Circuit A le vendredi matin (léger), Circuit B le mardi soir (couplé à la course) OU découplé selon disponibilité. 
                Durée max 30 minutes — qualité > quantité.
              </p>
            </div>
            {muscuCircuits.map((circuit, ci) => (
              <div key={ci} style={{
                background: "#12121a", border: "1px solid #2a2a3a",
                borderLeft: "3px solid " + circuit.color,
                borderRadius: 4, overflow: "hidden", marginBottom: 16
              }}>
                <div style={{ background: "#1a1a2a", padding: "14px 20px", borderBottom: "1px solid #2a2a3a" }}>
                  <div style={{ fontSize: 14, color: "#e8e0d0", letterSpacing: 1 }}>{circuit.name}</div>
                  <div style={{ fontSize: 11, color: circuit.color, fontFamily: "monospace", marginTop: 3 }}>⏱ {circuit.duration}</div>
                </div>
                {circuit.exercises.map((ex, ei) => (
                  <div key={ei} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 20px",
                    borderBottom: ei < circuit.exercises.length - 1 ? "1px solid #1a1a2a" : "none"
                  }}>
                    <div>
                      <span style={{ fontSize: 13, color: "#d0c8b8" }}>{ex.name}</span>
                      {ex.note && <span style={{ fontSize: 11, color: "#5a5a7a", marginLeft: 8, fontStyle: "italic" }}>{ex.note}</span>}
                    </div>
                    <div style={{
                      background: circuit.color + "22", border: "1px solid " + circuit.color + "44",
                      borderRadius: 3, padding: "3px 10px", fontSize: 11,
                      color: circuit.color, fontFamily: "monospace"
                    }}>
                      {ex.sets}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div style={{
              background: "#12121a", border: "1px solid #5B3DB822",
              borderLeft: "3px solid #5B3DB8",
              borderRadius: 4, padding: "16px 20px", marginTop: 8
            }}>
              <div style={{ fontSize: 12, color: "#5B3DB8", fontFamily: "monospace", letterSpacing: 2, marginBottom: 8 }}>PROTOCOLE CHEVILLE</div>
              <div style={{ fontSize: 13, color: "#b0a898", lineHeight: 1.7 }}>
                À faire <strong style={{ color: "#e8e0d0" }}>TOUS LES SOIRS</strong> (3min) pendant 6 semaines minimum :<br/>
                • 20 rotations cheville chaque pied<br/>
                • 30sec équilibre unipodal chaque pied<br/>
                • 10 relevés de pointe unilatéraux (mollets)<br/>
                • Progression sur Bosu/coussin d'équilibre à partir du mois 2
              </div>
            </div>
          </div>
        )}

        {/* SUIVI TAB */}
        {activeTab === "suivi" && (
          <div>
            <div style={{
              background: "#12121a", border: "1px solid #2a2a3a",
              borderRadius: 4, padding: "16px 20px", marginBottom: 20
            }}>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "#6a6a8a", fontFamily: "monospace", marginBottom: 12 }}>
                STRUCTURE DU TABLEAU DE BORD (Excel/Sheets)
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "monospace" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid #2a2a3a" }}>
                      {["Colonne", "Contenu", "Fréquence"].map(h => (
                        <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#6a6a8a", letterSpacing: 1 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Date", "JJ/MM/AAAA", "Chaque séance"],
                      ["Sport", "Ski / Trail / Vélo / Muscu…", "Chaque séance"],
                      ["Durée (min)", "Temps effectif", "Chaque séance"],
                      ["Distance (km)", "Si pertinent", "Chaque séance"],
                      ["RPE séance", "1-10 (effort ressenti)", "Post-séance"],
                      ["Fatigue matin", "1-10 (en se levant)", "Quotidien"],
                      ["Qualité sommeil", "1-5 étoiles", "Quotidien"],
                      ["Poids (kg)", "Même condition, matin", "2x/semaine"],
                      ["Douleur cheville", "0=rien / 5=forte", "Post-séance"],
                      ["Charge semaine", "Σ(Durée × RPE)", "Automatique"],
                      ["Ressenti général", "Note libre", "Hebdo"],
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid #1a1a2a", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)" }}>
                        <td style={{ padding: "8px 12px", color: "#e8e0d0" }}>{row[0]}</td>
                        <td style={{ padding: "8px 12px", color: "#8a8aaa" }}>{row[1]}</td>
                        <td style={{ padding: "8px 12px", color: "#5a5a7a" }}>{row[2]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div style={{ marginBottom: 8, fontSize: 11, letterSpacing: 3, color: "#6a6a8a", fontFamily: "monospace" }}>
              RÈGLES D'AJUSTEMENT PAR RPE MOYEN HEBDOMADAIRE
            </div>
            {adjustments.map((adj, i) => (
              <div key={i} style={{
                background: "#12121a",
                border: "1px solid #2a2a3a",
                borderLeft: "3px solid " + adj.color,
                borderRadius: 4, padding: "14px 20px",
                marginBottom: 8,
                display: "flex", alignItems: "center", gap: 16
              }}>
                <div style={{ minWidth: 80 }}>
                  <div style={{
                    background: adj.color + "22", border: "1px solid " + adj.color + "55",
                    borderRadius: 3, padding: "4px 8px", textAlign: "center",
                    fontSize: 12, color: adj.color, fontFamily: "monospace"
                  }}>
                    {adj.rpe}
                  </div>
                  <div style={{ fontSize: 10, color: adj.color, textAlign: "center", marginTop: 4, fontFamily: "monospace" }}>
                    {adj.fatigue}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#b0a898", lineHeight: 1.5 }}>{adj.action}</div>
              </div>
            ))}

            <div style={{
              background: "#12121a", border: "1px solid #C17F0022",
              borderLeft: "3px solid #C17F00",
              borderRadius: 4, padding: "16px 20px", marginTop: 16
            }}>
              <div style={{ fontSize: 12, color: "#C17F00", fontFamily: "monospace", letterSpacing: 2, marginBottom: 10 }}>
                💡 FORMULE CHARGE HEBDOMADAIRE
              </div>
              <div style={{ background: "#0a0a0f", border: "1px solid #2a2a3a", borderRadius: 3, padding: "12px 16px", fontFamily: "monospace", fontSize: 13, color: "#e8e0d0" }}>
                Charge = Σ (Durée en min × RPE séance)
              </div>
              <div style={{ fontSize: 12, color: "#8a8aaa", marginTop: 10, lineHeight: 1.7 }}>
                Exemple : 50min à RPE 7 + 30min à RPE 4 + 20min à RPE 5 = 350 + 120 + 100 = <strong style={{ color: "#e8e0d0" }}>570 UA</strong><br/>
                Zone normale U18 hiver : 400-700 UA/semaine<br/>
                Zone rouge : &gt;900 UA/semaine sur 2+ semaines consécutives
              </div>
            </div>
          </div>
        )}

        {/* ANALYSE TAB */}
        {activeTab === "analyse" && (
          <div>
            <div style={{ fontSize: 11, letterSpacing: 3, color: "#6a6a8a", fontFamily: "monospace", marginBottom: 12 }}>
              ANALYSE — DÉC 2025 → MARS 2026
            </div>

            {[
              {
                month: "Décembre 2025", volume: "28h08", color: "#1A6FBF",
                sports: [{ name: "Ski de fond", time: "22h54", pct: 82 }, { name: "Running", time: "5h14", pct: 18 }],
                analysis: "Bon mois de base. Bonne répartition ski/running. Charge correcte pour U18 en période de compétition. Base aérobie solide visible.",
                points: ["✅ Volume solide et bien réparti", "✅ Régularité des sorties weekend", "⚠️ Peu/pas de muscu visible dans le calendrier", "⚠️ Intensités non identifiables depuis l'app"]
              },
              {
                month: "Janvier 2026", volume: "29h25", color: "#2D7A3A",
                sports: [{ name: "Ski de fond", time: "21h56", pct: 75 }, { name: "Running", time: "5h05", pct: 17 }, { name: "Ski rando", time: "2h22", pct: 8 }],
                analysis: "Très bon mois, pic de volume hiver. Introduction ski de randonnée = bonne variété. Volume légèrement au-dessus de décembre, progression maîtrisée.",
                points: ["✅ Volume de haut niveau pour U18", "✅ Variété des pratiques (ski rando)", "✅ Régularité weekend maintenue", "⚠️ Attention accumulation → février risqué"]
              },
              {
                month: "Février 2026", volume: "38h26", color: "#C0392B",
                sports: [{ name: "Ski de fond", time: "33h53", pct: 88 }, { name: "Running", time: "3h37", pct: 9 }, { name: "Muscu", time: "55m", pct: 2 }],
                analysis: "⚠️ SURCHAGE — +9h par rapport à janvier, soit +30%. Ce gros volume en fin de saison ski, combiné aux études, génère une fatigue accumulée significative à l'entrée de mars.",
                points: ["✅ Apparition muscu (55min — à développer!)", "🔴 Volume trop élevé : +30% en 1 mois", "🔴 Risque de fatigue accumulée élevé", "⚠️ Running sous-représenté vs ski (transition à planifier)"]
              },
              {
                month: "Mars 2026 (partiel)", volume: "11h54", color: "#5B3DB8",
                sports: [{ name: "Ski de fond", time: "9h58", pct: 84 }, { name: "Running", time: "1h56", pct: 16 }],
                analysis: "Chute logique de volume (mi-mars seulement + fatigue). C'est normal après février. Ne pas paniquer — c'est une récupération naturelle avant les courses d'avril.",
                points: ["✅ Réduction bienvenue après février chargé", "✅ Running maintenu (transition début)", "⚠️ Courses d'avril avec fatigue résiduelle → affûtage clé", "⚠️ Muscu disparue → à réintroduire immédiatement"]
              }
            ].map((m, i) => (
              <div key={i} style={{
                background: "#12121a", border: "1px solid #2a2a3a",
                borderLeft: "3px solid " + m.color,
                borderRadius: 4, padding: "16px 20px", marginBottom: 16
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 15, color: "#e8e0d0", letterSpacing: 1 }}>{m.month}</div>
                    <div style={{ fontSize: 22, color: m.color, fontFamily: "monospace", fontWeight: "bold", marginTop: 2 }}>{m.volume}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    {m.sports.map((s, si) => (
                      <div key={si} style={{ fontSize: 11, color: "#6a6a8a", fontFamily: "monospace", marginBottom: 2 }}>
                        <span style={{ color: "#b0a898" }}>{s.name}</span> · {s.time} ({s.pct}%)
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "#b0a898", lineHeight: 1.6, marginBottom: 10 }}>{m.analysis}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
                  {m.points.map((p, pi) => (
                    <div key={pi} style={{ fontSize: 11, color: "#8a8aaa", fontFamily: "monospace", lineHeight: 1.5 }}>{p}</div>
                  ))}
                </div>
              </div>
            ))}

            <div style={{
              background: "#12121a", border: "1px solid #C17F0033",
              borderLeft: "3px solid #C17F00",
              borderRadius: 4, padding: "16px 20px"
            }}>
              <div style={{ fontSize: 12, color: "#C17F00", fontFamily: "monospace", letterSpacing: 2, marginBottom: 10 }}>
                DIAGNOSTIC GLOBAL
              </div>
              <div style={{ fontSize: 13, color: "#b0a898", lineHeight: 1.8 }}>
                <strong style={{ color: "#e8e0d0" }}>Points forts :</strong> Excellente base aérobie ski de fond, régularité sur les weekends, volume hiver solide pour U18.<br/>
                <strong style={{ color: "#e8e0d0" }}>Points faibles :</strong> Quasi-absence de muscu/gainage, gestion de charge impulsive (février), transition ski→été non structurée.<br/>
                <strong style={{ color: "#e8e0d0" }}>État actuel :</strong> Fatigue résiduelle modérée. Affûtage nécessaire avant les 4-5 avril. Ne pas relancer le volume avant mi-avril.
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
