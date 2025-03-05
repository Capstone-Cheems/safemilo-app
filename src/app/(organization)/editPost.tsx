import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FIREBASE_AUTH } from '../../config/firebaseConfig'

const EditPost = (): React.JSX.Element => {
    const router = useRouter()
    const {
        newsID,
        title: initialTitle,
        content: initialContent,
        scamTypeTag: initialScamTypeTag
    } = useLocalSearchParams<{
        newsID: string
        title: string
        content: string
        scamTypeTag: string
    }>()

    const [title, setTitle] = useState(initialTitle || '')
    const [content, setContent] = useState(initialContent || '')
    const [scamTypeTag, setScamTypeTag] = useState(initialScamTypeTag || '')
    const [loading, setLoading] = useState(false)

    const handleUpdate = async (): Promise<void> => {
        if (!title || !content || !scamTypeTag) {
            Alert.alert('Error', 'All fields are required')
            return
        }

        try {
            setLoading(true)
            const token = await FIREBASE_AUTH.currentUser?.getIdToken()

            const response = await fetch(
                `http://34.235.29.56:8080/news/${newsID}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        scamTypeTags: scamTypeTag
                    })
                }
            )

            if (!response.ok) {
                throw new Error('Failed to update scam news')
            }

            Alert.alert('Success', 'Scam news updated successfully!')
            router.replace('/(organization)/createdPost')
        } catch (error) {
            console.error('Error updating scam news:', error)
            Alert.alert(
                'Error',
                'Failed to update scam news. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit Scam News</Text>

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
                onPress={handleUpdate}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Updating...' : 'Update'}
                </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => router.replace('/(organization)/createdPost')}
            >
                <Text style={styles.cancelButtonText}>Cancel</Text>
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
    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#007AFF'
    }
})

export default EditPost
