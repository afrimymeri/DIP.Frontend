<script setup lang="ts">
defineEmits<{
  fetch: []
}>()
</script>

<template>
  <v-card class="mb-4 pa-6 text-center" variant="outlined">
    <v-icon size="64" color="grey-lighten-1" class="mb-4">mdi-file-search-outline</v-icon>
    <h3 class="text-h6 mb-2">No results found in database</h3>
    <p class="text-body-2 text-medium-emphasis mb-4">
      Would you like to fetch results from external academic sources?
    </p>
    <v-btn color="primary" @click="$emit('fetch')">
      <v-icon start>mdi-cloud-download</v-icon>
      Fetch from External Sources
    </v-btn>
  </v-card>
</template>
