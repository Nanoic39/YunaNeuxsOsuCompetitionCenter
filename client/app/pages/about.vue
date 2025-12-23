<script setup lang="ts">
import { Icon } from "#components";
import { MOCK_TEAM_MEMBERS, MOCK_CHANGELOG } from "~/utils/mockData";

definePageMeta({
  layout: "admin-layout",
  title: "关于我们",
});

const teamMembers = MOCK_TEAM_MEMBERS;
const changelog = MOCK_CHANGELOG;

// Helper to get color based on change type
const getChangeTypeColor = (type: string) => {
  switch (type) {
    case "feat":
      return "text-[var(--color-success)]";
    case "fix":
      return "text-[var(--color-warning)]";
    case "perf":
      return "text-[var(--color-info)]";
    case "style":
      return "text-pink-500";
    default:
      return "text-[var(--text-secondary)]";
  }
};

// Helper to get icon based on change type
const getChangeTypeIcon = (type: string) => {
  switch (type) {
    case "feat":
      return "heroicons:plus-circle";
    case "fix":
      return "heroicons:wrench-screwdriver";
    case "perf":
      return "heroicons:bolt";
    case "style":
      return "heroicons:paint-brush";
    default:
      return "heroicons:information-circle";
  }
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header Section -->
    <div
      class="text-center py-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-pressed)] rounded-2xl text-white shadow-lg"
    >
      <div
        class="w-20 h-20 mx-auto bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-inner"
      >
        <Icon name="simple-icons:osu" class="text-white text-4xl" />
      </div>
      <h1 class="text-4xl font-bold mb-4">
        关于 Yuna Nexus Osu Competition Center
      </h1>
      <p class="text-lg opacity-90 max-w-2xl mx-auto px-4">
        致力于为 osu! 社区打造专业且便捷的赛事管理平台
      </p>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Mission -->
      <n-card
        class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm"
        size="large"
      >
        <template #header>
          <div class="flex items-center gap-3 text-[var(--color-primary)]">
            <Icon name="heroicons:light-bulb" class="text-2xl" />
            <span class="font-bold text-xl">我们的使命</span>
          </div>
        </template>
        <p class="text-[var(--text-secondary)] leading-relaxed text-base">
          Yuna Nexus OsuCompetitionCenter 旨在解决
          osu!社区赛事组织过程中的痛点。我们提供一站式的赛事管理解决方案，从报名、分组、赛程安排到成绩统计，全方位提升赛事组织效率和参赛体验。我们希望连接每一位热爱osu!
          的玩家，让竞技更有趣。
        </p>
      </n-card>

      <!-- Vision -->
      <n-card
        class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm"
        size="large"
      >
        <template #header>
          <div class="flex items-center gap-3 text-[var(--color-warning)]">
            <Icon name="heroicons:eye" class="text-2xl" />
            <span class="font-bold text-xl">愿景展望</span>
          </div>
        </template>
        <p class="text-[var(--text-secondary)] leading-relaxed text-base">
          我们将持续迭代平台功能，引入更多自动化工具和数据分析能力。希望未来Yuna
          Nexus Osu Competition Center
          不仅仅是一个工具，更能成为汇聚顶尖选手、优质赛事和社区文化的中心枢纽，推动
          osu! 第三方社区的健康发展。
        </p>
      </n-card>
    </div>

    <!-- Features -->
    <n-card
      class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm"
      size="large"
    >
      <template #header>
        <div class="flex items-center gap-3 text-[var(--color-success)]">
          <Icon name="heroicons:cpu-chip" class="text-2xl" />
          <span class="font-bold text-xl">平台特性</span>
        </div>
      </template>
      <ul class="space-y-3">
        <li class="flex items-start gap-2">
          <Icon
            name="heroicons:check-circle"
            class="text-[var(--color-success)] mt-1"
          />
          <span class="text-[var(--text-secondary)]"
            >自动化赛程编排与通知系统</span
          >
        </li>
        <li class="flex items-start gap-2">
          <Icon
            name="heroicons:check-circle"
            class="text-[var(--color-success)] mt-1"
          />
          <span class="text-[var(--text-secondary)]"
            >实时比分追踪与可视化图表</span
          >
        </li>
        <li class="flex items-start gap-2">
          <Icon
            name="heroicons:check-circle"
            class="text-[var(--color-success)] mt-1"
          />
          <span class="text-[var(--text-secondary)]">多模式适配</span>
        </li>
        <li class="flex items-start gap-2">
          <Icon
            name="heroicons:check-circle"
            class="text-[var(--color-success)] mt-1"
          />
          <span class="text-[var(--text-secondary)]"
            >公正透明的裁判与申诉机制</span
          >
        </li>
      </ul>
    </n-card>

    <!-- Changelog -->
    <n-card
      class="bg-[var(--bg-card)] rounded-xl border-0 shadow-sm overflow-hidden"
      size="large"
    >
      <template #header>
        <div class="flex items-center gap-3 text-[var(--color-info)]">
          <Icon name="heroicons:clock" class="text-2xl" />
          <span class="font-bold text-xl">网站更新记录</span>
        </div>
      </template>

      <div class="h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        <div class="space-y-8 pl-2 py-2">
          <div
            v-for="(release, index) in changelog"
            :key="release.version"
            class="relative pl-6 border-l-2 border-[var(--border-color)] animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <!-- Timeline Dot -->
            <div
              class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-[var(--bg-card)] transition-colors duration-300"
              :class="
                index === 0
                  ? 'bg-[var(--color-primary)]'
                  : 'bg-[var(--text-tertiary)]'
              "
            ></div>

            <!-- Version Header -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-lg text-[var(--text-main)]">
                  {{ release.version }}
                </h3>
                <n-tag
                  size="small"
                  :type="
                    release.type === 'major'
                      ? 'primary'
                      : release.type === 'minor'
                        ? 'info'
                        : 'default'
                  "
                  round
                  :bordered="false"
                  class="font-mono"
                >
                  {{ release.type.toUpperCase() }}
                </n-tag>
              </div>
              <span class="text-sm text-[var(--text-secondary)]">{{
                release.date
              }}</span>
            </div>

            <div class="font-medium text-[var(--text-main)] mb-2">
              {{ release.title }}
            </div>

            <!-- Changes List -->
            <ul class="space-y-2">
              <li
                v-for="(change, cIndex) in release.changes"
                :key="cIndex"
                class="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
              >
                <Icon
                  :name="getChangeTypeIcon(change.type)"
                  class="mt-0.5 text-base shrink-0"
                  :class="getChangeTypeColor(change.type)"
                />
                <span>{{ change.content }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </n-card>

    <!-- Team Section -->
    <div class="bg-[var(--bg-card)] rounded-xl p-8 shadow-sm">
      <h2 class="text-2xl font-bold text-[var(--text-main)] mb-8 text-center">
        核心团队
      </h2>
      <div class="flex flex-wrap justify-center gap-8">
        <div
          v-for="member in teamMembers"
          :key="member.name"
          class="text-center group w-full max-w-[200px]"
        >
          <n-avatar
            round
            :size="80"
            :src="member.avatar"
            class="mb-4 group-hover:scale-110 transition-transform duration-300 ring-4 ring-[var(--bg-layout-body)] shadow-lg"
          />
          <h3 class="font-bold text-[var(--text-main)] text-lg">
            {{ member.name }}
          </h3>
          <p class="text-[var(--text-secondary)] text-sm">{{ member.role }}</p>
        </div>
      </div>
    </div>

    <!-- Contact Section -->
    <div
      class="bg-[var(--bg-layout-sider)] border border-[var(--border-color)] rounded-xl p-8 text-center"
    >
      <h2 class="text-2xl font-bold text-[var(--text-main)] mb-4">联系我们</h2>
      <p class="text-[var(--text-secondary)] mb-6">
        如果您有任何建议、合作意向或遇到问题，欢迎随时联系我们。
      </p>
      <div class="flex justify-center gap-4">
        <n-button
          type="primary"
          size="large"
          class="shadow-lg shadow-blue-500/20"
          @click="
            $router.push({
              path: '/feedback',
              query: { type: 'other', title: '填写(个人/企业)合作联系申请' },
            })
          "
        >
          <template #icon
            ><Icon name="heroicons:chat-bubble-left-ellipsis"
          /></template>
          提交反馈
        </n-button>
        <n-button secondary type="info" size="large">
          <template #icon><Icon name="heroicons:user-group" /></template>
          加入群组
        </n-button>
      </div>
    </div>
  </div>
</template>
