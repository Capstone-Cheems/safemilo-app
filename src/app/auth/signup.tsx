import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../config/firebaseConfig'

const Signup = (): React.JSX.Element => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const auth = FIREBASE_AUTH

    const handleSignup = async (): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            router.replace('/onboarding/onboarding')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Sign Up</Text>

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
                onPress={handleSignup}
                style={commonStyles.formButton}
            >
                <Text style={commonStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.replace('/auth/login')}
                style={commonStyles.link}
            >
                <Text style={commonStyles.textRow}>
                    <Text>Already have an account?</Text>
                    <Text style={commonStyles.linkText}> Login</Text>
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.replace('/auth/signupOrganization')}
                style={commonStyles.link}
            >
                <Text style={commonStyles.textRow}>
                    <Text>Orgnaizational User?</Text>
                    <Text style={commonStyles.linkText}> Click here</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signup
