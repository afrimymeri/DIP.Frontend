<!-- src/components/Auth/AuthForm.vue -->
<template>
  <v-container class="fill-height d-flex align-center justify-center bg-grey-lighten-4" fluid>
    <v-card class="pa-8" width="100%" max-width="400" elevation="4" rounded="lg">
      <div class="text-center mb-6">
        <v-avatar color="primary" size="64" class="mb-4">
          <v-icon icon="mdi-account" size="32" color="white"></v-icon>
        </v-avatar>
        <h2 class="text-h5 font-weight-bold text-primary">{{ title }}</h2>
        <p class="text-body-2 text-medium-emphasis mt-1">Please sign in to continue</p>
      </div>

      <v-card-text class="pa-0">
        <slot />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
defineProps<{ title?: string }>()
</script>
