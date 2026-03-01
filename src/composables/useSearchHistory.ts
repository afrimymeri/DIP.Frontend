import { useApi } from './useApi'
import type {
  SearchHistoryEntry,
  SearchHistoryPage,
  SearchHistoryDetail,
  CreateSearchHistoryRequest,
} from '@/types/searchHistory'

export function useSearchHistory() {
  const api = useApi()

  async function getRecent(
    token: string,
    skip = 0,
    take = 5,
  ): Promise<SearchHistoryPage> {
    return api.get<SearchHistoryPage>(
      `/api/search-history?skip=${skip}&take=${take}`,
      { token },
    )
  }

  async function getById(id: number, token: string): Promise<SearchHistoryDetail> {
    return api.get<SearchHistoryDetail>(`/api/search-history/${id}`, { token })
  }

  async function create(
    data: CreateSearchHistoryRequest,
    token: string,
  ): Promise<SearchHistoryEntry> {
    return api.post<SearchHistoryEntry>('/api/search-history', data, { token })
  }

  async function remove(id: number, token: string): Promise<unknown> {
    return api.delete<unknown>(`/api/search-history/${id}`, { token })
  }

  return { getRecent, getById, create, remove }
}
