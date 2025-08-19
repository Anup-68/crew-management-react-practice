
import type { Meta, StoryObj } from '@storybook/react';
import { InputField, InputFieldProps } from '../components/InputField';
import React from 'react';

const meta: Meta<InputFieldProps> = {
  title: 'Components/InputField',
  component: InputField,
  args: {
    label: 'Label',
    placeholder: 'Type here...',
    variant: 'outlined',
    size: 'md',
  },
  argTypes: {
    variant: { control: 'radio', options: ['filled', 'outlined', 'ghost'] },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;
type Story = StoryObj<InputFieldProps>;

export const Default: Story = {};
export const Invalid: Story = { args: { invalid: true, errorMessage: 'This field is required.' } };
export const Loading: Story = { args: { loading: true } };
export const Password: Story = { args: { type: 'password', passwordToggle: true, placeholder: 'Enter password' } };
export const Clearable: Story = { args: { clearable: true, value: 'Some text' } };
