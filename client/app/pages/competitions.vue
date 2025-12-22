<script setup lang="ts">
import { useHomeApi } from "~/composables/api/useHomeApi";

definePageMeta({
  layout: "admin-layout",
});

interface Competition {
  id: number;
  title: string;
  status: string;
  participants: number;
  maxPlayers: number;
  startTime: string;
  description: string;
  image: string;
  tags: string[];
}

const { fetchRecommendedCompetitions } = useHomeApi();
const { data: competitions } = await useAsyncData<Competition[]>(
  "competitions-page",
  async () => {
    const res = await fetchRecommendedCompetitions();
    return res as Competition[];
  }
);

const message = useMessage();

function handleCreateCompetition() {
  message.info("创建赛事功能正在开发中");
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-[var(--text-main)]">赛事列表</h2>
        <p class="text-[var(--text-secondary)]">查看正在进行和即将开始的比赛</p>
      </div>
      <n-button
        type="primary"
        size="medium"
        class="shadow-lg shadow-blue-500/20"
        @click="handleCreateCompetition"
      >
        <template #icon><Icon name="heroicons:plus" /></template>
        创建赛事
      </n-button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="comp in competitions"
        :key="comp.id"
        class="group bg-[var(--bg-card)] rounded-xl overflow-hidden border border-[var(--border-color)] hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      >
        <div class="h-48 relative overflow-hidden">
          <img
            :src="comp.image"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div class="absolute top-3 right-3">
            <CompetitionStatusTag :status="comp.status" />
          </div>
          <div
            class="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <h3 class="text-white font-bold text-lg truncate">
              {{ comp.title }}
            </h3>
            <div class="flex items-center gap-2 text-white/80 text-xs mt-1">
              <Icon name="heroicons:user-group" />
              <span>{{ comp.participants }}/{{ comp.maxPlayers }}</span>
              <span class="mx-1">•</span>
              <Icon name="heroicons:calendar" />
              <span>{{ comp.startTime }}</span>
            </div>
          </div>
        </div>

        <div class="p-4">
          <p
            class="text-[var(--text-secondary)] text-sm line-clamp-2 mb-4 h-10"
          >
            {{ comp.description }}
          </p>

          <div class="flex items-center justify-between mt-auto">
            <div class="flex -space-x-2">
              <n-avatar
                v-for="i in 3"
                :key="i"
                round
                size="small"
                :src="`https://placehold.co/100x100/cccccc/ffffff?text=P${i}`"
                class="border-2 border-[var(--bg-card)]"
              />
            </div>
            <n-button secondary type="primary" size="small">
              查看详情
            </n-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
