import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { FIREBASE_AUTH } from '../../config/firebaseConfig'
import commonStyles from '../../styles/commonStyles'

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
                        scamTypeTag: scamTypeTag
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
        <View style={commonStyles.postContainer}>
            <Text style={commonStyles.header}>Edit Scam News</Text>

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
                onPress={handleUpdate}
                disabled={loading}
            >
                <Text style={commonStyles.buttonText}>
                    {loading ? 'Updating...' : 'Update'}
                </Text>
            </TouchableOpacity>

            {/* Cancel Button */}
            <TouchableOpacity
                style={commonStyles.cancelButton}
                onPress={() => router.replace('/(organization)/createdPost')}
            >
                <Text style={commonStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    )
}

export default EditPost
