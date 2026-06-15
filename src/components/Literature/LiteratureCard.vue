<script setup lang="ts">
import { ref } from 'vue'
import { getSourceName, type Literature } from '@/types/literature'
import AbstractModal from '@/components/Literature/AbstractModal.vue'

defineProps<{
  item: Literature
}>()

const showAbstract = ref(false)

function truncate(text?: string, length = 300): string {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}
</script>

<template>
  <v-card class="mb-4" variant="outlined">
    <v-card-title class="text-wrap">
      <a v-if="item.url" :href="item.url" target="_blank" class="text-decoration-none">
        {{ item.title }}
      </a>
      <span v-else>{{ item.title }}</span>
    </v-card-title>

    <v-card-subtitle v-if="item.authors || item.year">
      {{ item.authors }}{{ item.authors && item.year ? ' • ' : '' }}{{ item.year }}
    </v-card-subtitle>

    <v-card-text v-if="item.abstract" class="text-body-2">
      {{ truncate(item.abstract) }}
    </v-card-text>

    <v-card-actions>
      <v-chip size="small" color="primary" variant="tonal">
        {{ getSourceName(item.source) }}
      </v-chip>
      <v-chip v-if="item.doi" size="small" variant="outlined" class="ml-2">
        DOI: {{ item.doi }}
      </v-chip>
      <v-spacer />
      <v-btn
        v-if="item.abstract"
        variant="text"
        size="small"
        color="secondary"
        @click="showAbstract = true"
      >
        <v-icon start>mdi-text-box-outline</v-icon>
        Abstract
      </v-btn>
      <v-btn
        v-if="item.url"
        :href="item.url"
        target="_blank"
        variant="text"
        size="small"
        color="primary"
      >
        <v-icon start>mdi-open-in-new</v-icon>
        View
      </v-btn>
      <v-btn
        v-if="item.pdfUrl"
        :href="item.pdfUrl"
        target="_blank"
        variant="text"
        size="small"
        color="error"
      >
        <v-icon start>mdi-file-pdf-box</v-icon>
        PDF
      </v-btn>
    </v-card-actions>

    <AbstractModal
      v-if="item.abstract"
      v-model="showAbstract"
      :title="item.title"
      :abstract="item.abstract"
    />
  </v-card>
</template>
