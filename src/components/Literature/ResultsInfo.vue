<script setup lang="ts">
defineProps<{
  count: number
}>()

defineEmits<{
  fetch: []
}>()
</script>

<template>
  <v-alert v-if="count > 0 && count < 10" type="info" variant="tonal" class="mb-4">
    <div class="d-flex align-center justify-space-between">
      <span>Found {{ count }} result(s). Want more?</span>
      <v-btn variant="text" color="primary" size="small" @click="$emit('fetch')">
        Fetch from External Sources
      </v-btn>
    </div>
  </v-alert>

  <div v-else-if="count >= 10" class="mb-4 text-body-2 text-medium-emphasis">
    Found {{ count }} results
  </div>
</template>
