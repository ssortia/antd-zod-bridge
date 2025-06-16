import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { z } from 'zod'
import { RadioField, ZodForm } from '../index'

const TestSchema = z.object({
  gender: z.enum(['male', 'female'], { required_error: "Выберите пол" }),
  priority: z.string().min(1, 'Выберите приоритет')
})

type TestFormData = z.infer<typeof TestSchema>

const genderOptions = [
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
]

const priorityOptions = [
  { label: 'Высокий', value: 'high' },
  { label: 'Средний', value: 'medium', disabled: true },
  { label: 'Низкий', value: 'low' }
]

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ZodForm schema={TestSchema} onSubmit={console.log} validationMode={'onChange'}>{children}</ZodForm>
  )
}

describe('RadioField', () => {
  it('renders correctly with label and options', () => {
    render(
      <TestWrapper>
        <RadioField
          name="gender"
          label="Gender"
          options={genderOptions}
        />
      </TestWrapper>
    )

    expect(screen.getByText('Gender')).toBeInTheDocument()
    expect(screen.getByText('Мужской')).toBeInTheDocument()
    expect(screen.getByText('Женский')).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <RadioField
          name="gender"
          label="Gender"
          options={genderOptions}
          required
        />
      </TestWrapper>
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders all radio buttons', () => {
    render(
      <TestWrapper>
        <RadioField
          name="gender"
          label="Gender"
          options={genderOptions}
        />
      </TestWrapper>
    )

    const radioButtons = screen.getAllByRole('radio')
    expect(radioButtons).toHaveLength(2)
  })

  it('allows selecting an option', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <RadioField
          name="gender"
          label="Gender"
          options={genderOptions}
        />
      </TestWrapper>
    )

    const maleRadio = screen.getByRole('radio', { name: 'Мужской' })
    await user.click(maleRadio)

    expect(maleRadio).toBeChecked()
  })

  it('allows only one selection at a time', async () => {
    const user = userEvent.setup()

    render(
      <TestWrapper>
        <RadioField
          name="gender"
          label="Gender"
          options={genderOptions}
        />
      </TestWrapper>
    )

    const maleRadio = screen.getByRole('radio', { name: 'Мужской' })
    const femaleRadio = screen.getByRole('radio', { name: 'Женский' })

    await user.click(maleRadio)
    expect(maleRadio).toBeChecked()
    expect(femaleRadio).not.toBeChecked()

    await user.click(femaleRadio)
    expect(maleRadio).not.toBeChecked()
    expect(femaleRadio).toBeChecked()
  })

  it('supports disabled options', () => {
    render(
      <TestWrapper>
        <RadioField
          name="priority"
          label="Priority"
          options={priorityOptions}
        />
      </TestWrapper>
    )

    const mediumRadio = screen.getByRole('radio', { name: 'Средний' })
    expect(mediumRadio).toBeDisabled()
  })

  it('can be entirely disabled', () => {
    render(
      <TestWrapper>
        <RadioField
          name="gender"
          label="Gender"
          options={genderOptions}
          disabled
        />
      </TestWrapper>
    )

    const radioButtons = screen.getAllByRole('radio')
    radioButtons.forEach(radio => {
      expect(radio).toBeDisabled()
    })
  })

  it('supports horizontal direction layout', () => {
    render(
      <TestWrapper>
        <RadioField
          name="gender"
          label="Gender"
          options={genderOptions}
          direction="horizontal"
        />
      </TestWrapper>
    )

    const spaceElement = document.querySelector('.ant-space-horizontal')
    expect(spaceElement).toBeInTheDocument()
  })

  it('uses vertical direction by default', () => {
    render(
      <TestWrapper>
        <RadioField
          name="gender"
          label="Gender"
          options={genderOptions}
        />
      </TestWrapper>
    )

    const spaceElement = document.querySelector('.ant-space-vertical')
    expect(spaceElement).toBeInTheDocument()
  })
})