<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <nav class="bg-white border-t border-gray-200 safe-bottom">
    <div class="flex justify-around items-center h-16">
      <RouterLink
        to="/map"
        class="flex flex-col items-center px-4 py-2"
        :class="{ 'text-teal-600': route.path === '/map' }"
      >
        <div i-hugeicons-maps-circle-01 class="text-2xl" />
        <span class="text-xs font-serif">Map</span>
      </RouterLink>

      <RouterLink
        to="/activity"
        class="flex flex-col items-center px-4 py-2 relative"
        :class="{ 'text-teal-600': route.path === '/activity' }"
      >
        <div i-hugeicons-left-to-right-list-bullet class="text-2xl" />
        <span class="text-xs font-sans">Activity</span>
      </RouterLink>

      <a
        href="https://bsky.app/profile/ice-tracker.org"
        target="_blank"
        class="flex flex-col items-center px-4 py-2 relative"
      >
        <div i-hugeicons-news class="text-2xl" />
        <span class="text-xs font-sans">News</span>
      </a>

      <RouterLink
        to="/about"
        class="flex flex-col items-center px-4 py-2 relative"
        :class="{ 'text-teal-600': route.path === '/about' }"
      >
        <div i-hugeicons-user-group class="text-2xl" />
        <span class="text-xs font-sans">About</span>
      </RouterLink>

      <a
        href="https://github.com/sponsors/chrisbbreuer"
        target="_blank"
        class="flex flex-col items-center px-4 py-2 relative"
      >
        <div i-hugeicons-gift class="text-2xl" />
        <span class="text-xs font-sans">Donate</span>
      </a>
    </div>
  </nav>
</template>
