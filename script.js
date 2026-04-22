document.addEventListener('DOMContentLoaded', () => {

  /* ===============================
     VIDEO OPENER + MUSIC START
     =============================== */

  const openButton = document.getElementById('open-video-button');
  const videoOpener = document.getElementById('video-opener');
  const envelopeVideo = document.getElementById('envelope-video');
  const mainContentWrapper = document.getElementById('main-content-wrapper');

  const music = document.getElementById('background-music');
  const musicPlayer = document.getElementById('music-player');
  const musicIcon = document.getElementById('music-icon');

  let isPlaying = true;

  openButton.addEventListener('click', async () => {
    openButton.style.display = 'none';
    envelopeVideo.play();

    // ✅ Start music ONLY after user click
    try {
      music.volume = 0.7;
      await music.play();
      musicIcon.classList.remove('fa-play');
      musicIcon.classList.add('fa-pause');
      isPlaying = true; // 🔥 CRITICAL FIX
    } catch (err) {
      console.warn('Music blocked:', err);
    }

    setTimeout(() => {
      videoOpener.style.opacity = '0';
      mainContentWrapper.style.opacity = '1';
      document.body.classList.remove('body-no-scroll');

      setTimeout(() => {
        videoOpener.style.display = 'none';
      }, 650);
    }, 6500);
  });

  /* ===============================
     MUSIC PLAYER TOGGLE
     =============================== */

  musicPlayer.addEventListener('click', async () => {
    try {
      if (isPlaying) {
        music.pause();
        musicIcon.classList.remove('fa-pause');
        musicIcon.classList.add('fa-play');
        isPlaying = false;
      } else {
        await music.play();
        musicIcon.classList.remove('fa-play');
        musicIcon.classList.add('fa-pause');
        isPlaying = true;
      }
    } catch (err) {
      console.warn('Music toggle blocked:', err);
    }
  });

  /* ===============================
     CUSTOM CURSOR
     =============================== */

  const cursor = document.querySelector('.custom-cursor');
  document.addEventListener('mousemove', e => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  document.querySelectorAll('a, button, input, [class*="cursor-pointer"]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
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

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  /* ===============================
     COUNTDOWN TIMER
     =============================== */

  const weddingDate = new Date(2026, 3, 29, 11, 0, 0).getTime(); // April 29, 2026, 11:00 AM

  const timerInterval = setInterval(() => {
    const now = new Date().getTime();
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
     LIGHTBOX GALLERY
     =============================== */

  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const galleryItems = Array.from(document.querySelectorAll('#gallery-grid .gallery-item'));
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

  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.classList.remove('show'));
  document.getElementById('lightbox-prev').addEventListener('click', () => {
    showImage((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  });
  document.getElementById('lightbox-next').addEventListener('click', () => {
    showImage((currentIndex + 1) % galleryImages.length);
  });

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) lightbox.classList.remove('show');
  });

});

/* ===============================
   GUESTBOOK → WHATSAPP
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

    const phoneNumber = "919539381853";

    const text = `Happy married Life
From: ${name}
Message:${message}`;

    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, "_blank");
  });
}
