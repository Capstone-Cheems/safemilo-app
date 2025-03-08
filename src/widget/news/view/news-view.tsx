import { Box } from '@/components/ui/box'
import { News, timeAgo } from '@/src/shared'
import React, { useState, useEffect } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { ButtonWidget, ShareButtonWidget } from '../../button'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { ImageView } from '@/src/shared/ui/image/image'
import { BookmarkIcon, BookmarkFilledIcon } from '@/components/ui/icon'
import * as Speech from 'expo-speech'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const VieNews: React.FC<{
    news: News
    coverImage: string
}> = ({ news, coverImage }) => {
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isSaved, setIsSaved] = useState(false)

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
                // Remove from saved posts
                const updatedPosts = savedPosts.filter(
                    (post: News) => post.newsID !== news.newsID
                )
                await AsyncStorage.setItem(
                    'savedPosts',
                    JSON.stringify(updatedPosts)
                )
            } else {
                // Add to saved posts
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

    return (
        <VStack space="md" className="m-4">
            <Box className="relative">
                <ImageView
                    coverImage={`${coverImage}.jpg`}
                    className="aspect-[320/208] max-w-full max-h-full"
                    resizeMode="contain"
                    alt="image"
                />

                <TouchableOpacity
                    onPress={toggleSave}
                    className="absolute top-0 right-2 p-2"
                    style={{
                        elevation: 4,
                        width: 48,
                        height: 48
                    }}
                >
                    {isSaved ? <BookmarkFilledIcon /> : <BookmarkIcon />}
                </TouchableOpacity>
            </Box>
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
            <Heading>{news.title}</Heading>
            <Box className="flex-row flex-nowrap justify-between">
                <Text>{news.scamTypeTag}</Text>
                <Text>{timeAgo(news.createdAt)}</Text>
            </Box>
            <Box>
                <Text>{news.content}</Text>
            </Box>
            <ShareButtonWidget
                message={`${news.title}\n#${news.scamTypeTag}\n\n${news.content}\n\nStay safe from scams!\nby SafeMilo🦊`}
            />
        </VStack>
    )
}
