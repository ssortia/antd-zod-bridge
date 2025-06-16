import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { PasswordField } from '../index'

const TestSchema = z.object({
  password: z.string().min(6, 'Минимум 6 символов')
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

describe('PasswordField', () => {
  it('renders correctly with label', () => {
    render(
      <TestWrapper>
        <PasswordField
          name="password"
          label="Password"
          placeholder="Enter password"
        />
      </TestWrapper>
    )

    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter password')).toBeInTheDocument()
  })

  it('shows required asterisk when required', () => {
    render(
      <TestWrapper>
        <PasswordField
          name="password"
          label="Password"
          required
        />
      </TestWrapper>
    )

    expect(screen.getByText('*')).toBeInTheDocument()
  })

  it('has password input type', () => {
    render(
      <TestWrapper>
        <PasswordField
          name="password"
          label="Password"
          placeholder="Enter password"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Enter password')
    expect(input).toHaveAttribute('type', 'password')
  })

  it('shows validation error for short password', async () => {
    const user = userEvent.setup()
    
    render(
      <TestWrapper>
        <PasswordField
          name="password"
          label="Password"
          placeholder="Enter password"
        />
      </TestWrapper>
    )

    const input = screen.getByPlaceholderText('Enter password')
    
    await user.type(input, '123')
    await user.tab()

    expect(await screen.findByText('Минимум 6 символов')).toBeInTheDocument()
  })

  it('has visibility toggle button', () => {
    render(
      <TestWrapper>
        <PasswordField
          name="password"
          label="Password"
          placeholder="Enter password"
        />
      </TestWrapper>
    )

    // Ant Design добавляет кнопку показать/скрыть пароль
    const toggleButton = document.querySelector('.ant-input-password-icon')
    expect(toggleButton).toBeInTheDocument()
  })
})