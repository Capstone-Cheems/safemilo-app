import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    FlatList,
    Dimensions
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import { useAuth } from '@/src/shared'
import Constants from 'expo-constants'

const S3_BUCKET_URL = Constants.expoConfig?.extra?.S3_IMAGE_URL ?? ''
const SCREEN_WIDTH = Dimensions.get('window').width
const IMAGE_SIZE = (SCREEN_WIDTH - 48) / 3

const NewPost = (): React.JSX.Element => {
    const { user } = useAuth()
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [scamTypeTag, setScamTypeTag] = useState('')
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<string[]>([])

    const pickImages = async (): Promise<void> => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.8
        })

        if (!result.canceled && result.assets.length > 0) {
            const selectedImages = result.assets.map(asset => asset.uri)
            setImages(prevImages => [...prevImages, ...selectedImages])
        }
    }

    const handleRemoveImage = (index: number): void => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index))
    }

    const uploadImagesToS3 = async (): Promise<string[]> => {
        const uploadedUrls: string[] = []

        for (const uri of images) {
            try {
                const response = await fetch(uri)
                const blob = await response.blob()

                const filename = `scam-news-${Date.now()}-${Math.random()
                    .toString(36)
                    .substring(7)}.jpg`
                const uploadUrl = `${S3_BUCKET_URL}${filename}`

                const uploadResponse = await fetch(uploadUrl, {
                    method: 'PUT',
                    body: blob,
                    headers: {
                        'Content-Type': 'image/jpeg'
                    }
                })

                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload image')
                }

                uploadedUrls.push(uploadUrl)
            } catch (error) {
                console.error('Image upload error:', error)
            }
        }

        return uploadedUrls
    }

    const handleSubmit = async (): Promise<void> => {
        if (!title || !content || !scamTypeTag) {
            Alert.alert('Error', 'All fields are required')
            return
        }

        setLoading(true)

        let uploadedImageUrls: string[] = []
        if (images.length > 0) {
            uploadedImageUrls = await uploadImagesToS3()
        }

        const finalContent =
            uploadedImageUrls.length > 0
                ? `${content}\n\nImages:\n${uploadedImageUrls.join('\n')}`
                : content

        try {
            const token = await user?.getIdToken()
            const response = await fetch(`http://34.235.29.56:8080/news/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    organizationID: user?.uid,
                    title,
                    content: finalContent,
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
        <ScrollView contentContainerStyle={commonStyles.postContainer}>
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
                style={commonStyles.button}
                onPress={pickImages}
                disabled={loading}
            >
                <Text style={commonStyles.buttonText}>
                    {images.length > 0 ? 'Add More Images' : 'Select Images'}
                </Text>
            </TouchableOpacity>

            {images.length > 0 && (
                <FlatList
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    style={{ marginTop: 10, maxHeight: 248 }}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                width: IMAGE_SIZE,
                                height: IMAGE_SIZE,
                                margin: 4,
                                alignItems: 'center',
                                position: 'relative'
                            }}
                        >
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: IMAGE_SIZE,
                                    height: IMAGE_SIZE,
                                    borderRadius: 8
                                }}
                            />

                            <TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: [
                                        { translateX: -25 },
                                        { translateY: -20 }
                                    ],
                                    backgroundColor: 'rgba(0,0,0,0.6)',
                                    paddingVertical: 8,
                                    paddingHorizontal: 15,
                                    borderRadius: 20
                                }}
                                onPress={() => handleRemoveImage(index)}
                            >
                                <Image
                                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                                    source={require('@/assets/images/light-trash-icon.png')}
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: '#fff'
                                    }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}

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
        </ScrollView>
    )
}

export default NewPost
