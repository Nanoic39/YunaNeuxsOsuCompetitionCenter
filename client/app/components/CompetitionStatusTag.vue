<script setup lang="ts">
interface Props {
  status: string
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  size: 'small'
})
</script>

<template>
  <n-tag 
    :bordered="false"
    :size="size" 
    class="shadow-md font-bold"
    :class="{
      '!bg-green-500 !text-white': status === '进行中',
      '!bg-blue-500 !text-white': status === '报名中',
      '!bg-gray-500 !text-white': status !== '进行中' && status !== '报名中'
    }"
  >
    {{ status }}
  </n-tag>
</template>
