<script setup lang="ts">
import { Dialog, DialogPanel } from '@stacksjs/dialog'
import { ref, onMounted, onUnmounted } from 'vue'
import { useGeolocation } from '@vueuse/core'
import type { Map as LeafletMap, LatLng, Marker } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Activity } from '@/types/ice'

// -- Component emits
const emit = defineEmits(['report'])

const props = defineProps<{
  activities: Activity[]
  onReport?: (report: Partial<Activity>) => void
}>()

console.log(props.activities)

// -- Template refs
const mapContainer = ref<HTMLElement | null>(null)
const map = ref<LeafletMap | null>(null)

// -- Dialog visibility
const showActivityDialog = ref(false)
const showLoginDialog = ref(false)
const isSelectingLocation = ref(false)

// -- Location + Marker
const selectedLocation = ref<[number, number] | null>(null)
const currentMarker = ref<Marker | null>(null)

// -- Geolocation
const { coords } = useGeolocation()

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

// -- For detecting a "long press"
const pressTimer = ref<number | null>(null)
const pressPosition = ref<LatLng | null>(null)

// -- Cleanup function for map instance
const cleanupMap = () => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
}

const isBrowser = typeof window !== 'undefined'

// -- Utility function to validate coordinates
function isValidLatLng(lat: number, lng: number): boolean {
  return (
    !isNaN(lat) &&
    !isNaN(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180
  )
}

// -- Map/Mouse events
function initMapEvents(mapInstance: LeafletMap) {
  // Handle mousedown for long press
  mapInstance.on('mousedown', (e) => {
    pressPosition.value = e.latlng
    pressTimer.value = window.setTimeout(() => {
      handleLongPress(e.latlng)
    }, 500)
  })

  // Clear timer if mouse moves significantly or mouseup
  mapInstance.on('mousemove', (e) => {
    if (pressPosition.value && pressTimer.value) {
      const movedDistance = pressPosition.value.distanceTo(e.latlng)
      if (movedDistance > 10) {
        clearTimeout(pressTimer.value)
        pressTimer.value = null
        pressPosition.value = null
      }
    }
  })

  mapInstance.on('mouseup', () => {
    if (pressTimer.value) {
      clearTimeout(pressTimer.value)
      pressTimer.value = null
    }
    pressPosition.value = null
  })

  // Add click handler for location selection
  mapInstance.on('click', (e) => {
    if (isSelectingLocation.value) {
      selectedLocation.value = [e.latlng.lat, e.latlng.lng]
      activityForm.value.latlng = `${e.latlng.lat}, ${e.latlng.lng}`

      if (currentMarker.value) {
        currentMarker.value.setLatLng(e.latlng)
      } else {
        currentMarker.value = L.marker(e.latlng).addTo(mapInstance)
      }

      // Show the form again after selection
      isSelectingLocation.value = false
      showActivityDialog.value = true
    }
  })
}

// -- Touch events for long press
function initTouchEvents(container: HTMLElement, mapInstance: LeafletMap) {
  let touchStartTime = 0
  let touchStartPosition: Touch | null = null

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartTime = Date.now()
      touchStartPosition = e.touches[0]!
    }
  })

  container.addEventListener('touchend', (e) => {
    if (!touchStartPosition || !e.changedTouches[0]) return

    const touchEndPosition = e.changedTouches[0]
    const touchDuration = Date.now() - touchStartTime

    if (touchDuration >= 500) {
      const moveX = Math.abs(touchEndPosition.clientX - touchStartPosition.clientX)
      const moveY = Math.abs(touchEndPosition.clientY - touchStartPosition.clientY)

      if (moveX < 10 && moveY < 10) {
        try {
          const point = mapInstance.containerPointToLatLng([
            touchEndPosition.clientX,
            touchEndPosition.clientY
          ])
          if (isValidLatLng(point.lat, point.lng)) {
            handleLongPress(point)
          }
        } catch (error) {
          console.error('Error processing touch event:', error)
        }
      }
    }
    touchStartPosition = null
  })

  container.addEventListener('touchmove', (e) => {
    if (!touchStartPosition || !e.touches[0]) return

    const moveX = Math.abs(e.touches[0].clientX - touchStartPosition.clientX)
    const moveY = Math.abs(e.touches[0].clientY - touchStartPosition.clientY)

    if (moveX > 10 || moveY > 10) {
      touchStartPosition = null
    }
  })
}

// -- Map initialization
onMounted(() => {
  if (!isBrowser || !mapContainer.value) return

  try {
    // Default coordinates
    const defaultLat = 34.0522
    const defaultLng = -118.2437

    let initialLat = defaultLat
    let initialLng = defaultLng

    if (
      coords.value &&
      typeof coords.value.latitude === 'number' &&
      typeof coords.value.longitude === 'number'
    ) {
      if (isValidLatLng(coords.value.latitude, coords.value.longitude)) {
        initialLat = coords.value.latitude
        initialLng = coords.value.longitude
      }
    }

    if (!isValidLatLng(initialLat, initialLng)) {
      console.warn('Using fallback coordinates')
      initialLat = defaultLat
      initialLng = defaultLng
    }

    const mapInstance = L.map(mapContainer.value, {
      zoomControl: false,
      minZoom: 3,
      maxBounds: [
        [-85, -180],
        [85, 180]
      ],
      maxBoundsViscosity: 1.0
    }).setView([initialLat, initialLng], 13)

    map.value = mapInstance

    // Add zoom control
    L.control.zoom({ position: 'topright' }).addTo(mapInstance)

    // OSM tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      detectRetina: true,
      maxZoom: 19,
      maxNativeZoom: 18,
    }).addTo(mapInstance)

    // Initialize events
    initMapEvents(mapInstance)
    initTouchEvents(mapContainer.value, mapInstance)

  } catch (error) {
    console.error('Error initializing map:', error)
  }
})

