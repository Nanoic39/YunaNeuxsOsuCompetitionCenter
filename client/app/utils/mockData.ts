export const MOCK_BANNERS = [
  { id: 1, title: 'Yuna Cup 2025 夏季赛开启报名', image: 'https://placehold.co/800x400/6692e1/ffffff?text=Yuna+Cup+2025', link: '#' },
  { id: 2, title: '新人映射邀请赛', image: 'https://placehold.co/800x400/88b04b/ffffff?text=Newbie+Mapping', link: '#' },
  { id: 3, title: '社区映射大赛结果公布', image: 'https://placehold.co/800x400/efc050/ffffff?text=Contest+Results', link: '#' },
]

export const MOCK_COMPETITIONS = [
  { 
    id: 1, 
    title: 'Yuna Cup 2025', 
    status: '报名中', 
    participants: 128, 
    maxPlayers: 256,
    startTime: '2025-06-01',
    description: '年度最大的 Standard 模式 1v1 锦标赛，欢迎所有玩家参与！奖池丰厚，不容错过。',
    image: 'https://placehold.co/400x200/6692e1/ffffff?text=Yuna+Cup', 
    tags: ['Standard', '1v1'] 
  },
  { 
    id: 2, 
    title: 'Osu! Mania 4K World Cup', 
    status: '进行中', 
    participants: 64, 
    maxPlayers: 64,
    startTime: '2025-05-15',
    description: '世界顶尖 Mania 4K 玩家的巅峰对决，国家队形式参赛。',
    image: 'https://placehold.co/400x200/88b04b/ffffff?text=Mania+WC', 
    tags: ['Mania', 'Team'] 
  },
  { 
    id: 3, 
    title: 'Taiko Beginners Cup', 
    status: '筹备中', 
    participants: 0, 
    maxPlayers: 128,
    startTime: '2025-07-10',
    description: '面向 Taiko 新手的友好比赛，旨在帮助新人体验比赛乐趣。',
    image: 'https://placehold.co/400x200/efc050/ffffff?text=Taiko+Cup', 
    tags: ['Taiko', 'Beginner'] 
  },
  { 
    id: 4, 
    title: 'Catch The Beat Monthly', 
    status: '报名中', 
    participants: 32, 
    maxPlayers: 64,
    startTime: '2025-05-25',
    description: '每月一届的接水果娱乐赛，快节奏，高趣味。',
    image: 'https://placehold.co/400x200/e57373/ffffff?text=CTB+Monthly', 
    tags: ['Catch', 'Monthly'] 
  },
]

export const MOCK_NEWS = [
  { id: 1, title: '系统维护通知：本周六凌晨2点进行服务器升级', date: '2025-05-20', type: 'warning' },
  { id: 2, title: '关于2025年夏季赛规则调整的公告', date: '2025-05-18', type: 'info' },
  { id: 3, title: '社区行为准则更新公示', date: '2025-05-15', type: 'default' },
  { id: 4, title: '恭喜 Player1 获得春季赛冠军！', date: '2025-05-10', type: 'success' },
]

export const MOCK_QUICK_LINKS = [
  { label: '创建赛事', icon: 'heroicons:plus-circle', path: '/competitions/create', color: 'text-[var(--color-primary)]' },
  { label: '我的比赛', icon: 'heroicons:trophy', path: '/my-competitions', color: 'text-[var(--color-warning)]' },
  { label: '排行榜', icon: 'heroicons:chart-bar', path: '/rankings', color: 'text-[var(--color-success)]' },
  { label: '帮助中心', icon: 'heroicons:question-mark-circle', path: '/help', color: 'text-[var(--color-info)]' },
]

export const MOCK_USER_STATUS = {
  activeCompetitions: 2,
  pendingMatches: 1,
  nextMatch: {
    competition: 'Yuna Cup 2025',
    opponent: 'PlayerTwo',
    time: '2025-05-21 20:00'
  }
}

export const MOCK_USER_PROFILE = {
  id: 32039184,
  username: 'Admin User',
  email: 'admin@yunaneuxs.com',
  bio: '热爱 osu! 的玩家。Map enthusiast.',
  banner: 'https://placehold.co/1200x300/6692e1/ffffff?text=Profile+Banner',
  socials: {
    discord: 'yuna#1234',
    twitter: '@yuna_osu',
    twitch: 'yuna_live',
    osu: 'https://osu.ppy.sh/users/32039184'
  },
  roles: ['Super Admin', 'Tournament Host', 'Referee', 'Mapper', 'Player', 'Commentator', 'Streamer', 'VIP Support'],
  role: 'Super Admin', // Keep for compatibility
  avatar: 'https://a.ppy.sh/32039184?1732108660.jpeg',
  isLoggedIn: true
}

export const MOCK_MENU_ITEMS = [
  { 
    label: '工作台', 
    key: 'dashboard', 
    iconName: 'heroicons:squares-2x2',
    path: '/'
  },
  { 
    label: '赛事列表', 
    key: 'competitions', 
    iconName: 'heroicons:trophy',
    path: '/competitions'
  },
  {
    label: '关于我们',
    key: 'about',
    iconName: 'heroicons:information-circle',
    path: '/about'
  },
  {
    label: '登录/注册',
    key: 'auth',
    iconName: 'heroicons:arrow-right-on-rectangle',
    path: '/login'
  }
]
