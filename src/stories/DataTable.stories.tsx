
import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, DataTableProps, Column } from '../components/DataTable';
import React from 'react';

type Crew = { name: string; role: string; joined: string; hours: number }
const data: Crew[] = [
  { name: 'Anup Patil', role: 'Seafarer', joined: '2025-07-23', hours: 160 },
  { name: 'Santosh Rathod', role: 'Captain', joined: '2025-06-12', hours: 182 },
  { name: 'Aniket Singh ', role: 'Engineer', joined: '2025-08-01', hours: 120 },
];
const columns: Column<Crew>[] = [
  { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
  { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  { key: 'joined', title: 'Joined', dataIndex: 'joined', sortable: true },
  { key: 'hours', title: 'Hours', dataIndex: 'hours', sortable: true },
];

const meta: Meta<DataTableProps<Crew>> = {
  title: 'Components/DataTable',
  component: DataTable<Crew>,
  args: { data, columns, selectable: true },
};
export default meta;
type Story = StoryObj<DataTableProps<Crew>>;

export const Default: Story = {};
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { data: [] } };
