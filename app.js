/**
 * TORBOB69 CHEATING EVIDENCE CONTROLLER
 * =====================================
 * Handles YouTube IFrame API scrubbing, Lightbox inspection, and sharing.
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
    },
    events: {
      onReady: onPlayerReady
    }
  });
};

function onPlayerReady(event) {
  const statusEl = document.getElementById('active-evidence-label');
  if (statusEl) {
    statusEl.textContent = 'VIDEO READY • CLICK ANY BLUE TIMESTAMP BELOW TO JUMP';
  }
}

/**
 * Jump YouTube video to specific second and scroll into view
 */
function seekToTimestamp(seconds, label) {
  if (label && label.includes('God Apple')) {
    const logsSection = document.getElementById('server-logs');
    if (logsSection) {
      logsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('📜 JUMPED TO SERVER LOGS & INVENTORY INSPECTION');
      return;
    }
  }

  if (ytPlayer && typeof ytPlayer.seekTo === 'function') {
    ytPlayer.seekTo(seconds, true);
    ytPlayer.playVideo();
  } else {
    // Fallback if IFrame API not fully loaded or blocked
    const iframe = document.getElementById('yt-video-frame');
    if (iframe) {
      iframe.src = `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?start=${seconds}&autoplay=1`;
    }
  }

  // Update active indicator
  const statusEl = document.getElementById('active-evidence-label');
  if (statusEl) {
    statusEl.textContent = `SEEKING: ${label} (T=${seconds}s)`;
  }

  // Smooth scroll video into view
  const videoSection = document.getElementById('video-evidence');
  if (videoSection) {
    videoSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/**
 * Renders SVG Trajectory Radar for each incident card
 */
function createRadarSvg(angleDeg, pitchDeg, distance) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const radius = 24;
  const centerX = 36;
  const centerY = 36;
  const targetX = centerX + radius * Math.cos(rad);
  const targetY = centerY + radius * Math.sin(rad);

  return `
    <svg viewBox="0 0 72 72" class="radar-svg" width="72" height="72" role="img" aria-label="Mining trajectory radar: ${angleDeg} degrees turn" style="background: #06080e; border-radius: 50%; border: 1px solid rgba(0, 229, 255, 0.25);">
      <!-- Radar grid circles -->
      <circle cx="${centerX}" cy="${centerY}" r="32" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
      <circle cx="${centerX}" cy="${centerY}" r="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      <circle cx="${centerX}" cy="${centerY}" r="8" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
      
      <!-- Axis crosshairs -->
      <line x1="36" y1="4" x2="36" y2="68" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="4" y1="36" x2="68" y2="36" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="2,2"/>
      
      <!-- Player center orientation (facing straight ahead) -->
      <polygon points="36,28 32,38 36,35 40,38" fill="#ffd27d" />
      
      <!-- Suspicious turn vector line -->
      <line x1="${centerX}" y1="${centerY}" x2="${targetX}" y2="${targetY}" stroke="#ff4d5e" stroke-width="2" stroke-linecap="round" />
      
      <!-- Hidden ore cluster dot -->
      <circle cx="${targetX}" cy="${targetY}" r="4" fill="#00e5ff" />
    </svg>
  `;
}

/**
 * Render the Evidence Cards into DOM
 */
function renderEvidenceLedger() {
  const container = document.getElementById('evidence-grid-container');
  if (!container || !window.EVIDENCE_DATA) return;

  container.innerHTML = EVIDENCE_DATA.map(item => {
    return `
      <article class="evidence-card" data-category="${item.category}">
        <div>
          <div class="evidence-card-top">
            <span class="evidence-badge">${item.status}</span>
            <button class="timestamp-btn" onclick="seekToTimestamp(${item.time}, '${item.title.replace(/'/g, "\\'")}')">
              <span>▶</span> ${item.timeDisplay}
            </button>
          </div>
          
          <h3 class="evidence-card-title">${item.title}</h3>
          
          <div class="radar-box">
            <div class="radar-canvas-wrap">
              ${createRadarSvg(item.angle, item.pitch, item.distance)}
            </div>
            <div class="radar-telemetry">
              <div>SNAP YAW: <span class="telemetry-val">${item.angle}°</span></div>
              <div>PITCH: <span class="telemetry-val">${item.pitch}°</span></div>
              <div>DISTANCE: <span class="telemetry-val">${item.distance}</span></div>
            </div>
          </div>
          
          <div class="testimony-box">
            <div class="quote-line">
              <div class="quote-speaker">TORBOB69'S EXCUSE:</div>
              <div class="quote-text">"${item.torbobQuote}"</div>
            </div>
            <div class="counter-line">
              <div class="counter-speaker">FORENSIC REALITY:</div>
              <div class="counter-text">${item.realityCheck}</div>
            </div>
          </div>
        </div>
        
        <div class="evidence-card-footer">
          <span>CERTAINTY</span>
          <span class="guilt-rating-pill">${item.guiltRating}</span>
        </div>
      </article>
    `;
  }).join('');
}

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
    modalTitle.textContent = title || '';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Attach click to all screenshot cards
  const cards = document.querySelectorAll('.screenshot-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-zoom-img');
      const title = card.getAttribute('data-zoom-title');
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
  const text = encodeURIComponent('TORBOB69 CHEATING EVIDENCE: Video proof, server logs, and 63 God Apple inventory seizure. Full breakdown:');
  const url = encodeURIComponent('https://torbob69xray.my.id');
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderEvidenceLedger();
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
