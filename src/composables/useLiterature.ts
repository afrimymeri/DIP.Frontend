import { useApi } from './useApi'
import type { Literature } from '@/types/literature'

export interface SearchParams {
  query: string
  sources: number[]
  limit: number
  persist: boolean
}

export function useLiterature() {
  const api = useApi()

  async function searchLocal(query: string, limit = 50): Promise<Literature[]> {
    return api.get<Literature[]>(
      `/api/literature?query=${encodeURIComponent(query)}&limit=${limit}`,
    )
  }

  async function fetchFromSources(params: SearchParams): Promise<Literature[]> {
    return api.post<Literature[]>('/api/literature/search', params)
  }

  return { searchLocal, fetchFromSources }
}
