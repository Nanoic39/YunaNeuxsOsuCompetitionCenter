<script setup lang="ts">
import { h, ref, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NIcon, NDrawer, NDrawerContent } from 'naive-ui'
import { Icon } from '#components' // 确保使用 Nuxt Icon 组件
import { useTheme } from '~/composables/useTheme'
import { useMenuApi } from '~/composables/api/useMenuApi'
import { useHomeApi } from '~/composables/api/useHomeApi'

const { isDark, toggleTheme } = useTheme()
const { fetchMenuItems } = useMenuApi()
const { fetchUserProfile } = useHomeApi()
const router = useRouter()
const route = useRoute()
const collapsed = ref(false)
const menuOptions = ref<any[]>([])
const activeKey = ref<string | null>(null)
const isLoading = ref(true)
const userProfile = ref<any>({})
const isMobile = ref(false)
const showMobileMenu = ref(false)

function checkMobile() {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) showMobileMenu.value = false
}

function matchRouteToMenu() {
  if (!menuOptions.value.length) return
  
  const currentPath = route.path
  
  const matched = menuOptions.value.find((item: any) => {
    if (item.path === '/') return currentPath === '/'
    return currentPath === item.path || currentPath.startsWith(item.path + '/')
  })
  
  if (matched) {
    activeKey.value = matched.key
  }
}

onMounted(async () => {
  try {
    const [items, profile] = await Promise.all([
      fetchMenuItems(),
      fetchUserProfile()
    ])
    
    menuOptions.value = (items as any[]).map((item: any) => ({
      ...item,
      icon: renderIcon(item.iconName)
    }))
    userProfile.value = profile
    matchRouteToMenu()
    checkMobile()
    window.addEventListener('resize', checkMobile)
  } finally {
    // Add a small buffer to ensure smooth transition
    setTimeout(() => {
      isLoading.value = false
    }, 300)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', checkMobile)
  }
})

watch(() => route.path, () => {
  matchRouteToMenu()
  if (isMobile.value) {
    showMobileMenu.value = false
  }
})

