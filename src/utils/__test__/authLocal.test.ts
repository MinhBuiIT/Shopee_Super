import { describe, expect, it } from 'vitest'
import { clearKeyLC, getAccessTKFromLC, getRefreshTKFromLC, saveAccessTKToLC, saveRerfeshTKToLC } from '../authLocal'

const accessTK =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjdiNDU3MzQyZWQ2MjNlYzgzZWFkYyIsImVtYWlsIjoiam9pbjMxMjFAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0yM1QwMjoyMjo1NS4zMzdaIiwiaWF0IjoxNjkwMDc4OTc1LCJleHAiOjE2OTA2ODM3NzV9.FrQHGLQ0Bycqdo4Vo8YIPkjBtKxQOmfu0vjB_Dfp-UU'
const refreshTK =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjdiNDU3MzQyZWQ2MjNlYzgzZWFkYyIsImVtYWlsIjoiam9pbjMxMjFAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyMy0wNy0yM1QwMjoyMjo1NS4zMzdaIiwiaWF0IjoxNjkwMDc4OTc1LCJleHAiOjE2OTg3MTg5NzV9.w9tkHGD9K1rrG2Ul3i3zeTKPMhXIbXreG0s-PghoB_U'
describe('set or get accessTK is testing', () => {
  it('AccessTK is setted or getted', () => {
    saveAccessTKToLC(accessTK)
    expect(getAccessTKFromLC()).toBe(accessTK)
  })
})
describe('set or get refreshTK is testing', () => {
  it('AccessTK is setted or getted', () => {
    saveRerfeshTKToLC(refreshTK)
    expect(getRefreshTKFromLC()).toBe(refreshTK)
  })
})
describe('clear local is testing', () => {
  it('Clear is accessTK and refreshTK', () => {
    saveAccessTKToLC(accessTK)
    saveRerfeshTKToLC(refreshTK)
    clearKeyLC('refresh_token')
    clearKeyLC('access_token')
    expect({ ATK: getAccessTKFromLC(), RTK: getRefreshTKFromLC() }).toStrictEqual({ ATK: null, RTK: null })
  })
})
