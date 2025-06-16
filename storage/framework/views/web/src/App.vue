<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { checkAuthentication } = useAuth()

// Check auth status on mount
onMounted(async () => {
  await checkAuthentication()
})

// Check auth status on route changes
watch(
  () => route.path,
  async () => {
    await checkAuthentication()
  }
)
</script>

<template>
  <RouterView />
</template>
