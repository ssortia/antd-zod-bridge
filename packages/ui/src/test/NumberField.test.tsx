import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { NumberField } from '../index'

const TestSchema = z.object({
  age: z.number().min(18, 'Минимум 18 лет').max(120, 'Максимум 120 лет')
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

describe('NumberField', () => {
  it('renders correctly with label', () => {
    render(
      <TestWrapper>
        <NumberField
          name="age"
          label="Age"
          placeholder="Enter age"
        />
      </TestWrapper>
    )

    expect(screen.getByLabelText('Age')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter age')).toBeInTheDocument()
  })

  it('shows validation error for value below minimum', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <NumberField
          name="age"
          label="Age"
          placeholder="Enter age"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Enter age')
    
    // Enter value below minimum and blur
    await user.type(input, '15')
    await user.tab()

    expect(await screen.findByText('Минимум 18 лет')).toBeInTheDocument()
  })

  it('does not auto-correct invalid values', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <NumberField
          name="age"
          label="Age"
          placeholder="Enter age"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Enter age') as HTMLInputElement
    
    // Enter value below minimum
    await user.type(input, '1')
    await user.tab()

    // Value should remain as entered, not auto-corrected
    expect(input.value).toBe('1')
    expect(await screen.findByText('Минимум 18 лет')).toBeInTheDocument()
  })

  it('accepts valid values', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <NumberField
          name="age"
          label="Age"
          placeholder="Enter age"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Enter age')
    
    // Enter valid value
    await user.type(input, '25')
    await user.tab()

    expect(screen.queryByText('Минимум 18 лет')).not.toBeInTheDocument()
    expect(screen.queryByText('Максимум 120 лет')).not.toBeInTheDocument()
  })
})