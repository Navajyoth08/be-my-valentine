const heartsBg = document.getElementById('heartsBg');
const heartEmojis = ['❤️', '💖', '💕', '💘', '💗', '🤍'];
for(let i=0; i<30; i++) {
    const h = document.createElement('div');
    h.classList.add('bg-heart');
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDuration = (Math.random() * 10 + 5) + 's, ' + (Math.random() * 3 + 2) + 's';
    h.style.animationDelay = (Math.random() * 5) + 's, 0s';
    h.style.fontSize = (Math.random() * 20 + 15) + 'px';
    heartsBg.appendChild(h);
}

const noBtn = document.getElementById('noBtn');
const noBtnWrapper = document.getElementById('noBtnWrapper');
const yesBtn = document.getElementById('yesBtn');
const mainCard = document.getElementById('mainCard');
const successMessage = document.getElementById('successMessage');
const microcopy = document.getElementById('microcopy');

const phrases = [
    "Are you sure? 🤨", 
    "Think again! 🤔", 
    "Don't do it! 😭", 
    "You're breaking my heart 💔", 
    "Error 404: 'No' disabled 🚫", 
    "I'm literally crying 🌊", 
    "Please reconsider... 🥺", 
    "I have cookies! 🍪",
    "This button is allergic to you!"
];
let phraseIndex = 0;
let isMoved = false;

function moveNoButton() {
    if (!isMoved) {
        noBtnWrapper.style.width = noBtn.offsetWidth + 'px';
        noBtnWrapper.style.height = noBtn.offsetHeight + 'px';
        
        const rect = noBtn.getBoundingClientRect();
        noBtn.style.position = 'fixed';
        noBtn.style.left = rect.left + 'px';
        noBtn.style.top = rect.top + 'px';
        isMoved = true;
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                moveToRandomPosition();
            });
        });
        return;
    }
    moveToRandomPosition();
}

function moveToRandomPosition() {
    const padding = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
    
    noBtn.style.transition = `all ${Math.random() * 0.15 + 0.15}s ease-out`;
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    microcopy.textContent = phrases[phraseIndex];
    phraseIndex = (phraseIndex + 1) % phrases.length;
}

noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); 
    moveNoButton();
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

yesBtn.addEventListener('click', () => {
    mainCard.style.display = 'none';
    successMessage.style.display = 'block';
    setTimeout(() => {
        successMessage.classList.add('show');
    }, 50);
    
    launchConfetti();
});

function launchConfetti() {
    const emojis = ['💖', '✨', '🎉', '💐', '🥰', '💕'];
    for(let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        
        const duration = Math.random() * 3 + 2;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.fontSize = (Math.random() * 15 + 15) + 'px';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, (duration + 2) * 1000);
    }
}
