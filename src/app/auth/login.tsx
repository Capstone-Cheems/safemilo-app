import React, { useLayoutEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import {
    getAuth,
    signInWithEmailAndPassword
} from '@react-native-firebase/auth'

const Login = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false) // To track loading state

    // Basic email validation
    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(email)
    }

    const handleLogin = async (): Promise<void> => {
        if (!email || !password) {
            setError('Email and password are required')
            return
        }

        if (!isValidEmail(email)) {
            setError('Please enter a valid email address')
            return
        }

        setError('') // Clear previous error
        setLoading(true)

        try {
            await signInWithEmailAndPassword(getAuth(), email, password)
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || 'Login failed. Please try again.')
            } else {
                setError('An unexpected error occurred.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Login</Text>

            <TextInput
                style={commonStyles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />

            <TextInput
                style={commonStyles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            {error && <Text style={commonStyles.errorText}>{error}</Text>}

            <TouchableOpacity
                onPress={handleLogin}
                style={commonStyles.formButton}
                disabled={loading} // Disable button while loading
            >
                {loading ? (
                    <ActivityIndicator color="white" /> // Show loader while processing
                ) : (
                    <Text style={commonStyles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.replace('/auth/signup')}
                style={commonStyles.link}
            >
                <Text style={commonStyles.textRow}>
                    <Text>Don't have an account?</Text>
                    <Text style={commonStyles.linkText}> Sign up</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={commonStyles.longButton}>
                <Text style={commonStyles.buttonText}>Continue with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={commonStyles.longButton}>
                <Text style={commonStyles.buttonText}>
                    Continue with Google
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.replace('/auth/loginOrganization')}
                style={commonStyles.link}
            >
                <Text style={commonStyles.textRow}>
                    <Text>Organizational User?</Text>
                    <Text style={commonStyles.linkText}> Click here</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login
