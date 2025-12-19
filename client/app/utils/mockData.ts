export const MOCK_BANNERS = [
  { id: 1, title: 'Yuna Cup 2025 夏季赛开启报名', image: 'https://placehold.co/800x400/6692e1/ffffff?text=Yuna+Cup+2025', link: '#' },
  { id: 2, title: '新人映射邀请赛', image: 'https://placehold.co/800x400/88b04b/ffffff?text=Newbie+Mapping', link: '#' },
  { id: 3, title: '社区映射大赛结果公布', image: 'https://placehold.co/800x400/efc050/ffffff?text=Contest+Results', link: '#' },
]

export const MOCK_COMPETITIONS = [
  { id: 1, title: 'Yuna Cup 2025', status: '报名中', participants: 128, image: 'https://placehold.co/400x200/6692e1/ffffff?text=Yuna+Cup', tags: ['Standard', '1v1'] },
  { id: 2, title: 'Osu! Mania 4K World Cup', status: '进行中', participants: 64, image: 'https://placehold.co/400x200/88b04b/ffffff?text=Mania+WC', tags: ['Mania', 'Team'] },
  { id: 3, title: 'Taiko Beginners Cup', status: '筹备中', participants: 0, image: 'https://placehold.co/400x200/efc050/ffffff?text=Taiko+Cup', tags: ['Taiko', 'Beginner'] },
  { id: 4, title: 'Catch The Beat Monthly', status: '报名中', participants: 32, image: 'https://placehold.co/400x200/e57373/ffffff?text=CTB+Monthly', tags: ['Catch', 'Monthly'] },
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
  id: 1,
  username: 'Admin User',
  role: 'Super Admin',
  avatar: 'https://placehold.co/100x100/4f46e5/ffffff?text=AU',
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
    label: '登录/注册',
    key: 'auth',
    iconName: 'heroicons:arrow-right-on-rectangle',
    path: '/login'
  }
]
