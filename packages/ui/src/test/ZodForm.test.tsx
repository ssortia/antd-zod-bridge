import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { ZodForm, TextField, NumberField } from '../index'

const TestSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  age: z.number().min(18, 'Минимум 18 лет')
})

describe('ZodForm', () => {
  it('renders form with children', () => {
    const mockSubmit = vi.fn()
    
    render(
      <ZodForm schema={TestSchema} onSubmit={mockSubmit}>
        <TextField name="name" label="Name" />
        <NumberField name="age" label="Age" />
        <button type="submit">Submit</button>
      </ZodForm>
    )

    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Age')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  it('submits valid data successfully', async () => {
    const user = userEvent.setup()
    const mockSubmit = vi.fn()
    
    render(
      <ZodForm schema={TestSchema} onSubmit={mockSubmit}>
        <TextField name="name" label="Name" />
        <NumberField name="age" label="Age" />
        <button type="submit">Submit</button>
      </ZodForm>
    )

    const nameInput = screen.getByLabelText('Name')
    const ageInput = screen.getByLabelText('Age')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await user.type(nameInput, 'John Doe')
    await user.type(ageInput, '25')
    await user.click(submitButton)

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      age: 25
    })
  })

  it('supports default values', () => {
    const mockSubmit = vi.fn()
    const defaultValues = { name: 'Default Name', age: 30 }
    
    render(
      <ZodForm 
        schema={TestSchema} 
        onSubmit={mockSubmit}
        defaultValues={defaultValues}
      >
        <TextField name="name" label="Name" />
        <NumberField name="age" label="Age" />
        <button type="submit">Submit</button>
      </ZodForm>
    )

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement
    const ageInput = screen.getByLabelText('Age') as HTMLInputElement

    expect(nameInput.value).toBe('Default Name')
    expect(ageInput.value).toBe('30')
  })

  it('supports different validation modes', () => {
    const mockSubmit = vi.fn()
    
    render(
      <ZodForm 
        schema={TestSchema} 
        onSubmit={mockSubmit}
        validationMode="onChange"
      >
        <TextField name="name" label="Name" />
        <NumberField name="age" label="Age" />
        <button type="submit">Submit</button>
      </ZodForm>
    )

    // Form should be rendered with onChange validation mode
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
  })

  it('resets form when resetAfterSubmit is true', async () => {
    const user = userEvent.setup()
    const mockSubmit = vi.fn()
    
    render(
      <ZodForm 
        schema={TestSchema} 
        onSubmit={mockSubmit}
        resetAfterSubmit
      >
        <TextField name="name" label="Name" />
        <NumberField name="age" label="Age" />
        <button type="submit">Submit</button>
      </ZodForm>
    )

    const nameInput = screen.getByLabelText('Name') as HTMLInputElement
    const ageInput = screen.getByLabelText('Age') as HTMLInputElement
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await user.type(nameInput, 'John Doe')
    await user.type(ageInput, '25')
    await user.click(submitButton)

    expect(mockSubmit).toHaveBeenCalled()
    
    // Form should be reset after submission
    expect(nameInput.value).toBe('')
    expect(ageInput.value).toBe('')
  })

  it('applies custom CSS classes', () => {
    const mockSubmit = vi.fn()
    
    render(
      <ZodForm 
        schema={TestSchema} 
        onSubmit={mockSubmit}
        className="custom-form"
        classes={{
          form: 'custom-form-class',
          content: 'custom-content-class'
        }}
      >
        <TextField name="name" label="Name" />
        <button type="submit">Submit</button>
      </ZodForm>
    )

    const form = document.querySelector('form')
    expect(form).toHaveClass('azb-form', 'custom-form-class', 'custom-form')
    
    const content = document.querySelector('.azb-form-content')
    expect(content).toHaveClass('custom-content-class')
  })

  it('handles async submit functions', async () => {
    const user = userEvent.setup()
    const mockSubmit = vi.fn().mockResolvedValue(undefined)
    
    render(
      <ZodForm schema={TestSchema} onSubmit={mockSubmit}>
        <TextField name="name" label="Name" />
        <NumberField name="age" label="Age" />
        <button type="submit">Submit</button>
      </ZodForm>
    )

    const nameInput = screen.getByLabelText('Name')
    const ageInput = screen.getByLabelText('Age')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await user.type(nameInput, 'John Doe')
    await user.type(ageInput, '25')
    await user.click(submitButton)

    expect(mockSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
      age: 25
    })
  })
})