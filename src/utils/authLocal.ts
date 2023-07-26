import { User } from 'src/types/User.type'

const event = new Event('clearAll')
export const getAccessTKFromLC = () => {
  return localStorage.getItem('access_token')
}
export const getRefreshTKFromLC = () => {
  return localStorage.getItem('refresh_token')
}
export const saveAccessTKToLC = (param: string) => {
  localStorage.setItem('access_token', param)
}
export const saveRerfeshTKToLC = (param: string) => {
  localStorage.setItem('refresh_token', param)
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
export const clearAll = () => {
  document.dispatchEvent(event)
  localStorage.removeItem('user')
  localStorage.removeItem('access_token')
  localStorage.removeItem('refesh_token')
}
