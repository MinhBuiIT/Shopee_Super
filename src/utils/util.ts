import axios, { AxiosError } from 'axios'
import { HttpStatusCode } from 'src/contants/HttpStatus'

export const isAxiosErr = <T>(error: unknown): error is AxiosError<T> => {
  // eslint-disable-next-line import/no-named-as-default-member
  return axios.isAxiosError(error)
}
export const isUnprocessableEntityErr = <T>(error: unknown): error is AxiosError<T> => {
  return isAxiosErr(error) && error.response?.status === HttpStatusCode.UnprocessableEntity
}
