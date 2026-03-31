const heartsBg = document.getElementById('heartsBg');
const heartEmojis = ['❤️', '💖', '💕', '💘', '💗', '🤍', '✨'];
for(let i=0; i<40; i++) {
    const h = document.createElement('div');
    h.classList.add('bg-heart');
    h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    h.style.left = Math.random() * 100 + 'vw';
    h.style.animationDuration = (Math.random() * 8 + 4) + 's, ' + (Math.random() * 3 + 2) + 's';
    h.style.animationDelay = (Math.random() * 5) + 's, 0s';
    h.style.fontSize = (Math.random() * 25 + 10) + 'px';
    h.style.opacity = Math.random() * 0.5 + 0.3;
    heartsBg.appendChild(h);
}

const noBtn = document.getElementById('noBtn');
const noBtnWrapper = document.getElementById('noBtnWrapper');
const yesBtn = document.getElementById('yesBtn');
const mainCard = document.getElementById('mainCard');
const cardContainer = document.getElementById('cardContainer');
const successMessage = document.getElementById('successMessage');
const microcopy = document.getElementById('microcopy');

// 3D Tilt Effect on mousemove
const maxTilt = 15; // degrees
cardContainer.addEventListener('mousemove', (e) => {
    // Only apply tilt on desktop
    if (window.innerWidth <= 768) return;
    
    const rect = cardContainer.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    
    mainCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
});

cardContainer.addEventListener('mouseleave', () => {
    mainCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    mainCard.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
});

cardContainer.addEventListener('mouseenter', () => {
    mainCard.style.transition = 'transform 0.1s ease-out';
});


const phrases = [
    "Are you sure? 🤨", 
    "Think again! 🤔", 
    "Don't do it! 😭", 
    "You're breaking my heart 💔", 
    "Error 404: 'No' disabled 🚫", 
    "I'm literally crying 🌊", 
    "Please reconsider... 🥺", 
    "I have cookies! 🍪",
    "Is that your final answer? 👀",
    "I'll buy you food! 🍔",
    "This button is allergic to you!"
];
let phraseIndex = 0;
let isMoved = false;

// Proximity detection for "No" button
document.addEventListener('mousemove', (e) => {
    const rect = noBtn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;
    
    // Calculate distance between cursor and button center
    const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
    
    // If cursor is within 150 pixels (increased for better effect), trigger evasion
    if (distance < 150) {
        moveNoButton();
    }
});

function moveNoButton() {
    if (!isMoved) {
        // Set wrapper size to prevent layout shift in the original card
        noBtnWrapper.style.width = noBtn.offsetWidth + 'px';
        noBtnWrapper.style.height = noBtn.offsetHeight + 'px';
        
        const rect = noBtn.getBoundingClientRect();
        
        // Essential: Move button to document body to escape parent transform constraints
        document.body.appendChild(noBtn);
        
        noBtn.style.position = 'fixed';
        noBtn.style.left = rect.left + 'px';
        noBtn.style.top = rect.top + 'px';
        noBtn.style.zIndex = '9999';
        isMoved = true;
        
        // Double RAF hack to ensure the DOM move is processed before the first jump
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                moveToRandomPosition();
            });
        });
        return;
    }
    moveToRandomPosition();
}

let yesBtnScale = 1;

function moveToRandomPosition() {
    const padding = 60;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;
    
    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));
    
    // Smooth but slightly chaotic escape animation
    noBtn.style.transition = `all ${Math.random() * 0.2 + 0.1}s cubic-bezier(0.34, 1.56, 0.64, 1)`;
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    
    // Add random rotation and scale for a more "panicked" look
    const randomRotate = Math.floor(Math.random() * 60) - 30;
    const randomScale = Math.random() * 0.2 + 0.9;
    noBtn.style.transform = `rotate(${randomRotate}deg) scale(${randomScale})`;
    
    // Evolution: Make the YES button grow bigger!
    yesBtnScale += 0.15;
    yesBtn.style.setProperty('--btn-scale', yesBtnScale);
    yesBtn.style.zIndex = '1000'; // Keep it above other elements as it grows
    
    // Update microcopy with a fun message
    microcopy.textContent = phrases[phraseIndex];
    phraseIndex = (phraseIndex + 1) % phrases.length;
    
    // Visual feedback on the message
    microcopy.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    microcopy.style.transform = 'scale(1.2)';
    microcopy.style.color = '#ff0033';
    setTimeout(() => {
        microcopy.style.transform = 'scale(1)';
        microcopy.style.color = '#ef233c';
    }, 150);
}

// Keep hover/touch/click as fallbacks
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
    // Hide main card gracefully
    mainCard.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s ease';
    mainCard.style.transform = 'scale(0) rotateX(45deg)';
    mainCard.style.opacity = '0';
    
    // Remove the fleeing "No" button if it's currently on the loose
    if (isMoved) {
        noBtn.style.transition = 'all 0.5s ease';
        noBtn.style.transform = 'scale(0) rotate(720deg)';
        noBtn.style.opacity = '0';
        setTimeout(() => noBtn.remove(), 500);
    }
    
    setTimeout(() => {
        cardContainer.style.display = 'none';
        successMessage.style.display = 'block';
        setTimeout(() => {
            successMessage.classList.add('show');
            launchConfetti();
        }, 50);
    }, 500);
});

function launchConfetti() {
    if (typeof confetti === 'function') {
        const duration = 8 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            
            // Generate confetti from two sides
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ff4d6d', '#ff758f', '#ffb3c6', '#ffffff'] 
            }));
            confetti(Object.assign({}, defaults, { 
                particleCount, 
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ff4d6d', '#ff758f', '#ffb3c6', '#ffffff'] 
            }));
        }, 250);
    } else {
        // Fallback CSS confetti (just in case the CDN fails)
        const emojis = ['💖', '✨', '🎉', '💐', '🥰', '💕'];
        for(let i = 0; i < 150; i++) {
            const el = document.createElement('div');
            el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            el.style.left = Math.random() * 100 + 'vw';
            
            const duration = Math.random() * 3 + 2;
            el.style.animationDuration = duration + 's';
            el.style.animationDelay = Math.random() * 2 + 's';
            el.style.fontSize = (Math.random() * 15 + 15) + 'px';
            el.style.position = 'fixed';
            el.style.top = '-50px';
            el.style.zIndex = '100';
            el.style.pointerEvents = 'none';
            el.style.animation = `fall ${duration}s linear forwards`;
            
            document.body.appendChild(el);
            setTimeout(() => el.remove(), (duration + 2) * 1000);
        }
    }
}
