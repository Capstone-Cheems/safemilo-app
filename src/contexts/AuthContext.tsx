import React, { createContext, useState, useContext } from 'react'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<any>(null)

export const AuthProvider = ({
    children
}: {
    children: React.ReactNode
}): React.JSX.Element => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    const login = (userData: FirebaseAuthTypes.User, token: string): void => {
        setUser(userData)
        setToken(token)
    }

    const logout = (): void => {
        setUser(null)
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAuth = (): any => {
    return useContext(AuthContext)
}
