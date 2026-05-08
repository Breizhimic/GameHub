/* =============================================
   GAME HUB — STATS.JS
   LocalStorage analytics & statistics
   ============================================= */

const STATS_KEY = 'gamehub_stats_v2';

const StatsManager = {
  // Default state
  defaults() {
    return {
      totalPlays: 0,
      totalTimeMinutes: 0,
      lastUpdated: new Date().toISOString(),
      visits: 1,
      games: {}
    };
  },

  // Load from localStorage
  load() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      if (!raw) return this.defaults();
      const data = JSON.parse(raw);
      // Ensure all games exist
      GAMES_DATA.forEach(g => {
        if (!data.games[g.id]) {
          data.games[g.id] = { plays: 0, lastPlayed: null };
        }
      });
      return data;
    } catch {
      return this.defaults();
    }
  },

  // Save to localStorage
  save(data) {
    try {
      localStorage.setItem(STATS_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save stats:', e);
    }
  },

  // Increment visit counter
  trackVisit() {
    const data = this.load();
    data.visits = (data.visits || 0) + 1;
    data.lastUpdated = new Date().toISOString();
    this.save(data);
  },

  // Record a game launch
  trackPlay(gameId) {
    const data = this.load();
    data.totalPlays = (data.totalPlays || 0) + 1;
    if (!data.games[gameId]) {
      data.games[gameId] = { plays: 0, lastPlayed: null };
    }
    data.games[gameId].plays += 1;
    data.games[gameId].lastPlayed = new Date().toISOString();
    data.lastUpdated = new Date().toISOString();
    this.save(data);
    return data;
  },

  // Get plays for a specific game
  getGamePlays(gameId) {
    const data = this.load();
    return data.games[gameId]?.plays || 0;
  },

  // Get total plays across all games
  getTotalPlays() {
    const data = this.load();
    return data.totalPlays || 0;
  },

  // Get formatted time (simulated based on plays)
  getFormattedTime() {
    const plays = this.getTotalPlays();
    const minutes = plays * 7; // avg 7 min per play
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  },

  // Get popularity data sorted by plays
  getPopularityData() {
    const data = this.load();
    return GAMES_DATA
      .map(g => ({
        id: g.id,
        title: g.title,
        plays: data.games[g.id]?.plays || 0,
        emoji: g.emoji
      }))
      .sort((a, b) => b.plays - a.plays);
  },

  // Get most played game
  getMostPlayed() {
    const pop = this.getPopularityData();
    return pop[0] || null;
  }
};

// Animate a number counter
function animateCounter(el, target, duration = 1200, prefix = '', suffix = '') {
  if (!el) return;
  const start = parseInt(el.textContent) || 0;
  const diff = target - start;
  if (diff === 0) { el.textContent = prefix + target + suffix; return; }
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(start + diff * eased);
    el.textContent = prefix + current + suffix;
    el.classList.add('counting');
    if (progress < 1) requestAnimationFrame(update);
    else {
      el.textContent = prefix + target + suffix;
      el.classList.remove('counting');
    }
  }
  requestAnimationFrame(update);
}

// Initialize stats UI
function initStats() {
  StatsManager.trackVisit();
  updateStatsUI();
}

function updateStatsUI() {
  const totalPlays = StatsManager.getTotalPlays();
  const timeFormatted = StatsManager.getFormattedTime();

  // Hero stat
  const heroPlays = document.getElementById('total-plays-hero');
  if (heroPlays) animateCounter(heroPlays, totalPlays, 1500);

  // Stats section
  const statPlays = document.getElementById('stat-total-plays');
  const statTime  = document.getElementById('stat-total-time');

  if (statPlays) animateCounter(statPlays, totalPlays, 1500);
  if (statTime)  { statTime.textContent = timeFormatted; }

  // Stat card counters
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    animateCounter(el, target, 1200);
  });

  // Popularity bars
  renderPopularityBars();
}

function renderPopularityBars() {
  const container = document.getElementById('popularity-bars');
  if (!container) return;

  const data = StatsManager.getPopularityData();
  const max = Math.max(...data.map(d => d.plays), 1);

  container.innerHTML = data.map(item => {
    const pct = max > 0 ? (item.plays / max) * 100 : 0;
    return `
      <div class="pop-row">
        <span class="pop-name">${item.emoji} ${item.title}</span>
        <div class="pop-bar-track">
          <div class="pop-bar-fill" data-pct="${pct}"></div>
        </div>
        <span class="pop-count">${item.plays} <small>${item.plays > 1 ? 'plays' : 'play'}</small></span>
      </div>
    `;
  }).join('');

  // Animate bars after a frame
  requestAnimationFrame(() => {
    container.querySelectorAll('.pop-bar-fill').forEach(bar => {
      setTimeout(() => {
        bar.style.width = bar.dataset.pct + '%';
      }, 100);
    });
  });
}