onUnmounted(() => {
  cleanupMap()
})

// -- Handle image/video uploads
function handleMediaUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    activityForm.value.images = Array.from(input.files)
  }
}

// -- Use current location
function useCurrentLocation() {
  if (!coords.value || !map.value) return

  const { latitude, longitude } = coords.value
  selectedLocation.value = [latitude, longitude]
  activityForm.value.latlng = `${latitude}, ${longitude}`
  map.value.setView([latitude, longitude], 16)

  if (currentMarker.value) {
    currentMarker.value.setLatLng([latitude, longitude])
  } else {
    currentMarker.value = L.marker([latitude, longitude]).addTo(map.value)
  }
}

// -- Submit the "activity"
function submitActivity() {
  // Basic validation
  if (!activityForm.value.latlng && !activityForm.value.address) {
    alert('Please select a location on the map or enter an address.')
    return
  }

  // Example FormData usage (front-end only, no actual API call)
  const formData = new FormData()
  formData.append('title', activityForm.value.title)
  formData.append('description', activityForm.value.description)
  formData.append('address', activityForm.value.address)
  formData.append('latlng', activityForm.value.latlng)
  formData.append('infoSource', activityForm.value.infoSource)
  formData.append('wereDetained', String(activityForm.value.wereDetained ?? 'null'))

  // Attach files
  activityForm.value.images.forEach((file, index) => {
    formData.append(`file${index}`, file)
  })

  // Emit event with activity data
  emit('report', {
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
  selectedLocation.value = null

  if (currentMarker.value && map.value) {
    currentMarker.value.remove()
    currentMarker.value = null
  }

  showActivityDialog.value = false
  isSelectingLocation.value = false

  // ----> Show login on submit
  showLoginDialog.value = true
}

// -- Handling a long-press on the map
function handleLongPress(latlng: LatLng) {
  if (!map.value || !isValidLatLng(latlng.lat, latlng.lng)) return

  selectedLocation.value = [latlng.lat, latlng.lng]
  activityForm.value.latlng = `${latlng.lat}, ${latlng.lng}`

  if (currentMarker.value) {
    currentMarker.value.setLatLng(latlng)
  } else {
    currentMarker.value = L.marker(latlng).addTo(map.value)
  }

  showActivityDialog.value = true
  isSelectingLocation.value = false
}

// -- Start location selection mode
function startLocationSelection() {
  isSelectingLocation.value = true
  showActivityDialog.value = false
}

// -- Simple upvote
function upvoteActivity() {
  if (!liked.value) {
    likeCount.value += 1
    liked.value = true
  }
}
</script>

<template>
  <div class="relative h-full">
    <!-- The Map Container -->
    <div ref="mapContainer" class="w-full h-full"></div>

    <!-- Floating Button to open the Activity Dialog -->
    <button
      @click="showActivityDialog = true"
      class="absolute bottom-24 right-4 bg-teal-600 text-white rounded-full p-4 shadow-lg z-[400]"
    >
      <div i-hugeicons-add-01 class="text-2xl" />
    </button>

    <!-- Location Selection Mode Notification -->
    <div
      v-if="isSelectingLocation"
      class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-4 shadow-lg max-w-sm w-full mx-4 z-[400]"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium">Click anywhere on the map to select the location</h3>
          <p class="text-xs text-gray-500 mt-1">The form will reappear after selection.</p>
        </div>
        <button
          @click="isSelectingLocation = false; showActivityDialog = true"
          class="ml-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <div i-carbon-close class="text-xl" />
        </button>
      </div>
    </div>

    <!-- Dialog for Activity Form -->
    <Dialog
      v-if="showActivityDialog && !isSelectingLocation"
      :modelValue="showActivityDialog"
      @close="showActivityDialog = false"
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
                @click="startLocationSelection"
                class="px-4 py-2 bg-teal-100 text-teal-700 rounded-md text-sm font-medium hover:bg-teal-200"
              >
                Select on Map
              </button>
              <button
                type="button"
                @click="useCurrentLocation"
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
                @click="showActivityDialog = false"
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

    <!-- Dialog for Login (shown after submit) -->
    <Dialog
      v-if="showLoginDialog"
      :modelValue="showLoginDialog"
      @close="showLoginDialog = false"
      class="relative z-[600]"
    >
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true"></div>

      <!-- Dialog Panel Wrapper -->
      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
          <AuthLogin />
        </DialogPanel>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
/* Ensure proper Leaflet controls z-index */
:deep(.leaflet-control) {
  z-index: 300;
}
:deep(.leaflet-pane) {
  z-index: 200;
}
:deep(.leaflet-top),
:deep(.leaflet-bottom) {
  z-index: 300;
}
</style>
