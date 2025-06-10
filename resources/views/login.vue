<script setup lang="ts">

defineOptions({
  name: 'LoginPage',
})

useHead({
  // title: app.name,
  title: 'ICE Tracker » Login',
  meta: [
    { name: 'description', content: 'ICE Monitoring. Coming soon.' },
    {
      name: 'theme-color',
      content: () => (isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => (preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg'),
    },
  ],
})
</script>

<template>
  <main class="h-screen bg-white">
    <AuthLogin />
  </main>

  <Footer />
</template>
