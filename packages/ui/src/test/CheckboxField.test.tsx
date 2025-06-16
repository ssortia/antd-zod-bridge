import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckboxField } from '../index'

const TestSchema = z.object({
  terms: z.boolean().refine(val => val === true, 'Необходимо принять условия'),
  newsletter: z.boolean()
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

describe('CheckboxField', () => {
  it('renders correctly with label text', () => {
    render(
      <TestWrapper>
        <CheckboxField name="newsletter">
          Subscribe to newsletter
        </CheckboxField>
      </TestWrapper>
    )

    expect(screen.getByText('Subscribe to newsletter')).toBeInTheDocument()
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('starts unchecked by default', () => {
    render(
      <TestWrapper>
        <CheckboxField name="newsletter">
          Subscribe to newsletter
        </CheckboxField>
      </TestWrapper>
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
  })

  it('can be checked and unchecked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <CheckboxField name="newsletter">
          Subscribe to newsletter
        </CheckboxField>
      </TestWrapper>
    )

    const checkbox = screen.getByRole('checkbox')
    
    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    
    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('shows validation error when required but not checked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <CheckboxField name="terms">
          I accept the terms and conditions
        </CheckboxField>
      </TestWrapper>
    )

    const checkbox = screen.getByRole('checkbox')
    
    // Click to focus then click again to uncheck and blur
    await user.click(checkbox)
    await user.click(checkbox)
    await user.tab()

    expect(await screen.findByText('Необходимо принять условия')).toBeInTheDocument()
  })

  it('clears validation error when checked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <CheckboxField name="terms">
          I accept the terms and conditions
        </CheckboxField>
      </TestWrapper>
    )

    const checkbox = screen.getByRole('checkbox')
    
    // Trigger error first
    await user.click(checkbox)
    await user.click(checkbox)
    await user.tab()
    
    expect(await screen.findByText('Необходимо принять условия')).toBeInTheDocument()
    
    // Check the checkbox to clear error
    await user.click(checkbox)
    await user.tab()
    
    expect(screen.queryByText('Необходимо принять условия')).not.toBeInTheDocument()
  })

  it('can be disabled', () => {
    render(
      <TestWrapper>
        <CheckboxField name="newsletter" disabled>
          Subscribe to newsletter
        </CheckboxField>
      </TestWrapper>
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
  })

  it('supports complex label content with links', () => {
    render(
      <TestWrapper>
        <CheckboxField name="terms">
          I accept the <a href="/terms">terms and conditions</a>
        </CheckboxField>
      </TestWrapper>
    )

    expect(screen.getByText('I accept the')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'terms and conditions' })).toBeInTheDocument()
  })
})