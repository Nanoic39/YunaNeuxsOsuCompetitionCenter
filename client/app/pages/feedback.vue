<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMessage, type FormInst, type FormRules } from "naive-ui";
import { Icon } from "#components";

definePageMeta({
  layout: "admin-layout",
  title: "意见反馈",
});

const route = useRoute();
const router = useRouter();
const message = useMessage();

const loading = ref(false);
const formRef = ref<FormInst | null>(null);
const isSubmitted = ref(false);

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

const rules: FormRules = {
  title: {
    required: true,
    message: "请输入标题",
    trigger: ["blur", "input"],
  },
  content: {
    required: true,
    message: "请输入详细内容",
    trigger: ["blur", "input"],
  },
};

onMounted(() => {
  const typeQuery = route.query.type;
  if (typeQuery) {
    const type = Array.isArray(typeQuery) ? typeQuery[0] : typeQuery;
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

const showConfirm = ref(false);

const handleSubmitClick = (e: MouseEvent) => {
  e.preventDefault();
  e.stopPropagation();
  formRef.value?.validate((errors) => {
    if (errors) {
      message.error("请填写必填项");
    } else {
      showConfirm.value = true;
    }
  });
};

const onConfirmSubmit = () => {
  showConfirm.value = false;
  loading.value = true;

  // Simulate API call
  setTimeout(() => {
    loading.value = false;
    isSubmitted.value = true;
  }, 1500);
};

const resetForm = () => {
  form.title = "";
  form.content = "";
  form.contact = "";
  isSubmitted.value = false;
};
</script>

<template>
  <div class="max-w-4xl mx-auto w-full px-4 pb-20 pt-8">
    <n-card
      class="rounded-2xl shadow-sm border-0 bg-[var(--bg-card)] min-h-[600px] overflow-hidden relative"
    >
      <template #header>
        <div class="flex items-center justify-between px-6 pt-6">
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
          <n-button secondary @click="router.push('/tickets')">
            <template #icon><Icon name="heroicons:document-text" /></template>
            我的工单
          </n-button>
        </div>
      </template>

      <div class="relative w-full pt-8 px-8 pb-12">
        <transition name="fade" mode="out-in">
          <!-- Form View -->
          <div v-if="!isSubmitted" class="max-w-2xl mx-auto">
            <n-alert type="info" :bordered="false" class="mb-6 rounded-xl">
              您的反馈对我们非常重要！无论是发现 Bug
              还是有新的功能建议，都欢迎告诉我们。
            </n-alert>

            <n-form
              ref="formRef"
              :model="form"
              :rules="rules"
              label-placement="top"
              label-width="auto"
              require-mark-placement="right-hanging"
            >
              <n-grid :cols="1" :y-gap="24">
                <n-form-item-gi label="反馈类型" path="type">
                  <n-select
                    v-model:value="form.type"
                    :options="feedbackTypes"
                  />
                </n-form-item-gi>
                <n-form-item-gi label="标题" path="title">
                  <n-input
                    v-model:value="form.title"
                    placeholder="请简要描述您的问题或建议"
                  />
                </n-form-item-gi>
                <n-form-item-gi label="详细内容" path="content">
                  <n-input
                    v-model:value="form.content"
                    type="textarea"
                    :rows="6"
                    placeholder="请详细描述..."
                  />
                </n-form-item-gi>
                <n-form-item-gi label="联系方式 (选填)" path="contact">
                  <n-input
                    v-model:value="form.contact"
                    placeholder="邮箱或 QQ"
                  />
                </n-form-item-gi>
              </n-grid>

              <div
                class="flex justify-end gap-4 pt-4 mt-4 border-t border-gray-100"
              >

                <n-popconfirm
                  :show="showConfirm"
                  @positive-click="onConfirmSubmit"
                  @negative-click="showConfirm = false"
                  @clickoutside="showConfirm = false"
                >
                  <template #trigger>
                    <n-button
                      type="primary"
                      :loading="loading"
                      @click="handleSubmitClick"
                    >
                      <template #icon
                        ><Icon name="heroicons:paper-airplane"
                      /></template>
                      提交反馈
                    </n-button>
                  </template>
                  确认提交吗？
                </n-popconfirm>
              </div>
            </n-form>
          </div>

          <!-- Success View -->
          <div
            v-else
            class="flex flex-col items-center justify-center py-12 animate-fade-in"
          >
            <n-result
              status="success"
              title="反馈提交成功"
              description="感谢您的宝贵建议，我们会认真阅读！"
              class="max-w-md mx-auto"
            >
              <template #footer>
                <div class="flex gap-4 justify-center mt-6">
                  <n-button @click="resetForm">再提一条</n-button>
                  <n-button type="primary" @click="router.push('/tickets')">
                    查看我的工单
                  </n-button>
                </div>
              </template>
            </n-result>
          </div>
        </transition>
      </div>
    </n-card>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
