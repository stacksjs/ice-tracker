<script setup lang="ts">

defineOptions({
  name: 'LoginPage',
})

useHead({
  // title: app.name,
  title: 'ICE Tracker » Login',
  meta: [
    { name: 'description', content: 'ICE Monitoring. Coming soon.' },
  ],
})
</script>

<template>
  <main class="h-screen bg-white">
    <AuthLogin />
  </main>

  <Footer />
</template>
