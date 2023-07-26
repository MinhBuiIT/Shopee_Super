import { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { HttpStatusCode } from 'src/contants/HttpStatus'
import { describe, expect, it,beforeEach } from 'vitest'
import { isAxiosErr, isUnprocessableEntityErr } from '../util'

describe('AxiosErr is testing', () => {
  it('AxiosErr return boolean', () => {
    expect(isAxiosErr(new Error())).toBe(false)
    expect(isAxiosErr(new AxiosError())).toBe(true)
  })
})
describe('isUnprocessableEntityErr is testing', () => {
  it('isUnprocessableEntityErr return boolean', () => {
    expect(isUnprocessableEntityErr(new Error())).toBe(false)
    expect(
      isUnprocessableEntityErr(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null,
          config: {} as InternalAxiosRequestConfig<any>,
          headers: {},
          statusText: ''
        })
      )
    ).toBe(true)
  })
  it('isUnprocessableEntityErr is InternalServerError', () => {
    expect(
      isUnprocessableEntityErr(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: undefined,
          config: {} as InternalAxiosRequestConfig<any>,
          headers: {},
          statusText: ''
        })
      )
    ).toBe(false)
  })
})
