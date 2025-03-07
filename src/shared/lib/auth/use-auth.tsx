import { useContext } from 'react'
import { AuthContext, UserContextType } from './provider'

export const useAuth = (): UserContextType => {
    const context = useContext(AuthContext)

    return context
}
