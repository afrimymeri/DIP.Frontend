<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  total: number
  page: number
  itemsPerPage: number
}>()

defineEmits<{
  fetch: []
}>()

const rangeStart = computed(() => (props.page - 1) * props.itemsPerPage + 1)
const rangeEnd = computed(() => Math.min(props.page * props.itemsPerPage, props.total))
</script>

<template>
  <v-alert v-if="total > 0 && total < 10" type="info" variant="tonal" class="mb-4">
    <div class="d-flex align-center justify-space-between">
      <span>Found {{ total }} result(s). Want more?</span>
      <v-btn variant="text" color="primary" size="small" @click="$emit('fetch')">
        Fetch from External Sources
      </v-btn>
    </div>
  </v-alert>

  <div v-else-if="total >= 10" class="mb-4 text-body-2 text-medium-emphasis">
    Showing {{ rangeStart }}-{{ rangeEnd }} of {{ total }} results
  </div>
</template>
