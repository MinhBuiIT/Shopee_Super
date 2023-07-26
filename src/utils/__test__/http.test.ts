import { HttpStatusCode } from 'src/contants/HttpStatus'
import { beforeAll, describe, expect, it } from 'vitest'
import { clearAll, saveAccessTKToLC, saveRerfeshTKToLC } from '../authLocal'
import { Http, http } from '../http'

describe('Axios is testing', () => {
  const accessTK =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjAzMDAzMWFmYzJlMWExZjk2YjcyNyIsImVtYWlsIjoiam9pbjEyMzFAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0yNVQxNjo1Mjo0Ni4yMTNaIiwiaWF0IjoxNjkwMzAzOTY2LCJleHAiOjE2OTAzMDM5Njd9.EAwOssrxzBvsJ1N4fA1iZIlhwfE5kYhgqQSMvjGWXR0'
  const refreshTK =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjAzMDAzMWFmYzJlMWExZjk2YjcyNyIsImVtYWlsIjoiam9pbjEyMzFAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0yNVQxNjo1Mjo0Ni4yMTNaIiwiaWF0IjoxNjkwMzAzOTY2LCJleHAiOjE2OTAzMDc1NjZ9.1YNhm1aYV-wwg8fvs6NYR8pB9ol8Pb-gwZMAGKWK45o'
  beforeAll(() => {
    clearAll()
  })
  // nên viết độc lập
  it('Call Api', async () => {
    const res = await http.get('products')

    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Login', async () => {
    clearAll()
    const httpNew = new Http().instance
    const res = await httpNew.post('login', {
      email: 'join3121@gmail.com',
      password: '123456'
    })
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
  it('Refresh token', async () => {
    clearAll()
    saveAccessTKToLC(accessTK)
    saveRerfeshTKToLC(refreshTK)
    const httpNew = new Http().instance
    const res = await httpNew.get('me')
    expect(res.status).toBe(HttpStatusCode.Ok)
  })
})
