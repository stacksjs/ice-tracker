<script setup lang="ts">
import { ref } from 'vue'
import MapView from '../components/MapView.vue'
import ListView from '../components/ListView.vue'

defineOptions({
  name: 'DemoPage',
})

useHead({
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

interface Accident {
  id: number
  title: string
  description: string
  location: [number, number]
  date: string
  severity: 'minor' | 'moderate' | 'severe'
  images?: File[]
}

const activeView = ref<'map' | 'list'>('map')
const accidents = ref<Accident[]>([
  {
    id: 1,
    title: 'Car collision',
    description: 'Two cars collided at intersection',
    location: [51.505, -0.09],
    date: '2024-03-20',
    severity: 'moderate'
  },
  {
    id: 2,
    title: 'Bicycle accident',
    description: 'Cyclist hit by opening car door',
    location: [51.51, -0.1],
    date: '2024-03-19',
    severity: 'minor'
  },
])

function handleReport(report: Partial<Accident>) {
  const newAccident: Accident = {
    id: accidents.value.length + 1,
    title: report.title || '',
    description: report.description || '',
    location: report.location || [0, 0],
    date: new Date().toISOString().split('T')[0],
    severity: report.severity || 'minor',
    images: report.images
  }

  accidents.value.unshift(newAccident)

  // Here you would typically make an API call to save the report
  // For now, we're just storing it in memory
}
</script>

<template>
  <div class="h-screen flex flex-col">
    <main class="flex-1 relative">
      <Transition name="fade" mode="out-in">
        <MapView
          v-if="activeView === 'map'"
          class="absolute inset-0"
          :accidents="accidents"
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
          <div i-hugeicons-maps-circle-01 class="text-2xl" />
          <span class="text-xs font-serif">Map</span>
        </button>
        <button
          class="flex flex-col items-center px-4 py-2 relative"
          :class="{ 'text-blue-600': activeView === 'list' }"
          @click="activeView = 'list'"
        >
          <div i-hugeicons-left-to-right-list-bullet class="text-2xl" />
          <span class="text-xs font-sans">List</span>
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
