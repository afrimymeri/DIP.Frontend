<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import { useAuthStore } from './stores/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isAuthenticated } = storeToRefs(authStore)
</script>

<template>
  <v-app>
    <AppSidebar v-if="isAuthenticated" />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
