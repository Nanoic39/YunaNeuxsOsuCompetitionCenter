<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { MOCK_TICKETS } from "~/utils/mockData";
import { Icon } from "#components";

definePageMeta({
  layout: "admin-layout",
  title: "工单详情",
});

const route = useRoute();
const router = useRouter();

// Get ID from query param
const ticketId = route.query.id as string;

const ticket = ref<any>(null);

onMounted(() => {
  if (!ticketId) {
    router.push("/tickets");
    return;
  }
  
  // Simulate fetching ticket details
  const found = MOCK_TICKETS.find((t: { id: string; }) => t.id === ticketId);
  if (found) {
    ticket.value = found;
  } else {
    // Handle not found
    router.push("/tickets");
  }
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

const getTypeLabel = (type: string) => {
  const map: Record<string, string> = {
    feature: "功能建议",
    bug: "Bug 反馈",
    account: "账号问题",
    appeal: "赛事申诉",
    cooperation: "合作联系",
    other: "其他",
  };
  return map[type] || type;
};
</script>

<template>
  <div v-if="ticket" class="max-w-5xl mx-auto w-full space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <n-button circle secondary @click="router.back()">
        <template #icon><Icon name="heroicons:arrow-left" /></template>
      </n-button>
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-[var(--text-main)]">
            {{ ticket.title }}
          </h1>
          <n-tag :type="getStatusColor(ticket.status) as any" size="small" round :bordered="false">
            {{ getStatusLabel(ticket.status) }}
          </n-tag>
        </div>
        <p class="text-[var(--text-secondary)] text-sm font-mono mt-1">
          ID: {{ ticket.id }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Ticket Description -->
        <n-card class="rounded-2xl shadow-sm border-0 bg-[var(--bg-card)]">
          <template #header>
            <div class="flex items-center gap-2 text-[var(--text-main)]">
              <Icon name="heroicons:document-text" class="text-lg" />
              <span>工单内容</span>
            </div>
          </template>
          <div class="whitespace-pre-wrap text-[var(--text-main)] leading-relaxed">
            {{ ticket.content }}
          </div>
          <div class="mt-4 pt-4 border-t border-[var(--border-color)] flex gap-4 text-sm text-[var(--text-secondary)]">
            <span>类型: {{ getTypeLabel(ticket.type) }}</span>
            <span>提交时间: {{ ticket.createdAt }}</span>
          </div>
        </n-card>

        <!-- Timeline / Updates -->
        <n-card class="rounded-2xl shadow-sm border-0 bg-[var(--bg-card)]">
           <template #header>
            <div class="flex items-center gap-2 text-[var(--text-main)]">
              <Icon name="heroicons:clock" class="text-lg" />
              <span>处理进度</span>
            </div>
          </template>
          
          <n-timeline>
            <n-timeline-item
              v-for="(update, index) in ticket.updates"
              :key="index"
              :type="index === 0 ? 'success' : 'default'"
              :title="update.user"
              :time="update.time"
              :content="update.content"
            />
          </n-timeline>

          <div v-if="ticket.status !== 'closed' && ticket.status !== 'resolved'" class="mt-8 pt-6 border-t border-[var(--border-color)]">
             <n-input
               type="textarea"
               placeholder="回复工单..."
               :rows="3"
               class="mb-3"
             />
             <div class="flex justify-end">
               <n-button type="primary" disabled>
                 <template #icon><Icon name="heroicons:paper-airplane" /></template>
                 发送回复 (暂不可用)
               </n-button>
             </div>
          </div>
        </n-card>
      </div>

      <!-- Sidebar Info -->
      <div class="space-y-6">
        <n-card class="rounded-2xl shadow-sm border-0 bg-[var(--bg-card)]">
          <template #header>
            <span class="font-bold text-[var(--text-main)]">工单信息</span>
          </template>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-[var(--text-secondary)]">状态</span>
              <n-tag :type="getStatusColor(ticket.status) as any" size="small" :bordered="false">
                {{ getStatusLabel(ticket.status) }}
              </n-tag>
            </div>
             <div class="flex justify-between items-center">
              <span class="text-[var(--text-secondary)]">优先级</span>
              <span class="font-medium text-[var(--text-main)]">普通</span>
            </div>
             <div class="flex justify-between items-center">
              <span class="text-[var(--text-secondary)]">最后更新</span>
              <span class="text-sm text-[var(--text-main)]">{{ ticket.updates[ticket.updates.length - 1]?.time || ticket.createdAt }}</span>
            </div>
          </div>
        </n-card>

         <n-alert title="提示" type="info" :bordered="false" class="rounded-xl">
           通常情况下，我们的工作人员会在 48 小时内回复您的工单。如遇周末或节假日，处理时间可能会顺延。
         </n-alert>
      </div>
    </div>
  </div>
</template>
