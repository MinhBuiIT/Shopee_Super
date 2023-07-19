import { Path } from 'src/contants/path'
import { AuthType } from 'src/types/Auth.type'
import { http } from 'src/utils/http'

const authApi = {
  registerPost: (body: { email: string; password: string }) => {
    return http.post<AuthType>(Path.register, body)
  },
  loginPost: (body: { email: string; password: string }) => {
    return http.post<AuthType>(Path.login, body)
  },
  logoutPage: () => {
    return http.post(Path.logout)
  }
}
export default authApi
