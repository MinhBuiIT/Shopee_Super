type Authorization = 'User' | 'Admin'

export type User = {
  _id: string
  roles: Authorization[]
  email: string
  name?: string
  date_of_birth?: string
  avatar?: string
  address?: string
  phone?: string
  createdAt: string
  updatedAt: string
}
