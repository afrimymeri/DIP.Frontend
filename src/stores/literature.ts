import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useLiterature } from '@/composables/useLiterature'
import { AVAILABLE_SOURCES, type Literature } from '@/types/literature'

export const useLiteratureStore = defineStore('literature', () => {
  const query = ref('')
  const results = ref<Literature[]>([])
  const loading = ref(false)
  const fetchLoading = ref(false)
  const error = ref<string | null>(null)
  const searched = ref(false)
  const showFetchModal = ref(false)
  const selectedSources = ref<number[]>(AVAILABLE_SOURCES.map((s) => s.id))
  const currentPage = ref(1)
  const itemsPerPage = ref(5)

  const totalPages = computed(() => Math.ceil(results.value.length / itemsPerPage.value))
  const paginatedResults = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return results.value.slice(start, start + itemsPerPage.value)
  })

  const { searchLocal: apiSearchLocal, fetchFromSources: apiFetchFromSources } = useLiterature()

  async function searchLocal() {
    if (!query.value.trim()) return

    loading.value = true
    error.value = null
    searched.value = true
    currentPage.value = 1

    try {
      results.value = await apiSearchLocal(query.value)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Search failed'
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
        limit: 30,
        persist: true,
      })
      showFetchModal.value = false
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Fetch failed'
    } finally {
      fetchLoading.value = false
    }
  }

  function selectAllSources() {
    selectedSources.value = AVAILABLE_SOURCES.map((s) => s.id)
  }

  function clearSources() {
    selectedSources.value = []
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
    currentPage,
    itemsPerPage,
    totalPages,
    paginatedResults,
    searchLocal,
    fetchFromSources,
    selectAllSources,
    clearSources,
    clearError,
  }
})
