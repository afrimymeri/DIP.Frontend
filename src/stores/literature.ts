import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLiterature } from '@/composables/useLiterature'
import { AVAILABLE_SOURCES, type Literature } from '@/types/literature'
import { useSearchHistoryStore } from './searchHistory'

export const useLiteratureStore = defineStore('literature', () => {
  const query = ref('')
  const results = ref<Literature[]>([])
  const loading = ref(false)
  const fetchLoading = ref(false)
  const error = ref<string | null>(null)
  const searched = ref(false)
  const showFetchModal = ref(false)
  const selectedSources = ref<number[]>(
    AVAILABLE_SOURCES.filter((s) => !s.disabled).map((s) => s.id),
  )
  const fetchLimit = ref(30)
  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  const totalPages = computed(() => Math.ceil(results.value.length / itemsPerPage.value))
  const paginatedResults = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return results.value.slice(start, start + itemsPerPage.value)
  })

  const { searchLocal: apiSearchLocal, getAll: apiGetAll, fetchFromSources: apiFetchFromSources } =
    useLiterature()

  async function searchLocal() {
    if (!query.value.trim()) return

    loading.value = true
    error.value = null
    searched.value = true
    currentPage.value = 1

    try {
      results.value = await apiSearchLocal(query.value)
      if (results.value.length > 0) {
        const historyStore = useSearchHistoryStore()
        historyStore.saveSearch(query.value, results.value)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Search failed'
    } finally {
      loading.value = false
    }
  }

  async function loadAll() {
    loading.value = true
    error.value = null
    searched.value = true
    currentPage.value = 1
    query.value = ''

    try {
      results.value = await apiGetAll()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load records'
    } finally {
      loading.value = false
    }
  }

  async function fetchFromSources() {
    if (!query.value.trim()) return

    fetchLoading.value = true
    error.value = null
    currentPage.value = 1

    try {
      results.value = await apiFetchFromSources({
        query: query.value,
        sources: selectedSources.value,
        limit: fetchLimit.value,
        persist: true,
      })
      showFetchModal.value = false
      if (results.value.length > 0) {
        const historyStore = useSearchHistoryStore()
        historyStore.saveSearch(query.value, results.value)
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Fetch failed'
    } finally {
      fetchLoading.value = false
    }
  }

  function selectAllSources() {
    selectedSources.value = AVAILABLE_SOURCES.filter((s) => !s.disabled).map((s) => s.id)
  }

  function clearSources() {
    selectedSources.value = []
  }

  function clearResults() {
    results.value = []
    searched.value = false
    query.value = ''
    error.value = null
    currentPage.value = 1
  }

  function clearError() {
    error.value = null
  }

  return {
    query,
    results,
    loading,
    fetchLoading,
    error,
    searched,
    showFetchModal,
    selectedSources,
    fetchLimit,
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedResults,
    searchLocal,
    loadAll,
    fetchFromSources,
    selectAllSources,
    clearSources,
    clearResults,
    clearError,
  }
})
