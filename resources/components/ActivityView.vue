<script setup lang="ts">
defineProps<{
  activities: Array<{
    id: number
    title: string
    location: string
    date: string
    severity: string
  }>
}>()
</script>

<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Recent Activity</h2>
    <div class="space-y-4">
      <div v-for="accident in activities" :key="accident.id"
           class="bg-white rounded-lg p-4 shadow">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="font-semibold">{{ accident.title }}</h3>
            <p class="text-gray-600">{{ accident.location }}</p>
            <p class="text-sm text-gray-500">{{ accident.date }}</p>
          </div>
          <span
            class="px-2 py-1 rounded-full text-xs font-medium"
            :class="{
              'bg-yellow-100 text-yellow-800': accident.severity === 'minor',
              'bg-orange-100 text-orange-800': accident.severity === 'moderate',
              'bg-red-100 text-red-800': accident.severity === 'severe'
            }"
          >
            {{ accident.severity }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
