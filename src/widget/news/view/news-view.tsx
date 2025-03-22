import { Box } from '@/components/ui/box'
import { News, timeAgo } from '@/src/shared'
import React, { useState, useEffect } from 'react'
import {
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Modal,
    View
} from 'react-native'
import { ButtonWidget, ShareButtonWidget } from '../../button'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import {
    BookmarkIcon,
    BookmarkFilledIcon,
    CloseIcon
} from '@/components/ui/icon'
import {
    scamTypeImages,
    DEFAULT_SCAM_IMAGE
} from '@/src/shared/ui/image/scam-news-image'
import * as Speech from 'expo-speech'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const VieNews: React.FC<{
    news: News
}> = ({ news }) => {
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isSaved, setIsSaved] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    useEffect(() => {
        checkIfSaved()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const checkIfSaved = async (): Promise<void> => {
        try {
            const savedPostsData = await AsyncStorage.getItem('savedPosts')
            const savedPosts = savedPostsData ? JSON.parse(savedPostsData) : []
            const isAlreadySaved = savedPosts.some(
                (post: News) => post.newsID === news.newsID
            )
            setIsSaved(isAlreadySaved)
        } catch (error) {
            console.error('Error checking saved posts:', error)
        }
    }

    const toggleSave = async (): Promise<void> => {
        try {
            const savedPostsData = await AsyncStorage.getItem('savedPosts')
            const savedPosts = savedPostsData ? JSON.parse(savedPostsData) : []

            if (isSaved) {
                const updatedPosts = savedPosts.filter(
                    (post: News) => post.newsID !== news.newsID
                )
                await AsyncStorage.setItem(
                    'savedPosts',
                    JSON.stringify(updatedPosts)
                )
            } else {
                const updatedPosts = [...savedPosts, news]
                await AsyncStorage.setItem(
                    'savedPosts',
                    JSON.stringify(updatedPosts)
                )
            }
            setIsSaved(prev => !prev)
        } catch (error) {
            console.error('Error toggling save state:', error)
        }
    }

    const handleListen = (): void => {
        const textToRead = `${news.title}. ${news.content}`
        setIsSpeaking(true)
        Speech.speak(textToRead, {
            language: 'en-US',
            onDone: () => setIsSpeaking(false),
            onStopped: () => setIsSpeaking(false)
        })
    }

    const handleStop = (): void => {
        Speech.stop()
        setIsSpeaking(false)
    }

    const openFullScreenImage = (imageUri: string): void => {
        setSelectedImage(imageUri)
        setIsModalVisible(true)
    }

    const closeFullScreenImage = (): void => {
        setIsModalVisible(false)
        setSelectedImage(null)
    }

    const imageSource = scamTypeImages[news.scamTypeTag] || DEFAULT_SCAM_IMAGE

    return (
        <ScrollView>
            <VStack space="md" className="m-4">
                {/* Scam Type Image (Top) */}
                <Box className="relative">
                    <Image
                        source={imageSource}
                        style={{
                            width: '100%',
                            height: 240
                        }}
                        className="max-w-full max-h-full"
                        resizeMode="contain"
                        alt="image"
                    />
                </Box>

                <Box>
                    <TouchableOpacity
                        onPress={toggleSave}
                        className="absolute top-1 right-2 p-2"
                        style={{
                            elevation: 4,
                            width: 48,
                            height: 48
                        }}
                    >
                        {isSaved ? <BookmarkFilledIcon /> : <BookmarkIcon />}
                    </TouchableOpacity>
                </Box>

                <Box className="flex-row items-center gap-4">
                    {!isSpeaking ? (
                        <ButtonWidget
                            text="Listen"
                            playIcon={true}
                            onPress={handleListen}
                        />
                    ) : (
                        <ButtonWidget
                            text="Stop"
                            stopIcon={true}
                            onPress={handleStop}
                        />
                    )}

                    <ShareButtonWidget
                        message={`${news.title}\n#${news.scamTypeTag}\n\n${news.content}\n\nStay safe from scams!\nby SafeMilo🦊`}
                    />
                </Box>

                <Heading className="text-3xl">{news.title}</Heading>

                <Box className="flex-row flex-nowrap gap-8">
                    <Text>{news.scamTypeTag}</Text>
                    <Text>{timeAgo(news.createdAt)}</Text>
                </Box>

                <Box>
                    <Text>{news.content}</Text>
                </Box>

                {/* Display Additional Images After Content */}
                {news.images && news.images.length > 0 && (
                    <Box className="mb-[32px]">
                        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>
                            Related Images
                        </Text>
                        <ScrollView horizontal>
                            {news.images.map((img, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => openFullScreenImage(img)}
                                >
                                    <Image
                                        source={{ uri: img }}
                                        style={{
                                            width: 320,
                                            height: 200,
                                            marginRight: 10,
                                            borderRadius: 8
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Box>
                )}

                {/* Full-Screen Image Modal */}
                <Modal
                    visible={isModalVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.9)',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        {selectedImage && (
                            <Image
                                source={{ uri: selectedImage }}
                                style={{
                                    width: '90%',
                                    height: '80%',
                                    borderRadius: 10
                                }}
                                resizeMode="contain"
                            />
                        )}
                        {/* Close Button */}
                        <TouchableOpacity
                            onPress={closeFullScreenImage}
                            style={{
                                position: 'absolute',
                                top: 40,
                                right: 20,
                                padding: 10
                            }}
                        >
                            <CloseIcon width={30} height={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </VStack>
        </ScrollView>
    )
}
