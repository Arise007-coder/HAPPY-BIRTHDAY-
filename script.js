// Sound Control Logic
const audioToggle = document.getElementById('audioToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

function startMusic() {
  if (bgMusic && !isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      if (audioToggle) audioToggle.innerText = '🔊 Sound: ON';
    }).catch(e => console.log('Audio waiting for user gesture:', e));
  }
}

if (audioToggle) {
  audioToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
      audioToggle.innerText = '🎵 Sound: OFF';
      isPlaying = false;
    } else {
      startMusic();
    }
  });
}

// Slide Navigation
function scrollToSlide(slideId) {
  startMusic();
  const target = document.getElementById(slideId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}

// Toy Sound & Custom Confetti Effects
function playToySound(type) {
  startMusic();
  if (typeof confetti === 'function') {
    if (type === 'teddy') {
      confetti({ particleCount: 40, spread: 60, colors: ['#ffb3c1', '#ff477e'] });
    } else if (type === 'duckie') {
      confetti({ particleCount: 40, spread: 60, colors: ['#ffda33', '#ffa07a'] });
    } else if (type === 'flutter') {
      confetti({ particleCount: 50, spread: 90, colors: ['#a1c4fd', '#c2e9fb', '#ffb3c1'] });
    }
  }
}

// Upgraded Crown Switcher & Sizing
function changeCrown(crownEmoji) {
  const crownOverlay = document.getElementById('activeCrown');
  crownOverlay.innerText = crownEmoji;
}

let crownSizes = ['size-small', 'size-medium', 'size-large'];
let currentSizeIndex = 1;

function adjustCrownSize(direction) {
  const crownOverlay = document.getElementById('activeCrown');
  crownOverlay.classList.remove(crownSizes[currentSizeIndex]);
  
  if (direction === 'bigger' && currentSizeIndex < crownSizes.length - 1) {
    currentSizeIndex++;
  } else if (direction === 'smaller' && currentSizeIndex > 0) {
    currentSizeIndex--;
  }
  
  crownOverlay.classList.add(crownSizes[currentSizeIndex]);
}

// Multi-Color Balloon Spawner Game
const balloonStage = document.getElementById('balloonStage');
const balloonColors = ['🎈', '🔴', '🟡', '🔵', '🟢', '💜', '💗', '⭐'];

function spawnBalloon() {
  if (!balloonStage) return;
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.innerText = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  balloon.style.left = Math.random() * 80 + 10 + '%';
  
  balloon.onclick = () => {
    if (typeof confetti === 'function') {
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
    }
    balloon.remove();
  };

  balloonStage.appendChild(balloon);
  setTimeout(() => { if (balloon.parentNode) balloon.remove(); }, 3500);
}
setInterval(spawnBalloon, 1800);

// Cake & Candle Logic
let candleBlown = false;
function blowCandle() {
  const candle = document.getElementById('candle');
  const sparkler = document.getElementById('sparkler');
  const instructions = document.getElementById('cakeInstructions');

  if (!candleBlown) {
    candle.innerText = '💨';
    sparkler.style.display = 'block';
    instructions.innerText = 'Yay! Make a wish for Pranika! ✨🎉';
    if (typeof confetti === 'function') {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
    candleBlown = true;
  }
}

// Wish Jar Logic
function addWishToJar() {
  const author = document.getElementById('wishAuthor').value.trim();
  const wish = document.getElementById('wishText').value.trim();
  const jarContent = document.getElementById('jarContent');

  if (author && wish) {
    const note = document.createElement('div');
    note.className = 'jar-note';
    note.innerHTML = `<strong>${author}:</strong> ${wish}`;
    jarContent.prepend(note);

    document.getElementById('wishAuthor').value = '';
    document.getElementById('wishText').value = '';

    if (typeof confetti === 'function') {
      confetti({ particleCount: 20, spread: 30, origin: { y: 0.9 } });
    }
  }
}

// Archery Intro Game
function shootArrowAtBalloon() {
  startMusic();
  const arrow = document.getElementById('flyingArrow');
  const balloon = document.getElementById('targetBalloon');
  
  arrow.classList.add('shoot');
  
  setTimeout(() => {
    balloon.style.transform = 'scale(0)';
    if (typeof confetti === 'function') {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.4 } });
    }
    setTimeout(() => { enterMainSite(); }, 450);
  }, 480);
}

function enterMainSite() {
  startMusic();
  const splash = document.getElementById('introSplash');
  if (splash) splash.classList.add('hidden');
}

// Magic Wand Sparkle Trail on Drag
const sparkleIcons = ['✨', '⭐', '🌸', '💖'];
window.addEventListener('touchmove', (e) => {
  const touch = e.touches[0];
  createSparkle(touch.clientX, touch.clientY);
});
window.addEventListener('mousemove', (e) => {
  if (e.buttons === 1) createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'magic-sparkle';
  sparkle.innerText = sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
}
