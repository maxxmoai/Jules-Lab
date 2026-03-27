const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainCard = document.getElementById('main-card');
const successScreen = document.getElementById('success-screen');

const phrases = [
    "Tu es sûre ?", 
    "Réfléchis encore...", 
    "Vraiment ?", 
    "Oups, raté !", 
    "Allez, clique sur l'autre !", 
    "T'es têtue toi !", 
    "Même pas en rêve ?"
];

let phraseIndex = 0;

// FONCTION : Faire fuir le bouton
noBtn.addEventListener('mouseover', () => {
    // Changement de position
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Easter Egg : Changer le texte du bouton Non
    noBtn.textContent = phrases[phraseIndex];
    phraseIndex = (phraseIndex + 1) % phrases.length;

    // Faire grossir le bouton OUI à chaque fois
    const currentScale = parseFloat(yesBtn.style.transform.replace('scale(', '')) || 1;
    yesBtn.style.transform = `scale(${currentScale + 0.15})`;
});

// FONCTION : Succès
yesBtn.addEventListener('click', () => {
    mainCard.classList.add('hidden');
    successScreen.classList.remove('hidden');
    createHearts();
});

// Easter Egg : Pluie de coeurs
function createHearts() {
    for(let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.opacity = Math.random();
            document.body.appendChild(heart);
            
            // On supprime après l'animation
            setTimeout(() => heart.remove(), 5000);
        }, i * 100);
    }
}