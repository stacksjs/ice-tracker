<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { useGeolocation } from '@vueuse/core'
import type { Map as LeafletMap, LatLng, Marker } from 'leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const emit = defineEmits(['report'])
const mapContainer = ref<HTMLElement | null>(null)
const map = ref<LeafletMap | null>(null)
const showReportForm = ref(false)
const selectedLocation = ref<[number, number] | null>(null)
const currentMarker = ref<Marker | null>(null)
const manualAddress = ref('')
const isSelectingLocation = ref(false)

// Use geolocation
const { coords, locatedAt, error: geoError } = useGeolocation()

const reportForm = ref({
  title: '',
  description: '',
  severity: 'minor',
  images: [] as File[],
  location: null as [number, number] | null,
  address: ''
})

const pressTimer = ref<number | null>(null)
const pressPosition = ref<LatLng | null>(null)

// Cleanup function for map instance
const cleanupMap = () => {
  if (map.value) {
    map.value.remove()
    map.value = null
  }
}

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined'

// Map event handlers
function initMapEvents(mapInstance: LeafletMap) {
  // Handle mousedown for long press
  mapInstance.on('mousedown', (e) => {
    pressPosition.value = e.latlng
    pressTimer.value = window.setTimeout(() => {
      handleLongPress(e.latlng)
    }, 500)
  })

  // Clear timer if mouse moves significantly or mouseup happens before timeout
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
      reportForm.value.location = selectedLocation.value

      // Update marker
      if (currentMarker.value) {
        currentMarker.value.setLatLng(e.latlng)
      } else {
        currentMarker.value = L.marker(e.latlng).addTo(mapInstance)
      }

      // Show the form again after selection
      isSelectingLocation.value = false
      showReportForm.value = true
    }
  })
}

// Touch event handlers
function initTouchEvents(container: HTMLElement, mapInstance: LeafletMap) {
  let touchStartTime = 0
  let touchStartPosition: Touch | null = null

  container.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      touchStartTime = Date.now()
      touchStartPosition = e.touches[0]
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

          // Validate coordinates before handling
          if (isValidLatLng(point.lat, point.lng)) {
            handleLongPress(point)
          }
        } catch (error) {
          console.error('Error processing touch event:', error)
        }
      }
    }

    // Reset touch state
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

// Utility function to validate coordinates
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

onMounted(() => {
  if (!isBrowser || !mapContainer.value) return

  try {
    // Set default coordinates
    const defaultLat = 34.0522
    const defaultLng = -118.2437

    // Initialize map with default coordinates
    let initialLat = defaultLat
    let initialLng = defaultLng

    // Only use geolocation coordinates if they're available and valid
    if (coords.value && typeof coords.value.latitude === 'number' && typeof coords.value.longitude === 'number') {
      if (isValidLatLng(coords.value.latitude, coords.value.longitude)) {
        initialLat = coords.value.latitude
        initialLng = coords.value.longitude
      }
    }

    // Double-check coordinates are valid before creating map
    if (!isValidLatLng(initialLat, initialLng)) {
      console.warn('Using fallback coordinates')
      initialLat = defaultLat
      initialLng = defaultLng
    }

    const mapInstance = L.map(mapContainer.value, {
      zoomControl: false,
      minZoom: 3,
      maxBounds: [
        [-85, -180], // Adjusted to prevent invalid coordinates
        [85, 180]
      ],
      maxBoundsViscosity: 1.0
    }).setView([initialLat, initialLng], 13)

    map.value = mapInstance

    // Add zoom control to top-right
    L.control.zoom({
      position: 'topright'
    }).addTo(mapInstance)

    // Use retina tiles if available
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      detectRetina: true,
      maxZoom: 19,
      maxNativeZoom: 18
    }).addTo(mapInstance)

    // Initialize events
    initMapEvents(mapInstance)
    initTouchEvents(mapContainer.value, mapInstance)

  } catch (error) {
    console.error('Error initializing map:', error)
  }
})

// Cleanup when component is unmounted
onUnmounted(() => {
  cleanupMap()
})

function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files?.length) {
    reportForm.value.images = Array.from(input.files)
  }
}

function useCurrentLocation() {
  if (!coords.value || !map.value) return

  const { latitude, longitude } = coords.value
  selectedLocation.value = [latitude, longitude]
  reportForm.value.location = selectedLocation.value

  map.value.setView([latitude, longitude], 16)

  if (currentMarker.value) {
    currentMarker.value.setLatLng([latitude, longitude])
  } else {
    currentMarker.value = L.marker([latitude, longitude]).addTo(map.value)
  }
}

