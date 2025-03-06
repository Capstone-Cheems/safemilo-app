import { Box } from '@/components/ui/box'
import { News, timeAgo } from '@/src/shared'
import React from 'react'
import { Text } from 'react-native'
import { ButtonWidget } from '../../button'
import { VStack } from '@/components/ui/vstack'
import { Heading } from '@/components/ui/heading'
import { ImageView } from '@/src/shared/ui/image/image'

export const VieNews: React.FC<{
    news: News
    coverImage: string
}> = ({ news, coverImage }) => {
    return (
        <VStack space="md" className="m-4">
            <Box>
                <ImageView
                    coverImage={`${coverImage}.jpg`}
                    size="none"
                    className="aspect-[320/208]  max-w-full max-h-full"
                    resizeMode="contain"
                    alt="image"
                />
            </Box>
            <ButtonWidget text="Listen" playIcon={true} />
            <Heading>{news.title}</Heading>
            <Box className="flex-row flex-nowrap justify-between">
                <Text>{news.scamTypeTag}</Text>
                <Text>{timeAgo(news.createdAt)}</Text>
            </Box>
            <Box>
                <Text>{news.content}</Text>
            </Box>
        </VStack>
    )
}
