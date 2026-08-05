// Sound Toggle Logic
const audioToggle = document.getElementById('audioToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

audioToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    audioToggle.innerText = '🎵 Sound: OFF';
  } else {
    bgMusic.play();
    audioToggle.innerText = '🔊 Sound: ON';
  }
  isPlaying = !isPlaying;
});

// Toy Sound Effects
function playToySound(type) {
  if (typeof confetti === 'function') {
    confetti({ particleCount: 25, spread: 40, origin: { y: 0.8 } });
  }
}

// Crown Switcher
function changeCrown(crownEmoji) {
  document.getElementById('activeCrown').innerText = crownEmoji;
}

// Balloon Spawner Game
const balloonStage = document.getElementById('balloonStage');
const balloonColors = ['🎈', '💖', '⭐', '🎈'];

function spawnBalloon() {
  if (!balloonStage) return;
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.innerText = balloonColors[Math.floor(Math.random() * balloonColors.length)];
  balloon.style.left = Math.random() * 80 + 10 + '%';
  
  balloon.onclick = () => {
    if (typeof confetti === 'function') {
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }
    balloon.remove();
  };

  balloonStage.appendChild(balloon);
  setTimeout(() => balloon.remove(), 4000);
}

setInterval(spawnBalloon, 2000);

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

// ARCHERY INTRO GAME SCRIPT
function shootArrowAtBalloon() {
  const arrow = document.getElementById('flyingArrow');
  const balloon = document.getElementById('targetBalloon');
  
  arrow.classList.add('shoot');
  
  setTimeout(() => {
    balloon.style.transform = 'scale(0)';
    
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.4 }
      });
    }

    setTimeout(() => {
      enterMainSite();
    }, 400);
  }, 500);
}

function enterMainSite() {
  const splash = document.getElementById('introSplash');
  splash.classList.add('hidden');
}
