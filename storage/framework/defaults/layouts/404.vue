<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')

const handleSearch = (e) => {
  e.preventDefault()
  console.log('Searching for:', searchQuery.value)
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-slate-50 to-slate-100">
    <!-- Left side content -->
    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="max-w-xl w-full">
        <div class="flex items-center justify-between mb-16">
          <div class="flex items-center space-x-2">
            <h1 class="text-xl font-bold text-slate-900">Your App</h1>
          </div>
        </div>

        <div class="">
          <h2 class="text-6xl font-bold text-slate-900 mb-4">
            Oops!
          </h2>
          <p class="text-8xl font-bold mb-8 bounce" style="animation-duration: 1s; animation-iteration-count: 2;">
            404
          </p>
          <p class="text-xl text-slate-600 mb-8">
            We can't seem to find the page you're looking for.
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
    <div class="w-full lg:w-1/2 h-[100vh] relative overflow-hidden flex items-center justify-center">
      <svg class="w-full h-full" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="a" x1="50.31%" x2="50%" y1="74.74%" y2="0%">
            <stop offset="0" stop-color="#ffe98a"/>
            <stop offset=".677" stop-color="#b63e59"/>
            <stop offset="1" stop-color="#68126f"/>
          </linearGradient>
          <circle id="b" cx="603" cy="682" r="93"/>
          <filter id="c" height="203.2%" width="203.2%" x="-51.6%" y="-51.6%">
            <feOffset in="SourceAlpha" result="shadowOffsetOuter1"/>
            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="32"/>
            <feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
          </filter>
          <linearGradient id="d">
            <stop offset="0" stop-color="#f7eab9"/>
            <stop offset="1" stop-color="#e5765e"/>
          </linearGradient>
          <linearGradient id="e" x1="49.48%" x2="49.87%" xlink:href="#d" y1="11.66%" y2="77.75%"/>
          <linearGradient id="f">
            <stop offset="0" stop-color="#a22a50"/>
            <stop offset="1" stop-color="#ee7566"/>
          </linearGradient>
          <linearGradient id="g" x1="91.59%" x2="66.97%" xlink:href="#f" y1="5.89%" y2="100%"/>
          <linearGradient id="h" x1="49.48%" x2="49.61%" xlink:href="#d" y1="11.66%" y2="98.34%"/>
          <linearGradient id="i" x1="78.5%" x2="36.4%" xlink:href="#f" y1="106.76%" y2="26.41%"/>
        </defs>
        <g fill="none" fill-rule="evenodd">
          <path d="m0 0h1024v1024h-1024z" fill="url(#a)"/>
          <use fill="#000" filter="url(#c)" xlink:href="#b"/>
          <use fill="#fff6cb" xlink:href="#b"/>
          <g fill="#fff" class="stars">
            <circle cx="217" cy="278" fill-opacity=".4" r="3"/>
            <circle cx="96" cy="257" r="2"/>
            <circle cx="36" cy="287" opacity=".4" r="2"/>
            <circle cx="127" cy="88" r="3"/>
            <circle cx="216" cy="25" r="2"/>
            <circle cx="16" cy="137" r="2"/>
            <circle cx="166" cy="167" r="2"/>
            <circle cx="376" cy="247" r="2"/>
            <circle cx="467" cy="88" opacity=".4" r="3"/>
            <circle cx="527" cy="278" r="3"/>
            <circle cx="607" cy="138" r="3"/>
            <circle cx="817" cy="28" opacity=".4" r="3"/>
            <circle cx="516" cy="157" r="2"/>
            <circle cx="846" cy="227" r="2"/>
            <circle cx="766" cy="137" r="2"/>
            <circle cx="947" cy="278" opacity=".4" r="3"/>
            <circle cx="717" cy="248" r="3"/>
            <circle cx="917" cy="78" r="3"/>
            <circle cx="996" cy="167" r="2"/>
            <circle cx="646" cy="37" r="2"/>
          </g>
          <g transform="translate(0 550)">
            <path d="m259 5.47c0 5.33 3.33 9.5 10 12.5s9.67 9.16 9 18.5h1c.67-6.31 1-11.8 1-16.47 8.67 0 13.33-1.33 14-4 .67 4.98 1.67 8.3 3 9.97 1.33 1.66 2 5.16 2 10.5h1c0-5.65.33-9.64 1-11.97 1-3.5 4-10.03-1-14.53s-5-2.97-10-6.97-10-3-13 2-5 7-9 7-5-3.53-5-5.53 2-5-1.5-5-7.5 0-7.5 2c0 1.33 1.67 2 5 2z" fill="#8e2c15"/>
            <path d="m1024 390h-1024v-284.92c77.3-33.68 155.26-70.08 297.4-70.08 250 0 250.76 125.25 500 125 84.03-.08 160.02-18.2 226.6-40.93z" fill="url(#e)"/>
            <path d="m1024 442h-1024v-170.18c137.51-15.4 203.1-50.49 356.67-60.1 198.57-12.42 250.04-125.13 500.07-125.13 72.78 0 124.44 10.62 167.26 25.68z" fill="url(#e)"/>
            <path d="m1024 112.21v299.79h-167.09c99.31-86.5 112.63-140.75 39.97-162.78-186.64-56.58-101.76-162.64-39.98-162.64 72.7 0 124.3 10.6 167.09 25.63z" fill="url(#g)"/>
            <path d="m1024 285.32v126.68h-167c99.31-86.6 112.63-140.94 39.97-163z" fill="url(#g)"/>
            <path d="m0 474v-250.07c67.12-33.24 129.55-68.93 263-68.93 250 0 331.46 162.6 530 175 107.42 6.71 163-26.77 231-58.92v202.92z" fill="url(#h)"/>
            <path d="m353.02 474h-353.02v-250.07c67.12-33.24 129.55-68.93 263-68.93 71.14 0 151.5 12.76 151.5 70.5 0 54.5-45.5 79.72-112.5 109-82.26 35.95-54.57 111.68 51.02 139.5z" fill="url(#g)"/>
            <path d="m353.02 474h-353.02v-14.8l302-124.7c-82.26 35.95-54.57 111.68 51.02 139.5z" fill="url(#i)"/>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<style>
@keyframes bounce {
  from,
  20%,
  53%,
  to {
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -30px, 0) scaleY(1.1);
  }
  70% {
    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);
    transform: translate3d(0, -15px, 0) scaleY(1.05);
  }
  80% {
    transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translate3d(0, 0, 0) scaleY(0.95);
  }
  90% {
    transform: translate3d(0, -4px, 0) scaleY(1.02);
  }
}

@keyframes starFloat {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}

.bounce {
  animation-name: bounce;
  transform-origin: center bottom;
}

.stars {
  animation: starFloat 3s ease-in-out infinite;
}
</style>
