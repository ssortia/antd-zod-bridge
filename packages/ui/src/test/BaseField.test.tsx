import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { BaseField } from '../components/BaseField'
import { Input } from 'antd'

const TestSchema = z.object({
  testField: z.string().min(1, 'Field is required')
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

describe('BaseField', () => {
  it('renders label correctly', () => {
    render(
      <TestWrapper>
        <BaseField name="testField" label="Test Label">
          {(field) => <Input {...field} />}
        </BaseField>
      </TestWrapper>
    )

    expect(screen.getByText('Test Label')).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <BaseField name="testField" label="Test Label" required>
          {(field) => <Input {...field} />}
        </BaseField>
      </TestWrapper>
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('connects label with input using htmlFor and id', () => {
    render(
      <TestWrapper>
        <BaseField name="testField" label="Test Label">
          {(field) => <Input {...field} />}
        </BaseField>
      </TestWrapper>
    )

    const label = screen.getByText('Test Label').closest('label')
    const input = screen.getByRole('textbox')
    
    expect(label).toHaveAttribute('for', 'testField')
    expect(input).toHaveAttribute('id', 'testField')
  })

  it('applies CSS classes correctly', () => {
    render(
      <TestWrapper>
        <BaseField 
          name="testField" 
          label="Test Label"
          className="custom-field"
          classes={{
            field: 'custom-field-class',
            label: 'custom-label-class'
          }}
        >
          {(field) => <Input {...field} />}
        </BaseField>
      </TestWrapper>
    )

    const fieldDiv = document.querySelector('.azb-field')
    const label = screen.getByText('Test Label')
    
    expect(fieldDiv).toHaveClass('azb-field', 'custom-field-class', 'custom-field')
    expect(label).toHaveClass('azb-field-label', 'custom-label-class')
  })

  it('renders error container', () => {
    render(
      <TestWrapper>
        <BaseField name="testField" label="Test Label">
          {(field) => <Input {...field} />}
        </BaseField>
      </TestWrapper>
    )

    const errorDiv = document.querySelector('.azb-field-error')
    expect(errorDiv).toBeInTheDocument()
  })
})