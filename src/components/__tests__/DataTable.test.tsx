
import React from 'react'
import { render, screen, fireEvent, within } from '@testing-library/react'
import { DataTable, Column } from '../../components/DataTable'

type Row = { a: number; b: string }
const data: Row[] = [
  { a: 2, b: 'y' },
  { a: 1, b: 'x' },
]
const columns: Column<Row>[] = [
  { key: 'a', title: 'A', dataIndex: 'a', sortable: true },
  { key: 'b', title: 'B', dataIndex: 'b', sortable: true },
]

test('sorts when header clicked', () => {
  render(<DataTable<Row> data={data} columns={columns} />)
  const aHeader = screen.getByText('A')
  fireEvent.click(aHeader) // asc
  const rows = screen.getAllByRole('row')
  // first body row should be a=1 after sort asc
  const firstBodyCells = within(rows[1]).getAllByRole('cell')
  expect(firstBodyCells[0]).toHaveTextContent('1')
})

test('selects rows and calls onRowSelect', () => {
  const handle = vi.fn()
  render(<DataTable<Row> data={data} columns={columns} selectable onRowSelect={handle} />)
  const checkbox = screen.getByLabelText('Select row 1')
  fireEvent.click(checkbox)
  expect(handle).toHaveBeenCalledWith([data[0]])
})
