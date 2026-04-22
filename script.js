document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     ELEMENTS
  =============================== */

  const openButton = document.getElementById('open-video-button');
  const videoOpener = document.getElementById('video-opener');
  const envelopeVideo = document.getElementById('envelope-video');
  const mainContentWrapper = document.getElementById('main-content-wrapper');

  const music = document.getElementById('background-music');
  const musicPlayer = document.getElementById('music-player');
  const musicIcon = document.getElementById('music-icon');

  let isPlaying = false;

  /* ===============================
     iOS AUDIO UNLOCK (CRITICAL)
  =============================== */

  // Priming the audio for iOS/Safari
  const unlockAudio = () => {
    music.play().then(() => {
      music.pause();
      music.currentTime = 0;
    }).catch(e => console.log("Audio warm-up: Interaction required"));
  };

  // Listen on any interaction to "warm up" the audio engine
  document.body.addEventListener('touchstart', unlockAudio, { once: true });
  document.body.addEventListener('click', unlockAudio, { once: true });

  /* ===============================
     OPEN BUTTON CLICK
  =============================== */

  const startExperience = (e) => {
  if (e) e.preventDefault();

  // Always mute video
  envelopeVideo.muted = true;

  // Hide button
  openButton.style.display = 'none';

  // Play video
  envelopeVideo.play().catch(err => console.warn('Video failed:', err));

  // Play music exactly when video starts
  envelopeVideo.onplay = () => {
    music.play().then(() => {
      isPlaying = true;
      musicIcon.classList.replace('fa-play', 'fa-pause');
    }).catch(err => {
      console.warn("Music failed:", err);
      isPlaying = false;
      musicIcon.classList.replace('fa-pause', 'fa-play');
    });
  };

  // Transition
  setTimeout(() => {
    videoOpener.style.opacity = '0';
    mainContentWrapper.style.opacity = '1';
    document.body.classList.remove('body-no-scroll');

    setTimeout(() => {
      videoOpener.style.display = 'none';
    }, 650);
  }, 6500);
};

  openButton.addEventListener('click', startExperience);
  openButton.addEventListener('touchstart', startExperience, { once: true });

  /* ===============================
     MUSIC TOGGLE
  =============================== */

  musicPlayer.addEventListener('click', async () => {
    try {
      if (isPlaying) {
        music.pause();
        musicIcon.classList.replace('fa-pause', 'fa-play');
        isPlaying = false;
      } else {
        await music.play();
        musicIcon.classList.replace('fa-play', 'fa-pause');
        isPlaying = true;
      }
    } catch (err) {
      console.warn('Toggle blocked:', err);
    }
  });

  /* ===============================
     SCROLL ANIMATIONS
  =============================== */

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.animate-on-scroll')
    .forEach(el => observer.observe(el));

  /* ===============================
     COUNTDOWN
  =============================== */

  const weddingDate = new Date(2026, 4, 3, 16, 0, 0).getTime();

  const timerInterval = setInterval(() => {
    const now = Date.now();
    const distance = weddingDate - now;

    if (distance > 0) {
      document.getElementById('days').innerText =
        Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      document.getElementById('hours').innerText =
        Math.floor((distance / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
      document.getElementById('minutes').innerText =
        Math.floor((distance / (1000 * 60)) % 60).toString().padStart(2, '0');
      document.getElementById('seconds').innerText =
        Math.floor((distance / 1000) % 60).toString().padStart(2, '0');
    } else {
      clearInterval(timerInterval);
      document.getElementById('countdown-timer').innerHTML =
        "<div class='col-span-4 text-3xl'>Happily Ever After!</div>";
    }
  }, 1000);

  /* ===============================
     LIGHTBOX
  =============================== */

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = [...document.querySelectorAll('#gallery-grid .gallery-item')];
  const galleryImages = galleryItems.map(item => item.querySelector('img'));

  let currentIndex = 0;

  const showImage = index => {
    lightboxImg.src = galleryImages[index].src;
    currentIndex = index;
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      lightbox.classList.add('show');
      showImage(index);
    });
  });

  document.getElementById('lightbox-close')
    .addEventListener('click', () => lightbox.classList.remove('show'));

  document.getElementById('lightbox-prev')
    .addEventListener('click', () =>
      showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length)
    );

  document.getElementById('lightbox-next')
    .addEventListener('click', () =>
      showImage((currentIndex + 1) % galleryImages.length)
    );

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('show');
  });

});

/* ===============================
   WHATSAPP
=============================== */

const whatsappBtn = document.getElementById("whatsapp-btn");

if (whatsappBtn) {
  whatsappBtn.addEventListener("click", () => {
    const name = document.getElementById("guest-name").value.trim();
    const message = document.getElementById("guest-message").value.trim();

    if (!name || !message) {
      alert("Please enter your name and message.");
      return;
    }

    const phoneNumber = "917025678013";

    const text = `Wedding Wishes

From: ${name}

Message:
${message}`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });
}
