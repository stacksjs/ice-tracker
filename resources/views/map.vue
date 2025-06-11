<route lang="yaml">
meta:
  layout: app
</route>

<script setup lang="ts">
import { ref } from 'vue'
import type { Activity } from '@/types/ice'

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



const activities = ref<Activity[]>([
  {
    id: 1,
    title: 'Car collision',
    description: 'Two cars collided at intersection',
    location: [34.0522, -118.2437], // Downtown LA
    date: '2024-03-20',
    severity: 'moderate',
    address: '',
    infoSource: 'news',
    wereDetained: false,
    latlng: '34.0522, -118.2437',
    images: []
  },
  {
    id: 2,
    title: 'Bicycle accident',
    description: 'Cyclist hit by opening car door',
    location: [34.0625, -118.2381], // Echo Park
    date: '2024-03-19',
    severity: 'minor',
    address: '',
    infoSource: 'news',
    wereDetained: false,
    latlng: '34.0625, -118.2381',
    images: []
  },
])

function handleReport(report: Partial<Activity>) {
  const newAccident: Activity = {
    id: activities.value.length + 1,
    title: report.title || '',
    description: report.description || '',
    location: report.location || [0, 0],
    date: new Date().toISOString().split('T')[0] || '',
    severity: report.severity || 'minor',
    images: report.images,
    address: report.address || '',
    infoSource: report.infoSource || 'news',
    wereDetained: report.wereDetained || false,
    latlng: report.latlng || ''
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
      :activities="activities"
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
