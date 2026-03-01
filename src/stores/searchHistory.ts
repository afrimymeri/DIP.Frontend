import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useSearchHistory } from '@/composables/useSearchHistory'
import { useAuthStore } from './auth'
import type { SearchHistoryEntry } from '@/types/searchHistory'
import type { Literature } from '@/types/literature'

export const useSearchHistoryStore = defineStore('searchHistory', () => {
  const entries = ref<SearchHistoryEntry[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const hasMore = ref(false)
  const error = ref<string | null>(null)

  const {
    getRecent: apiGetRecent,
    getById: apiGetById,
    create: apiCreate,
    remove: apiRemove,
  } = useSearchHistory()

  function getToken(): string | null {
    const auth = useAuthStore()
    return auth.accessToken
  }

  async function loadRecent() {
    const token = getToken()
    if (!token) return

    loading.value = true
    error.value = null

    try {
      const page = await apiGetRecent(token, 0, 5)
      entries.value = page.items ?? []
      hasMore.value = page.hasMore ?? false
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load search history'
    } finally {
      loading.value = false
    }
  }

  async function loadMore() {
    const token = getToken()
    if (!token || !hasMore.value || loadingMore.value) return

    loadingMore.value = true
    error.value = null

    try {
      const page = await apiGetRecent(token, entries.value.length, 5)
      entries.value = [...entries.value, ...(page.items ?? [])]
      hasMore.value = page.hasMore ?? false
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to load more history'
    } finally {
      loadingMore.value = false
    }
  }

  async function restoreEntry(id: number): Promise<Literature[] | null> {
    const token = getToken()
    if (!token) return null

    loading.value = true
    error.value = null

    try {
      const detail = await apiGetById(id, token)
      return detail.results
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to restore search results'
      return null
    } finally {
      loading.value = false
    }
  }

  async function saveSearch(query: string, results: Literature[]) {
    const token = getToken()
    if (!token || results.length === 0) return

    try {
      const literatureIds = results.map((r) => r.id)
      const entry = await apiCreate({ query, literatureIds }, token)
      entries.value = [entry, ...entries.value]
    } catch {}
  }

  async function deleteEntry(id: number) {
    const token = getToken()
    if (!token) return

    try {
      await apiRemove(id, token)
      entries.value = entries.value.filter((e) => e.id !== id)
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to delete entry'
    }
  }

  function clearHistory() {
    entries.value = []
    hasMore.value = false
    error.value = null
  }

  function clearError() {
    error.value = null
  }

  return {
    entries,
    loading,
    loadingMore,
    hasMore,
    error,
    loadRecent,
    loadMore,
    restoreEntry,
    saveSearch,
    deleteEntry,
    clearHistory,
    clearError,
  }
})
