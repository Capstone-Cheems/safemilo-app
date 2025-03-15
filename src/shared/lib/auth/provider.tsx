import React, { createContext, useState, useEffect, useMemo } from 'react'
import { FirebaseAuthTypes, getAuth } from '@react-native-firebase/auth'
import { useRouter } from 'expo-router'
import { NativeModules } from 'react-native'
export type UserContextType = {
    logout: () => void
    isAuthenticated: boolean
    user: FirebaseAuthTypes.User | null
}

export const AuthContext = createContext<UserContextType>({} as UserContextType)

type Props = { children: React.ReactNode }

const { CustomModule } = NativeModules

export const AuthProvider = ({ children }: Props): JSX.Element => {
    const router = useRouter()
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

    // Listen for authentication state changes
    useEffect(() => {
        const subscriber = getAuth().onAuthStateChanged(async user => {
            console.log('User Check')
            setUser(user)
            if (user) {
                const token = await getAuth().currentUser?.getIdToken()
                CustomModule.setToken(token)
                router.replace('/home')
            } else {
                CustomModule.setToken('')
                router.replace('/auth/login')
            }
        })
        return (): void => subscriber() // Cleanup the listener on unmount
    }, [router])

    const logout = async (): Promise<void> => {
        setUser(null)
        getAuth().signOut()
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
