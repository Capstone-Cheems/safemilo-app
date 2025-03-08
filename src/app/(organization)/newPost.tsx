import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import { useAuth } from '@/src/shared'

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
            const token = user?.getIdToken()
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

    const handleAutoFill = (): void => {
        setTitle('Warn of Extortion Scam')
        setContent(
            'The Canadian Anti-Fraud Centre is receiving reports of extortion letters being sent by email. The extortion letters have your full name, personal telephone number, personal residential address and a screenshot from search engines. The letter claims that you have visited explicit websites and threatens to send a copy of a video to your contact list unless you pay them using cryptocurrency. Some letters may also use a QR Code. This is a scam! Do not send money under pressure and do not repy to threatening messages. Report it to your local police.'
        )
        setScamTypeTag('Fraud, Extortion')
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

            {/* Hidden Auto-Fill Button */}
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    opacity: 0.2
                }}
                onPress={handleAutoFill}
            >
                <Text style={{ color: '#FFFFFF' }}>Auto-Fill</Text>
            </TouchableOpacity>
        </View>
    )
}

export default NewPost
