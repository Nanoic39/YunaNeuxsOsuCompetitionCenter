import { MOCK_BANNERS, MOCK_COMPETITIONS, MOCK_NEWS, MOCK_QUICK_LINKS, MOCK_USER_STATUS, MOCK_USER_PROFILE } from '~/utils/mockData'

export const useHomeApi = () => {
  const fetchBanners = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_BANNERS), 300)
    })
  }

  const fetchRecommendedCompetitions = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_COMPETITIONS), 400)
    })
  }

  const fetchNews = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_NEWS), 300)
    })
  }

  const fetchQuickLinks = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_QUICK_LINKS), 200)
    })
  }

  const fetchUserStatus = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_USER_STATUS), 300)
    })
  }

  const fetchUserProfile = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_USER_PROFILE), 200)
    })
  }

  return {
    fetchBanners,
    fetchRecommendedCompetitions,
    fetchNews,
    fetchQuickLinks,
    fetchUserStatus,
    fetchUserProfile
  }
}
