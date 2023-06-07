import { Path } from 'src/contants/path'
import { AuthType } from 'src/types/Auth.type'
import { http } from 'src/utils/http'

export const registerPost = (body: { email: string; password: string }) => {
  return http.post<AuthType>(Path.register, body)
}
export const loginPost = (body: { email: string; password: string }) => {
  return http.post<AuthType>(Path.login, body)
}
export const logoutPage = () => {
  return http.post(Path.logout)
}
