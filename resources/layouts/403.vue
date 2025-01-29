<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = (e) => {
  e.preventDefault()
  // Implement search functionality here
  console.log('Searching for:', searchQuery.value)
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Left side content -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-slate-50 to-slate-100">
      <div class="max-w-xl w-full">
        <div class="flex items-center justify-between mb-16">
          <div class="flex items-center space-x-2">
            <h1 class="text-xl font-bold text-slate-900">Your App</h1>
          </div>
        </div>

        <div class="">
          <h2 class="text-6xl font-bold text-slate-900 mb-4">
            Access Denied
          </h2>
          <p class="text-8xl font-bold mb-8">
            403
          </p>
          <p class="text-xl text-slate-600 mb-8">
            Sorry, you don't have permission to access this page.
          </p>

          <div class="flex sm:flex-row gap-4">
            <router-link
              to="/"
              class="flex items-center justify-center px-6 py-3 bg-slate-500 text-white rounded-lg hover:bg-slate-600 transition-colors duration-200 w-full sm:w-auto"
            >
              <i class="i-hugeicons-home-05 h-5 w-5 mr-2" />
              Back to Home
            </router-link>

            <button
              @click="goBack"
              class="flex items-center justify-center px-6 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors duration-200 w-full sm:w-auto"
            >
              <i class="i-hugeicons-arrow-left-02 h-5 w-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>

        <div class="mt-16 border-t border-slate-200 pt-8">
          <p class="text-slate-600">
            Need help? Contact us at
            <a href="mailto:support@example.com" class="text-slate-500 hover:text-slate-600">
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>

    <!-- Right side SVG -->
    <div class="w-full lg:w-1/2 h-screen bg-white">
      <img
        src="/svgs/403.svg"
        alt="403 illustration"
        class="w-full h-full object-cover"
      />
    </div>
  </div>
</template>
