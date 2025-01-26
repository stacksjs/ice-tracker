<script setup lang="ts">
import ListView from '../components/ListVue.vue'

defineOptions({
  name: 'DemoPage',
})

useHead({
  // title: app.name,
  title: 'Ice Tracker - Demo',
  meta: [
    { name: 'description', content: 'ICE Monitoring. Coming soon.' },
    {
      name: 'theme-color',
      content: () => (isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => (preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})

const activeView = ref<'map' | 'list'>('map')
const accidents = ref([
  { id: 1, title: 'Car collision', location: 'Main Street', date: '2024-03-20', severity: 'moderate' },
  { id: 2, title: 'Bicycle accident', location: 'Park Avenue', date: '2024-03-19', severity: 'minor' },
])

function handleReport(report: any) {
  const newAccident = {
    id: accidents.value.length + 1,
    ...report,
    date: new Date().toISOString().split('T')[0]
  }
  accidents.value.unshift(newAccident)
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <main class="flex-1 relative">
      <Transition name="fade" mode="out-in">
        <MapView
          v-if="activeView === 'map'"
          class="absolute inset-0"
          @report="handleReport"
        />
        <ListView
          v-else
          class="absolute inset-0 bg-gray-50"
          :accidents="accidents"
        />
      </Transition>
    </main>

    <!-- Bottom Navigation -->
    <nav class="bg-white border-t border-gray-200 safe-bottom">
      <div class="flex justify-around items-center h-16">
        <button
          class="flex flex-col items-center px-4 py-2"
          :class="{ 'text-blue-600': activeView === 'map' }"
          @click="activeView = 'map'"
        >
          <div i-carbon-map class="text-2xl"></div>
          <span class="text-xs">Map</span>
        </button>

        <button
          class="flex flex-col items-center px-4 py-2 relative"
          :class="{ 'text-blue-600': activeView === 'list' }"
          @click="activeView = 'list'"
        >
          <div i-carbon-list class="text-2xl"></div>
          <span class="text-xs">List</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
