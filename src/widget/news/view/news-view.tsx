import { Box } from '@/components/ui/box'
import { News, timeAgo } from '@/src/shared'
import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { ButtonWidget, ShareButtonWidget } from '../../button'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { ImageView } from '@/src/shared/ui/image/image'
import { BookmarkIcon, BookmarkFilledIcon } from '@/components/ui/icon'
import * as Speech from 'expo-speech'

export const VieNews: React.FC<{
    news: News
    coverImage: string
}> = ({ news, coverImage }) => {
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [isBookmarked, setIsBookmarked] = useState(false)

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

    const toggleBookmark = (): void => {
        setIsBookmarked(prevState => !prevState)
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
                    onPress={toggleBookmark}
                    className="absolute top-0 right-2 p-2"
                    style={{
                        elevation: 4,
                        width: 48,
                        height: 48
                    }}
                >
                    {isBookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
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
