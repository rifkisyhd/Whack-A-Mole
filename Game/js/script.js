const tanah = document.querySelectorAll('.tanah');
const tikus = document.querySelectorAll('.tikus');
const papanSkor = document.querySelector('.papan-skor');
const pop = document.querySelector('#pop');

let tanahSebelumnya;
let selesai;
let skor;
let durasiPermainan = 35; // Durasi permainan dalam detik
let waktuSisa = durasiPermainan;
let timerInterval;
let highScore = 0;


function randomTanah(tanah) {
  const t = Math.floor(Math.random() * tanah.length);
  const tRandom = tanah[t];
  if (tRandom == tanahSebelumnya) {
    randomTanah(tanah);
  }
  tanahSebelumnya = tRandom;
  return tRandom;
}

function randomWaktu(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function munculkanTikus() {
  const tRandom = randomTanah(tanah);
  const wRandom = randomWaktu(300, 1000);
  tRandom.classList.add('muncul');

  setTimeout(() => {
    tRandom.classList.remove('muncul');
    if (!selesai) {
      munculkanTikus();
    }
  }, wRandom);
}

function mulai() {
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  document.querySelector('.skor').textContent = skor;
  munculkanTikus();
  setTimeout(() => {
    selesai = true;
  }, 10000);
}

function pukul() {
  skor++;
  this.parentNode.classList.remove('muncul');
  pop.play();
  papanSkor.textContent = skor;
}

tikus.forEach(t => {
  t.addEventListener('click', pukul);
});

function updateTimer() {
  const menit = Math.floor(waktuSisa / 60);
  let detik = waktuSisa % 60;
  if (detik < 10) {
    detik = '0' + detik;
  }

  const timerText = `${menit}:${detik}`;
  document.querySelector('.timer').textContent = timerText;

  waktuSisa--;
  if (waktuSisa < 0) {
    clearInterval(timerInterval);
    selesai = true;
    document.getElementById('final-score').textContent = skor;
    showPopup();
  }  
}

function mulai() {
  // Reset timer
  waktuSisa = durasiPermainan;
  clearInterval(timerInterval);
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);

  // Jalankan permainan
  selesai = false;
  skor = 0;
  papanSkor.textContent = 0;
  munculkanTikus();
  setTimeout(() => {
    selesai = true;
  }, durasiPermainan * 1000); 
}

function updateHighScore() {
  if (skor > highScore) {
    highScore = skor;
    document.querySelector('.high-score').textContent = highScore;
  }
}

function resetGame() {
  clearInterval(timerInterval);
  selesai = true;
  skor = 0;
  waktuSisa = durasiPermainan;
  papanSkor.textContent = 0;
  updateTimer();
  document.querySelector('.timer').textContent = '00:00';
  document.querySelectorAll('.tanah').forEach(tanah => {
    tanah.classList.remove('muncul');
  });
  updateHighScore();
}


function pukul() {
  skor++;
  this.parentNode.classList.remove('muncul');
  pop.play();
  papanSkor.textContent = skor;
  updateHighScore();
}

document.querySelector('.reset').addEventListener('click', resetGame);

function showPopup() {
  document.getElementById('popup-container').style.display = 'block';
  document.getElementById('popup-container').addEventListener('click', function(event) {
    if (event.target === this) {
      closePopup();
    }
  });
  
}

function closePopup() {
  document.getElementById('popup-container').style.display = 'none';
}
