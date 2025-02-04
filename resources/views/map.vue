<route lang="yaml">
meta:
  layout: app
</route>

<script setup lang="ts">
import { ref } from 'vue'

defineOptions({
  name: 'MapPage',
})

useHead({
  title: 'ICE Tracker » Map',
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
  <Transition name="fade" mode="out-in">
    <MapView
      class="absolute inset-0"
      :accidents="activities"
      @report="handleReport"
    />
  </Transition>
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
