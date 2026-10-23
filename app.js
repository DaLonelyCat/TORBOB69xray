/**
 * TORBOB69 X-RAY COURTROOM APPLICATION CONTROLLER
 * ===============================================
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
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    }
  });
};

function onPlayerReady(event) {
  const statusEl = document.getElementById('active-evidence-label');
  if (statusEl) {
    statusEl.textContent = 'EXHIBIT A LOADED (READY)';
  }
}

function onPlayerStateChange(event) {
  // Can track playback time if needed
}

/**
 * Jump YouTube video to specific second and scroll into view
 */
function seekToTimestamp(seconds, label) {
  if (label && label.includes('God Apple')) {
    const logsSection = document.getElementById('exhibit-logs-section');
    if (logsSection) {
      logsSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      showToast('📜 REVIEWING EXHIBIT B: 63 GOD APPLE INVENTORY & LOGS');
      if (window.courtAudio) {
        window.courtAudio.playStampSound();
      }
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
    statusEl.textContent = `REVIEWING: ${label} (T=${seconds}s)`;
  }

  // Smooth scroll video into view
  const exhibitSection = document.getElementById('exhibit-video-section');
  if (exhibitSection) {
    exhibitSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Play subtle evidence audio
  if (window.courtAudio) {
    window.courtAudio.playStampSound();
  }
}

/**
 * Renders SVG Trajectory Radar for each incident card
 */
function createRadarSvg(angleDeg, pitchDeg, distance) {
  // Angle: 0 is North/Straight, 90 is East/Right, etc.
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  const radius = 24;
  const centerX = 36;
  const centerY = 36;
  const targetX = centerX + radius * Math.cos(rad);
  const targetY = centerY + radius * Math.sin(rad);

  return `
    <svg viewBox="0 0 72 72" class="radar-svg" width="72" height="72" style="background: #080a10; border-radius: 50%; border: 1px solid rgba(0, 229, 255, 0.3);">
      <!-- Radar grid circles -->
      <circle cx="${centerX}" cy="${centerY}" r="32" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
      <circle cx="${centerX}" cy="${centerY}" r="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
      <circle cx="${centerX}" cy="${centerY}" r="8" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
      
      <!-- Axis crosshairs -->
      <line x1="36" y1="4" x2="36" y2="68" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="2,2"/>
      <line x1="4" y1="36" x2="68" y2="36" stroke="rgba(255,255,255,0.1)" stroke-width="1" stroke-dasharray="2,2"/>
      
      <!-- Player center orientation (facing up originally) -->
      <polygon points="36,28 32,38 36,35 40,38" fill="#ffd27d" />
      
      <!-- Suspicious turn vector line -->
      <line x1="${centerX}" y1="${centerY}" x2="${targetX}" y2="${targetY}" stroke="#e62335" stroke-width="2" stroke-linecap="round" />
      
      <!-- Hidden ore cluster dot -->
      <circle cx="${targetX}" cy="${targetY}" r="4" fill="#00e5ff" style="filter: drop-shadow(0 0 3px #00e5ff);" />
      <circle cx="${targetX}" cy="${targetY}" r="6" fill="none" stroke="#00e5ff" stroke-width="1" opacity="0.6">
        <animate attributeName="r" values="4;8;4" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.8;0.1;0.8" dur="1.5s" repeatCount="indefinite"/>
      </circle>
    </svg>
  `;
}

/**
 * Render the Evidence Cards into DOM
 */
function renderEvidenceLedger(filter = 'all') {
  const container = document.getElementById('evidence-grid-container');
  if (!container || !window.EVIDENCE_DATA) return;

  const filtered = EVIDENCE_DATA.filter(item => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  container.innerHTML = filtered.map(item => {
    return `
      <div class="evidence-card" data-category="${item.category}">
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
              <div class="quote-speaker">🗣️ TORBOB69'S EXCUSE:</div>
              <div class="quote-text">"${item.torbobQuote}"</div>
            </div>
            <div class="counter-line">
              <div class="counter-speaker">⚖️ FORENSIC REALITY:</div>
              <div class="counter-text">${item.realityCheck}</div>
            </div>
          </div>
        </div>
        
        <div class="evidence-card-footer">
          <span>GUILT CONFIDENCE</span>
          <span class="guilt-rating-pill">${item.guiltRating}</span>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Filter button click handling
 */
function setupFilterTabs() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderEvidenceLedger(category);
    });
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
 * Screen shake utility (safely checks prefers-reduced-motion)
 */
function triggerScreenShake() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  document.body.classList.remove('shake-screen');
  requestAnimationFrame(() => {
    document.body.classList.add('shake-screen');
    setTimeout(() => {
      document.body.classList.remove('shake-screen');
    }, 450);
  });
}

/**
 * Dramatic Phoenix Wright "OBJECTION!" Action
 */
function triggerObjection() {
  if (window.courtAudio) {
    window.courtAudio.playObjectionSting();
  }
  triggerScreenShake();

  const overlay = document.getElementById('objection-overlay');
  if (overlay) {
    overlay.classList.add('active');
    setTimeout(() => {
      overlay.classList.remove('active');
    }, 1400);
  }
}

/**
 * Deliver Verdict Action: Gavel Slam, Prison Bars Drop, Guilty Stamp
 */
function deliverVerdict() {
  const cell = document.getElementById('holding-cell');
  if (!cell) return;

  // Play gavel slam and prison bars audio
  if (window.courtAudio) {
    window.courtAudio.playGavelSlam();
    setTimeout(() => {
      window.courtAudio.playPrisonBarsSlam();
    }, 180);
    setTimeout(() => {
      window.courtAudio.playStampSound();
    }, 450);
  }

  triggerScreenShake();

  // Drop prison bars and slam GUILTY stamp
  cell.classList.add('locked');

  // Change gavel button text
  const gavelBtn = document.getElementById('btn-gavel');
  if (gavelBtn) {
    gavelBtn.innerHTML = '<span>⚖️</span> VERDICT RENDERED: GUILTY';
    gavelBtn.style.background = 'linear-gradient(135deg, #383838, #1a1a1a)';
    gavelBtn.style.borderColor = '#666';
  }

  // Scroll verdict card into center
  cell.scrollIntoView({ behavior: 'smooth', block: 'center' });
  showToast('⚖️ GUILTY VERDICT OFFICIALLY ENTERED INTO THE MINECRAFT DOCKET');
}

/**
 * Audio Mute Toggle Button
 */
function setupMuteToggle() {
  const muteBtn = document.getElementById('btn-mute-toggle');
  if (!muteBtn || !window.courtAudio) return;

  function updateMuteUi() {
    if (window.courtAudio.isMuted) {
      muteBtn.innerHTML = '🔇 SOUND: OFF';
      muteBtn.style.opacity = '0.7';
    } else {
      muteBtn.innerHTML = '🔊 SOUND: ON';
      muteBtn.style.opacity = '1';
    }
  }

  updateMuteUi();

  muteBtn.addEventListener('click', () => {
    window.courtAudio.toggleMute();
    updateMuteUi();
  });
}

/**
 * Share & Copy Link functions
 */
function copySiteLink() {
  const domainUrl = 'https://torbob69xray.my.id';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(domainUrl).then(() => {
      showToast('📋 VERDICT DOCKET LINK COPIED TO CLIPBOARD!');
    }).catch(() => {
      showToast('📋 VERDICT URL: ' + domainUrl);
    });
  } else {
    showToast('📋 VERDICT URL: ' + domainUrl);
  }
}

function shareTwitter() {
  const text = encodeURIComponent('THE PEOPLE VS. TORBOB69: Concrete forensic proof of Minecraft X-Raying. See the evidence docket:');
  const url = encodeURIComponent('https://torbob69xray.my.id');
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// App Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderEvidenceLedger('all');
  setupFilterTabs();
  setupMuteToggle();

  const objectionBtn = document.getElementById('btn-hero-objection');
  if (objectionBtn) {
    objectionBtn.addEventListener('click', triggerObjection);
  }

  const gavelBtn = document.getElementById('btn-gavel');
  if (gavelBtn) {
    gavelBtn.addEventListener('click', deliverVerdict);
  }

  const copyBtn = document.getElementById('btn-copy-verdict');
  if (copyBtn) {
    copyBtn.addEventListener('click', copySiteLink);
  }

  const twitterBtn = document.getElementById('btn-share-twitter');
  if (twitterBtn) {
    twitterBtn.addEventListener('click', shareTwitter);
  }
});
