<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
</script>

<template>
  <v-app>
    <AppSidebar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
