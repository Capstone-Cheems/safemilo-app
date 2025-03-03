import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { useAuth } from '../../contexts/AuthContext'
import commonStyles from '../../styles/commonStyles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../config/firebaseConfig'

const Login = (): React.JSX.Element => {
    const router = useRouter()
    const { login } = useAuth()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const auth = FIREBASE_AUTH

    const handleLogin = async (): Promise<void> => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = userCredential.user
            const token = await user.getIdToken()

            login(user, token)

            router.replace('/onboarding/onboarding')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
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
            >
                <Text style={commonStyles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.replace('/auth/signup')}
                style={commonStyles.link}
            >
                <Text style={commonStyles.textContainer}>
                    <Text>Don't have an account?</Text>
                    <Text style={commonStyles.linkText}> Sign up</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login
