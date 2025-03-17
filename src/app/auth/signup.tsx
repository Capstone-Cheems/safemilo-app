import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

const Signup = (): React.JSX.Element => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const handleSignup = async (): Promise<void> => {
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password)
            router.replace('/onboarding/onboarding')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
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
                    source={require('../../../assets/images/dark-back-button.png')}
                    style={commonStyles.backIcon}
                />
            </TouchableOpacity>

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
                onPress={() => router.replace('/auth/login')}
                style={commonStyles.link}
            >
                <Text style={commonStyles.textRow}>
                    <Text>Have an account?</Text>
                    <Text style={commonStyles.linkText}> Login</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signup
