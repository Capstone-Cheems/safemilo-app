import React, { createContext, useState, useEffect, useMemo } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAuth, onAuthStateChanged, User } from 'firebase/auth'
import { FIREBASE_APP } from './firebase-config'

export type UserContextType = {
    logout: () => void
    isAuthenticated: boolean
    user: User | null
}

export const AuthContext = createContext<UserContextType>({} as UserContextType)

type Props = { children: React.ReactNode }

export const AuthProvider = ({ children }: Props): JSX.Element => {
    const [user, setUser] = useState<User | null>(null)
    getAuth(FIREBASE_APP)
    // Listen for authentication state changes
    useEffect(() => {
        const subscriber = onAuthStateChanged(getAuth(), async userState => {
            setUser(userState) // Update state with current user or null
            await AsyncStorage.setItem('user', JSON.stringify(userState))
        })

        return (): void => subscriber() // Cleanup the listener on unmount
    }, [])

    useEffect(() => {
        const loadAuthState = async (): Promise<void> => {
            try {
                const storedUser = await AsyncStorage.getItem('user')
                console.log('storedUser info ' + storedUser)
                if (storedUser) {
                    setUser(JSON.parse(storedUser))
                }
            } catch (error) {
                console.error('Error loading auth state:', error)
            }
        }

        loadAuthState()
    }, [])

    const logout = async (): Promise<void> => {
        setUser(null)

        await AsyncStorage.removeItem('user')
    }

    const value = useMemo(
        () => ({
            user,
            logout,
            isAuthenticated: !!user
        }),
        [user]
    )

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
