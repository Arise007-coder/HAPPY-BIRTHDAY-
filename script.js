// --- 1. Music & Web Audio Sounds ---
const audioToggle = document.getElementById('audioToggle');
const bgMusic = document.getElementById('bgMusic');
let isPlaying = false;

audioToggle.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    audioToggle.innerText = '🎵 Sound: OFF';
  } else {
    bgMusic.play().catch(() => {});
    audioToggle.innerText = '🎶 Sound: ON';
  }
  isPlaying = !isPlaying;
});

// Synthesized Cute Cartoon Sounds
function playToySound(type) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  if (type === 'giggly') {
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.2);
  } else if (type === 'squeak') {
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
  } else {
    osc.frequency.setValueAtTime(400, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
  }

  osc.start();
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
  osc.stop(ctx.currentTime + 0.2);
}

// --- 2. Floating Letters Background ---
const nameLetters = ['P', 'R', 'A', 'N', 'I', 'K', 'A', 'P', 'U', 'C', 'H', 'K', 'I', '🌸', '✨'];
const lettersContainer = document.getElementById('sparkle-letters-container');

function createFloatingLetters() {
  for (let i = 0; i < 15; i++) {
    const span = document.createElement('span');
    span.className = 'sparkle-letter';
    span.innerText = nameLetters[Math.floor(Math.random() * nameLetters.length)];
    span.style.left = Math.random() * 90 + 'vw';
    span.style.animationDelay = Math.random() * 5 + 's';
    span.style.animationDuration = (6 + Math.random() * 4) + 's';
    lettersContainer.appendChild(span);
  }
}
createFloatingLetters();

// --- 3. Crown Selector ---
function changeCrown(crownEmoji) {
  document.getElementById('activeCrown').innerText = crownEmoji;
}

// --- 4. Balloon Pop Game ---
const balloonStage = document.getElementById('balloonStage');
const balloonEmojis = ['🎈', '💖', '⭐', '🎈', '🎉'];

function spawnBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.innerText = balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)];
  balloon.style.left = Math.random() * 80 + 10 + '%';

  balloon.addEventListener('click', () => {
    confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
    playToySound('pop');
    balloon.remove();
  });

  balloonStage.appendChild(balloon);
  setTimeout(() => balloon.remove(), 4000);
}

setInterval(spawnBalloon, 1500);

// --- 5. Interactive Sparkler & Candle Cake ---
let candleBlown = false;

function blowCandle() {
  const sparkler = document.getElementById('sparkler');
  const candle = document.getElementById('candle');
  const instructions = document.getElementById('cakeInstructions');

  if (!candleBlown) {
    sparkler.style.display = 'block';
    instructions.innerText = '✨ Sparklers burning... Blow hard!';
    playToySound('squeak');

    setTimeout(() => {
      sparkler.style.display = 'none';
      candle.innerText = '💨';
      instructions.innerText = '🎉 Yay! Happy 2nd Birthday Puchki!';
      candleBlown = true;

      // Confetti Explosion
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 2000);
  }
}

// --- 6. Local Storage Wish Jar ---
const jarContent = document.getElementById('jarContent');

function loadWishes() {
  const wishes = JSON.parse(localStorage.getItem('pranika_wishes') || '[]');
  jarContent.innerHTML = '';
  wishes.forEach(w => {
    const wishEl = document.createElement('div');
    wishEl.className = 'star-wish';
    wishEl.innerHTML = `<strong>${w.author}:</strong> ${w.text}`;
    jarContent.appendChild(wishEl);
  });
}

function addWishToJar() {
  const authorInput = document.getElementById('wishAuthor');
  const textInput = document.getElementById('wishText');

  if (!authorInput.value.trim() || !textInput.value.trim()) return;

  const wishes = JSON.parse(localStorage.getItem('pranika_wishes') || '[]');
  wishes.push({ author: authorInput.value.trim(), text: textInput.value.trim() });
  localStorage.setItem('pranika_wishes', JSON.stringify(wishes));

  authorInput.value = '';
  textInput.value = '';

  confetti({ particleCount: 30, spread: 40 });
  loadWishes();
}

// Initial Load
loadWishes();
