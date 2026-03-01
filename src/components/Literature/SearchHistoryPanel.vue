<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSearchHistoryStore } from '@/stores/searchHistory'
import { useAuthStore } from '@/stores/auth'

const emit = defineEmits<{
  restore: [id: number]
}>()

const historyStore = useSearchHistoryStore()
const authStore = useAuthStore()
const { entries, loading, loadingMore, hasMore } = storeToRefs(historyStore)
const { isAuthenticated } = storeToRefs(authStore)

onMounted(() => {
  if (isAuthenticated.value) {
    historyStore.loadRecent()
  }
})

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <v-card variant="outlined" class="pa-4">
    <div class="d-flex align-center mb-3">
      <v-icon size="small" class="mr-2">mdi-history</v-icon>
      <span class="text-subtitle-2 font-weight-bold">Search History</span>
    </div>

    <template v-if="!isAuthenticated">
      <p class="text-body-2 text-medium-emphasis">Log in to see your search history.</p>
    </template>

    <template v-else-if="loading && entries.length === 0">
      <v-progress-circular indeterminate size="24" class="d-block mx-auto my-4" />
    </template>

    <template v-else-if="entries.length === 0">
      <p class="text-body-2 text-medium-emphasis">No recent searches yet.</p>
    </template>

    <v-list v-else density="compact" class="pa-0">
      <v-list-item
        v-for="entry in entries"
        :key="entry.id"
        class="px-2 rounded"
        @click="emit('restore', entry.id)"
      >
        <template #prepend>
          <v-icon size="small" color="primary">mdi-magnify</v-icon>
        </template>
        <v-list-item-title class="text-body-2">
          {{ entry.query }}
        </v-list-item-title>
        <v-list-item-subtitle class="text-caption">
          {{ formatDate(entry.searchedAt) }} &middot; {{ entry.resultCount }} results
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-btn
      v-if="hasMore"
      variant="text"
      size="small"
      block
      :loading="loadingMore"
      class="mt-2"
      @click="historyStore.loadMore()"
    >
      Load more
    </v-btn>
  </v-card>
</template>
