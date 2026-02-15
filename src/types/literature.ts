export interface Literature {
  id: number
  title: string
  abstract?: string
  authors?: string
  year?: string
  doi?: string
  url?: string
  pdfUrl?: string
  source: number
  externalId?: string
}

export interface LiteratureSource {
  id: number
  name: string
}

export const AVAILABLE_SOURCES: LiteratureSource[] = [
  { id: 1, name: 'Semantic Scholar' },
  { id: 2, name: 'DBLP' },
  { id: 3, name: 'OpenAlex' },
  { id: 4, name: 'CrossRef' },
  { id: 5, name: 'arXiv' },
  { id: 10, name: 'IEEE Xplore' },
  { id: 11, name: 'ACM Digital Library' },
]

export const SOURCE_NAMES: Record<number, string> = {
  1: 'Semantic Scholar',
  2: 'DBLP',
  3: 'OpenAlex',
  4: 'CrossRef',
  5: 'arXiv',
  10: 'IEEE Xplore',
  11: 'ACM Digital Library',
}

export function getSourceName(source: number): string {
  return SOURCE_NAMES[source] || `Source ${source}`
}
