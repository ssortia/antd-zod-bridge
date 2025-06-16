import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextField } from '../index'

const TestSchema = z.object({
  testField: z.string().min(3, 'Минимум 3 символа')
})

type TestFormData = z.infer<typeof TestSchema>

function TestWrapper({ children }: { children: React.ReactNode }) {
  const form = useForm<TestFormData>({
    resolver: zodResolver(TestSchema),
    mode: 'onBlur'
  })

  return (
    <FormProvider {...form}>
      <form>{children}</form>
    </FormProvider>
  )
}

describe('TextField', () => {
  it('renders correctly with label', () => {
    render(
      <TestWrapper>
        <TextField
          name="testField"
          label="Test Field"
          placeholder="Enter text"
        />
      </TestWrapper>
    )

    expect(screen.getByLabelText('Test Field')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <TextField
          name="testField"
          label="Test Field"
          required
        />
      </TestWrapper>
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('shows validation error after blur', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <TextField
          name="testField"
          label="Test Field"
          placeholder="Enter text"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Enter text')
    
    // Enter invalid text and blur
    await user.type(input, 'ab')
    await user.tab()

    expect(await screen.findByText('Минимум 3 символа')).toBeInTheDocument()
  })

  it('clears validation error when valid input is entered', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <TextField
          name="testField"
          label="Test Field"
          placeholder="Enter text"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Enter text')
    
    // Enter invalid text and blur
    await user.type(input, 'ab')
    await user.tab()
    
    expect(await screen.findByText('Минимум 3 символа')).toBeInTheDocument()

    // Clear and enter valid text
    await user.clear(input)
    await user.type(input, 'valid text')
    await user.tab()

    expect(screen.queryByText('Минимум 3 символa')).not.toBeInTheDocument()
  })
})