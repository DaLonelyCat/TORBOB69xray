/**
 * TORBOB69 CHEATING EVIDENCE CONTROLLER
 * =====================================
 * Handles YouTube IFrame API embedding, Lightbox inspection, and sharing.
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
 * Fullscreen Image Zoom Lightbox
 */
function setupImageLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalTitle = document.getElementById('lightbox-title');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');

  if (!modal || !modalImg) return;

  function openLightbox(src, title) {
    modalImg.src = src;
    if (modalTitle) {
      modalTitle.textContent = title || '';
      modalTitle.style.display = title ? 'block' : 'none';
    }
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click listener to all zoomable elements
  const zoomables = document.querySelectorAll('[data-zoom-img]');
  zoomables.forEach(item => {
    item.addEventListener('click', () => {
      const src = item.getAttribute('data-zoom-img');
      const title = item.getAttribute('data-zoom-title');
      if (src) {
        openLightbox(src, title);
      }
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
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

/**
 * Share & Copy Link functions
 */
function copySiteLink() {
  const domainUrl = 'https://torbob69xray.my.id';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(domainUrl).then(() => {
      showToast('📋 EVIDENCE LINK COPIED TO CLIPBOARD!');
    }).catch(() => {
      showToast('📋 EVIDENCE URL: ' + domainUrl);
    });
  } else {
    showToast('📋 EVIDENCE URL: ' + domainUrl);
  }
}

function shareTwitter() {
  const text = encodeURIComponent('TORBOB69 CHEATING EVIDENCE: Video proof, server logs, and 63 God Apple inventory seizure.');
  const url = encodeURIComponent('https://torbob69xray.my.id');
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  setupImageLightbox();

  const copyBtn = document.getElementById('btn-copy-link');
  if (copyBtn) {
    copyBtn.addEventListener('click', copySiteLink);
  }

  const twitterBtn = document.getElementById('btn-share-twitter');
  if (twitterBtn) {
    twitterBtn.addEventListener('click', shareTwitter);
  }
});
