/* =============================================
   GAME HUB — MAIN.JS
   Card rendering, modal, toast, keyboard, init
   ============================================= */

/* ---- CARD RENDERING ---- */
function createGameCard(game) {
  const plays = StatsManager.getGamePlays(game.id);

  // Badges HTML
  const badgesHTML = game.badges.map(b => {
    const cfg = BADGE_CONFIG[b];
    if (!cfg) return '';
    return `<span class="badge ${cfg.class}">${cfg.label}</span>`;
  }).join('');

  // Tags HTML
  const tagsHTML = game.tags.map(t =>
    `<span class="card-tag">${t}</span>`
  ).join('');

  // Category label
  const catLabel = CATEGORY_LABELS[game.category] || game.category;

  const card = document.createElement('article');
  card.className = 'game-card';
  card.dataset.gameId = game.id;
  card.dataset.category = game.category;
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `${game.title} — ${catLabel}`);

  card.innerHTML = `
    <div class="card-thumb" style="background: linear-gradient(135deg, ${game.colorHex}, rgba(10,14,39,0.8));">
      <div class="card-thumb-bg" style="color:${game.color}; text-shadow: 0 0 30px ${game.color}80;">
        ${game.emoji}
      </div>
      <div class="card-thumb-overlay">
        <button class="card-thumb-overlay-btn" onclick="openGameLink('${game.id}', '${game.playUrl}')">
          ▶ JOUER
        </button>
      </div>
      <div class="card-badges">${badgesHTML}</div>
    </div>

    <div class="card-body">
      <div class="card-header-row">
        <h3 class="card-title">${game.title}</h3>
        <span class="card-plays" aria-label="${plays} parties">▶ ${plays}</span>
      </div>
      <p class="card-desc">${game.description}</p>
      <div class="card-tags">${tagsHTML}</div>
      <div class="card-meta">
        <span>⏱ ${game.playtime}</span>
        <span>⚡ ${game.difficulty}</span>
        <span>📂 ${catLabel}</span>
      </div>
      <div class="card-actions">
        <a href="${game.playUrl}"
           target="_blank" rel="noopener"
           class="btn btn-play"
           onclick="trackAndPlay(event, '${game.id}', '${game.playUrl}')"
           aria-label="Jouer à ${game.title}">
          ▶ JOUER
        </a>
        <a href="${game.codeUrl}"
           target="_blank" rel="noopener"
           class="btn btn-code"
           aria-label="Voir le code de ${game.title}">
          &lt;/&gt; CODE
        </a>
      </div>
    </div>
  `;

  // Click on card = open modal (not on button clicks)
  card.addEventListener('click', e => {
    if (e.target.closest('.btn, a, button')) return;
    openModal(game.id);
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.target.closest('.btn, a, button')) {
      openModal(game.id);
    }
  });

  return card;
}

function renderAllCards() {
  const grid = document.getElementById('games-grid');
  if (!grid) return;
  grid.innerHTML = '';
  GAMES_DATA.forEach((game, i) => {
    const card = createGameCard(game);
    card.style.animationDelay = (i * 0.06) + 's';
    grid.appendChild(card);
  });
  initCardMouseGlow();
}

/* ---- TRACK & PLAY ---- */
function trackAndPlay(e, gameId, url) {
  e.preventDefault();
  StatsManager.trackPlay(gameId);
  updateStatsUI();
  // Update play count on card
  const card = document.querySelector(`[data-game-id="${gameId}"]`);
  if (card) {
    const playsEl = card.querySelector('.card-plays');
    const newCount = StatsManager.getGamePlays(gameId);
    if (playsEl) playsEl.textContent = `▶ ${newCount}`;
  }
  showToast(`🎮 Lancement de ${GAMES_DATA.find(g=>g.id===gameId)?.title}...`, 'info');
  window.open(url, '_blank', 'noopener,noreferrer');
}

function openGameLink(gameId, url) {
  trackAndPlay({ preventDefault: ()=>{} }, gameId, url);
}

