import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ActivityIndicator,
    Alert
} from 'react-native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

const NewPost = (): React.JSX.Element => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [scamTypeTags, setScamTypeTags] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (): Promise<void> => {
        setLoading(true)

        try {
            const user = FIREBASE_AUTH.currentUser

            if (!user) {
                Alert.alert('Error', 'User is not logged in')
                return
            }

            const response = await fetch('http://192.168.1.97:3000/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    organizationID: user.uid,
                    title,
                    content,
                    scamTypeTags: scamTypeTags.split(',').map(tag => tag.trim())
                })
            })

            if (response.ok) {
                Alert.alert('Success', 'Scam news created successfully!')
                setTitle('')
                setContent('')
                setScamTypeTags('')
            } else {
                const errorData = await response.json()
                Alert.alert(
                    'Error',
                    errorData.message || 'Failed to create scam news'
                )
            }
        } catch (error) {
            console.error('Error:', error)
            Alert.alert('Error', 'Network request failed')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create New Scam News</Text>

            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={[styles.input, { height: 100 }]}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
                multiline
            />

            <TextInput
                style={styles.input}
                placeholder="Scam Type Tags (comma separated)"
                value={scamTypeTags}
                onChangeText={setScamTypeTags}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Button title="Submit" onPress={handleSubmit} />
            )}
        </View>
    )
}

export default NewPost

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff'
    }
})
