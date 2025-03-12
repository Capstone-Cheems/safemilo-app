import { Box } from '@/components/ui/box'
import { VStack } from '@/components/ui/vstack'
import { News, timeAgo } from '@/src/shared'
import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { Card } from '@/components/ui/card'
import { Link, useRouter } from 'expo-router'
import {
    scamTypeImages,
    DEFAULT_SCAM_IMAGE
} from '@/src/shared/ui/image/scam-news-image'
export const NewsCard: React.FC<{
    news: News
}> = ({ news }) => {
    const router = useRouter()
    const imageSource = scamTypeImages[news.scamTypeTag] || DEFAULT_SCAM_IMAGE
    return (
        <TouchableOpacity
            onPress={() =>
                router.push({
                    pathname: `/news/${news.newsID}`
                })
            }
            className="bg-[#f9f9f9] p-4 mb-2 rounded-xl shadow"
        >
            <Card className=" bg-[#f9f9f9]">
                <VStack space="md">
                    <Box className="flex flex-row flex-nowrap justify-between">
                        <Text>{news.organizationID}</Text>

                        <Text>{timeAgo(news.createdAt)}</Text>
                    </Box>
                    <Box>
                        <Image
                            source={imageSource}
                            style={{
                                width: '100%',
                                height: 200,
                                maxWidth: 320,
                                maxHeight: 200
                            }}
                            resizeMode="cover"
                            className="aspect-video  max-w-full max-h-full"
                            alt="image"
                        />
                    </Box>
                    <Box>
                        <VStack space="md">
                            <Text className="color-gray-500">
                                {news.scamTypeTag}
                            </Text>
                            <Text className="line-clamp-2 overflow-hidden text-ellipsis">
                                {news.title}
                            </Text>
                        </VStack>
                    </Box>
                    <Box>
                        <Link href={`/news/${news.newsID}`}>Read More</Link>
                    </Box>
                </VStack>
            </Card>
        </TouchableOpacity>
    )
}
