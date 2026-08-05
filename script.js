// Web Audio Synthesizer (Zero external file dependencies for SFX!)
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSynthSound(type) {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  if (type === 'pop') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  } else if (type === 'duck') {
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(300, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(150, audioCtx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } else if (type === 'chime') {
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
    osc.frequency.linearRampToValueAtTime(1046.50, audioCtx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.4, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, audioCtx.currentTime + 0.25);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.25);
  }
}

// Background Audio Handler
let isAudioPlaying = false;

function initAudioOnFirstTouch() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function toggleAudio(e) {
  if(e) e.stopPropagation();
  const bgMusic = document.getElementById('bgMusic');
  const btn = document.getElementById('audioToggle');

  if (!bgMusic) return;

  if (isAudioPlaying) {
    bgMusic.pause();
    isAudioPlaying = false;
    btn.innerText = '🔇 Sound: OFF';
    btn.classList.remove('is-on');
  } else {
    bgMusic.play().then(() => {
      isAudioPlaying = true;
      btn.innerText = '🔊 Sound: ON';
      btn.classList.add('is-on');
    }).catch(err => {
      console.log("Audio waiting for touch:", err);
      bgMusic.muted = false;
      bgMusic.play();
      isAudioPlaying = true;
      btn.innerText = '🔊 Sound: ON';
      btn.classList.add('is-on');
    });
  }
}

function startMusic() {
  if (!isAudioPlaying) toggleAudio();
}

// Slide Navigation
function scrollToSlide(slideId) {
  startMusic();
  const target = document.getElementById(slideId);
  if (target) target.scrollIntoView({ behavior: 'smooth' });
}

// Toy Box Functionality
function playToySound(type) {
  startMusic();
  if (type === 'teddy') {
    playSynthSound('chime');
    if (typeof confetti === 'function') confetti({ particleCount: 35, spread: 50, colors: ['#ffb3c1', '#ff477e'] });
  } else if (type === 'duckie') {
    playSynthSound('duck');
    if (typeof confetti === 'function') confetti({ particleCount: 35, spread: 50, colors: ['#ffda33', '#ffa07a'] });
  } else if (type === 'flutter') {
    playSynthSound('chime');
    if (typeof confetti === 'function') confetti({ particleCount: 45, spread: 80, colors: ['#a1c4fd', '#c2e9fb'] });
  }
}

// Crown Customization Controls
function changeCrown(crownEmoji) {
  playSynthSound('chime');
  document.getElementById('activeCrown').innerText = crownEmoji;
}

let crownSizes = ['size-small', 'size-medium', 'size-large'];
let currentSizeIndex = 1;
function adjustCrownSize(direction) {
  const crownOverlay = document.getElementById('activeCrown');
  crownOverlay.classList.remove(crownSizes[currentSizeIndex]);
  if (direction === 'bigger' && currentSizeIndex < crownSizes.length - 1) currentSizeIndex++;
  else if (direction === 'smaller' && currentSizeIndex > 0) currentSizeIndex--;
  crownOverlay.classList.add(crownSizes[currentSizeIndex]);
}

// Letter Balloon Game Logic
const spellingSequence = ['H','A','P','P','Y',' ','B','I','R','T','H','D','A','Y'];
let currentSpellIndex = 0;
let spelledResult = "";

function spawnBalloon() {
  const balloonStage = document.getElementById('balloonStage');
  if (!balloonStage) return;

  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.innerText = '🎈';

  const letter = spellingSequence[Math.floor(Math.random() * spellingSequence.length)];
  const tag = document.createElement('span');
  tag.className = 'letter-tag';
  tag.innerText = letter;
  balloon.appendChild(tag);

  balloon.style.left = Math.random() * 80 + 10 + '%';

  balloon.onclick = () => {
    playSynthSound('pop');
    if (typeof confetti === 'function') confetti({ particleCount: 30, spread: 50 });

    if (letter !== ' ') {
      spelledResult += letter + " ";
      document.getElementById('spelledMessage').innerText = "Spelled: " + spelledResult;
    }
    balloon.remove();
  };

  balloonStage.appendChild(balloon);
  setTimeout(() => { if (balloon.parentNode) balloon.remove(); }, 3500);
}
setInterval(spawnBalloon, 1600);

// Candle Blowing Logic
let candleBlown = false;
function blowCandle() {
  if (!candleBlown) {
    playSynthSound('chime');
    document.getElementById('candle').innerText = '💨';
    document.getElementById('sparkler').style.display = 'block';
    document.getElementById('cakeInstructions').innerText = 'Yay! Make a wish for Pranika! ✨🎉';
    if (typeof confetti === 'function') confetti({ particleCount: 100, spread: 80 });
    candleBlown = true;
  }
}

// Wish Jar
function addWishToJar() {
  const author = document.getElementById('wishAuthor').value.trim();
  const wish = document.getElementById('wishText').value.trim();
  const jarContent = document.getElementById('jarContent');

  if (author && wish) {
    playSynthSound('chime');
    const note = document.createElement('div');
    note.className = 'jar-note';
    note.innerHTML = `<strong>${author}:</strong> ${wish}`;
    jarContent.prepend(note);

    document.getElementById('wishAuthor').value = '';
    document.getElementById('wishText').value = '';
    if (typeof confetti === 'function') confetti({ particleCount: 25, spread: 40 });
  }
}

// Intro Knife Game
let remainingSplashBalloons = 5;

function throwKnife() {
  startMusic();
  const knife = document.getElementById('flyingKnife');
  knife.classList.add('throw');

  setTimeout(() => {
    const balloons = document.querySelectorAll('.splash-balloon:not(.popped)');
    if (balloons.length > 0) {
      const target = balloons[0];
      target.classList.add('popped');
      playSynthSound('pop');
      if (typeof confetti === 'function') confetti({ particleCount: 35, spread: 60 });
      remainingSplashBalloons--;
    }

    setTimeout(() => {
      knife.classList.remove('throw');
      if (remainingSplashBalloons <= 0) {
        enterMainSite();
      }
    }, 200);
  }, 350);
}

function popSplashBalloon(el) {
  startMusic();
  if (!el.classList.contains('popped')) {
    el.classList.add('popped');
    playSynthSound('pop');
    if (typeof confetti === 'function') confetti({ particleCount: 30, spread: 50 });
    remainingSplashBalloons--;
    if (remainingSplashBalloons <= 0) enterMainSite();
  }
}

function enterMainSite() {
  startMusic();
  const splash = document.getElementById('introSplash');
  if (splash) splash.classList.add('hidden');
}
