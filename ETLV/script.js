// ============================
// AEROZEN – script.js
// Système de traduction FR / EN
// ============================

const translations = {
  fr: {
    nav_home: "Accueil",
    nav_about: "Présentation",
    nav_how: "Fonctionnement",
    nav_why: "Avantages",
    nav_sustainable: "Durabilité",

    hero_tag: "Drone de nouvelle génération",
    hero_slogan: "« Silencieux. Intelligent. Indispensable. »",
    hero_cta: "Découvrir",

    about_label: "Qui sommes-nous ?",
    about_title: "Un drone conçu pour l'humain",

    card1_title: "Nom & Type",
    card1_text: "AEROZEN est un quadrirotor autonome ultra-silencieux, conçu pour les zones urbaines et semi-urbaines.",
    card2_title: "Mission",
    card2_text: "Livrer des médicaments, aider les secours d'urgence et surveiller les zones difficiles d'accès — sans bruit, sans pilote.",
    card3_title: "Où et pourquoi",
    card3_text: "Idéal pour les hôpitaux, les montagnes isolées, ou les catastrophes naturelles. Partout où chaque minute compte.",

    how_label: "Technologie",
    how_title: "Comment ça fonctionne ?",
    step1_title: "Navigation IA",
    step1_text: "AEROZEN utilise l'intelligence artificielle embarquée pour éviter les obstacles en temps réel et calculer le meilleur itinéraire.",
    step2_title: "Propulsion silencieuse",
    step2_text: "Ses rotors à géométrie variable réduisent le bruit à moins de 40 dB — aussi discret qu'un murmure.",
    step3_title: "Énergie hybride",
    step3_text: "Batterie lithium + mini cellules solaires intégrées. Autonomie de 90 minutes, recharge en 20 min.",
    step4_title: "Communication sécurisée",
    step4_text: "Liaison chiffrée 5G/satellite. Suivi en temps réel depuis n'importe quel appareil connecté.",

    why_label: "Avantages",
    why_title: "Pourquoi choisir AEROZEN ?",
    adv1_title: "Ultra silencieux",
    adv1_text: "Moins de 40 dB. Parfait pour les environnements sensibles.",
    adv2_title: "Rapide & fiable",
    adv2_text: "Jusqu'à 80 km/h. Livraison garantie même par mauvais temps.",
    adv3_title: "100% autonome",
    adv3_text: "Aucun pilote requis. Décollage, vol et atterrissage automatiques.",
    adv4_title: "Sécurisé",
    adv4_text: "Détection anti-collision, parachute de secours intégré.",
    adv5_title: "Écologique",
    adv5_text: "Zéro émission directe. Matériaux recyclés à 70%.",
    adv6_title: "Polyvalent",
    adv6_text: "Charge utile de 3 kg. Adapté à des dizaines de missions.",

    sus_label: "Durabilité",
    sus_title: "AEROZEN est-il une solution durable pour le futur ?",
    sus_p1: "Oui — et voici pourquoi. AEROZEN a été pensé dès le départ avec une vision durable. Ses moteurs électriques ne produisent aucune émission de CO₂ pendant le vol. Ses panneaux solaires intégrés réduisent la dépendance aux infrastructures de charge.",
    sus_p2: "La structure du drone est fabriquée à 70% de matériaux recyclés ou recyclables. Sa durée de vie est conçue pour dépasser 10 ans avec des pièces remplaçables modulairement — zéro gaspillage.",
    sus_p3: "Comparé à une camionnette de livraison, AEROZEN consomme jusqu'à 90% d'énergie en moins par livraison. Il réduit aussi la congestion urbaine et les accidents de la route.",
    sus_verdict: "✅ AEROZEN : une réponse concrète aux défis environnementaux de demain.",
    stat1: "d'énergie vs camionnette",
    stat2: "matériaux recyclés",
    stat3: "ans de durée de vie",
    stat4: "émission CO₂ directe",

    footer_text: "© 2026 AEROZEN – Concept imaginaire. Tous droits réservés.",
  },

  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_how: "How it works",
    nav_why: "Advantages",
    nav_sustainable: "Sustainability",

    hero_tag: "Next-generation drone",
    hero_slogan: "« Silent. Smart. Essential. »",
    hero_cta: "Discover",

    about_label: "Who are we?",
    about_title: "A drone built for humanity",

    card1_title: "Name & Type",
    card1_text: "AEROZEN is an ultra-quiet autonomous quadrotor, designed for urban and semi-urban environments.",
    card2_title: "Mission",
    card2_text: "Deliver medicines, assist emergency services and monitor hard-to-reach areas — noiseless, pilotless.",
    card3_title: "Where & Why",
    card3_text: "Perfect for hospitals, remote mountains, or natural disasters. Anywhere every second counts.",

    how_label: "Technology",
    how_title: "How does it work?",
    step1_title: "AI Navigation",
    step1_text: "AEROZEN uses onboard artificial intelligence to avoid obstacles in real time and calculate the best route.",
    step2_title: "Silent Propulsion",
    step2_text: "Its variable-geometry rotors reduce noise to under 40 dB — as quiet as a whisper.",
    step3_title: "Hybrid Energy",
    step3_text: "Lithium battery + built-in mini solar cells. 90-minute flight time, charged in 20 min.",
    step4_title: "Secure Communication",
    step4_text: "Encrypted 5G/satellite link. Real-time tracking from any connected device.",

    why_label: "Advantages",
    why_title: "Why choose AEROZEN?",
    adv1_title: "Ultra quiet",
    adv1_text: "Under 40 dB. Perfect for noise-sensitive environments.",
    adv2_title: "Fast & reliable",
    adv2_text: "Up to 80 km/h. Delivery guaranteed even in bad weather.",
    adv3_title: "Fully autonomous",
    adv3_text: "No pilot required. Automatic takeoff, flight, and landing.",
    adv4_title: "Secure",
    adv4_text: "Anti-collision detection, built-in emergency parachute.",
    adv5_title: "Eco-friendly",
    adv5_text: "Zero direct emissions. 70% recycled materials.",
    adv6_title: "Versatile",
    adv6_text: "3 kg payload. Suited for dozens of different missions.",

    sus_label: "Sustainability",
    sus_title: "Is AEROZEN a sustainable solution for the future?",
    sus_p1: "Yes — and here's why. AEROZEN was designed from the ground up with sustainability in mind. Its electric motors produce zero CO₂ emissions during flight. Integrated solar panels reduce reliance on charging infrastructure.",
    sus_p2: "The drone's frame is made from 70% recycled or recyclable materials. Its lifespan is designed to exceed 10 years with modularly replaceable parts — zero waste.",
    sus_p3: "Compared to a delivery van, AEROZEN uses up to 90% less energy per delivery. It also reduces urban traffic congestion and road accidents.",
    sus_verdict: "✅ AEROZEN: a real answer to tomorrow's environmental challenges.",
    stat1: "less energy vs. a van",
    stat2: "recycled materials",
    stat3: "years of lifespan",
    stat4: "direct CO₂ emission",

    footer_text: "© 2026 AEROZEN – Imaginary concept. All rights reserved.",
  }
};

// ---- State ----
let currentLang = 'fr';

// ---- Apply translations ----
function applyLang(lang) {
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.textContent = t[key];
    }
  });
  // Update button label
  document.getElementById('langBtn').textContent = lang === 'fr' ? '🌐 EN' : '🌐 FR';
  document.documentElement.lang = lang;
}

// ---- Toggle language ----
document.getElementById('langBtn').addEventListener('click', () => {
  currentLang = currentLang === 'fr' ? 'en' : 'fr';
  applyLang(currentLang);
});

// ---- Navbar scroll shadow ----
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// ---- Scroll reveal animation ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .step, .adv-item, .stat, .sus-text p').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Add reveal CSS dynamically
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: none;
  }
`;
document.head.appendChild(style);
