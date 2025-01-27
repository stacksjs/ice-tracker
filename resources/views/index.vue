<script setup lang="ts">
defineOptions({
  name: 'HomePage',
})

useHead({
  // title: app.name,
  title: 'Stacks',
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
  <!-- <Header /> -->

  <main>
    <ComingSoon />
  </main>

  <Footer />
</template>
