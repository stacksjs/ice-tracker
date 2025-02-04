<script setup lang="ts">
import Login from '../../storage/framework/core/components/auth/src/components/Login.vue'
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
  <main>
    <Login />
  </main>

  <Footer />
</template>
