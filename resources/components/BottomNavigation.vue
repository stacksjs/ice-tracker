<template>
  <nav class="bg-white border-t border-gray-200 safe-bottom">
    <div class="flex justify-around items-center h-16">
      <button
        class="flex flex-col items-center px-4 py-2"
        :class="{ 'text-blue-600': activePage === 'map' }"
        @click="activePage = 'map'"
      >
        <div i-hugeicons-maps-circle-01 class="text-2xl" />
        <span class="text-xs font-serif">Map</span>
      </button>

      <button
        class="flex flex-col items-center px-4 py-2 relative"
        :class="{ 'text-blue-600': activePage === 'activity' }"
        @click="activePage = 'activity'"
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

      <a
        href="https://bsky.app/profile/ice-tracker.org"
        target="_blank"
        class="flex flex-col items-center px-4 py-2 relative"
      >
        <div i-hugeicons-user-group class="text-2xl" />
        <span class="text-xs font-sans">About</span>
      </a>

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
