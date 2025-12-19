<template>
  <div 
    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-105 select-none border"
    :class="colorClasses"
  >
    <slot>{{ role }}</slot>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  role: string
}>()

const colorMap: Record<string, string> = {
  'Super Admin': 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  'Tournament Host': 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
  'Referee': 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  'Mapper': 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  'Player': 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  'VIP Support': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  'Commentator': 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  'Streamer': 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
}

const colorClasses = computed(() => {
  return colorMap[props.role] || 'bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20'
})
</script>
