import { Box } from '@/components/ui/box'
import { VStack } from '@/components/ui/vstack'
import { News, timeAgo } from '@/src/shared'
import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { Card } from '@/components/ui/card'
import { useRouter } from 'expo-router'
import {
    scamTypeImages,
    DEFAULT_SCAM_IMAGE
} from '@/src/shared/ui/image/scam-news-image'
import commonStyles from '../../../styles/commonStyles'

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
            className="bg-[#F5F5F5] items-center"
        >
            <Card className=" bg-[#F5F5F5]">
                <VStack>
                    <Box>
                        <Image
                            source={imageSource}
                            style={{
                                width: '100%',
                                height: 200
                            }}
                            resizeMode="cover"
                            className="aspect-video max-w-full max-h-full rounded-t-[16]"
                            alt="image"
                        />
                    </Box>
                    <Box className="flex flex-col flex-nowrap justify-between gap-4 bg-[#FFFFFF] rounded-[16] mt-[-10]">
                        <Text className="self-end mr-4 mt-3">
                            {timeAgo(news.createdAt)}
                        </Text>
                        <Text className="text-xl ml-[16px]">
                            {news.organizationID}
                        </Text>
                        <Text className="color-gray-500 text-2xl ml-[16px]">
                            {news.scamTypeTag}
                        </Text>
                        <Text className="line-clamp-2 overflow-hidden text-ellipsis text-2xl ml-[16px]">
                            {news.title}
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: `/news/${news.newsID}`
                                })
                            }
                            style={commonStyles.longButton}
                        >
                            <Text style={commonStyles.buttonText}>
                                Read More
                            </Text>
                        </TouchableOpacity>
                    </Box>
                </VStack>
            </Card>
        </TouchableOpacity>
    )
}
