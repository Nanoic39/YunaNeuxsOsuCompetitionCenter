<script setup lang="ts">
import { Icon } from '#components'
import { NTag, NCarousel } from 'naive-ui'
import { useHomeApi } from '~/composables/api/useHomeApi'

definePageMeta({ layout: 'admin-layout' })

const { fetchBanners, fetchRecommendedCompetitions, fetchNews, fetchQuickLinks, fetchUserStatus } = useHomeApi()
const { user, isLoggedIn } = useUser()

const { data: homeData, status: dataStatus } = await useAsyncData('home-data', async () => {
  const [banners, competitions, news, links, status] = await Promise.all([
    fetchBanners(),
    fetchRecommendedCompetitions(),
    fetchNews(),
    fetchQuickLinks(),
    fetchUserStatus()
  ])
  return {
    banners: banners as any[],
    competitions: competitions as any[],
    news: news as any[],
    links: links as any[],
    status: status as any
  }
})

// 计算属性简化模板中的访问
const banners = computed(() => homeData.value?.banners || [])
const recommendedCompetitions = computed(() => homeData.value?.competitions || [])
const news = computed(() => homeData.value?.news || [])
const quickLinks = computed(() => homeData.value?.links || [])
const myStatus = computed(() => homeData.value?.status || {})
const userProfile = user
</script>

