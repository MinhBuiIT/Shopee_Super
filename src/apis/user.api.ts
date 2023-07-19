import { ResponseType } from 'src/types/Response.type'
import { User } from 'src/types/User.type'
import { http } from 'src/utils/http'

export interface UserUpdateType extends Pick<User, 'name' | 'phone' | 'address' | 'date_of_birth' | 'avatar'> {
  password?: string
  new_password?: string
}
const userApi = {
  getMe: () => {
    return http.get<ResponseType<User>>('/me')
  },
  updateMe: (body: UserUpdateType) => {
    return http.put<ResponseType<User>>('/me', body)
  },
  uploadAvatar: (body: FormData) => {
    return http.post<ResponseType<string>>('/user/upload-avatar', body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
export default userApi
