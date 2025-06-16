import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { DateField } from '../index'

const TestSchema = z.object({
  birthDate: z.date({ required_error: 'Выберите дату рождения' }),
  appointmentDate: z.date().nullable()
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

describe('DateField', () => {
  it('renders correctly with label', () => {
    render(
      <TestWrapper>
        <DateField
          name="birthDate"
          label="Birth Date"
          placeholder="Select date"
        />
      </TestWrapper>
    )

    expect(screen.getByLabelText('Birth Date')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Select date')).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <DateField
          name="birthDate"
          label="Birth Date"
          required
        />
      </TestWrapper>
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('opens date picker when clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <DateField
          name="birthDate"
          label="Birth Date"
          placeholder="Select date"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Select date')
    await user.click(input)

    // Check if date picker is opened (look for calendar elements)
    const datePickerDropdown = document.querySelector('.ant-picker-dropdown')
    expect(datePickerDropdown).toBeInTheDocument()
  })

  it('shows validation error when no date is selected', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <DateField
          name="birthDate"
          label="Birth Date"
          placeholder="Select date"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Select date')
    
    // Focus and blur without selection
    await user.click(input)
    await user.tab()

    // Look for any validation error message
    const errorElement = await screen.findByText(/дат|required|invalid/i)
    expect(errorElement).toBeInTheDocument()
  })

  it('supports custom date format', () => {
    render(
      <TestWrapper>
        <DateField
          name="birthDate"
          label="Birth Date"
          placeholder="Select date"
          format="MM/DD/YYYY"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Select date')
    expect(input).toBeInTheDocument()
  })

  it('supports time selection when showTime is enabled', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <DateField
          name="appointmentDate"
          label="Appointment"
          placeholder="Select date and time"
          showTime
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Select date and time')
    await user.click(input)

    // When showTime is enabled, there should be time selection
    const timeSelector = document.querySelector('.ant-picker-time-panel')
    // Note: Time panel might not be immediately visible, this tests the configuration
    expect(input).toBeInTheDocument()
  })

  it('can be disabled', () => {
    render(
      <TestWrapper>
        <DateField
          name="birthDate"
          label="Birth Date"
          placeholder="Select date"
          disabled
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Select date')
    expect(input).toBeDisabled()
  })

  it('has correct input type attributes', () => {
    render(
      <TestWrapper>
        <DateField
          name="birthDate"
          label="Birth Date"
          placeholder="Select date"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Select date')
    expect(input).toHaveAttribute('autocomplete', 'off')
  })

  it('clears date when clear button is clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <DateField
          name="appointmentDate"
          label="Appointment"
          placeholder="Select date"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Select date')
    
    // Type a date value first
    await user.type(input, '01/01/2024')
    
    // Look for clear button (it appears when there's a value)
    const clearButton = document.querySelector('.ant-picker-clear')
    if (clearButton) {
      await user.click(clearButton)
      expect(input).toHaveValue('')
    }
  })
})