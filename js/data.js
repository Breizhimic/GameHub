/* =============================================
   GAME HUB — DATA.JS
   Game data, descriptions, links
   ============================================= */

const GAMES_DATA = [
  {
    id: "demineur",
    title: "Démineur",
    emoji: "💣",
    description: "Le classique absolu. Déjoue les mines en utilisant la logique pure. Chaque case est un indice — chaque erreur est fatale.",
    longDescription: "Adapté du célèbre Minesweeper, ce Démineur implémente les règles classiques avec des grilles de difficulté variable. Un algorithme de flood-fill révèle automatiquement les zones sûres, et le générateur garantit que la première case n'est jamais une mine.",
    category: "logic",
    tags: ["#puzzle", "#classique", "#logique"],
    playUrl: "https://breizhimic.github.io/Demineur/",
    codeUrl: "https://github.com/breizhimic/Demineur",
    difficulty: "Moyen",
    playtime: "5–15 min",
    features: [
      "Grilles de difficulté variable",
      "Détection automatique des zones sûres",
      "Compteur de mines et chronomètre",
      "Première case toujours sûre"
    ],
    controls: "Clic gauche : Révéler une case — Clic droit : Poser/retirer un drapeau",
    badges: ["logic"],
    color: "#9d4edd",
    colorHex: "rgba(157,78,221,0.15)"
  },
  {
    id: "snake",
    title: "Snake",
    emoji: "🐍",
    description: "Le reptile légendaire est de retour. Mange, grandis, survive. Plus tu es long, plus c'est délicat.",
    longDescription: "Une réimplementation moderne du Snake classique avec rendu Canvas, collisions précises, et un système de score progressif. La vitesse augmente au fil des fruits collectés, testant vos réflexes à chaque palier.",
    category: "action",
    tags: ["#arcade", "#rétro", "#action"],
    playUrl: "https://breizhimic.github.io/Snake/",
    codeUrl: "https://github.com/breizhimic/Snake",
    difficulty: "Facile",
    playtime: "2–10 min",
    features: [
      "Rendu Canvas fluide",
      "Vitesse progressive",
      "Système de score avec records",
      "Effets visuels neon"
    ],
    controls: "Flèches ou ZQSD : Diriger le serpent — Espace : Pause",
    badges: ["popular"],
    color: "#00ff88",
    colorHex: "rgba(0,255,136,0.12)"
  },
  {
    id: "tictactoe",
    title: "Tic Tac Toe",
    emoji: "⭕",
    description: "Affronte une IA Minimax imbattable — ou joue contre un ami. Stratégie ou reflexes ?",
    longDescription: "Ce Morpion intègre l'algorithme Minimax complet avec élagage alpha-bêta. L'IA joue de façon optimale — la seule issue possible contre elle est le match nul. Un mode deux joueurs permet aussi d'affronter un ami.",
    category: "logic",
    tags: ["#ia", "#algorithme", "#stratégie"],
    playUrl: "https://breizhimic.github.io/TicTacToe/",
    codeUrl: "https://github.com/breizhimic/TicTacToe",
    difficulty: "Difficile",
    playtime: "2–5 min",
    features: [
      "IA Minimax avec élagage alpha-bêta",
      "Mode 2 joueurs",
      "Animation de victoire",
      "Statistiques de parties"
    ],
    controls: "Clic sur une case : Jouer — Bouton Nouveau : Recommencer une partie",
    badges: ["ai"],
    color: "#00d4ff",
    colorHex: "rgba(0,212,255,0.12)"
  },
  {
    id: "blockbreaker",
    title: "Block Breaker",
    emoji: "🧱",
    description: "Physics engine custom, rebonds précis, niveaux variés. Casse tout, satisfaction garantie.",
    longDescription: "Un Breakout/Arkanoid moderne avec un moteur physique implémenté from scratch. La balle rebondit selon des angles calculés précisément, les briques ont des valeurs différentes, et les power-ups ajoutent de la variété à chaque niveau.",
    category: "action",
    tags: ["#physique", "#arcade", "#niveaux"],
    playUrl: "https://breizhimic.github.io/BlockBreaker/",
    codeUrl: "https://github.com/breizhimic/BlockBreaker",
    difficulty: "Moyen",
    playtime: "5–20 min",
    features: [
      "Moteur physique custom",
      "Angles de rebond précis",
      "Plusieurs niveaux",
      "Power-ups variés"
    ],
    controls: "Souris ou flèches : Déplacer la raquette — Espace : Lancer la balle",
    badges: ["physics"],
    color: "#ff006e",
    colorHex: "rgba(255,0,110,0.12)"
  },
  {
    id: "pong",
    title: "Pong",
    emoji: "🏓",
    description: "Le premier jeu vidéo revisité avec une esthétique neon. 1vs1 ou contre une IA redoutable.",
    longDescription: "Le père de tous les jeux revient sous une identité visuelle neon futuriste. L'IA adverse adapte sa vitesse au score pour rester challengeante. Le mode deux joueurs permet un duel épique sur le même clavier.",
    category: "action",
    tags: ["#multi", "#rétro", "#neon"],
    playUrl: "https://breizhimic.github.io/Pong/",
    codeUrl: "https://github.com/breizhimic/Pong",
    difficulty: "Facile",
    playtime: "3–15 min",
    features: [
      "Mode solo vs IA adaptive",
      "Mode 2 joueurs local",
      "Esthétique neon",
      "Score et effets sonores"
    ],
    controls: "Joueur 1 : Z/S — Joueur 2 : ↑/↓ — Espace : Servir",
    badges: ["multi", "physics"],
    color: "#ff006e",
    colorHex: "rgba(255,0,110,0.12)"
  },
  {
    id: "jeudelavie",
    title: "Jeu de la Vie",
    emoji: "🧬",
    description: "L'automate cellulaire de Conway. Dessine, observe, découvre des patterns infinis.",
    longDescription: "Une implémentation du célèbre Jeu de la Vie de John Conway. Quatre règles simples génèrent une complexité infinie — des structures stables, oscillateurs et vaisseaux émergent spontanément. Un terrain d'expérimentation fascinant pour explorer la vie artificielle.",
    category: "simulation",
    tags: ["#simulation", "#cellulaire", "#ia"],
    playUrl: "https://breizhimic.github.io/JeuDeLaVie/",
    codeUrl: "https://github.com/breizhimic/JeuDeLaVie",
    difficulty: "Facile",
    playtime: "5–∞ min",
    features: [
      "Automate cellulaire de Conway",
      "Grille infinie (wrap-around)",
      "Contrôle de vitesse",
      "Patterns pré-chargés"
    ],
    controls: "Clic : Activer/désactiver une cellule — Espace : Pause/Play — R : Reset",
    badges: ["ai"],
    color: "#9d4edd",
    colorHex: "rgba(157,78,221,0.12)"
  },
  {
    id: "centipede",
    title: "Centipède",
    emoji: "🐛",
    description: "Détruisez le mille-pattes qui descend en rafales. Rapide, frénétique, addictif.",
    longDescription: "Un Centipède fidèle à l'arcade original. Le mille-pattes se fraye un chemin à travers un champ de champignons, accélérant à chaque segment touché. Vos réflexes seront mis à rude épreuve au fil des niveaux.",
    category: "action",
    tags: ["#arcade", "#rétro", "#shoot"],
    playUrl: "https://breizhimic.github.io/Centipede/",
    codeUrl: "https://github.com/breizhimic/Centipede",
    difficulty: "Moyen",
    playtime: "3–10 min",
    features: [
      "Déplacement procédural du mille-pattes",
      "Champ de champignons dynamique",
      "Difficulté progressive par niveau",
      "Système de score et high score"
    ],
    controls: "Flèches ou souris : Déplacer le canon — Espace : Tirer",
    badges: ["popular"],
    color: "#00ff88",
    colorHex: "rgba(0,255,136,0.12)"
  },
  {
    id: "spaceinvaders",
    title: "Space Invaders",
    emoji: "👾",
    description: "Défendez la Terre contre les vagues d'envahisseurs extraterrestres. Le classique SF.",
    longDescription: "Une recréation du légendaire Space Invaders avec vagues d'ennemis en formation, boucliers destructibles et OVNI surprise. Les envahisseurs accélèrent à mesure qu'ils sont éliminés — la pression monte inexorablement.",
    category: "action",
    tags: ["#arcade", "#shoot", "#rétro"],
    playUrl: "https://breizhimic.github.io/SpaceInvaders/",
    codeUrl: "https://github.com/breizhimic/SpaceInvaders",
    difficulty: "Moyen",
    playtime: "5–15 min",
    features: [
      "Formations d'ennemis en vagues",
      "Boucliers destructibles",
      "OVNI bonus aléatoire",
      "Accélération progressive des ennemis"
    ],
    controls: "Flèches : Déplacer le vaisseau — Espace : Tirer",
    badges: ["popular", "new"],
    color: "#ff006e",
    colorHex: "rgba(255,0,110,0.12)"
  },
  {
    id: "tetris",
    title: "Tetris",
    emoji: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 60" width="80" height="60" aria-label="Tétromino T">
  <defs>
    <filter id="glow-t">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <!-- Rangée du haut : 3 blocs (T horizontale) -->
  <rect x="5"  y="5" width="20" height="20" rx="3" fill="#00d4ff" opacity=".9" filter="url(#glow-t)"/>
  <rect x="5"  y="5" width="20" height="20" rx="3" fill="none" stroke="#ffffff" stroke-width=".8" opacity=".4"/>
  <rect x="30" y="5" width="20" height="20" rx="3" fill="#00d4ff" opacity=".9" filter="url(#glow-t)"/>
  <rect x="30" y="5" width="20" height="20" rx="3" fill="none" stroke="#ffffff" stroke-width=".8" opacity=".4"/>
  <rect x="55" y="5" width="20" height="20" rx="3" fill="#00d4ff" opacity=".9" filter="url(#glow-t)"/>
  <rect x="55" y="5" width="20" height="20" rx="3" fill="none" stroke="#ffffff" stroke-width=".8" opacity=".4"/>
  <!-- Bloc du bas : centre (queue du T) -->
  <rect x="30" y="30" width="20" height="20" rx="3" fill="#00d4ff" opacity=".9" filter="url(#glow-t)"/>
  <rect x="30" y="30" width="20" height="20" rx="3" fill="none" stroke="#ffffff" stroke-width=".8" opacity=".4"/>
  <!-- Reflets intérieurs -->
  <rect x="8"  y="8"  width="7" height="4" rx="1" fill="white" opacity=".25"/>
  <rect x="33" y="8"  width="7" height="4" rx="1" fill="white" opacity=".25"/>
  <rect x="58" y="8"  width="7" height="4" rx="1" fill="white" opacity=".25"/>
  <rect x="33" y="33" width="7" height="4" rx="1" fill="white" opacity=".25"/>
</svg>`,
    description: "Le puzzle emblématique. Empile les tétrominos, complète les lignes, survive le plus longtemps possible.",
    longDescription: "Une implémentation complète du Tetris classique avec les 7 tétrominos officiels, rotation SRS, système de score par lignes multiples (Single, Double, Triple, Tetris) et accélération progressive. Simple à prendre en main, impossible à maîtriser.",
    category: "logic",
    tags: ["#puzzle", "#classique", "#réflexes"],
    playUrl: "https://breizhimic.github.io/Tetris/",
    codeUrl: "https://github.com/breizhimic/Tetris",
    difficulty: "Moyen",
    playtime: "5–30 min",
    features: [
      "7 tétrominos officiels",
      "Rotation et wall-kicks",
      "Score progressif (lignes multiples)",
      "Vitesse croissante par niveau"
    ],
    controls: "Flèches : Déplacer/Descendre — ↑ ou Z : Rotation — Espace : Drop instantané",
    badges: ["popular"],
    icon: "🟦",
    color: "#00d4ff",
    colorHex: "rgba(0,212,255,0.12)"
  },
  {
    id: "donkeykong",
    title: "Donkey Kong",
    emoji: "🦍",
    description: "Grimpez les échafaudages, évitez les tonneaux, sauvez la princesse. L'arcade légendaire.",
    longDescription: "Une recréation du classique Donkey Kong de 1981. Grimpez les plateformes et les échelles sous une pluie de tonneaux lancés par le gorille géant. Minutage précis, réflexes rapides et stratégie sont indispensables pour atteindre le sommet.",
    category: "action",
    tags: ["#arcade", "#rétro", "#plateforme"],
    playUrl: "https://breizhimic.github.io/DonkeyKong/",
    codeUrl: "https://github.com/breizhimic/DonkeyKong",
    difficulty: "Difficile",
    playtime: "3–15 min",
    features: [
      "Plateformes et échelles fidèles à l'arcade",
      "Tonneaux à trajectoires variées",
      "Système de vies et de score",
      "Difficulté progressive"
    ],
    controls: "Flèches : Déplacer — ↑ ou échelle : Grimper — Espace : Sauter",
    badges: ["popular", "new"],
    color: "#ff006e",
    colorHex: "rgba(255,0,110,0.12)"
  }
];

// Badge configurations
const BADGE_CONFIG = {
  ai:      { label: "IA Inside",       class: "badge-ai" },
  physics: { label: "Physics Engine",  class: "badge-physics" },
  multi:   { label: "Multiplayer",     class: "badge-multi" },
  popular: { label: "Popular",         class: "badge-popular" },
  new:     { label: "New",             class: "badge-new" }
};

// Category labels
const CATEGORY_LABELS = {
  action:     "Action",
  logic:      "Logique",
  simulation: "Simulation"
};