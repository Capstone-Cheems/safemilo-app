import React, { createContext, useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
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

    useEffect(() => {
        const loadAuthState = async (): Promise<void> => {
            try {
                const storedUser = await AsyncStorage.getItem('user')
                const storedToken = await AsyncStorage.getItem('token')

                if (storedUser && storedToken) {
                    setUser(JSON.parse(storedUser))
                    setToken(storedToken)
                }
            } catch (error) {
                console.error('Error loading auth state:', error)
            }
        }

        loadAuthState()
    }, [])

    const login = async (
        userData: FirebaseAuthTypes.User,
        token: string
    ): Promise<void> => {
        setUser(userData)
        setToken(token)

        // Store userID and token persistently
        await AsyncStorage.setItem('user', JSON.stringify(userData))
        await AsyncStorage.setItem('token', token)
    }

    const logout = async (): Promise<void> => {
        setUser(null)
        setToken(null)

        await AsyncStorage.removeItem('user')
        await AsyncStorage.removeItem('token')
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
