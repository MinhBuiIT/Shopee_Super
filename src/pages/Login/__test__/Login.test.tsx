import matchers from '@testing-library/jest-dom/matchers'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from 'src/App'
import { renderWithRouter } from 'src/utils/__test__/test.until'
import { describe, expect, test } from 'vitest'

expect.extend(matchers)

describe('Login is testing', () => {
  test('Login', async () => {
    const { user } = renderWithRouter(<App />, { route: '/login' })
    await waitFor(
      () => {
        expect(screen.getByRole('button', { name: /đăng nhập/i })).toBeTruthy()
      },
      { timeout: 2000 }
    )
    await user.click(screen.getByRole('button', { name: /đăng nhập/i }))
    expect(screen.getByText('Vui lòng nhập Email')).toBeInTheDocument()
    expect(screen.getByText('Vui lòng nhập mật khẩu')).toBeInTheDocument()
    // screen.debug(document.body.parentElement as HTMLElement, 9999999)
  })
  test('Login fail one field', async () => {
    await waitFor(
      () => {
        expect(screen.getByText('Bạn cần giúp đỡ ?')).toBeInTheDocument()
      },
      { timeout: 2000 }
    )
    const user = userEvent.setup()
    await user.type(screen.getByPlaceholderText(/email/i), 'join')
    await user.type(screen.getByPlaceholderText(/mật khẩu/i), '111')
    await user.click(screen.getByRole('button', { name: /đăng nhập/i }))
    expect(screen.getByText('Nhập email đúng định dạng')).toBeInTheDocument()
    expect(screen.getByText('Nhập từ 6 - 160 ký tự')).toBeInTheDocument()
    screen.debug(document.body.parentElement as HTMLElement, 9999999)
  })
})
