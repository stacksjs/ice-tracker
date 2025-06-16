<script setup lang="ts">
import { Dialog, DialogPanel } from '@stacksjs/dialog'
import { ref, onMounted, onUnmounted } from 'vue'
import { useGeolocation } from '@vueuse/core'
import type { Activity } from '@/types/ice'
import DialogForm from './DIalogForm.vue'
import { useRouter } from 'vue-router'

// -- Component emits
const emit = defineEmits(['report'])

const props = defineProps<{
  activities: Activity[]
  onReport?: (report: Partial<Activity>) => void
}>()

const router = useRouter()
const { isAuthenticated, checkAuthentication } = useAuth()

const activities = ref<Activity[]>(props.activities)
const activityMarkers = ref<any[]>([])

// -- Template refs
const mapContainer = ref<HTMLElement | null>(null)
const map = ref<any | null>(null)

// -- Dialog visibility
const showActivityDialog = ref(false)
const showLoginDialog = ref(false)
const isSelectingLocation = ref(false)

// -- Location + Marker
const selectedLocation = ref<[number, number] | null>(null)
const currentMarker = ref<any | null>(null)

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
const pressPosition = ref<any | null>(null)

// -- Cleanup function for map instance
const cleanupMap = () => {
  if (map.value) {
    // Remove all activity markers
    activityMarkers.value.forEach(marker => marker.remove())
    activityMarkers.value = []
    
    map.value.remove()
    map.value = null
  }
}

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
function initMapEvents(mapInstance: any) {
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
function initTouchEvents(container: HTMLElement, mapInstance: any) {
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
onMounted(async () => {
  await checkAuthentication()

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
    
    // Display activity markers
    displayActivityMarkers()

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
function submitActivity(activityForm: Activity) {
  // Basic validation
  if (!activityForm.latlng && !activityForm.address) {
    alert('Please select a location on the map or enter an address.')
    return
  }

  // Emit event with activity data
  emit('report', {
    ...activityForm,
    images: activityForm.images,
  })

  // Reset form while preserving location data
  const currentLocation = selectedLocation.value
  activityForm = {
    title: '',
    description: '',
    address: '',
    latlng: currentLocation ? `${currentLocation[0]}, ${currentLocation[1]}` : '',
    location: currentLocation || [0, 0],
    date: new Date().toISOString(),
    severity: 'minor',
    infoSource: 'news',
    wereDetained: false,
    images: [],
  }

  // Only clear the marker if we're not keeping the location
  if (!currentLocation && currentMarker.value && map.value) {
    currentMarker.value.remove()
    currentMarker.value = null
  }

  showActivityDialog.value = false
  isSelectingLocation.value = false
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

function openReportDialog() {
  if (!isAuthenticated.value) {
    router.push('/login')
    return
  }
  showActivityDialog.value = true
}

// -- Function to display activity markers
function displayActivityMarkers() {
  if (!map.value) return
  
  // Clear existing markers
  activityMarkers.value.forEach(marker => marker.remove())
  activityMarkers.value = []
  
  // Add new markers for each activity
  activities.value.forEach(activity => {
    if (activity.latlng) {
      const [lat, lng] = activity.latlng.split(',').map(Number)
      if (typeof lat === 'number' && typeof lng === 'number' && isValidLatLng(lat, lng)) {
        const marker = L.marker([lat, lng])
          .bindPopup(`<div class="text-sm">${activity.title}</div>`)
          .addTo(map.value!)
        activityMarkers.value.push(marker)
      }
    }
  })
}

</script>

<template>
    <div class="relative h-full bg-white">
      <!-- The Map Container -->
      <div ref="mapContainer" class="w-full h-full map-container"></div>

      <!-- Floating Button to open the Activity Dialog -->
      <button
        @click="openReportDialog"
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

      <!-- Activity Form Dialog -->
      <DialogForm
        :show="showActivityDialog"
        :selected-location="selectedLocation"
        :coords="coords"
        @close="showActivityDialog = false"
        @submit="submitActivity"
        @start-location-selection="startLocationSelection"
        @use-current-location="useCurrentLocation"
      />

      <!-- Dialog for Login (shown after submit) -->
      <Dialog
        v-if="showLoginDialog"
        :modelValue="showLoginDialog"
        @close="showLoginDialog = false"
        class="relative z-[600]"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black bg-opacity-50 dialog-overlay" aria-hidden="true"></div>

        <!-- Dialog Panel Wrapper -->
        <div class="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12 dialog-panel">
            <AuthLogin />
          </DialogPanel>
        </div>
      </Dialog>
    </div>
</template>

<style scoped>
/* Ensure proper Leaflet controls z-index */
:deep(.leaflet-control) {
  z-index: 100;
}
:deep(.leaflet-pane) {
  z-index: 50;
}
:deep(.leaflet-top),
:deep(.leaflet-bottom) {
  z-index: 100;
}

/* Ensure map container stays below modals */
.map-container {
  z-index: 1;
}

/* Ensure modals and dialogs stay on top */
.dialog-overlay {
  z-index: 1000;
}

.dialog-panel {
  z-index: 1001;
}
</style>
