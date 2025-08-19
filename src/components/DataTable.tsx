
import React from 'react'
import clsx from 'clsx'

export interface Column<T> {
  key: string
  title: string
  dataIndex: keyof T
  sortable?: boolean
  render?: (value: any, record: T) => React.ReactNode
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  emptyText?: string
}

type SortState<T> = { key: keyof T | null; direction: 'asc' | 'desc' | null }

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  emptyText = 'No records found.'
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState<T>>({ key: null, direction: null })
  const [selected, setSelected] = React.useState<Set<number>>(new Set())

  const sortedData = React.useMemo(() => {
    if (!sort.key || !sort.direction) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const va = a[sort.key!]
      const vb = b[sort.key!]
      if (va == null && vb == null) return 0
      if (va == null) return sort.direction === 'asc' ? -1 : 1
      if (vb == null) return sort.direction === 'asc' ? 1 : -1
      if (va < vb) return sort.direction === 'asc' ? -1 : 1
      if (va > vb) return sort.direction === 'asc' ? 1 : -1
      return 0
    })
    return copy
  }, [data, sort])

  const allSelected = selectable && data.length > 0 && selected.size === data.length

  const toggleAll = () => {
    if (!selectable) return
    const next = new Set<number>()
    if (!allSelected) {
      data.forEach((_, idx) => next.add(idx))
    }
    setSelected(next)
    onRowSelect?.(Array.from(next).map(i => data[i]))
  }

  const toggleRow = (idx: number) => {
  if (!selectable) return
  const next = new Set(selected)

  if (next.has(idx)) {
    next.delete(idx)
  } else {
    next.add(idx)
  }

  setSelected(next)
  onRowSelect?.(Array.from(next).map(i => data[i]))
}


  const requestSort = (col: Column<T>) => {
    if (!col.sortable) return
    const key = col.dataIndex as keyof T
    setSort(s => {
      if (s.key !== key) return { key, direction: 'asc' }
      if (s.direction === 'asc') return { key, direction: 'desc' }
      return { key: null, direction: null }
    })
  }

  return (
    <div className="w-full relative">
      <div
        className={clsx(
          'overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800',
          'bg-white dark:bg-gray-900'
        )}
        aria-busy={loading || undefined}
      >
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              {selectable && (
                <th scope="col" className="p-3 w-10">
                  <input
                    aria-label="Select all rows"
                    type="checkbox"
                    checked={!!allSelected}
                    onChange={toggleAll}
                    className="accent-blue-600"
                  />
                </th>
              )}
              {columns.map(col => {
                const isSorted = sort.key === col.dataIndex
                const arrow = !col.sortable ? '' : sort.direction === 'asc' && isSorted ? ' ▲' : sort.direction === 'desc' && isSorted ? ' ▼' : ' ↕'
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={clsx('p-3 font-semibold select-none cursor-pointer')}
                    onClick={() => requestSort(col)}
                    aria-sort={isSorted ? (sort.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                  >
                    {col.title}{col.sortable && <span aria-hidden>{arrow}</span>}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-gray-800 dark:text-gray-100">
            {loading ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : sortedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="p-6 text-center text-gray-500 dark:text-gray-400">
                  {emptyText}
                </td>
              </tr>
            ) : (
              sortedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/60 dark:hover:bg-gray-800/50">
                  {selectable && (
                    <td className="p-3">
                      <input
                        aria-label={`Select row ${idx + 1}`}
                        type="checkbox"
                        checked={selected.has(idx)}
                        onChange={() => toggleRow(idx)}
                        className="accent-blue-600"
                      />
                    </td>
                  )}
                  {columns.map(col => (
                    <td key={col.key} className="p-3 align-top">
                      {col.render ? col.render(row[col.dataIndex], row) : String(row[col.dataIndex] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
