
import React from 'react'
import { InputField } from './components/InputField'
import { DataTable, Column } from './components/DataTable'

type Crew = { name: string; role: string; joined: string; hours: number }

const demoData: Crew[] = [
  { name: 'Anup Patil', role: 'Seafarer', joined: '2025-07-23', hours: 160 },
  { name: 'Santosh Rathod', role: 'Captain', joined: '2025-06-12', hours: 182 },
  { name: 'Aniket Singh', role: 'Engineer', joined: '2025-08-01', hours: 120 },
]

const columns: Column<Crew>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'joined', title: 'Joined', dataIndex: 'joined', sortable: true },
  { key: 'hours', title: 'Hours', dataIndex: 'hours', sortable: true },
]

export default function App() {
  const [value, setValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6">Crew Management UI Demo</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">InputField</h2>
          <InputField
            label="Crew Name"
            placeholder="Enter crew name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            helperText="Type to filter crew"
            variant="outlined"
            clearable
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            type="password"
            passwordToggle
            variant="filled"
          />
          <InputField
            label="Loading"
            placeholder="Fetching..."
            loading
            variant="ghost"
          />
          <button
            onClick={() => { setLoading(v => !v) }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white"
          >
            Toggle Table Loading
          </button>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">DataTable</h2>
          <DataTable<Crew>
            data={demoData.filter(d => d.name.toLowerCase().includes(value.toLowerCase()))}
            columns={columns}
            loading={loading}
            selectable
            onRowSelect={(rows) => console.log('Selected rows:', rows)}
          />
        </div>
      </div>
    </div>
  )
}
