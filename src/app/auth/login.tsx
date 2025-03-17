import React, { useLayoutEffect, useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    Image
} from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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

            router.replace('/')
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

    const handleBack = (): void => {
        router.replace('/welcome')
    }

    return (
        <View style={commonStyles.authContainer}>
            <TouchableOpacity
                style={commonStyles.backButton}
                onPress={handleBack}
            >
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/raw-circle-arrow-left.png')}
                    style={commonStyles.backIcon}
                />
            </TouchableOpacity>

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

            <View style={commonStyles.dividerContainer}>
                <View style={commonStyles.dividerLine} />
                <Text style={commonStyles.dividerText}>or</Text>
                <View style={commonStyles.dividerLine} />
            </View>

            <TouchableOpacity style={commonStyles.longButtonWhite}>
                <View style={commonStyles.iconButtonContainer}>
                    <Text style={commonStyles.buttonTextWhite}>
                        Continue with
                    </Text>
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/Google-icon.png')}
                        style={commonStyles.googleIcon}
                    />
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={commonStyles.longButton}>
                <View style={commonStyles.iconButtonContainer}>
                    <Text style={commonStyles.buttonText}>Continue with</Text>
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/light-Apple-icon.png')}
                        style={commonStyles.appleIcon}
                    />
                </View>
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
        </View>
    )
}

export default Login
