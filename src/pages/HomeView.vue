<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLiteratureStore } from '@/stores/literature'
import SearchBar from '@/components/Literature/SearchBar.vue'
import LiteratureCard from '@/components/Literature/LiteratureCard.vue'
import NoResultsCard from '@/components/Literature/NoResultsCard.vue'
import FetchSourcesModal from '@/components/Literature/FetchSourcesModal.vue'
import ResultsInfo from '@/components/Literature/ResultsInfo.vue'

const store = useLiteratureStore()
const { query, results, loading, fetchLoading, error, searched, showFetchModal, selectedSources } =
  storeToRefs(store)
</script>

<template>
  <v-container class="py-8" style="max-width: 900px">
    <div class="text-center mb-8">
      <h1 class="text-h3 font-weight-bold mb-2">Literature Search</h1>
      <p class="text-body-1 text-medium-emphasis">
        Search academic papers across multiple databases
      </p>
    </div>

    <SearchBar v-model:query="query" :loading="loading" @search="store.searchLocal" />

    <v-progress-linear v-if="loading" indeterminate color="primary" class="mb-4" />

    <v-alert
      v-if="error"
      type="error"
      variant="tonal"
      closable
      class="mb-4"
      @click:close="store.clearError"
    >
      {{ error }}
    </v-alert>

    <NoResultsCard
      v-if="searched && !loading && results.length === 0"
      @fetch="showFetchModal = true"
    />

    <ResultsInfo
      v-if="searched && !loading && results.length > 0"
      :count="results.length"
      @fetch="showFetchModal = true"
    />

    <LiteratureCard v-for="item in results" :key="item.id" :item="item" />

    <FetchSourcesModal
      v-model="showFetchModal"
      v-model:selected-sources="selectedSources"
      :query="query"
      :loading="fetchLoading"
      @fetch="store.fetchFromSources"
    />
  </v-container>
</template>
