import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native'
import { useAuth } from '../../contexts/AuthContext'
import { FIREBASE_AUTH } from '../../config/firebaseConfig'
import { useRouter } from 'expo-router'

const NewPost = (): React.JSX.Element => {
    const { user } = useAuth()
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [scamTypeTag, setScamTypeTag] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (): Promise<void> => {
        if (!title || !content || !scamTypeTag) {
            Alert.alert('Error', 'All fields are required')
            return
        }

        try {
            setLoading(true)
            const token = await FIREBASE_AUTH.currentUser?.getIdToken()
            const response = await fetch(`http://34.235.29.56:8080/news/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    organizationID: user?.uid,
                    title,
                    content,
                    scamTypeTags: scamTypeTag
                })
            })

            if (!response.ok) {
                throw new Error('Failed to create scam news')
            }

            Alert.alert('Success', 'Scam news report created successfully!')
            router.replace('/(organization)/createdPost')
        } catch (error) {
            console.error('Error creating scam news:', error)
            Alert.alert(
                'Error',
                'Failed to create scam news. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Scam News</Text>

            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={4}
            />
            <TextInput
                style={styles.input}
                placeholder="Scam Type Tag (e.g. Phishing, Fraud)"
                value={scamTypeTag}
                onChangeText={setScamTypeTag}
            />

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    button: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonDisabled: {
        backgroundColor: 'gray'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
})

export default NewPost
