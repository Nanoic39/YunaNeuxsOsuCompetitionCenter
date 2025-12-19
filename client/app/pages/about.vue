<script setup lang="ts">
import { Icon } from '#components'

definePageMeta({
  layout: 'admin-layout'
})
</script>

<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div class="text-center py-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-pressed)] rounded-2xl text-white shadow-lg">
      <div class="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-inner">
        <Icon name="simple-icons:osu" class="text-white text-4xl" />
      </div>
      <h1 class="text-4xl font-bold mb-4">关于 Yuna Nexus</h1>
      <p class="text-lg opacity-90 max-w-2xl mx-auto px-4">
        致力于为 osu! 社区打造最专业、最便捷的赛事管理平台
      </p>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Mission -->
      <n-card class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm" size="large">
        <template #header>
          <div class="flex items-center gap-3 text-[var(--color-primary)]">
            <Icon name="heroicons:light-bulb" class="text-2xl" />
            <span class="font-bold text-xl">我们的使命</span>
          </div>
        </template>
        <p class="text-[var(--text-secondary)] leading-relaxed text-base">
          Yuna Nexus 旨在解决 osu! 社区赛事组织过程中的痛点。我们提供一站式的赛事管理解决方案，从报名、分组、赛程安排到成绩统计，全方位提升赛事组织效率和参赛体验。我们希望连接每一位热爱 osu! 的玩家，让竞技更有趣。
        </p>
      </n-card>

      <!-- Vision -->
      <n-card class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm" size="large">
        <template #header>
          <div class="flex items-center gap-3 text-[var(--color-warning)]">
            <Icon name="heroicons:eye" class="text-2xl" />
            <span class="font-bold text-xl">愿景展望</span>
          </div>
        </template>
        <p class="text-[var(--text-secondary)] leading-relaxed text-base">
          我们将持续迭代平台功能，引入更多自动化工具和数据分析能力。未来，Yuna Nexus 不仅仅是一个工具，更将成为汇聚顶尖选手、优质赛事和社区文化的中心枢纽，推动 osu! 电竞生态的健康发展。
        </p>
      </n-card>
    </div>

    <!-- Team Section -->
    <div class="bg-[var(--bg-card)] rounded-xl p-8 shadow-sm">
      <h2 class="text-2xl font-bold text-[var(--text-main)] mb-8 text-center">核心团队</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="text-center group">
          <n-avatar round :size="80" src="https://placehold.co/150x150/6692e1/ffffff?text=Dev" class="mb-4 group-hover:scale-110 transition-transform duration-300 ring-4 ring-[var(--bg-layout-body)] shadow-lg" />
          <h3 class="font-bold text-[var(--text-main)] text-lg">Developer</h3>
          <p class="text-[var(--text-secondary)] text-sm">全栈开发</p>
        </div>
        <div class="text-center group">
          <n-avatar round :size="80" src="https://placehold.co/150x150/88b04b/ffffff?text=Des" class="mb-4 group-hover:scale-110 transition-transform duration-300 ring-4 ring-[var(--bg-layout-body)] shadow-lg" />
          <h3 class="font-bold text-[var(--text-main)] text-lg">Designer</h3>
          <p class="text-[var(--text-secondary)] text-sm">UI/UX 设计</p>
        </div>
        <div class="text-center group">
          <n-avatar round :size="80" src="https://placehold.co/150x150/efc050/ffffff?text=Ops" class="mb-4 group-hover:scale-110 transition-transform duration-300 ring-4 ring-[var(--bg-layout-body)] shadow-lg" />
          <h3 class="font-bold text-[var(--text-main)] text-lg">Operator</h3>
          <p class="text-[var(--text-secondary)] text-sm">社区运营</p>
        </div>
        <div class="text-center group">
          <n-avatar round :size="80" src="https://placehold.co/150x150/e57373/ffffff?text=Org" class="mb-4 group-hover:scale-110 transition-transform duration-300 ring-4 ring-[var(--bg-layout-body)] shadow-lg" />
          <h3 class="font-bold text-[var(--text-main)] text-lg">Organizer</h3>
          <p class="text-[var(--text-secondary)] text-sm">赛事策划</p>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="bg-[var(--bg-layout-sider)] border border-[var(--border-color)] rounded-xl p-8 text-center">
      <h2 class="text-2xl font-bold text-[var(--text-main)] mb-4">联系我们</h2>
      <p class="text-[var(--text-secondary)] mb-6">如果您有任何建议、合作意向或遇到问题，欢迎随时联系我们。</p>
      <div class="flex justify-center gap-4">
        <n-button type="primary" size="large" class="shadow-lg shadow-blue-500/20">
          <template #icon><Icon name="heroicons:envelope" /></template>
          发送邮件
        </n-button>
        <n-button secondary type="info" size="large">
          <template #icon><Icon name="simple-icons:discord" /></template>
          加入 Discord
        </n-button>
      </div>
    </div>
  </div>
</template>
