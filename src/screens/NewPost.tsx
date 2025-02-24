import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    ActivityIndicator,
    Alert,
    FlatList,
    TouchableOpacity
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

const NewPost = (): React.JSX.Element => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [scamTypeTags, setScamTypeTags] = useState('')
    const [images, setImages] = useState<DocumentPicker.DocumentPickerAsset[]>(
        []
    )
    const [loading, setLoading] = useState(false)

    const handleImageUpload = async (): Promise<void> => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: 'image/*',
                multiple: true,
                copyToCacheDirectory: false
            })

            if (result.canceled || !result.assets) return

            const newImages = result.assets.map(asset => ({
                name: asset.name || 'Unnamed file',
                uri: asset.uri,
                type: asset.mimeType || 'image/jpeg'
            }))

            setImages(prevImages => [...prevImages, ...newImages])
        } catch (error) {
            console.error('Image upload error:', error)
            Alert.alert('Error', 'Failed to select image')
        }
    }

    const handleImageDelete = (index: number): void => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    const handleSubmit = async (): Promise<void> => {
        setLoading(true)

        try {
            const user = FIREBASE_AUTH.currentUser

            if (!user) {
                Alert.alert('Error', 'User is not logged in')
                return
            }

            console.log('Selected images:', images)

            const response = await fetch('http://localhost:3000/news', {
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
                setImages([])
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

            {/* Image Upload Button */}
            <Button title="Select Images" onPress={handleImageUpload} />

            {/* Display Selected Images */}
            {images.length > 0 && (
                <View style={styles.imageListContainer}>
                    <FlatList
                        data={images}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.imageItem}>
                                <Text style={styles.imageName}>
                                    {item.name}
                                </Text>
                                <TouchableOpacity
                                    onPress={() => handleImageDelete(index)}
                                    style={styles.deleteButton}
                                >
                                    <Text style={styles.deleteButtonText}>
                                        Delete
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </View>
            )}

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
    },
    imageListContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    imageItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 5,
        backgroundColor: '#f9f9f9'
    },
    imageName: {
        fontSize: 16,
        color: '#333'
    },
    deleteButton: {
        backgroundColor: '#FF5733',
        borderRadius: 5,
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    deleteButtonText: {
        color: '#fff',
        fontWeight: 'bold'
    }
})
