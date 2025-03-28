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
import { CloseCircleIcon } from '@/components/ui/icon'
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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const Bookmark = require('../../../../assets/images/bookmark-icon.png')
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const BookmarkFilled = require('../../../../assets/images/bookmark-filled-icon.png')

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
        <ScrollView className="bg-[#FFFFFF]">
            <VStack space="md" className="m-4 bg-[#FFFFFF]">
                {/* Scam Type Image (Top) */}
                <Box
                    className="relative"
                    style={{
                        height: 150,
                        overflow: 'hidden'
                    }}
                >
                    <Image
                        source={imageSource}
                        style={{
                            width: '100%',
                            height: '100%'
                        }}
                        className="max-w-full max-h-full"
                        resizeMode="cover"
                        alt="image"
                    />
                </Box>

                <Box
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 24,
                        backgroundColor: '#FBEDE5',
                        position: 'absolute',
                        top: 160,
                        paddingLeft: 16,
                        right: 0
                    }}
                    className="rounded-full"
                >
                    <ShareButtonWidget
                        message={`${news.title}\n#${news.scamTypeTag}\n\n${news.content}\n\nStay safe from scams!\nby SafeMilo🦊`}
                    />

                    <TouchableOpacity
                        onPress={toggleSave}
                        style={{
                            elevation: 4,
                            width: 48,
                            height: 48,
                            backgroundColor: 'transparent',
                            marginTop: 8
                        }}
                    >
                        <Image
                            source={isSaved ? BookmarkFilled : Bookmark}
                            style={{ width: 28, height: 28, marginTop: 6 }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </Box>

                <Box className="flex-row items-center gap-4">
                    {!isSpeaking ? (
                        <ButtonWidget
                            text="Listen"
                            // eslint-disable-next-line @typescript-eslint/no-require-imports
                            imageIcon={require('../../../../assets/images/listen-icon.png')}
                            onPress={handleListen}
                        />
                    ) : (
                        <ButtonWidget
                            text="Stop"
                            // eslint-disable-next-line @typescript-eslint/no-require-imports
                            imageIcon={require('../../../../assets/images/stop-icon.png')}
                            onPress={handleStop}
                        />
                    )}
                </Box>

                <Text
                    className="text-3xl mt-4"
                    style={{
                        fontFamily: 'Montserrat-SemiBold'
                    }}
                >
                    {news.title}
                </Text>

                <Box className="flex-row flex-nowrap gap-8">
                    <Text
                        className="text-xl font-semibold"
                        style={{
                            fontFamily: 'Montserrat-SemiBold'
                        }}
                    >
                        {news.scamTypeTag}
                    </Text>
                    <Text
                        className="text-xl font-semibold"
                        style={{
                            fontFamily: 'Montserrat-SemiBold'
                        }}
                    >
                        {timeAgo(news.createdAt)}
                    </Text>
                </Box>

                <Box>
                    <Text
                        className="text-xl"
                        style={{
                            fontFamily: 'Montserrat-Medium'
                        }}
                    >
                        {news.content}
                    </Text>
                </Box>

                {/* Display Additional Images After Content */}
                {news.images && news.images.length > 0 && (
                    <Box className="mb-[32px]">
                        <Text
                            className="text-3xl"
                            style={{
                                marginBottom: 8,
                                fontFamily: 'Montserrat-SemiBold'
                            }}
                        >
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
                            <CloseCircleIcon
                                width={30}
                                height={30}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </VStack>
        </ScrollView>
    )
}
