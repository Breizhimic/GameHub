/* =============================================
   GAME HUB — FILTER.JS
   Filter, search, sort logic
   ============================================= */

let currentFilter  = 'all';
let currentSort    = 'default';
let currentSearch  = '';

/* ---- FILTER BUTTONS ---- */
function initFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.filter;
      filterGames();
    });
  });
}

/* ---- SEARCH ---- */
function initSearch() {
  const input = document.getElementById('search-input');
  if (!input) return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      currentSearch = input.value.trim().toLowerCase();
      filterGames();
    }, 150);
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      input.value = '';
      currentSearch = '';
      filterGames();
      input.blur();
    }
  });
}

/* ---- SORT ---- */
function initSort() {
  const select = document.getElementById('sort-select');
  if (!select) return;
  select.addEventListener('change', () => {
    currentSort = select.value;
    filterGames();
  });
}

/* ---- MAIN FILTER FUNCTION ---- */
function filterGames() {
  const grid = document.getElementById('games-grid');
  if (!grid) return;

  let games = [...GAMES_DATA];

  // Category filter
  if (currentFilter !== 'all') {
    games = games.filter(g => g.category === currentFilter);
  }

  // Search filter
  if (currentSearch) {
    games = games.filter(g =>
      g.title.toLowerCase().includes(currentSearch) ||
      g.description.toLowerCase().includes(currentSearch) ||
      g.tags.some(t => t.toLowerCase().includes(currentSearch)) ||
      g.category.toLowerCase().includes(currentSearch)
    );
  }

  // Sort
  switch (currentSort) {
    case 'name-asc':
      games.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'name-desc':
      games.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'popular':
    case 'plays': {
      const statsData = StatsManager.load();
      games.sort((a, b) => {
        const pa = statsData.games[a.id]?.plays || 0;
        const pb = statsData.games[b.id]?.plays || 0;
        return pb - pa;
      });
      break;
    }
    default:
      // Preserve GAMES_DATA order
      games.sort((a, b) => GAMES_DATA.indexOf(a) - GAMES_DATA.indexOf(b));
  }

  // Update cards
  const allCards = grid.querySelectorAll('.game-card');

  if (games.length === 0) {
    allCards.forEach(c => c.classList.add('hidden'));
    showNoResults(currentSearch);
    return;
  }

  hideNoResults();

  allCards.forEach(card => {
    const id = card.dataset.gameId;
    const match = games.find(g => g.id === id);
    if (match) {
      card.classList.remove('hidden');
      // Reorder DOM
      grid.appendChild(card);
    } else {
      card.classList.add('hidden');
    }
  });

  // Re-init card mouse glow for reordered cards
  initCardMouseGlow();
}

function showNoResults(query) {
  const el = document.getElementById('no-results');
  const queryEl = document.getElementById('no-results-query');
  if (!el) return;
  if (queryEl) queryEl.textContent = query;
  el.hidden = false;
}

function hideNoResults() {
  const el = document.getElementById('no-results');
  if (el) el.hidden = true;
}
