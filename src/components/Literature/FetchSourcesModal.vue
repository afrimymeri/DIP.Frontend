<script setup lang="ts">
import { AVAILABLE_SOURCES } from '@/types/literature'

defineProps<{
  query: string
  loading: boolean
}>()

const modelValue = defineModel<boolean>({ required: true })
const selectedSources = defineModel<number[]>('selectedSources', { required: true })

const emit = defineEmits<{
  fetch: []
}>()

function selectAll() {
  selectedSources.value = AVAILABLE_SOURCES.map((s) => s.id)
}

function clearAll() {
  selectedSources.value = []
}
</script>

<template>
  <v-dialog v-model="modelValue" max-width="500">
    <v-card>
      <v-card-title>Fetch from External Sources</v-card-title>
      <v-card-subtitle>Search "{{ query }}" from selected academic databases</v-card-subtitle>

      <v-card-text>
        <div class="d-flex gap-2 mb-4">
          <v-btn size="small" variant="text" @click="selectAll">Select All</v-btn>
          <v-btn size="small" variant="text" @click="clearAll">Clear</v-btn>
        </div>

        <v-checkbox
          v-for="src in AVAILABLE_SOURCES"
          :key="src.id"
          v-model="selectedSources"
          :label="src.name"
          :value="src.id"
          density="compact"
          hide-details
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="modelValue = false">Cancel</v-btn>
        <v-btn
          color="primary"
          variant="flat"
          :loading="loading"
          :disabled="selectedSources.length === 0"
          @click="emit('fetch')"
        >
          <v-icon start>mdi-magnify</v-icon>
          Fetch Results
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
