import * as XLSX from 'xlsx'
import { getSourceName, type Literature } from '@/types/literature'

export interface ExcelExportOptions {
  filename?: string
  sheetName?: string
}

interface ExcelRow {
  Title: string
  Authors: string
  Year: string
  DOI: string
  URL: string
  'PDF URL': string
  Source: string
  Abstract: string
  'External ID': string
}

function literatureToRow(item: Literature): ExcelRow {
  return {
    Title: item.title || '',
    Authors: item.authors || '',
    Year: item.year || '',
    DOI: item.doi || '',
    URL: item.url || '',
    'PDF URL': item.pdfUrl || '',
    Source: getSourceName(item.source),
    Abstract: item.abstract || '',
    'External ID': item.externalId || '',
  }
}

function generateFilename(query?: string): string {
  const datePart = new Date().toISOString().slice(0, 10)
  const sanitized = query
    ? query
        .trim()
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '_')
        .substring(0, 40)
    : 'all-records'
  return `DIP-${sanitized}-${datePart}.xlsx`
}

function autoFitColumns(worksheet: XLSX.WorkSheet, rows: ExcelRow[]): void {
  const headers = Object.keys(rows[0])
  worksheet['!cols'] = headers.map((header, i) => {
    const maxLen = rows.reduce((max, row) => {
      const val = String(Object.values(row)[i] || '')
      return Math.max(max, Math.min(val.length, 80))
    }, header.length)
    return { wch: maxLen + 2 }
  })
}

export function useExcelExport() {
  function exportToExcel(items: Literature[], options: ExcelExportOptions = {}): void {
    if (items.length === 0) return

    const rows = items.map(literatureToRow)

    const worksheet = XLSX.utils.json_to_sheet(rows)
    autoFitColumns(worksheet, rows)

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, options.sheetName || 'Literature')

    XLSX.writeFile(workbook, options.filename || generateFilename())
  }

  function exportResultsToExcel(items: Literature[], query?: string): void {
    exportToExcel(items, { filename: generateFilename(query) })
  }

  return { exportToExcel, exportResultsToExcel }
}
