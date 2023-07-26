import matchers from '@testing-library/jest-dom/matchers'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import App from './App'

expect.extend(matchers)
describe('App is testing', () => {
  render(<App />, { wrapper: BrowserRouter })
  test('App render', async () => {
    await waitFor(
      () => {
        expect(screen.getByRole('link', { name: /đăng nhập/i }))
      },
      { timeout: 2000 }
    )
    const user = userEvent.setup()
    await user.click(screen.getByRole('link', { name: /đăng nhập/i }))
    await waitFor(
      async () => {
        // await screen
        //   .findByRole('heading', { name: /đăng nhập/i })
        //   .then(($value) => expect(/đăng nhập/i.test($value.textContent || '')).toBe(true))
        expect(document.querySelector('title')?.textContent).toBe('Login')
      },
      { timeout: 2000 }
    )
    // screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })

  test('No Match', async () => {
    const badroute = '/abc/dna'
    render(
      <MemoryRouter initialEntries={[badroute]}>
        <App />
      </MemoryRouter>
    )
    await waitFor(
      () => {
        expect(document.querySelector('title')?.textContent).toBe('404 Not Found')
      },
      { timeout: 2000 }
    )
    screen.debug(document.body.parentElement as HTMLElement, 99999999)
  })
})
