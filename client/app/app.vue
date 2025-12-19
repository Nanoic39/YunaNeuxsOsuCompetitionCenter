<script setup lang="ts">
const { theme, themeOverrides } = useTheme()
</script>

<template>
  <n-config-provider :theme="theme" :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <n-notification-provider>
            <NuxtLayout>
              <NuxtPage />
            </NuxtLayout>
          </n-notification-provider>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<style>
/* 必须清除 margin，否则布局会有白边 */
body {
  margin: 0;
  padding: 0;
  overflow: hidden; /* 防止双滚动条 */
}

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-new(root) {
  z-index: 2147483646;
}

::view-transition-old(root) {
  z-index: 1;
}
</style>