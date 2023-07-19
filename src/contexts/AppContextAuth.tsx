import { createContext, useState } from 'react'
import { User } from 'src/types/User.type'
import { getAccessTKFromLC, getUserFromLC } from 'src/utils/authLocal'

interface AuthContextType {
  isAuthentication: boolean
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  reset: () => void
}
const initialContext: AuthContextType = {
  isAuthentication: Boolean(getAccessTKFromLC()),
  setIsAuthentication: () => null,
  profile: getUserFromLC(),
  setProfile: () => null,
  reset: () => null
}

export const AuthConext = createContext<AuthContextType>(initialContext)

export default function AppContextAuth({ children }: { children: React.ReactNode }) {
  const [isAuthentication, setIsAuthentication] = useState<boolean>(Boolean(getAccessTKFromLC()))
  const [profile, setProfile] = useState<User | null>(initialContext.profile)
  const reset = () => {
    setProfile(null)
    setIsAuthentication(false)
  }
  return (
    <AuthConext.Provider value={{ isAuthentication, setIsAuthentication, profile, setProfile, reset }}>
      {children}
    </AuthConext.Provider>
  )
}