function handleThemeToggle(event: MouseEvent) {
  if (!document.startViewTransition) {
    toggleTheme()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  )

  const transition = document.startViewTransition(async () => {
    toggleTheme()
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`
    ]

    document.documentElement.animate(
      {
        clipPath: clipPath
      },
      {
        duration: 500,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        pseudoElement: '::view-transition-new(root)'
      }
    )
  })
}

function renderIcon(name: string) {
  return () => h(Icon, { name, class: 'text-lg' })
}

function handleMenuUpdate(key: string, item: any) {
  if (item.path) {
    router.push(item.path)
  }
}
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-500 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    mode="out-in"
  >
    <div v-if="isLoading" class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-layout-body)] transition-colors duration-300">
      <div class="relative w-24 h-24 mb-8">
        <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#6692E1] to-[#7FA4E8] animate-pulse"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <Icon name="simple-icons:osu" class="text-white text-5xl animate-bounce" />
        </div>
      </div>
      <div class="flex flex-col items-center gap-2">
        <h2 class="text-2xl font-bold text-[var(--color-primary)] tracking-widest">
          YUNA NEXUS
        </h2>
        <div class="flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-[#6692E1] animate-[bounce_1s_infinite_100ms]"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#7FA4E8] animate-[bounce_1s_infinite_200ms]"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-[#94A3B8] animate-[bounce_1s_infinite_300ms]"></span>
        </div>
      </div>
    </div>

    <n-layout v-else :has-sider="!isMobile" class="h-screen bg-[var(--bg-layout-body)]">
    <n-layout-sider
      v-if="!isMobile"
      bordered
      collapse-mode="width"
      :collapsed-width="80"
      :width="260"
      :collapsed="collapsed"
      @collapse="collapsed = true"
      @expand="collapsed = false"
      :native-scrollbar="false"
      class="z-50 shadow-2xl transition-all duration-300 relative group"
    >
      <div class="h-full flex flex-col bg-[var(--bg-layout-sider)] transition-colors duration-300">
        <!-- Logo Area -->
        <div class="h-20 flex items-center justify-center overflow-hidden whitespace-nowrap px-4 shrink-0 transition-colors duration-300 border-b border-[var(--border-color)]">
          <div class="flex items-center gap-3 text-[var(--text-main)] transition-all duration-300 ease-in-out" :class="{ 'scale-90': collapsed }">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6692E1] to-[#7FA4E8] flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0 z-10">
               <Icon name="simple-icons:osu" class="text-white text-2xl" />
            </div>
            <div 
              class="flex flex-col transition-all duration-300 ease-in-out overflow-hidden"
              :class="collapsed ? 'w-0 opacity-0 -translate-x-4' : 'w-32 opacity-100 translate-x-0'"
            >
              <span class="font-bold text-lg tracking-wide text-[var(--text-main)] leading-none whitespace-nowrap">
                YUNA NEXUS
              </span>
              <span class="text-[10px] text-[var(--text-secondary)] mt-1 uppercase tracking-wider whitespace-nowrap">Competition Center</span>
            </div>
          </div>
        </div>
        
        <!-- Menu Area -->
        <n-menu 
          v-model:value="activeKey"
          :options="menuOptions" 
          :collapsed="collapsed" 
          :collapsed-width="80" 
          :collapsed-icon-size="24" 
          :icon-size="22"
          accordion
          :indent="24"
          class="flex-1 py-4"
          @update:value="handleMenuUpdate"
        />

        <!-- Collapse Button -->
        <div class="h-14 shrink-0 flex items-center justify-center border-t border-[var(--border-color)] hover:bg-[var(--bg-layout-body)] transition-colors cursor-pointer group/btn" @click="collapsed = !collapsed">
           <div class="flex items-center gap-2 text-[var(--text-secondary)] group-hover/btn:text-[var(--color-primary)] transition-colors">
             <Icon :name="collapsed ? 'heroicons:chevron-double-right' : 'heroicons:chevron-double-left'" class="text-xl transition-transform duration-300 group-hover/btn:scale-110" />
             <span 
               class="text-xs font-medium uppercase tracking-widest whitespace-nowrap transition-all duration-300 ease-in-out overflow-hidden"
               :class="collapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'"
             ></span>
           </div>
        </div>
      </div>
    </n-layout-sider>

    <n-layout class="flex flex-col bg-transparent">
      <n-layout-header 
        bordered 
        class="h-16 flex items-center justify-between px-4 md:px-6 bg-[var(--bg-header)] backdrop-blur-xl sticky top-0 z-40 shadow-sm transition-all border-b border-[var(--border-color)]"
      >
        <div class="flex items-center gap-4">
           <n-button v-if="isMobile" circle quaternary @click="showMobileMenu = true" class="mr-2">
             <template #icon>
               <Icon name="heroicons:bars-3" />
             </template>
           </n-button>
           
           <!-- 面包屑或其他导航辅助 -->
           <n-breadcrumb class="hidden md:block">
             <n-breadcrumb-item>首页</n-breadcrumb-item>
             <n-breadcrumb-item>工作台</n-breadcrumb-item>
           </n-breadcrumb>

           <!-- 移动端 Logo -->
           <div v-if="isMobile" class="flex items-center gap-2">
             <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6692E1] to-[#7FA4E8] flex items-center justify-center shadow-lg shadow-blue-500/20">
               <Icon name="simple-icons:osu" class="text-white text-lg" />
             </div>
             <span class="font-bold text-[var(--text-main)]">YUNA NEXUS</span>
           </div>
        </div>

        <div class="flex items-center gap-2 md:gap-4">
          <n-button circle quaternary @click="handleThemeToggle">
            <template #icon>
              <Icon :name="isDark ? 'heroicons:moon' : 'heroicons:sun'" />
            </template>
          </n-button>
          
          <n-button circle quaternary>
            <template #icon>
              <Icon name="heroicons:bell" />
            </template>
          </n-button>
          
          <n-dropdown :options="[{ label: '个人中心', key: 'profile' }, { label: '退出登录', key: 'logout' }]">
            <div class="flex items-center gap-3 cursor-pointer hover:bg-[var(--color-primary)]/10 px-2 py-1 rounded-full transition-colors">
              <n-avatar round size="small" :src="userProfile.avatar || 'https://osu.ppy.sh/images/layout/avatar-guest.png'" />
              <div class="flex flex-col text-xs text-right hidden md:block">
                <span class="font-bold text-[var(--text-main)]">{{ userProfile.username || 'Guest' }}</span>
                <span class="text-[var(--text-secondary)]">{{ userProfile.role || 'Visitor' }}</span>
              </div>
            </div>
          </n-dropdown>
        </div>
      </n-layout-header>

      <n-layout-content 
        content-style="padding: 16px; min-height: 100%; display: flex; flex-direction: column;"
        :native-scrollbar="false"
        class="flex-1"
      >
        <main class="flex-1 w-full max-w-[1600px] mx-auto">
          <slot />
        </main>
        
        <n-layout-footer class="bg-transparent text-center p-4 text-[var(--text-tertiary)] text-xs">
          &copy; 2025 Yuna Nexus Competition Center. All Rights Reserved.
        </n-layout-footer>
      </n-layout-content>
    </n-layout>
    </n-layout>
  </Transition>

    <!-- Mobile Drawer Menu -->
    <n-drawer v-model:show="showMobileMenu" placement="left" :width="280">
      <n-drawer-content body-content-style="padding: 0;">
        <div class="h-full flex flex-col bg-[var(--bg-layout-sider)]">
          <!-- Logo Area -->
          <div class="h-20 flex items-center justify-center px-4 shrink-0 border-b border-[var(--border-color)]">
            <div class="flex items-center gap-3 text-[var(--text-main)]">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6692E1] to-[#7FA4E8] flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                 <Icon name="simple-icons:osu" class="text-white text-2xl" />
              </div>
              <div class="flex flex-col">
                <span class="font-bold text-lg tracking-wide text-[var(--text-main)] leading-none">
                  YUNA NEXUS
                </span>
                <span class="text-[10px] text-[var(--text-secondary)] mt-1 uppercase tracking-wider">Competition Center</span>
              </div>
            </div>
          </div>
          
          <!-- Menu Area -->
          <n-menu 
            v-model:value="activeKey"
            :options="menuOptions" 
            :icon-size="22"
            accordion
            :indent="24"
            class="flex-1 py-4"
            @update:value="handleMenuUpdate"
          />
        </div>
      </n-drawer-content>
    </n-drawer>
</template>