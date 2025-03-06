import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useAuth } from '../../contexts/AuthContext'
import { FIREBASE_AUTH } from '../../config/firebaseConfig'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

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
        <View style={commonStyles.postContainer}>
            <Text style={commonStyles.header}>Create Scam News</Text>

            <TextInput
                style={commonStyles.postInput}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={commonStyles.postInput}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
                numberOfLines={4}
            />
            <TextInput
                style={commonStyles.postInput}
                placeholder="Scam Type Tag (e.g. Phishing, Fraud)"
                value={scamTypeTag}
                onChangeText={setScamTypeTag}
            />

            <TouchableOpacity
                style={[
                    commonStyles.button,
                    loading && commonStyles.buttonDisabled
                ]}
                onPress={handleSubmit}
                disabled={loading}
            >
                <Text style={commonStyles.buttonText}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewPost
