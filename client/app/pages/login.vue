<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { useMessage } from "naive-ui";
import { Icon } from "#components";
import { useUser } from "~/composables/useUser";
import { MOCK_USER_PROFILE } from "~/utils/mockData";

definePageMeta({
  layout: "admin-layout",
});

const router = useRouter();
const message = useMessage();
const { login, user } = useUser();
const activeTab = ref("login");

onMounted(() => {
  if (user.value.isLoggedIn) {
    message.warning("您已登录，无需重复操作");
    router.replace("/");
  }
});

// Login Form
const loginFormRef = ref();
const loginModel = reactive({
  username: "",
  password: "",
  remember: false,
});
const loginRules = {
  username: { required: true, message: "请输入用户名/邮箱", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
};

// Register Form
const registerFormRef = ref();
const registerModel = reactive({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreement: false,
});
const registerRules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "请输入正确的邮箱格式", trigger: "blur" },
  ],
  password: { required: true, message: "请输入密码", trigger: "blur" },
  confirmPassword: [
    { required: true, message: "请确认密码", trigger: "blur" },
    {
      validator: (rule: any, value: string) => {
        return value === registerModel.password;
      },
      message: "两次输入的密码不一致",
      trigger: "blur",
    },
  ],
  agreement: {
    validator: (rule: any, value: boolean) => value === true,
    message: "请阅读并同意用户协议",
    trigger: "change",
  },
};

const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  try {
    await loginFormRef.value?.validate();
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update user state
    login({
      ...MOCK_USER_PROFILE,
      username: loginModel.username || "User",
    });

    message.success("登录成功，欢迎回来！");
    router.push("/");
  } catch (errors) {
    console.error(errors);
  } finally {
    loading.value = false;
  }
}

async function handleRegister() {
  loading.value = true;
  try {
    await registerFormRef.value?.validate();
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Update user state
    login({
      ...MOCK_USER_PROFILE,
      username: registerModel.username || "New User",
    });

    message.success("注册成功，已自动登录！");
    router.push("/");
  } catch (errors) {
    console.error(errors);
  } finally {
    loading.value = false;
  }
}

function handleOsuLogin() {
  message.info("正在跳转至 osu! 授权页面...");
  // window.location.href = '...'
}

function handleTermsClick() {
  message.info("服务条款功能正在完善中");
}

function handlePrivacyClick() {
  message.info("隐私政策功能正在完善中");
}
</script>

<template>
  <div class="flex-1 flex items-center justify-center">
    <div class="w-full max-w-md">
      <!-- Logo Section -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-[var(--text-main)] tracking-wide">
          欢迎回来
        </h1>
        <p class="text-[var(--text-secondary)] text-sm mt-2">
          登录您的 Yuna Nexus 账号
        </p>
      </div>

      <!-- Auth Card -->
      <n-card
        class="shadow-xl rounded-2xl border-0 bg-[var(--bg-card)] backdrop-blur-sm overflow-hidden"
        size="large"
      >
        <n-tabs
          v-model:value="activeTab"
          class="card-tabs"
          pane-class="pt-6"
          animated
          justify-content="space-evenly"
          type="line"
        >
          <!-- Login Tab -->
          <n-tab-pane name="login" tab="登录">
            <n-form
              ref="loginFormRef"
              :model="loginModel"
              :rules="loginRules"
              size="large"
              :show-label="false"
            >
              <n-form-item path="username">
                <n-input
                  v-model:value="loginModel.username"
                  placeholder="用户名 / 邮箱"
                >
                  <template #prefix>
                    <Icon
                      name="heroicons:user"
                      class="text-[var(--text-secondary)]"
                    />
                  </template>
                </n-input>
              </n-form-item>

              <n-form-item path="password">
                <n-input
                  v-model:value="loginModel.password"
                  type="password"
                  show-password-on="click"
                  placeholder="密码"
                  @keydown.enter.prevent="handleLogin"
                >
                  <template #prefix>
                    <Icon
                      name="heroicons:lock-closed"
                      class="text-[var(--text-secondary)]"
                    />
                  </template>
                </n-input>
              </n-form-item>

              <div class="flex items-center justify-between mb-6">
                <n-checkbox v-model:checked="loginModel.remember">
                  <span class="text-xs text-[var(--text-secondary)]"
                    >记住我</span
                  >
                </n-checkbox>
                <n-button text type="primary" size="small">忘记密码？</n-button>
              </div>

              <n-button
                type="primary"
                block
                size="large"
                :loading="loading"
                @click="handleLogin"
                class="shadow-lg shadow-blue-500/20"
              >
                登录
              </n-button>
            </n-form>
          </n-tab-pane>

          <!-- Register Tab -->
          <n-tab-pane name="register" tab="注册">
            <n-form
              ref="registerFormRef"
              :model="registerModel"
              :rules="registerRules"
              size="large"
              :show-label="false"
            >
              <n-form-item path="username">
                <n-input
                  v-model:value="registerModel.username"
                  placeholder="用户名"
                >
                  <template #prefix>
                    <Icon
                      name="heroicons:user"
                      class="text-[var(--text-secondary)]"
                    />
                  </template>
                </n-input>
              </n-form-item>

              <n-form-item path="email">
                <n-input
                  v-model:value="registerModel.email"
                  placeholder="电子邮箱"
                >
                  <template #prefix>
                    <Icon
                      name="heroicons:envelope"
                      class="text-[var(--text-secondary)]"
                    />
                  </template>
                </n-input>
              </n-form-item>

              <n-form-item path="password">
                <n-input
                  v-model:value="registerModel.password"
                  type="password"
                  show-password-on="click"
                  placeholder="设置密码"
                >
                  <template #prefix>
                    <Icon
                      name="heroicons:lock-closed"
                      class="text-[var(--text-secondary)]"
                    />
                  </template>
                </n-input>
              </n-form-item>

              <n-form-item path="confirmPassword">
                <n-input
                  v-model:value="registerModel.confirmPassword"
                  type="password"
                  show-password-on="click"
                  placeholder="确认密码"
                  @keydown.enter.prevent="handleRegister"
                >
                  <template #prefix>
                    <Icon
                      name="heroicons:check-circle"
                      class="text-[var(--text-secondary)]"
                    />
                  </template>
                </n-input>
              </n-form-item>

              <n-form-item path="agreement">
                <n-checkbox v-model:checked="registerModel.agreement">
                  <span class="text-xs text-[var(--text-secondary)]">
                    我已阅读并同意
                    <n-button
                      text
                      type="primary"
                      size="tiny"
                      @click.stop="handleTermsClick"
                      >服务条款</n-button
                    >
                    和
                    <n-button
                      text
                      type="primary"
                      size="tiny"
                      @click.stop="handlePrivacyClick"
                      >隐私政策</n-button
                    >
                  </span>
                </n-checkbox>
              </n-form-item>

              <n-button
                type="primary"
                block
                size="large"
                :loading="loading"
                @click="handleRegister"
                class="shadow-lg shadow-blue-500/20"
              >
                立即注册
              </n-button>
            </n-form>
          </n-tab-pane>
        </n-tabs>

        <!-- Social Login -->
        <div class="mt-8">
          <n-divider class="text-xs text-[var(--text-tertiary)]"
            >或通过以下方式登录</n-divider
          >
          <div class="flex justify-center gap-4 mt-4">
            <n-button
              secondary
              circle
              size="large"
              class="hover:scale-110 transition-transform duration-300"
              @click="handleOsuLogin"
            >
              <template #icon>
                <Icon name="simple-icons:osu" class="text-[#ff66aa]" />
              </template>
            </n-button>
            <!-- Add more social icons if needed -->
            <n-button
              secondary
              circle
              size="large"
              class="hover:scale-110 transition-transform duration-300"
            >
              <template #icon>
                <Icon name="simple-icons:discord" class="text-[#5865F2]" />
              </template>
            </n-button>
          </div>
        </div>
      </n-card>
    </div>
  </div>
</template>

<style scoped>
:deep(.n-tabs-nav__line) {
  background-color: var(--color-primary);
}
:deep(.n-tabs-tab--active) {
  color: var(--color-primary) !important;
  font-weight: 600;
}
</style>
