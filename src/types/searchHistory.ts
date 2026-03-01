import type { Literature } from './literature'

export interface SearchHistoryEntry {
  id: number
  query: string
  searchedAt: string
  resultCount: number
}

export interface SearchHistoryPage {
  items: SearchHistoryEntry[]
  hasMore: boolean
}

export interface SearchHistoryDetail {
  id: number
  query: string
  searchedAt: string
  results: Literature[]
}

export interface CreateSearchHistoryRequest {
  query: string
  literatureIds: number[]
}
