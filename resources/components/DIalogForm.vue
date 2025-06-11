<script setup lang="ts">
import { Dialog, DialogPanel } from '@stacksjs/dialog'
import { ref } from 'vue'


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
  >
    <!-- Overlay -->
    <div class="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>

    <!-- Dialog Panel Wrapper -->
    <div class="fixed inset-0 flex items-center justify-center p-4">
      <DialogPanel class="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <!-- Title -->
        <h2 class="text-xl font-bold mb-4">Create Activity</h2>

        <!-- Activity Form -->
        <form @submit.prevent="submitActivity" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="activityForm.title"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="activityForm.description"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Address</label>
            <input
              v-model="activityForm.address"
              type="text"
              placeholder="Enter address or use map"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            />
          </div>

          <div class="flex items-center space-x-2">
            <button
              type="button"
              @click="emit('startLocationSelection')"
              class="px-4 py-2 bg-teal-100 text-teal-700 rounded-md text-sm font-medium hover:bg-teal-200"
            >
              Select on Map
            </button>
            <button
              type="button"
              @click="emit('useCurrentLocation')"
              class="px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200"
              :disabled="!coords"
            >
              Use My Location
            </button>
          </div>

          <div v-if="selectedLocation" class="text-sm text-gray-700">
            Selected: {{ selectedLocation[0].toFixed(6) }}, {{ selectedLocation[1].toFixed(6) }}
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Info Source</label>
            <select
              v-model="activityForm.infoSource"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
            >
              <option value="news">News</option>
              <option value="social-media">Social Media</option>
              <option value="friends">Friends</option>
              <option value="family">Family</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Were Detained?</label>
            <div class="flex items-center space-x-2">
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  value="true"
                  v-model="activityForm.wereDetained"
                  class="text-teal-600 focus:ring-teal-500"
                />
                <span class="ml-2">Yes</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  value="false"
                  v-model="activityForm.wereDetained"
                  class="text-teal-600 focus:ring-teal-500"
                />
                <span class="ml-2">No</span>
              </label>
              <label class="inline-flex items-center">
                <input
                  type="radio"
                  :value="null"
                  v-model="activityForm.wereDetained"
                  class="text-teal-600 focus:ring-teal-500"
                />
                <span class="ml-2">Not sure</span>
              </label>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Media (images or video)</label>
            <input
              type="file"
              @change="handleMediaUpload"
              multiple
              accept="image/*,video/*"
              class="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-teal-50 file:text-teal-700
                    hover:file:bg-teal-100"
            />
          </div>

          <!-- Upvote / Like Section -->
          <div class="flex items-center space-x-2">
            <button
              type="button"
              @click="upvoteActivity"
              :class="[
                'px-4 py-2 rounded-md text-sm font-medium',
                liked ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
              ]"
            >
              <div i-hugeicons-thumbs-up class="inline-block mr-1" />
              {{ liked ? 'Upvoted!' : 'Upvote' }}
            </button>
            <span class="text-sm text-gray-700">Likes: {{ likeCount }}</span>
          </div>

          <div class="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              @click="emit('close')"
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-teal-600 text-white rounded-md text-sm font-medium hover:bg-teal-700"
            >
              Submit Activity
            </button>
          </div>
        </form>
      </DialogPanel>
    </div>
  </Dialog>
</template>
