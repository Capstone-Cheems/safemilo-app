import {
    View,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    Button,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity
} from 'react-native'
import React, { useState } from 'react'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../types/types'

interface Props {
    navigation: NavigationProp<RootStackParamList, 'Signup'>
}

const Signup = ({ navigation }: Props): React.JSX.Element => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [organizationName, setOrganizationName] = useState('')
    const [loading, setLoading] = useState(false)
    const auth = FIREBASE_AUTH

    const signUp = async (): Promise<void> => {
        setLoading(true)
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )
            const user = response.user

            await fetch('http://localhost:3000/auth/register/organization', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userID: user.uid,
                    email: user.email,
                    organizationName: organizationName
                })
            })

            console.log('User registered:', user)
        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                console.error(error)
                alert('Sign-up failed')
            } else {
                console.error('Unexpected error:', error)
                alert('Sign-up failed: An unexpected error occurred')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding">
                <TextInput
                    value={organizationName}
                    style={styles.input}
                    placeholder="Organization Name"
                    autoCapitalize="words"
                    onChangeText={text => setOrganizationName(text)}
                />
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
                    <Button title="Create account" onPress={signUp} />
                )}
                <View style={styles.row}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.textLink}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Signup

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
