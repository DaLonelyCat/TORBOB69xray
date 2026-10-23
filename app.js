/**
 * TORBOB69 CHEATING EVIDENCE CONTROLLER
 * =====================================
 * Handles YouTube IFrame API embedding and Fullscreen Lightbox with arrow navigation.
 */

// Global YouTube Player instance
let ytPlayer = null;
const YOUTUBE_VIDEO_ID = 'JOnVNz0psGA';

// Load YouTube IFrame API script
(function loadYouTubeIframeAPI() {
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  const firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
})();

// Called automatically by YouTube IFrame API when ready
window.onYouTubeIframeAPIReady = function() {
  ytPlayer = new YT.Player('yt-video-frame', {
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      playsinline: 1,
      rel: 0,
      modestbranding: 1
    }
  });
};

/**
 * Fullscreen Image Zoom Lightbox with Gallery Navigation
 */
let currentZoomIndex = 0;
let zoomableElements = [];

function setupImageLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const backdrop = document.getElementById('lightbox-backdrop');

  if (!modal || !modalImg) return;

  zoomableElements = Array.from(document.querySelectorAll('[data-zoom-img]'));

  function showImageAtIndex(index) {
    if (zoomableElements.length === 0) return;
    if (index < 0) index = zoomableElements.length - 1;
    if (index >= zoomableElements.length) index = 0;
    currentZoomIndex = index;

    const el = zoomableElements[currentZoomIndex];
    const src = el.getAttribute('data-zoom-img');
    const title = el.getAttribute('data-zoom-title');

    modalImg.src = src;
    if (modalTitle) {
      if (title) {
        modalTitle.textContent = title;
        modalTitle.style.display = 'block';
      } else {
        modalTitle.textContent = '';
        modalTitle.style.display = 'none';
      }
    }
  }

  function openLightbox(index) {
    showImageAtIndex(index);
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  zoomableElements.forEach((el, idx) => {
    el.addEventListener('click', () => {
      openLightbox(idx);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImageAtIndex(currentZoomIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      showImageAtIndex(currentZoomIndex + 1);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImageAtIndex(currentZoomIndex - 1);
    if (e.key === 'ArrowRight') showImageAtIndex(currentZoomIndex + 1);
  });
}

/**
 * Toast Notification System
 */
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('court-toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('visible');

  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  toastTimeout = setTimeout(() => {
    toast.classList.remove('visible');
  }, 3200);
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupImageLightbox();
});
