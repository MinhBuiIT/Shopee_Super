import { createContext, useState } from 'react'
import { User } from 'src/types/User.type'
import { getAccessTKFromLC, getUserFromLC } from 'src/utils/authLocal'

interface AuthContextType {
  isAuthentication: boolean
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}
const initialContext: AuthContextType = {
  isAuthentication: Boolean(getAccessTKFromLC()),
  setIsAuthentication: () => null,
  profile: getUserFromLC(),
  setProfile: () => null
}

export const AuthConext = createContext<AuthContextType>(initialContext)

export default function AppContextAuth({ children }: { children: React.ReactNode }) {
  const [isAuthentication, setIsAuthentication] = useState<boolean>(Boolean(getAccessTKFromLC()))
  const [profile, setProfile] = useState<User | null>(initialContext.profile)
  return (
    <AuthConext.Provider value={{ isAuthentication, setIsAuthentication, profile, setProfile }}>
      {children}
    </AuthConext.Provider>
  )
}