<template>
  <div class="space-y-4 lg:space-y-8">
    <!-- 顶部轮播图 -->
    <n-carousel
      autoplay
      draggable
      class="rounded-[var(--radius-xl)] shadow-lg overflow-hidden h-[180px] sm:h-[240px] md:h-[320px]"
    >
      <div v-for="banner in banners" :key="banner.id" class="relative w-full h-full">
        <img :src="banner.image" class="w-full h-full object-cover" />
        <div class="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
          <h2 class="text-xl md:text-3xl font-bold text-white mb-2 truncate">{{ banner.title }}</h2>
          <n-button type="primary" size="small" ghost>查看详情</n-button>
        </div>
      </div>
    </n-carousel>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">
      <!-- 左侧主要内容区 (占 8/12) -->
      <div class="lg:col-span-8 space-y-4 lg:space-y-8">
        <!-- 热门赛事推荐 -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg md:text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
              <Icon name="heroicons:fire" class="text-[var(--color-error)]" />
              热门赛事
            </h3>
            <n-button text type="primary" @click="navigateTo('/competitions')">更多赛事 <Icon name="heroicons:arrow-right" class="ml-1" /></n-button>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="comp in recommendedCompetitions" 
              :key="comp.id"
              class="group relative bg-[var(--bg-card)] rounded-xl overflow-hidden border border-[var(--border-color)] hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div class="h-32 overflow-hidden">
                <img :src="comp.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div class="absolute top-2 right-2">
                   <CompetitionStatusTag :status="comp.status" />
                </div>
              </div>
              <div class="p-4">
                <h4 class="font-bold text-lg text-[var(--text-main)] mb-2 truncate">{{ comp.title }}</h4>
                <div class="flex items-center gap-2 mb-3">
                  <n-tag v-for="tag in comp.tags" :key="tag" size="small" :bordered="false" class="bg-gray-100 dark:bg-gray-700 text-[var(--text-secondary)]">
                    {{ tag }}
                  </n-tag>
                </div>
                <div class="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                  <span class="flex items-center gap-1"><Icon name="heroicons:users" /> {{ comp.participants }} 人参赛</span>
                  <span class="group-hover:text-[var(--color-primary)] transition-colors">查看详情</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 最新动态 -->
        <section>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg md:text-xl font-bold text-[var(--text-main)] flex items-center gap-2">
              <Icon name="heroicons:newspaper" class="text-[var(--color-primary)]" />
              最新动态
            </h3>
          </div>
          <div class="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden">
            <n-list hoverable clickable>
              <n-list-item v-for="item in news" :key="item.id">
                <template #prefix>
                  <div :class="`w-2 h-2 rounded-full ${item.type === 'warning' ? 'bg-[var(--color-warning)]' : item.type === 'success' ? 'bg-[var(--color-success)]' : 'bg-[var(--color-info)]'}`"></div>
                </template>
                <div class="flex items-center justify-between w-full gap-2">
                  <span class="text-[var(--text-main)] font-medium truncate flex-1">{{ item.title }}</span>
                  <span class="text-xs text-[var(--text-tertiary)] shrink-0">{{ item.date }}</span>
                </div>
              </n-list-item>
            </n-list>
          </div>
        </section>
      </div>

      <!-- 右侧边栏 (占 4/12) -->
      <div class="lg:col-span-4 space-y-4 lg:space-y-6">
        <!-- 个人参赛状态概览 (仅登录显示) -->
        <div 
          v-if="isLoggedIn" 
          class="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-pressed)] rounded-xl p-6 text-white shadow-lg shadow-[var(--color-primary)]/20"
        >
          <div class="flex items-center gap-4 mb-6">
            <n-avatar round size="large" :src="userProfile.avatar" class="border-2 border-white/30" />
            <div>
              <h4 class="font-bold text-lg">{{ userProfile.username }}</h4>
              <p class="text-white/70 text-sm">{{ userProfile.role }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div class="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
              <div class="text-2xl font-bold">{{ myStatus.activeCompetitions }}</div>
              <div class="text-xs text-white/70">正在参赛</div>
            </div>
            <div class="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
              <div class="text-2xl font-bold">{{ myStatus.pendingMatches }}</div>
              <div class="text-xs text-white/70">待办对局</div>
            </div>
          </div>

          <div v-if="myStatus.nextMatch" class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div class="text-xs text-white/70 mb-2">下一场对局</div>
            <div class="font-bold truncate">{{ myStatus.nextMatch.competition }}</div>
            <div class="flex items-center justify-between mt-2 text-sm">
              <span>VS {{ myStatus.nextMatch.opponent }}</span>
              <span class="bg-white/20 px-2 py-0.5 rounded text-xs">{{ myStatus.nextMatch.time.split(' ')[1] }}</span>
            </div>
          </div>
        </div>

        <!-- 常用快捷入口 -->
        <div class="bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] p-5 shadow-sm">
          <h4 class="font-bold text-[var(--text-main)] mb-4 text-sm uppercase tracking-wider">快捷入口</h4>
          <div class="grid grid-cols-2 gap-3">
            <n-button 
              v-for="link in quickLinks" 
              :key="link.label"
              secondary 
              strong
              class="h-16 flex flex-col gap-1 !rounded-lg"
            >
              <Icon :name="link.icon" :class="`text-xl ${link.color}`" />
              <span class="text-xs text-[var(--text-secondary)]">{{ link.label }}</span>
            </n-button>
            <n-button dashed class="h-16 flex flex-col gap-1 !rounded-lg opacity-60 hover:opacity-100">
              <Icon name="heroicons:plus" class="text-xl" />
              <span class="text-xs">添加</span>
            </n-button>
          </div>
        </div>

        <!-- 网站基本信息/公告栏 -->
        <div class="bg-[var(--color-primary)]/10 rounded-xl p-5 border border-[var(--color-primary)]/20">
          <h4 class="font-bold text-[var(--color-primary)] mb-2 flex items-center gap-2">
            <Icon name="heroicons:information-circle" />
            关于平台
          </h4>
          <p class="text-sm text-[var(--text-secondary)] leading-relaxed">
            Yuna Nexus 是一个专注于 osu! 社区赛事的综合管理平台。在这里，你可以轻松报名参赛、管理赛程、查看实时战况。
          </p>
          <div class="mt-4 flex gap-3">
            <n-button size="small" type="primary" secondary @click="$router.push('/about')">关于我们</n-button>
            <n-button size="small" text>API文档</n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>