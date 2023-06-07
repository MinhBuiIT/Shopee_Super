import { ResponseType } from './Response.type'
import { User } from './User.type'

export type AuthType = ResponseType<{
  access_token: string
  expires: number
  refresh_token: string
  expires_refresh_token: number
  user: User
}>
