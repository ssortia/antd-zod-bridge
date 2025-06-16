import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SelectField } from '../index'

const TestSchema = z.object({
  country: z.string().min(1, 'Выберите страну'),
  multiple: z.array(z.string()).min(1, 'Выберите хотя бы один элемент')
})

type TestFormData = z.infer<typeof TestSchema>

const options = [
  { label: 'Россия', value: 'russia' },
  { label: 'США', value: 'usa' },
  { label: 'Германия', value: 'germany' }
]

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

describe('SelectField', () => {
  it('renders correctly with label and options', () => {
    render(
      <TestWrapper>
        <SelectField
          name="country"
          label="Country"
          placeholder="Select country"
          options={options}
        />
      </TestWrapper>
    )

    expect(screen.getByLabelText('Country')).toBeInTheDocument()
    expect(screen.getByText('Select country')).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <SelectField
          name="country"
          label="Country"
          options={options}
          required
        />
      </TestWrapper>
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('opens dropdown and shows options when clicked', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <SelectField
          name="country"
          label="Country"
          placeholder="Select country"
          options={options}
        />
      </TestWrapper>
    )

    const select = screen.getByLabelText('Country')
    await user.click(select)

    expect(screen.getByText('Россия')).toBeInTheDocument()
    expect(screen.getByText('США')).toBeInTheDocument()
    expect(screen.getByText('Германия')).toBeInTheDocument()
  })

  it('shows validation error when no option selected', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <SelectField
          name="country"
          label="Country"
          placeholder="Select country"
          options={options}
        />
      </TestWrapper>
    )

    const select = screen.getByLabelText('Country')
    await user.click(select)
    await user.tab()

    // Look for any validation error message
    const errorElement = await screen.findByText(/стран|required|invalid/i)
    expect(errorElement).toBeInTheDocument()
  })

  it('supports multiple selection mode', () => {
    render(
      <TestWrapper>
        <SelectField
          name="multiple"
          label="Multiple Select"
          placeholder="Select multiple"
          options={options}
          mode="multiple"
        />
      </TestWrapper>
    )

    const select = document.querySelector('.ant-select-multiple')
    expect(select).toBeInTheDocument()
  })

  it('supports search functionality', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <SelectField
          name="country"
          label="Country"
          placeholder="Select country"
          options={options}
          showSearch
        />
      </TestWrapper>
    )

    const select = screen.getByLabelText('Country')
    await user.click(select)
    
    const searchInput = document.querySelector('.ant-select-selection-search-input')
    expect(searchInput).toBeInTheDocument()
  })
})