<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { MOCK_TICKETS } from "~/utils/mockData";
import { Icon } from "#components";

definePageMeta({
  layout: "admin-layout",
  title: "我的工单",
});

const router = useRouter();
const tickets = ref(MOCK_TICKETS);
const searchText = ref("");
const statusFilter = ref("all");

const statusOptions = [
  { label: "全部状态", value: "all" },
  { label: "处理中", value: "processing" },
  { label: "待处理", value: "pending" },
  { label: "已解决", value: "resolved" },
  { label: "已关闭", value: "closed" },
];

const filteredTickets = computed(() => {
  return tickets.value.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchText.value.toLowerCase());
    const matchesStatus =
      statusFilter.value === "all" || ticket.status === statusFilter.value;
    return matchesSearch && matchesStatus;
  });
});

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending":
      return "warning";
    case "processing":
      return "info";
    case "resolved":
      return "success";
    case "closed":
      return "default";
    default:
      return "default";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "pending":
      return "待处理";
    case "processing":
      return "处理中";
    case "resolved":
      return "已解决";
    case "closed":
      return "已关闭";
    default:
      return "未知";
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case "bug":
      return "heroicons:bug-ant";
    case "feature":
      return "heroicons:light-bulb";
    case "account":
      return "heroicons:user-circle";
    case "appeal":
      return "heroicons:scale";
    case "cooperation":
      return "heroicons:briefcase";
    default:
      return "heroicons:question-mark-circle";
  }
};

const goToDetail = (id: string) => {
  router.push({ path: "/tickets/detail", query: { id } });
};
</script>

<template>
  <div class="max-w-5xl mx-auto w-full space-y-6">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 class="text-2xl font-bold text-[var(--text-main)]">我的工单</h1>
        <p class="text-[var(--text-secondary)] mt-1">
          查看您提交的所有反馈和工单处理进度
        </p>
      </div>
      <n-button type="primary" @click="router.push('/feedback')">
        <template #icon><Icon name="heroicons:plus" /></template>
        提交新反馈
      </n-button>
    </div>

    <!-- Filters -->
    <n-card class="rounded-2xl shadow-sm border-0 bg-[var(--bg-card)]">
      <div class="flex flex-col md:flex-row gap-4">
        <n-input
          v-model:value="searchText"
          placeholder="搜索工单号或标题..."
          class="flex-1"
        >
          <template #prefix>
            <Icon name="heroicons:magnifying-glass" class="text-gray-400" />
          </template>
        </n-input>
        <n-select
          v-model:value="statusFilter"
          :options="statusOptions"
          class="w-full md:w-48"
        />
      </div>
    </n-card>

    <!-- Ticket List -->
    <div class="space-y-4">
      <TransitionGroup name="list">
        <n-card
          v-for="ticket in filteredTickets"
          :key="ticket.id"
          class="rounded-xl shadow-sm border-0 bg-[var(--bg-card)] hover:shadow-md transition-shadow cursor-pointer"
          @click="goToDetail(ticket.id)"
        >
          <div class="flex flex-col md:flex-row gap-4 justify-between">
            <div class="flex gap-4">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                :class="`bg-[var(--color-${getStatusColor(ticket.status)})]/10 text-[var(--color-${getStatusColor(ticket.status)})]`"
              >
                <Icon :name="getTypeIcon(ticket.type)" class="text-2xl" />
              </div>
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span class="font-bold text-lg text-[var(--text-main)]">{{ ticket.title }}</span>
                  <n-tag :type="getStatusColor(ticket.status) as any" size="small" round :bordered="false">
                    {{ getStatusLabel(ticket.status) }}
                  </n-tag>
                </div>
                <div class="flex items-center gap-4 text-sm text-[var(--text-secondary)]">
                  <span class="font-mono">{{ ticket.id }}</span>
                  <span>{{ ticket.createdAt }}</span>
                </div>
                <p class="mt-2 text-[var(--text-secondary)] line-clamp-2">
                  {{ ticket.content }}
                </p>
              </div>
            </div>
            <div class="flex items-center justify-end md:justify-center shrink-0">
               <Icon name="heroicons:document-text" class="text-gray-400" />
            </div>
          </div>
        </n-card>
      </TransitionGroup>

      <div v-if="filteredTickets.length === 0" class="flex flex-col items-center justify-center py-12 text-[var(--text-secondary)]">
        <Icon name="heroicons:inbox" class="text-4xl mb-2 opacity-50" />
        <p>暂无相关工单</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