function submitReport() {
  if (!reportForm.value.location && !reportForm.value.address) {
    alert('Please select a location on the map or enter an address')
    return
  }

  const formData = new FormData()
  formData.append('title', reportForm.value.title)
  formData.append('description', reportForm.value.description)
  formData.append('severity', reportForm.value.severity)
  if (reportForm.value.location) {
    formData.append('location', JSON.stringify(reportForm.value.location))
  }
  if (reportForm.value.address) {
    formData.append('address', reportForm.value.address)
  }
  reportForm.value.images.forEach((image, index) => {
    formData.append(`image${index}`, image)
  })

  emit('report', {
    title: reportForm.value.title,
    description: reportForm.value.description,
    severity: reportForm.value.severity,
    location: reportForm.value.location,
    address: reportForm.value.address,
    images: reportForm.value.images
  })

  // Reset form
  reportForm.value = {
    title: '',
    description: '',
    severity: 'minor',
    images: [],
    location: null,
    address: ''
  }
  if (currentMarker.value && map.value) {
    currentMarker.value.remove()
    currentMarker.value = null
  }
  showReportForm.value = false
  isSelectingLocation.value = false
}

function handleLongPress(latlng: LatLng) {
  if (!map.value || !isValidLatLng(latlng.lat, latlng.lng)) return

  selectedLocation.value = [latlng.lat, latlng.lng]
  reportForm.value.location = selectedLocation.value

  if (currentMarker.value) {
    currentMarker.value.setLatLng(latlng)
  } else {
    currentMarker.value = L.marker(latlng).addTo(map.value)
  }

  showReportForm.value = true
  isSelectingLocation.value = false
}

function startLocationSelection() {
  isSelectingLocation.value = true
  showReportForm.value = false
}
</script>

<template>
  <div class="relative h-full">
    <div ref="mapContainer" class="w-full h-full z-0"></div>

    <!-- Report Button -->
    <button
      @click="showReportForm = true"
      class="absolute bottom-24 right-4 bg-blue-600 text-white rounded-full p-4 shadow-lg z-[400]"
    >
      <div i-carbon-add class="text-2xl" />
    </button>

    <!-- Location Selection Mode Notification -->
    <div
      v-if="isSelectingLocation"
      class="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg p-4 shadow-lg z-[400] max-w-sm w-full mx-4"
    >
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-sm font-medium">Click anywhere on the map to select the location</h3>
          <p class="text-xs text-gray-500 mt-1">The form will reappear after selection</p>
        </div>
        <button
          @click="isSelectingLocation = false; showReportForm = true"
          class="ml-4 p-2 text-gray-400 hover:text-gray-600"
        >
          <div i-carbon-close class="text-xl" />
        </button>
      </div>
    </div>

    <!-- Report Form Modal -->
    <div
      v-if="showReportForm && !isSelectingLocation"
      class="absolute inset-0 bg-black bg-opacity-50 z-[500] flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <h2 class="text-xl font-bold mb-4">Report Activity</h2>

        <form @submit.prevent="submitReport" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input
              v-model="reportForm.title"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              v-model="reportForm.description"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Severity</label>
            <select
              v-model="reportForm.severity"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="minor">Minor</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Images</label>
            <input
              type="file"
              @change="handleImageUpload"
              multiple
              accept="image/*"
              class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Location</label>
            <div class="space-y-2">
              <div class="flex space-x-2">
                <button
                  type="button"
                  @click="startLocationSelection"
                  class="flex-1 px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200"
                >
                  Select on Map
                </button>
                <button
                  type="button"
                  @click="useCurrentLocation"
                  class="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-md text-sm font-medium hover:bg-green-200"
                  :disabled="!coords"
                >
                  Use My Location
                </button>
              </div>

              <div class="space-y-1">
                <input
                  v-model="reportForm.address"
                  type="text"
                  placeholder="Or enter address manually"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                <p class="text-sm text-gray-500">
                  Either select a location on the map or enter an address
                </p>
              </div>

              <div v-if="selectedLocation" class="text-sm text-gray-700">
                Selected coordinates: {{ selectedLocation[0].toFixed(6) }}, {{ selectedLocation[1].toFixed(6) }}
              </div>
            </div>
          </div>

          <div class="flex justify-end space-x-2">
            <button
              type="button"
              @click="showReportForm = false"
              class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Submit Report
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
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
