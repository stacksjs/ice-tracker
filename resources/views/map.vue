<script setup lang="ts">
import { ref } from 'vue'

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

interface Activity {
  id: number
  title: string
  description: string
  location: [number, number]
  date: string
  severity: 'minor' | 'moderate' | 'severe'
  images?: File[]
}

const activeView = ref<'map' | 'activity'>('map')
const activities = ref<Activity[]>([
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

function handleReport(report: Partial<Activity>) {
  const newAccident: Activity = {
    id: activities.value.length + 1,
    title: report.title || '',
    description: report.description || '',
    location: report.location || [0, 0],
    date: new Date().toISOString().split('T')[0],
    severity: report.severity || 'minor',
    images: report.images
  }

  activities.value.unshift(newAccident)

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
          :accidents="activities"
          @report="handleReport"
        />
        <ActivityView
          v-else
          class="absolute inset-0 bg-gray-50"
          :activities="activities"
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
          :class="{ 'text-blue-600': activeView === 'activity' }"
          @click="activeView = 'activity'"
        >
          <div i-hugeicons-left-to-right-list-bullet class="text-2xl" />
          <span class="text-xs font-sans">Activity</span>
        </button>

        <a
          href="https://bsky.app/profile/ice-tracker.org"
          target="_blank"
          class="flex flex-col items-center px-4 py-2 relative"
        >
          <div i-hugeicons-news class="text-2xl" />
          <span class="text-xs font-sans">News</span>
        </a>
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
