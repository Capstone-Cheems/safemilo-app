import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword
} from 'firebase/auth'

type AuthFormProps = {
    type: 'signup' | 'login'
}

const AuthForm = ({ type }: AuthFormProps): React.JSX.Element => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const handleAuth = async (): Promise<void> => {
        try {
            if (type === 'signup') {
                await createUserWithEmailAndPassword(getAuth(), email, password)
            } else {
                await signInWithEmailAndPassword(getAuth(), email, password)
            }

            router.replace('/(organization)/createdPost')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>
                {type === 'signup' ? 'Sign Up' : 'Login'} as Organization
            </Text>

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
                onPress={handleAuth}
                style={commonStyles.formButton}
            >
                <Text style={commonStyles.buttonText}>
                    {type === 'signup' ? 'Sign Up' : 'Login'}
                </Text>
            </TouchableOpacity>

            {type === 'signup' ? (
                <TouchableOpacity
                    onPress={() => router.replace(`/auth/login`)}
                    style={commonStyles.link}
                >
                    <Text style={commonStyles.textRow}>
                        <Text>Already have an account?</Text>
                        <Text style={commonStyles.linkText}> Login</Text>
                    </Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => router.replace(`/auth/signup`)}
                    style={commonStyles.link}
                >
                    <Text style={commonStyles.textRow}>
                        <Text>Don't have an account?</Text>
                        <Text style={commonStyles.linkText}> Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    )
}

export default AuthForm
