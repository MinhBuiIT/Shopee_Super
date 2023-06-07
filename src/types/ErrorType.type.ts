import { ResponseType } from './Response.type'
import { ResYup } from 'src/utils/rules'
type ErrorData = {
  [key in keyof Omit<ResYup, 'confirmPassword'>]: string
}
export type ErrorType = ResponseType<ErrorData>
