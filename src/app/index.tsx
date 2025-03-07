import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../shared'

const Index = (): React.JSX.Element => {
    const [isReady, setIsReady] = useState(false)
    const router = useRouter()
    const { user } = useAuth()

    useEffect(() => {
        setIsReady(true)
    }, [])

    useEffect(() => {
        if (isReady) {
            if (user) {
                router.replace('/home')
            } else {
                router.replace('/auth/login')
            }
        }
    }, [isReady, user, router])

    return (
        <View>
            <Text>Loading...</Text>
        </View>
    )
}

export default Index
