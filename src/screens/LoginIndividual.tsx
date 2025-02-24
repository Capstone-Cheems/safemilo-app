import React, { useState } from 'react'
import {
    View,
    TextInput,
    ActivityIndicator,
    Button,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../types/types'

interface Props {
    navigation: NavigationProp<RootStackParamList, 'LoginIndividual'>
}

const LoginIndividual = ({ navigation }: Props): React.JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH

    const signIn = async (): Promise<void> => {
        setLoading(true)
        try {
            const response = await signInWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = response.user

            await fetch('http://localhost:3000/auth/login/individual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: user.email
                })
            })

            console.log('User logged in:', user)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error)
                alert('Sign-in failed')
            } else {
                console.error('Unexpected error:', error)
                alert('Sign-in failed: An unexpected error occurred')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    value={email}
                    style={styles.input}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    secureTextEntry
                    value={password}
                    style={styles.input}
                    placeholder="Password"
                    autoCapitalize="none"
                    onChangeText={text => setPassword(text)}
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button title="Login" onPress={signIn} />
                )}
                <View style={styles.row}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignupIndividual')}
                    >
                        <Text style={styles.textLink}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <Text>Orgnaizational User?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.textLink}>Click here</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginIndividual

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 20
    },
    textLink: {
        textAlign: 'center',
        color: '#007BFF',
        fontWeight: 'bold'
    }
})
