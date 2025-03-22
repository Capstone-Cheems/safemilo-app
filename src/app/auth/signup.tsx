import React, { useLayoutEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import {
    createUserWithEmailAndPassword,
    getAuth,
    updateProfile
} from '@react-native-firebase/auth'

const Signup = (): React.JSX.Element => {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState('')
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const handleSignup = async (): Promise<void> => {
        try {
             const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password)
            const user = userCredential.user
            await updateProfile(user, { displayName })
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

            <View style={commonStyles.authInputContainer}>
                <Text style={commonStyles.authInputLabel}>Your Name</Text>
                <TextInput
                    style={commonStyles.input}
                    placeholder="Your Name"
                    value={displayName}
                    onChangeText={setDisplayName}
                    autoCapitalize="words"
                />
            </View>

            <View style={commonStyles.authInputContainer}>
                <Text style={commonStyles.authInputLabel}>Your Email</Text>
                <TextInput
                    style={commonStyles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>

            <View style={commonStyles.authInputContainer}>
                <Text style={commonStyles.authInputLabel}>Your Password</Text>
                <TextInput
                    style={commonStyles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

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
