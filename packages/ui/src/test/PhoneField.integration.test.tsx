import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ZodForm, PhoneField } from '../index'

const phoneSchema = z.object({
  phone: z.string()
    .min(11, 'Введите корректный номер телефона')
    .max(11, 'Номер телефона должен содержать 11 цифр')
    .refine(
      (val) => val.startsWith('7'),
      'Номер должен начинаться с 7'
    ),
  optionalPhone: z.string()
    .min(11, 'Введите корректный номер телефона')
    .max(11, 'Номер телефона должен содержать 11 цифр')
    .optional()
})

type PhoneFormData = z.infer<typeof phoneSchema>

describe('PhoneField Integration Tests', () => {
  it('integrates correctly with ZodForm', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    
    render(
      <ZodForm schema={phoneSchema} onSubmit={onSubmit}>
        <PhoneField
          name="phone"
          label="Основной телефон"
          required
        />
        <PhoneField
          name="optionalPhone"
          label="Дополнительный телефон"
        />
        <button type="submit">Отправить</button>
      </ZodForm>
    )

    const phoneInput = screen.getByRole('textbox', { name: /основной телефон/i })
    const optionalPhoneInput = screen.getByRole('textbox', { name: /дополнительный телефон/i })
    const submitButton = screen.getByText('Отправить')

    // Fill in valid phone numbers
    await user.type(phoneInput, '9991234567')
    await user.type(optionalPhoneInput, '5551234567')

    // Submit form
    await user.click(submitButton)

    expect(onSubmit).toHaveBeenCalledWith({
      phone: '79991234567',
      optionalPhone: '75551234567'
    })
  })

  it('shows validation errors from Zod schema', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    
    render(
      <ZodForm schema={phoneSchema} onSubmit={onSubmit}>
        <PhoneField
          name="phone"
          label="Телефон"
          required
        />
        <button type="submit">Отправить</button>
      </ZodForm>
    )

    const phoneInput = screen.getByRole('textbox', { name: /телефон/i })
    const submitButton = screen.getByText('Отправить')

    // Enter invalid phone number
    await user.type(phoneInput, '123')
    await user.click(submitButton)

    // Should show validation error
    expect(await screen.findByText('Введите корректный номер телефона')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('prevents form submission with invalid phone', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    
    render(
      <ZodForm schema={phoneSchema} onSubmit={onSubmit}>
        <PhoneField
          name="phone"
          label="Телефон"
          required
        />
        <button type="submit">Отправить</button>
      </ZodForm>
    )

    const submitButton = screen.getByText('Отправить')

    // Try to submit without filling required field
    await user.click(submitButton)

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('handles form reset correctly', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    let formMethods: any
    
    function TestForm() {
      const methods = useForm({
        resolver: zodResolver(phoneSchema),
        defaultValues: { phone: '' }
      })
      formMethods = methods
      
      return (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <PhoneField
              name="phone"
              label="Телефон"
              required
            />
            <button type="submit">Отправить</button>
            <button type="button" onClick={() => methods.reset()}>Сбросить</button>
          </form>
        </FormProvider>
      )
    }
    
    render(<TestForm />)

    const phoneInput = screen.getByRole('textbox') as HTMLInputElement
    const resetButton = screen.getByText('Сбросить')

    // Fill phone field
    await user.type(phoneInput, '9991234567')
    expect(phoneInput.value).toBe('+7 (999) 123-45-67')

    // Reset form
    await user.click(resetButton)
    
    // Wait for form to reset
    await new Promise(resolve => setTimeout(resolve, 10))
    
    expect(phoneInput.value).toBe('')
  })

  it('works with default values', () => {
    const defaultValues: PhoneFormData = {
      phone: '79991234567',
      optionalPhone: '75551234567'
    }
    
    render(
      <ZodForm 
        schema={phoneSchema} 
        onSubmit={() => {}}
        defaultValues={defaultValues}
      >
        <PhoneField
          name="phone"
          label="Основной телефон"
          required
        />
        <PhoneField
          name="optionalPhone"
          label="Дополнительный телефон"
        />
      </ZodForm>
    )

    const phoneInput = screen.getByDisplayValue('+7 (999) 123-45-67') as HTMLInputElement
    const optionalPhoneInput = screen.getByDisplayValue('+7 (555) 123-45-67') as HTMLInputElement

    // Should display formatted default values
    expect(phoneInput.value).toBe('+7 (999) 123-45-67')
    expect(optionalPhoneInput.value).toBe('+7 (555) 123-45-67')
  })

  it('handles real-time validation on blur', async () => {
    const user = userEvent.setup()
    
    render(
      <ZodForm schema={phoneSchema} onSubmit={() => {}} validationMode="onBlur">
        <PhoneField
          name="phone"
          label="Телефон"
          required
        />
      </ZodForm>
    )

    const phoneInput = screen.getByRole('textbox')

    // Enter incomplete phone and blur
    await user.type(phoneInput, '999')
    await user.tab()

    // Should show validation error
    expect(await screen.findByText('Введите корректный номер телефона')).toBeInTheDocument()

    // Complete the phone number
    await user.type(phoneInput, '1234567')
    await user.tab()

    // Error should disappear
    expect(screen.queryByText('Введите корректный номер телефона')).not.toBeInTheDocument()
  })

  it('handles phone number starting with 8 in form submission', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    
    render(
      <ZodForm schema={phoneSchema} onSubmit={onSubmit}>
        <PhoneField
          name="phone"
          label="Телефон"
          required
        />
        <button type="submit">Отправить</button>
      </ZodForm>
    )

    const phoneInput = screen.getByRole('textbox')
    const submitButton = screen.getByText('Отправить')

    // Enter phone starting with 8
    await user.type(phoneInput, '89991234567')
    await user.click(submitButton)

    // Should submit with normalized number (8 -> 7)
    expect(onSubmit).toHaveBeenCalledWith({
      phone: '79991234567'
    })
  })

  it('validates phone number format with custom Zod refinements', async () => {
    const customSchema = z.object({
      phone: z.string()
        .min(11, 'Слишком короткий номер')
        .max(11, 'Слишком длинный номер')
        .refine(
          (val) => val.startsWith('79'),
          'Номер должен начинаться с 79'
        )
    })

    const onSubmit = vi.fn()
    const user = userEvent.setup()
    
    render(
      <ZodForm schema={customSchema} onSubmit={onSubmit}>
        <PhoneField
          name="phone"
          label="Телефон"
          required
        />
        <button type="submit">Отправить</button>
      </ZodForm>
    )

    const phoneInput = screen.getByRole('textbox')
    const submitButton = screen.getByText('Отправить')

    // Enter phone not starting with 79 (starts with 75)
    await user.type(phoneInput, '75551234567')
    await user.click(submitButton)

    // Should show custom validation error
    expect(await screen.findByText('Номер должен начинаться с 79')).toBeInTheDocument()
    expect(onSubmit).not.toHaveBeenCalled()

    // Clear and enter valid number
    await user.clear(phoneInput)
    await user.type(phoneInput, '79991234567')
    await user.click(submitButton)

    // Should submit successfully
    expect(onSubmit).toHaveBeenCalledWith({
      phone: '79991234567'
    })
  })
})