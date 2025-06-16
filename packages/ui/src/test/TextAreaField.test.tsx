import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { TextAreaField } from '../index'

const TestSchema = z.object({
  bio: z.string().min(10, 'Минимум 10 символов').max(100, 'Максимум 100 символов')
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

describe('TextAreaField', () => {
  it('renders correctly with label', () => {
    render(
      <TestWrapper>
        <TextAreaField
          name="bio"
          label="Biography"
          placeholder="Tell us about yourself"
        />
      </TestWrapper>
    )

    expect(screen.getByLabelText('Biography')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Tell us about yourself')).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <TextAreaField
          name="bio"
          label="Biography"
          required
        />
      </TestWrapper>
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('renders as textarea element', () => {
    render(
      <TestWrapper>
        <TextAreaField
          name="bio"
          label="Biography"
          placeholder="Tell us about yourself"
        />
      </TestWrapper>
    )

    const textarea = screen.getByPlaceholderText('Tell us about yourself')
    expect(textarea.tagName).toBe('TEXTAREA')
  })

  it('shows validation error for short text', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <TextAreaField
          name="bio"
          label="Biography"
          placeholder="Tell us about yourself"
        />
      </TestWrapper>
    )

    const textarea = screen.getByPlaceholderText('Tell us about yourself')
    
    await user.type(textarea, 'short')
    await user.tab()

    expect(await screen.findByText('Минимум 10 символов')).toBeInTheDocument()
  })

  it('shows character count when enabled', () => {
    render(
      <TestWrapper>
        <TextAreaField
          name="bio"
          label="Biography"
          placeholder="Tell us about yourself"
          maxLength={100}
          showCount
        />
      </TestWrapper>
    )

    const countElement = document.querySelector('.ant-input-show-count')
    expect(countElement).toBeInTheDocument()
  })

  it('respects rows prop', () => {
    render(
      <TestWrapper>
        <TextAreaField
          name="bio"
          label="Biography"
          placeholder="Tell us about yourself"
          rows={6}
        />
      </TestWrapper>
    )

    const textarea = screen.getByPlaceholderText('Tell us about yourself')
    expect(textarea).toHaveAttribute('rows', '6')
  })

  it('accepts multiline text input', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <TextAreaField
          name="bio"
          label="Biography"
          placeholder="Tell us about yourself"
        />
      </TestWrapper>
    )

    const textarea = screen.getByPlaceholderText('Tell us about yourself')
    const multilineText = 'This is a long biography\nwith multiple lines\nof text content'
    
    await user.type(textarea, multilineText)
    
    expect(textarea).toHaveValue(multilineText)
  })
})