/* ---- MODAL ---- */
function openModal(gameId) {
  const game = GAMES_DATA.find(g => g.id === gameId);
  if (!game) return;

  const plays = StatsManager.getGamePlays(game.id);
  const badgesHTML = game.badges.map(b => {
    const cfg = BADGE_CONFIG[b];
    return cfg ? `<span class="badge ${cfg.class}">${cfg.label}</span>` : '';
  }).join('');

  const featuresHTML = game.features.map(f => `<li>${f}</li>`).join('');
  const catLabel = CATEGORY_LABELS[game.category] || game.category;

  document.getElementById('modal-content').innerHTML = `
    <div class="modal-thumb" style="background: linear-gradient(135deg, ${game.colorHex}, rgba(7,10,28,0.9));">
      <span style="font-size:5rem;text-shadow:0 0 40px ${game.color};">${game.emoji}</span>
    </div>

    <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;flex-wrap:wrap;">
      <h2 class="modal-game-title" id="modal-title">${game.title}</h2>
      <div style="display:flex;gap:0.4rem;flex-wrap:wrap;">${badgesHTML}</div>
    </div>

    <div style="display:flex;gap:1rem;margin-bottom:1.25rem;flex-wrap:wrap;">
      <span style="font-size:0.7rem;color:var(--text-dim);letter-spacing:0.1em;">⏱ ${game.playtime}</span>
      <span style="font-size:0.7rem;color:var(--text-dim);letter-spacing:0.1em;">⚡ ${game.difficulty}</span>
      <span style="font-size:0.7rem;color:var(--text-dim);letter-spacing:0.1em;">📂 ${catLabel}</span>
      <span style="font-size:0.7rem;color:var(--cyan);letter-spacing:0.1em;">▶ ${plays} partie${plays>1?'s':''}</span>
    </div>

    <p class="modal-game-desc">${game.longDescription}</p>

    <div class="modal-features">
      <div class="modal-features-title">FEATURES</div>
      <ul class="modal-features-list">${featuresHTML}</ul>
    </div>

    <div class="modal-controls">
      <div class="modal-controls-title">CONTRÔLES</div>
      <p>${game.controls}</p>
    </div>

    <div class="modal-actions">
      <a href="${game.playUrl}" target="_blank" rel="noopener"
         class="btn btn-play"
         onclick="trackAndPlay(event,'${game.id}','${game.playUrl}')">
        ▶ JOUER MAINTENANT
      </a>
      <a href="${game.codeUrl}" target="_blank" rel="noopener" class="btn btn-code">
        &lt;/&gt; VOIR LE CODE
      </a>
    </div>
  `;

  const overlay = document.getElementById('modal-overlay');
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';

  // Focus trap
  setTimeout(() => {
    document.getElementById('modal-close')?.focus();
  }, 100);
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  const modal   = document.getElementById('modal');

  modal.style.animation = 'modal-out 0.2s ease forwards';
  setTimeout(() => {
    overlay.hidden = true;
    modal.style.animation = '';
    document.body.style.overflow = '';
  }, 200);
}

// Modal close handlers
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-overlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
});

/* ---- TOAST NOTIFICATIONS ---- */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  toast.setAttribute('role', 'alert');
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ---- MOBILE MENU ---- */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const overlay   = document.getElementById('mobile-overlay');
  if (!hamburger || !overlay) return;

  const toggle = () => {
    const open = hamburger.classList.toggle('open');
    overlay.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggle);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) toggle();
  });
  overlay.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      overlay.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}

