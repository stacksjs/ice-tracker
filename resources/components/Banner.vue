<script setup>
import { ref, onMounted } from 'vue'
import { useLocalStorage, useTimeoutFn } from '@vueuse/core'

const BANNER_TIMEOUT = 30000 // 30 seconds
const STORAGE_KEY = 'app_banner_dismissed'

const isMounted = ref(false)
const isVisible = ref(true)
const bannerDismissed = useLocalStorage(STORAGE_KEY, false)

const hideBanner = () => {
  isVisible.value = false
  bannerDismissed.value = true
}

// Set up the timeout
const { start } = useTimeoutFn(() => {
  hideBanner()
}, BANNER_TIMEOUT)

onMounted(() => {
  // Check if banner was previously dismissed
  if (bannerDismissed.value) {
    isVisible.value = false
  } else {
    // Start the timeout if banner hasn't been dismissed
    start()
  }

  // Set mounted after initial visibility is determined
  isMounted.value = true
})
</script>

<template>
  <Transition
    v-if="isMounted"
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform -translate-y-full opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-300"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-full opacity-0"
  >
    <div v-if="isVisible" class="pointer-events-none fixed inset-x-0 top-0 sm:flex sm:justify-center sm:px-6 sm:py-5 lg:px-8">
      <div class="pointer-events-auto flex items-center justify-between gap-x-6 bg-gray-900 px-6 py-2.5 sm:rounded-xl sm:py-3 sm:pl-4 sm:pr-3.5">
        <p class="text-sm/6 text-white">
          <a href="#">
            <strong class="font-semibold">iOS & Android Apps</strong>
            <svg viewBox="0 0 2 2" class="mx-2 inline size-0.5 fill-current" aria-hidden="true">
              <circle cx="1" cy="1" r="1" />
            </svg>
            We are soon publishing apps to their stores. Hang tight.
          </a>
        </p>
        <button type="button" class="-m-1.5 flex-none p-1.5" @click="hideBanner">
          <span class="sr-only">Dismiss</span>
          <svg class="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>
