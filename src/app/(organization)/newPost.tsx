import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
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

        console.log('Submitting Post with the following data:')
        console.log('Organization ID:', user?.uid)
        console.log('Title:', title)
        console.log('Content:', content)
        console.log('Scam Type Tags:', scamTypeTag)
        console.log('Images:', uploadedImageUrls)

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
                    content,
                    scamTypeTags: scamTypeTag,
                    images: uploadedImageUrls
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

    const renderImageItem = ({
        item,
        index
    }: {
        item: string | null
        index: number
    }): React.JSX.Element => {
        if (item === null) {
            return (
                <TouchableOpacity
                    onPress={pickImages}
                    style={{
                        width: IMAGE_SIZE,
                        height: IMAGE_SIZE,
                        margin: 4,
                        backgroundColor: '#ffffff',
                        borderRadius: 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#ffffff'
                    }}
                >
                    <Text style={{ fontSize: 36, color: '#0d1b2a' }}>+</Text>
                </TouchableOpacity>
            )
        }

        return (
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

                {/* Remove Button */}
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: [{ translateX: -25 }, { translateY: -20 }],
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
        )
    }

    const handleAutoFill = (): void => {
        setTitle('Warn of Extortion Scam')
        setContent(
            'The Canadian Anti-Fraud Centre is receiving reports of extortion letters being sent by email. The extortion letters have your full name, personal telephone number, personal residential address and a screenshot from search engines. The letter claims that you have visited explicit websites and threatens to send a copy of a video to your contact list unless you pay them using cryptocurrency. Some letters may also use a QR Code. This is a scam! Do not send money under pressure and do not repy to threatening messages. Report it to your local police.'
        )
        setScamTypeTag('Fraud, Extortion')
    }

    return (
        <FlatList
            data={['form']}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => (
                <View style={commonStyles.postContainer}>
                    <Text style={commonStyles.header}>Create a Post</Text>

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

                    {/* Image Gallery */}
                    <FlatList
                        data={[...images, null]}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'flex-start' }}
                        renderItem={renderImageItem}
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

                    <TouchableOpacity
                        style={commonStyles.cancelButton}
                        onPress={() =>
                            router.replace('/(organization)/createdPost')
                        }
                    >
                        <Text style={commonStyles.cancelButtonText}>
                            Discard
                        </Text>
                    </TouchableOpacity>

                    {/* Hidden Auto-Fill Button */}
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            opacity: 0.2
                        }}
                        onPress={handleAutoFill}
                    >
                        <Text style={{ color: '#FFFFFF' }}>Auto-Fill</Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    )
}

export default NewPost