/* ---- KEYBOARD SHORTCUTS ---- */
function initKeyboardShortcuts() {
  const shortcutsModal = document.getElementById('shortcuts-modal');
  const closeBtn = document.getElementById('shortcuts-close');

  document.addEventListener('keydown', e => {
    const inField = e.target.closest('input, textarea');

    // ? — show shortcuts
    if (e.key === '?' && !inField) {
      shortcutsModal.hidden = !shortcutsModal.hidden;
      return;
    }

    // ESC — close modals
    if (e.key === 'Escape') {
      if (!document.getElementById('modal-overlay').hidden) closeModal();
      if (!shortcutsModal.hidden) shortcutsModal.hidden = true;
      return;
    }

    // G — focus search
    if (e.key === 'g' && !inField) {
      e.preventDefault();
      document.getElementById('search-input')?.focus();
      return;
    }

    // 1-9 — open game modal
    const num = parseInt(e.key);
    if (num >= 1 && num <= 9 && !inField) {
      const game = GAMES_DATA[num - 1];
      if (game) openModal(game.id);
    }
  });

  closeBtn?.addEventListener('click', () => { shortcutsModal.hidden = true; });
}

/* ---- CONTACT FORM — Formspree ---- */
function initContactForm() {
  const form    = document.getElementById('contact-form');
  const submitBtn = document.getElementById('contact-submit');
  const successEl = document.getElementById('contact-success');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const name  = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const msg   = form.querySelector('#contact-message').value.trim();

    // Validation
    if (!name || !email || !msg) {
      showToast('⚠️ Veuillez remplir tous les champs', 'info');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('⚠️ Adresse email invalide', 'info');
      return;
    }

    // Check que l'ID Formspree a été configuré
    const action = form.getAttribute('action');
    if (action.includes('YOUR_FORM_ID')) {
      showToast('⚙️ Formspree non configuré — voir le commentaire HTML', 'info');
      console.warn('[GameHub Contact] Remplace YOUR_FORM_ID dans index.html par ton endpoint Formspree.');
      return;
    }

    // UI → état chargement
    submitBtn.disabled = true;
    const btnLabel = submitBtn.querySelector('.btn-label');
    if (btnLabel) btnLabel.textContent = 'ENVOI...';
    submitBtn.querySelector('.btn-arrow').textContent = '⏳';

    try {
      const response = await fetch(action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        // Succès
        form.hidden = true;
        if (successEl) successEl.hidden = false;
        showToast('✅ Message envoyé — Merci !', 'success');
      } else {
        // Erreur Formspree
        const data = await response.json().catch(() => ({}));
        const errMsg = data?.errors?.map(e => e.message).join(', ') || 'Erreur lors de l\'envoi';
        showToast(`❌ ${errMsg}`, 'info');
        resetSubmitBtn(submitBtn, btnLabel);
      }
    } catch {
      showToast('❌ Erreur réseau — réessaie plus tard', 'info');
      resetSubmitBtn(submitBtn, btnLabel);
    }
  });
}

function resetSubmitBtn(btn, labelEl) {
  if (!btn) return;
  btn.disabled = false;
  if (labelEl) labelEl.textContent = 'ENVOYER';
  const arrow = btn.querySelector('.btn-arrow');
  if (arrow) arrow.textContent = '→';
}

/* ---- SMOOTH SCROLL ---- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---- HERO COUNTER ---- */
function initHeroCounters() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        if (!isNaN(target)) animateCounter(el, target, 1500);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.hero-stat-num[data-count]').forEach(el => observer.observe(el));
}

/* ---- MODAL OUT KEYFRAME ---- */
const style = document.createElement('style');
style.textContent = `
  @keyframes modal-out {
    to { opacity: 0; transform: scale(0.94) translateY(15px); }
  }
`;
document.head.appendChild(style);

/* =============================================
   INIT — DOMContentLoaded
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {
  // Core
  ThemeManager.init();
  renderAllCards();
  initStats();

  // UI
  initFilters();
  initSearch();
  initSort();
  initMobileMenu();
  initSmoothScroll();
  initContactForm();
  initKeyboardShortcuts();

  // Animations
  initCanvas();
  initCursor();
  initScrollReveal();
  initStatsObserver();
  initAboutObserver();
  initHeaderScroll();
  initButtonRipple();
  initScanline();
  initHeroCounters();

  // Log
  console.log('%c[GAME HUB] ✓ Loaded', 'color:#00d4ff;font-family:monospace;font-weight:bold;');
  console.log('%c6 games · Pure HTML/CSS/JS · No frameworks', 'color:#80d9ff;font-family:monospace;');
});