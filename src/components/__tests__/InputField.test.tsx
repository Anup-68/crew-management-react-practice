
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { InputField } from '../../components/InputField'

test('calls onChange when typing and clears when clear clicked', () => {
  const handle = vi.fn()
  render(<InputField label="Name" value="abc" onChange={handle} clearable />)
  const input = screen.getByLabelText('Name') as HTMLInputElement
  fireEvent.change(input, { target: { value: 'abcd' } })
  expect(handle).toHaveBeenCalled()
  const clear = screen.getByLabelText('Clear input')
  fireEvent.click(clear)
  expect(handle).toHaveBeenCalled()
})

test('sets aria-invalid when invalid', () => {
  render(<InputField label="Email" invalid errorMessage="Required" />)
  const input = screen.getByLabelText('Email')
  expect(input).toHaveAttribute('aria-invalid', 'true')
  expect(screen.getByRole('alert')).toHaveTextContent('Required')
})
