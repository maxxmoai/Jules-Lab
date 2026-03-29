// ================================
// FrostDrone - script.js
// Traduction FR / EN du site
// ================================

// On stocke toutes les traductions dans un objet
var traductions = {

  fr: {
    hero_tag:      "Drone climatiseur urbain",
    slogan:        "« La fraîcheur là où vous en avez besoin. »",
    btn_decouvrir: "En savoir plus",

    pres_titre: "Présentation du drone",
    c1_titre:   "Le problème",
    c1_texte:   "Les villes sont de plus en plus chaudes en été à cause des îlots de chaleur urbains. Le bitume stocke la chaleur et les climatiseurs aggravent le problème en rejetant encore plus de chaleur dans la rue.",
    c2_titre:   "Le drone",
    c2_texte:   "FrostDrone a une forme de stalactite avec des rotors silencieux en haut. Son corps contient un matériau à changement de phase (MCP) qui emmagasine le froid pendant la nuit et le libère pendant la journée.",
    c3_titre:   "Sa mission",
    c3_texte:   "Il se place en vol stationnaire au-dessus des arrêts de bus, des parcs ou des terrasses d'école pour créer une bulle d'air frais entre 18°C et 22°C sous lui.",

    fonc_titre: "Comment ça marche ?",
    e1_titre:   "La nuit : recharge",
    e1_texte:   "Le drone monte sur son toit de recharge. Des stations alimentées par panneaux solaires font recongeler le matériau MCP à l'intérieur du drone pour le soir.",
    e2_titre:   "Le jour : décollage",
    e2_texte:   "Grâce à ses capteurs thermiques, le drone détecte automatiquement les zones les plus chaudes de la ville ou les groupes de personnes en danger de chaleur.",
    e3_titre:   "En mission : refroidissement",
    e3_texte:   "Il aspire l'air chaud par le haut, le fait passer à travers son corps glacé, puis rejette un flux d'air frais vers le bas. Aucun produit chimique, juste de la physique.",
    e4_titre:   "Retour à la base",
    e4_texte:   "Quand tout le froid du MCP est utilisé, le drone retourne automatiquement à sa station sur les toits pour se recharger pendant la nuit suivante.",

    av_titre:   "Ses avantages",
    av1_titre:  "Économie d'eau",
    av1_texte:  "Pas de brumisation, donc aucune goutte d'eau gaspillée. Le refroidissement est uniquement physique.",
    av2_titre:  "Zéro pollution",
    av2_texte:  "Contrairement aux clims, FrostDrone n'utilise pas de fluides chimiques et ne rejette aucune chaleur dans la rue.",
    av3_titre:  "Intelligent",
    av3_texte:  "Ses capteurs thermiques repèrent les personnes vulnérables (personnes âgées, enfants) et priorisent les zones les plus dangereuses.",
    av4_titre:  "Énergie solaire",
    av4_texte:  "Les stations de recharge sur les toits fonctionnent uniquement avec des panneaux solaires. Aucune énergie fossile utilisée.",
    av5_titre:  "Mobile",
    av5_texte:  "Il peut intervenir partout : parcs, chantiers, marchés en plein air, arrêts de bus, là où les gens en ont vraiment besoin.",
    av6_titre:  "Silencieux",
    av6_texte:  "Ses rotors sont conçus pour être discrets. FrostDrone peut voler en ville sans déranger les habitants.",

    dur_titre: "Est-ce une solution durable pour le futur ?",
    dur_p1:    "Oui. FrostDrone ne fait pas que rafraîchir les gens : il absorbe la chaleur urbaine dans son corps et ne la relâche que sur les toits, loin des passants. C'est exactement l'inverse d'un climatiseur classique.",
    dur_p2:    "Il fonctionne à l'énergie solaire, ne consomme pas d'eau, et n'utilise aucun produit chimique. Le matériau MCP est réutilisable indéfiniment.",
    dur_p3:    "Comparé à un brumisateur (qui gaspille l'eau) ou un simple ventilateur (qui brasse de l'air déjà chaud), FrostDrone est la seule solution qui retire vraiment de la chaleur de l'air extérieur de manière mobile.",
    verdict:   "✅ FrostDrone : une climatisation urbaine propre, mobile et intelligente.",
    s1:        "d'eau consommée",
    s2:        "de CO₂ émis",
    s3:        "air soufflé en dessous",
    s4:        "énergie solaire",

    footer: "© 2026 FrostDrone — Concept imaginaire. Projet ETLV STI2D."
  },

  en: {
    hero_tag:      "Urban cooling drone",
    slogan:        "« Fresh air wherever you need it. »",
    btn_decouvrir: "Learn more",

    pres_titre: "Drone presentation",
    c1_titre:   "The problem",
    c1_texte:   "Cities are getting hotter every summer because of urban heat islands. Asphalt stores heat during the day and air conditioners make things worse by blowing even more heat into the streets.",
    c2_titre:   "The drone",
    c2_texte:   "FrostDrone has a stalactite shape with silent rotors on top. Its body contains a phase-change material (PCM) that stores coldness at night and releases it during the day.",
    c3_titre:   "Its mission",
    c3_texte:   "It hovers above bus stops, parks or school playgrounds to create a bubble of fresh air between 18°C and 22°C below it.",

    fonc_titre: "How does it work?",
    e1_titre:   "At night: recharging",
    e1_texte:   "The drone flies back to its rooftop station. Solar-powered units refreeze the PCM material inside the drone overnight.",
    e2_titre:   "During the day: takeoff",
    e2_texte:   "Using its thermal sensors, the drone automatically detects the hottest areas of the city or groups of people at risk of heat stress.",
    e3_titre:   "On mission: cooling",
    e3_texte:   "It sucks in hot air from the top, passes it through its frozen body, then blows a stream of cool air downward. No chemicals, just physics.",
    e4_titre:   "Return to base",
    e4_texte:   "When all the cold stored in the PCM is used up, the drone automatically returns to its rooftop station to recharge overnight.",

    av_titre:   "Its advantages",
    av1_titre:  "Water saving",
    av1_texte:  "No misting, so no water is wasted. The cooling process is entirely physical.",
    av2_titre:  "Zero pollution",
    av2_texte:  "Unlike air conditioners, FrostDrone uses no chemical fluids and releases no heat into the street.",
    av3_titre:  "Smart",
    av3_texte:  "Its thermal sensors detect vulnerable people (elderly, children) and prioritize the most dangerous areas.",
    av4_titre:  "Solar energy",
    av4_texte:  "Rooftop recharging stations run entirely on solar panels. No fossil fuel is used.",
    av5_titre:  "Mobile",
    av5_texte:  "It can go anywhere: parks, construction sites, open-air markets, bus stops — wherever people really need it.",
    av6_titre:  "Silent",
    av6_texte:  "Its rotors are designed to be discreet. FrostDrone can fly in the city without disturbing residents.",

    dur_titre: "Is it a sustainable solution for the future?",
    dur_p1:    "Yes. FrostDrone doesn't just cool people down: it absorbs urban heat into its body and only releases it on rooftops, far from pedestrians. This is the exact opposite of a traditional air conditioner.",
    dur_p2:    "It runs on solar energy, uses no water, and requires no chemicals. The PCM material can be reused endlessly just by refreezing it.",
    dur_p3:    "Compared to a misting fan (wastes water) or a regular fan (just moves hot air around), FrostDrone is the only solution that actually removes heat from the outdoor air in a mobile way.",
    verdict:   "✅ FrostDrone: a clean, mobile and intelligent urban cooling system.",
    s1:        "of water used",
    s2:        "of CO₂ emitted",
    s3:        "air blown below",
    s4:        "solar energy",

    footer: "© 2026 FrostDrone — Imaginary concept. ETLV STI2D project."
  }

};

// ---- La langue actuelle (on commence en français) ----
var langueActuelle = "fr";

// ---- Fonction qui met à jour tous les textes ----
function changerLangue(langue) {
  var t = traductions[langue];

  // On récupère tous les éléments qui ont l'attribut data-i18n
  var elements = document.querySelectorAll("[data-i18n]");

  // Pour chaque élément, on remplace son texte
  for (var i = 0; i < elements.length; i++) {
    var cle = elements[i].getAttribute("data-i18n");
    if (t[cle] != undefined) {
      elements[i].textContent = t[cle];
    }
  }

  // On met à jour le bouton
  if (langue === "fr") {
    document.getElementById("langBtn").textContent = "🌐 EN";
  } else {
    document.getElementById("langBtn").textContent = "🌐 FR";
  }

  // On change l'attribut lang de la page
  document.documentElement.lang = langue;
}

// ---- Quand on clique sur le bouton de langue ----
document.getElementById("langBtn").addEventListener("click", function() {
  if (langueActuelle === "fr") {
    langueActuelle = "en";
  } else {
    langueActuelle = "fr";
  }
  changerLangue(langueActuelle);
});
