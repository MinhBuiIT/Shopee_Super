import { User } from 'src/types/User.type'

export const getAccessTKFromLC = () => {
  return localStorage.getItem('access_token')
}
export const saveAccessTKToLC = (param: string) => {
  localStorage.setItem('access_token', param)
}
export const saveUserTKToLC = (param: string) => {
  localStorage.setItem('user', param)
}
export const getUserFromLC = (): User | null => {
  const user = localStorage.getItem('user')
  if (user) {
    return JSON.parse(user)
  } else return null
}
export const clearKeyLC = (key: string) => {
  localStorage.removeItem(key)
}
