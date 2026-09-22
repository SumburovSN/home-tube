export const categories = [
  // Главная
  {
    id: 'all',
    title: 'Главная',
    icon: '🏠',
    type: 'main',
    parentId: null,
  },

  // =========================
  // МУЛЬТИКИ
  // =========================

  {
    id: 'cartoons',
    title: 'Мультики',
    icon: '📺',
    type: 'cartoon',
    parentId: null,
  },

  {
    id: 'bremenskie',
    title: 'Бременские',
    icon: '🎸',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: '38-parrots',
    title: '38 попугаев',
    icon: '🦜',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'leopold',
    title: 'Леопольд',
    icon: '🐱',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'katerok',
    title: 'Катерок',
    icon: '⛵',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'prostokvashino',
    title: 'Простоквашино',
    icon: '🏡',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'cheburashka',
    title: 'Чебурашка',
    icon: '🧸',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'winnie-the-pooh',
    title: 'Винни Пух',
    icon: '🍯',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'smeshariki',
    title: 'Смешарики',
    icon: '🐰',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'umka',
    title: 'Умка',
    icon: '🐻‍❄️',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'funtik',
    title: 'Фунтик',
    icon: '🐷',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'karusel',
    title: 'Карусель',
    icon: '🎠',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'masha-and-bear',
    title: 'Маша и Медведь',
    icon: '👧',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  // Мультики → Познавательные
  {
    id: 'educational',
    title: 'Познавательные',
    icon: '📚',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'abvgdeyka',
    title: 'Абвгдейка',
    icon: '🔤',
    type: 'cartoon',
    parentId: 'educational',
  },

  {
    id: 'sesame-street',
    title: 'Улица Сезам',
    icon: '🏠',
    type: 'cartoon',
    parentId: 'educational',
  },

  {
    id: 'mickey-mouse',
    title: 'Mickey Mouse',
    icon: '🐭',
    type: 'cartoon',
    parentId: 'educational',
  },

  // Мультики → Сказки
  {
    id: 'cartoon-fairy-tales',
    title: 'Сказки',
    icon: '🧙',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'pushkin',
    title: 'Пушкин',
    icon: '📖',
    type: 'cartoon',
    parentId: 'cartoon-fairy-tales',
  },

  {
    id: 'chukovsky',
    title: 'Чуковский',
    icon: '📚',
    type: 'cartoon',
    parentId: 'cartoon-fairy-tales',
  },

  // Мультики → Приключения
  {
    id: 'cartoon-adventures',
    title: 'Приключения',
    icon: '🚀',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'dunno',
    title: 'Незнайка',
    icon: '🎩',
    type: 'cartoon',
    parentId: 'cartoon-adventures',
  },

  {
    id: 'treasure-island',
    title: 'Остров сокровищ',
    icon: '🏴‍☠️',
    type: 'cartoon',
    parentId: 'cartoon-adventures',
  },

  // Мультики → Фэнтези
  {
    id: 'fantasy',
    title: 'Фэнтези',
    icon: '🧙‍♂️',
    type: 'cartoon',
    parentId: 'cartoons',
  },

  {
    id: 'avatar',
    title: 'Аватар',
    icon: '🌊',
    type: 'cartoon',
    parentId: 'fantasy',
  },

  {
    id: 'alice',
    title: 'Алиса',
    icon: '🐇',
    type: 'cartoon',
    parentId: 'fantasy',
  },

  // =========================
  // КИНО ДЕТСКОЕ
  // =========================

  {
    id: 'kids-movies',
    title: 'Кино детское',
    icon: '🎬',
    type: 'movie',
    parentId: null,
  },

  {
    id: 'kids-movie-fairy-tales',
    title: 'Сказки',
    icon: '🧙',
    type: 'movie',
    parentId: 'kids-movies',
  },

  {
    id: 'kids-movie-adventures',
    title: 'Приключения',
    icon: '🚀',
    type: 'movie',
    parentId: 'kids-movies',
  },

  {
    id: 'nature',
    title: 'Природа',
    icon: '🌿',
    type: 'movie',
    parentId: 'kids-movies',
  },

  // =========================
  // МУЗЫКА
  // =========================

  {
    id: 'music',
    title: 'Музыка',
    icon: '🎵',
    type: 'music',
    parentId: null,
  },
];
