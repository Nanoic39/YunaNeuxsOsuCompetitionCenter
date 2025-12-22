<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { Icon } from "#components";

definePageMeta({
  layout: "admin-layout",
  title: "意见反馈",
});

const route = useRoute();
const router = useRouter();
const message = useMessage();

const loading = ref(false);

const feedbackTypes = [
  { label: "功能建议", value: "feature" },
  { label: "Bug 反馈", value: "bug" },
  { label: "账号问题", value: "account" },
  { label: "赛事申诉", value: "appeal" },
  { label: "合作联系", value: "cooperation" },
  { label: "其他", value: "other" },
];

const form = reactive({
  type: "feature",
  title: "",
  content: "",
  contact: "",
});

onMounted(() => {
  // Auto-fill from query params
  const typeQuery = route.query.type;
  if (typeQuery) {
    const type = Array.isArray(typeQuery) ? typeQuery[0] : typeQuery;
    // Check if type exists in options and is not null
    if (type && feedbackTypes.some((t) => t.value === type)) {
      form.type = type;
    }
  }

  const titleQuery = route.query.title;
  if (titleQuery) {
    const title = Array.isArray(titleQuery) ? titleQuery[0] : titleQuery;
    if (title) {
      form.title = title;
    }
  }
});

const handleSubmit = () => {
  if (!form.title || !form.content) {
    message.error("请填写完整的反馈信息");
    return;
  }

  loading.value = true;
  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    message.success("反馈提交成功！我们会尽快处理。");
    router.push("/");
  }, 1500);
};
</script>

<template>
  <div class="max-w-3xl mx-auto w-full">
    <n-card class="rounded-2xl shadow-sm border-0 bg-[var(--bg-card)]">
      <template #header>
        <div class="flex items-center gap-3">
          <div
            class="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]"
          >
            <Icon name="heroicons:chat-bubble-left-right" class="text-xl" />
          </div>
          <span class="text-xl font-bold text-[var(--text-main)]"
            >意见反馈</span
          >
        </div>
      </template>

      <div class="space-y-6">
        <n-alert type="info" :bordered="false" class="mb-6 rounded-xl">
          您的反馈对我们非常重要！无论是发现 Bug
          还是有新的功能建议，都欢迎告诉我们。
        </n-alert>

        <n-form
          ref="formRef"
          :model="form"
          label-placement="top"
          label-width="auto"
          require-mark-placement="right-hanging"
        >
          <n-form-item label="反馈类型" path="type">
            <n-select v-model:value="form.type" :options="feedbackTypes" />
          </n-form-item>

          <n-form-item label="标题" path="title" required>
            <n-input
              v-model:value="form.title"
              placeholder="请简要描述您的问题或建议"
            />
          </n-form-item>

          <n-form-item label="详细内容" path="content" required>
            <n-input
              v-model:value="form.content"
              type="textarea"
              placeholder="请尽可能详细地描述，如果是 Bug 请包含复现步骤..."
              :autosize="{ minRows: 5, maxRows: 10 }"
            />
          </n-form-item>

          <n-form-item label="联系方式 (选填)" path="contact">
            <n-input
              v-model:value="form.contact"
              placeholder="Email 或 Discord ID，方便我们联系您"
            />
          </n-form-item>

          <div class="flex justify-end gap-4 pt-4">
            <n-button @click="router.back()">取消</n-button>
            <n-button type="primary" :loading="loading" @click="handleSubmit">
              <template #icon>
                <Icon name="heroicons:paper-airplane" />
              </template>
              提交反馈
            </n-button>
          </div>
        </n-form>
      </div>
    </n-card>
  </div>
</template>
