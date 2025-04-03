import React, { useLayoutEffect, useState } from 'react'
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
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../../styles/commonStyles'
import { useAuth } from '@/src/shared'
import Constants from 'expo-constants'

const S3_BUCKET_URL = Constants.expoConfig?.extra?.S3_IMAGE_URL ?? ''
const SCREEN_WIDTH = Dimensions.get('window').width
const IMAGE_SIZE = (SCREEN_WIDTH - 48) / 3

const EditPost = (): React.JSX.Element => {
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Edit Post' })
    }, [navigation])
    const router = useRouter()
    const { user } = useAuth()
    const {
        newsID,
        title: initialTitle,
        content: initialContent,
        scamTypeTag: initialScamTypeTag,
        images: initialImages
    } = useLocalSearchParams<{
        newsID: string
        title: string
        content: string
        scamTypeTag: string
        images?: string
    }>()

    const [title, setTitle] = useState(initialTitle || '')
    const [content, setContent] = useState(initialContent || '')
    const [scamTypeTag, setScamTypeTag] = useState(initialScamTypeTag || '')
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<string[]>(
        initialImages ? JSON.parse(initialImages) : []
    )

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
            if (uri.startsWith('http')) {
                uploadedUrls.push(uri)
                continue
            }

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

    const handleUpdate = async (): Promise<void> => {
        if (!title || !content || !scamTypeTag) {
            Alert.alert('Error', 'All fields are required')
            return
        }

        try {
            setLoading(true)
            const token = await user?.getIdToken()

            // eslint-disable-next-line prefer-const
            let uploadedImageUrls = await uploadImagesToS3()

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
                        scamTypeTags: scamTypeTag,
                        images: uploadedImageUrls
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

    const renderImageItem = ({
        item,
        index
    }: {
        item: string | null
        index: number
    }): React.JSX.Element => {
        if (item === null) {
            // "+" Button
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

    return (
        <FlatList
            data={['form']}
            keyExtractor={(item, index) => index.toString()}
            renderItem={() => (
                <View style={commonStyles.postContainer}>
                    {/* <Text style={commonStyles.header}>Edit Post</Text>*/}

                    <Text style={commonStyles.newsInputLabel}>News Title</Text>
                    <TextInput
                        style={commonStyles.postInput}
                        placeholder="Title"
                        value={title}
                        onChangeText={setTitle}
                    />

                    <Text style={commonStyles.newsInputLabel}>
                        Scam Category
                    </Text>
                    <TextInput
                        style={commonStyles.postInput}
                        placeholder="Scam Type Tag (e.g. Phishing, Fraud)"
                        value={scamTypeTag}
                        onChangeText={setScamTypeTag}
                    />

                    <Text style={commonStyles.newsInputLabel}>Content</Text>
                    <TextInput
                        style={commonStyles.postInput}
                        placeholder="Content"
                        value={content}
                        onChangeText={setContent}
                        multiline
                        numberOfLines={50}
                    />

                    <Text style={commonStyles.newsInputLabel}>Photos</Text>
                    <FlatList
                        data={[...images, null]}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={3}
                        columnWrapperStyle={{ justifyContent: 'flex-start' }}
                        renderItem={renderImageItem}
                        className="mb-16"
                    />

                    <TouchableOpacity
                        style={[
                            commonStyles.longButton,
                            loading && commonStyles.buttonDisabled
                        ]}
                        onPress={handleUpdate}
                        disabled={loading}
                    >
                        <Text style={commonStyles.buttonText}>
                            {loading ? 'Updating...' : 'Save'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={commonStyles.longButtonWhite}
                        onPress={() =>
                            router.replace('/(organization)/createdPost')
                        }
                    >
                        <Text style={commonStyles.buttonTextWhite}>
                            Discard
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        />
    )
}

export default EditPost
