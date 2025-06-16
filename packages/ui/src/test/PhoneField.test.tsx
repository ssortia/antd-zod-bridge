import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PhoneField } from '../index'

const TestSchema = z.object({
  phoneField: z.string().min(11, 'Введите корректный номер телефона').max(11, 'Номер телефона должен содержать 11 цифр')
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

describe('PhoneField', () => {
  it('renders correctly with label', () => {
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
          placeholder="+7 (___) ___-__-__"
        />
      </TestWrapper>
    )

    expect(screen.getByLabelText('Телефон')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('+7 (___) ___-__-__')).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
          required
        />
      </TestWrapper>
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('formats phone number correctly when typing', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон') as HTMLInputElement
    
    // Type a phone number
    await user.type(input, '9991234567')
    
    // Should be formatted as +7 (999) 123-45-67
    expect(input.value).toBe('+7 (999) 123-45-67')
  })

  it('handles phone number starting with 8', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон') as HTMLInputElement
    
    // Type a phone number starting with 8
    await user.type(input, '89991234567')
    
    // Should replace 8 with 7 and format as +7 (999) 123-45-67
    expect(input.value).toBe('+7 (999) 123-45-67')
  })

  it('handles phone number starting with +7', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон') as HTMLInputElement
    
    // Type a phone number with +7 prefix
    await user.type(input, '+79991234567')
    
    // Should format correctly
    expect(input.value).toBe('+7 (999) 123-45-67')
  })

  it('handles incomplete phone number formatting', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон') as HTMLInputElement
    
    // Type partial phone number
    await user.type(input, '999')
    expect(input.value).toBe('+7 (999')
    
    await user.type(input, '123')
    expect(input.value).toBe('+7 (999) 123')
    
    await user.type(input, '45')
    expect(input.value).toBe('+7 (999) 123-45')
    
    await user.type(input, '67')
    expect(input.value).toBe('+7 (999) 123-45-67')
  })

  it('limits input to maximum length', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон') as HTMLInputElement
    
    // Type a phone number with extra digits
    await user.type(input, '999123456789999')
    
    // Should stop at 11 digits (formatted as +7 (999) 123-45-67)
    expect(input.value).toBe('+7 (999) 123-45-67')
  })

  it('ignores non-digit characters', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон') as HTMLInputElement
    
    // Type with non-digit characters
    await user.type(input, '9a9b9c1d2e3f4g5h6i7j')
    
    // Should only use digits and format correctly
    expect(input.value).toBe('+7 (999) 123-45-67')
  })

  it('shows validation error for short phone number', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон')
    
    // Enter short phone number and blur
    await user.type(input, '999123')
    await user.tab()

    expect(await screen.findByText('Введите корректный номер телефона')).toBeInTheDocument()
  })

  it('clears validation error when valid phone is entered', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон')
    
    // Enter short phone number and blur
    await user.type(input, '999123')
    await user.tab()
    
    expect(await screen.findByText('Введите корректный номер телефона')).toBeInTheDocument()

    // Clear and enter valid phone number
    await user.clear(input)
    await user.type(input, '9991234567')
    await user.tab()

    expect(screen.queryByText('Введите корректный номер телефона')).not.toBeInTheDocument()
  })

  it('handles edge case with only +7', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон') as HTMLInputElement
    
    // Type just +7
    await user.type(input, '7')
    
    expect(input.value).toBe('+7')
  })

  it('handles empty input', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон') as HTMLInputElement
    
    // Clear any existing value
    await user.clear(input)
    
    expect(input.value).toBe('')
  })

  it('supports custom prefix and suffix', () => {
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
          prefix="📞"
          suffix="RU"
        />
      </TestWrapper>
    )

    expect(screen.getByText('📞')).toBeInTheDocument()
    expect(screen.getByText('RU')).toBeInTheDocument()
  })

  it('can be disabled', () => {
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
          disabled
        />
      </TestWrapper>
    )

    const input = screen.getByLabelText('Телефон')
    expect(input).toBeDisabled()
  })

  it('supports different sizes', () => {
    const { rerender } = render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
          size="small"
        />
      </TestWrapper>
    )

    let input = screen.getByLabelText('Телефон')
    expect(input).toHaveClass('ant-input-sm')

    rerender(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
          size="large"
        />
      </TestWrapper>
    )

    input = screen.getByLabelText('Телефон')
    expect(input).toHaveClass('ant-input-lg')
  })

  it('applies custom CSS classes', () => {
    render(
      <TestWrapper>
        <PhoneField
          name="phoneField"
          label="Телефон"
          className="custom-phone-field"
          classes={{
            field: 'custom-field-class',
            label: 'custom-label-class'
          }}
        />
      </TestWrapper>
    )

    // The input should have the custom field class applied via BaseField
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    
    // Check that the label has the custom class
    const label = screen.getByText('Телефон')
    expect(label).toHaveClass('custom-label-class')
  })
})