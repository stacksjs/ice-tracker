<script setup lang="ts">
import { Dialog, DialogPanel } from '@stacksjs/dialog'
import { ref, watch } from 'vue'


const props = defineProps<{
  show: boolean
  selectedLocation: [number, number] | null
  coords: { latitude: number; longitude: number } | null
}>()

const emit = defineEmits(['close', 'submit', 'startLocationSelection', 'useCurrentLocation'])

// -- Form data
const activityForm = ref({
  title: '',
  description: '',
  address: '',
  latlng: '',         // will store as "lat, lng" before submit
  infoSource: 'news', // default value
  wereDetained: null as boolean | null,
  images: [] as File[],
})

// Watch for changes in selectedLocation
watch(() => props.selectedLocation, (newLocation) => {
  if (newLocation) {
    activityForm.value.latlng = `${newLocation[0]}, ${newLocation[1]}`
  }
}, { immediate: true })

// -- Like/Upvote state
const likeCount = ref(0)
const liked = ref(false)

// -- Handle image/video uploads
function handleMediaUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    activityForm.value.images = Array.from(input.files)
  }
}

// -- Simple upvote
function upvoteActivity() {
  if (!liked.value) {
    likeCount.value += 1
    liked.value = true
  }
}

// -- Submit the "activity"
function submitActivity() {
  console.log(activityForm.value)
  // Basic validation
  if (!activityForm.value.latlng && !activityForm.value.address) {
    alert('Please select a location on the map or enter an address.')
    return
  }

  // Emit event with activity data
  emit('submit', {
    ...activityForm.value,
    images: activityForm.value.images,
  })

  // Reset form
  activityForm.value = {
    title: '',
    description: '',
    address: '',
    latlng: '',
    infoSource: 'news',
    wereDetained: null,
    images: [],
  }

  emit('close')
}
</script>

<template>
  <Dialog
    v-if="show"
    :modelValue="show"
    @close="emit('close')"
    class="relative"
    style="width: 1000px !important"
  >
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>

    <!-- Dialog Panel Wrapper -->
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto" style="min-width: 36rem">
        <!-- Title -->
        <h2 class="text-xl font-bold mb-4">Create Activity</h2>

        <!-- Activity Form -->
        <form @submit.prevent="submitActivity" class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base/7 font-semibold text-gray-900">Activity Details</h2>
            <p class="mt-1 text-sm/6 text-gray-600">Share information about the activity you want to report.</p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label class="block text-sm/6 font-medium text-gray-900 text-left">Title</label>
                <div class="mt-2">
                  <input
                    v-model="activityForm.title"
                    type="text"
                    required
                    class="block w-full border-gray-300 rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                  >
                </div>
              </div>

              <div class="col-span-full">
                <label class="block text-sm/6 font-medium text-gray-900 text-left">Description</label>
                <div class="mt-2">
                  <textarea
                    v-model="activityForm.description"
                    required
                    rows="3"
                    class="block w-full border-gray-300 rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div class="col-span-full">
                <label class="block text-sm/6 font-medium text-gray-900 text-left">Location</label>
                <div class="mt-2">
                  <input
                    v-model="activityForm.address"
                    type="text"
                    placeholder="Enter address or use map"
                    class="block w-full border-gray-300 rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                  />
                </div>
                <div class="mt-2 flex items-center gap-x-3">
                  <button
                    type="button"
                    @click="emit('startLocationSelection')"
                    class="rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  >
                    Select on Map
                  </button>
                  <button
                    type="button"
                    @click="emit('useCurrentLocation')"
                    class="rounded-md px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="!coords"
                  >
                    Use My Location
                  </button>
                </div>
                <div v-if="selectedLocation" class="mt-2 text-sm text-gray-600">
                  Selected: {{ selectedLocation[0].toFixed(6) }}, {{ selectedLocation[1].toFixed(6) }}
                </div>
              </div>

              <div class="sm:col-span-3">
                <label class="block text-sm/6 font-medium text-gray-900 text-left">Info Source</label>
                <div class="mt-2">
                  <select
                    v-model="activityForm.infoSource"
                    class="block w-full border-gray-300 rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-gray-600 sm:text-sm/6"
                  >
                    <option value="news">News</option>
                    <option value="social-media">Social Media</option>
                    <option value="friends">Friends</option>
                    <option value="family">Family</option>
                  </select>
                </div>
              </div>

              <div class="col-span-full">
                <label class="block text-sm/6 font-medium text-gray-900 text-left">Were Detained?</label>
                <div class="mt-6 flex items-center space-x-8">
                  <div class="flex items-center gap-x-3">
                    <input
                      type="radio"
                      value="true"
                      v-model="activityForm.wereDetained"
                      class="relative cursor-pointer size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-gray-600 checked:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    />
                    <label class="block text-sm/6 font-medium text-gray-900">Yes</label>
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      type="radio"
                      value="false"
                      v-model="activityForm.wereDetained"
                      class="relative cursor-pointer size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-gray-600 checked:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    />
                    <label class="block text-sm/6 font-medium text-gray-900">No</label>
                  </div>
                  <div class="flex items-center gap-x-3">
                    <input
                      type="radio"
                      :value="null"
                      v-model="activityForm.wereDetained"
                      class="relative cursor-pointer size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-gray-600 checked:bg-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                    />
                    <label class="block text-sm/6 font-medium text-gray-900">Not sure</label>
                  </div>
                </div>
              </div>

              <div class="col-span-full">
                <label class="block text-sm/6 font-medium text-gray-900">Media</label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                  <div class="text-center">
                    <svg class="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" />
                    </svg>
                    <div class="mt-4 flex text-sm/6 text-gray-600">
                      <label class="relative cursor-pointer rounded-md font-semibold text-gray-600 focus-within:ring-2 focus-within:ring-gray-600 focus-within:ring-offset-2 hover:text-gray-500">
                        <span>Upload files</span>
                        <input
                          type="file"
                          @change="handleMediaUpload"
                          multiple
                          accept="image/*,video/*"
                          class="sr-only"
                        >
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              @click="emit('close')"
              class="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-gray-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Submit Activity
            </button>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
