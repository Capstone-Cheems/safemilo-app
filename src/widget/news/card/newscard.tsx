/* eslint-disable @typescript-eslint/no-require-imports */
import { Box } from '@/components/ui/box'
import { VStack } from '@/components/ui/vstack'
import { News, timeAgo } from '@/src/shared'
import React from 'react'
import { Text, TouchableOpacity, Image, View } from 'react-native'
import { Card } from '@/components/ui/card'
import { useRouter } from 'expo-router'
import {
    scamTypeImages,
    DEFAULT_SCAM_IMAGE
} from '@/src/shared/ui/image/scam-news-image'
import commonStyles from '../../../styles/commonStyles'
import { ImageSourcePropType } from 'react-native'

const organizationAvatars: Record<string, ImageSourcePropType> = {
    'Vancouver Police Department': require('../../../../assets/images/vancouver-police.jpeg'),
    'Surrey Police': require('../../../../assets/images/surrey-police.jpeg'),
    RCMP: require('../../../../assets/images/rcmp.png'),
    CIBC: require('../../../../assets/images/cibc.jpg'),
    RBC: require('../../../../assets/images/rbc.jpg'),
    'Canadian Anti-Fraud Centre': require('../../../../assets/images/CAFC.jpg'),
    default: require('../../../../assets/images/icon.png')
}

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
            className="bg-[#DADADA] items-center"
            activeOpacity={1}
        >
            <Card className="bg-[#DADADA]">
                <VStack>
                    <Box>
                        <Image
                            source={imageSource}
                            style={{
                                width: '100%',
                                height: 220
                            }}
                            resizeMode="cover"
                            className="aspect-video max-w-full max-h-full rounded-t-[16]"
                            alt="image"
                        />
                    </Box>
                    <Box className="flex flex-col flex-nowrap justify-between gap-2 bg-[#FFFFFF] rounded-[16] mt-[-10] px-4 pb-1">
                        <Text
                            className="self-end mt-1"
                            style={{
                                fontFamily: 'Montserrat-Regular'
                            }}
                        >
                            {timeAgo(news.createdAt)}
                        </Text>
                        <View className="flex-row items-center ml-[16px] mt-1 mb-1 gap-2">
                            <Image
                                source={
                                    organizationAvatars[news.organizationID] ||
                                    organizationAvatars.default
                                }
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 16
                                }}
                            />
                            <Text
                                className="text-3xl font-semibold"
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{
                                    maxWidth: 290,
                                    fontFamily: 'Montserrat-SemiBold'
                                }}
                            >
                                {news.organizationID}
                            </Text>
                        </View>
                        <Text
                            className="color-black font-semibold text-2xl ml-[16px]"
                            style={{
                                fontFamily: 'Montserrat-SemiBold'
                            }}
                        >
                            {news.scamTypeTag}
                        </Text>
                        <Text
                            className="line-clamp-2 overflow-hidden text-ellipsis text-2xl ml-[16px]"
                            style={{
                                maxWidth: 320,
                                fontFamily: 'Montserrat-Medium'
                            }}
                        >
                            {news.title}
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                router.push({
                                    pathname: `/news/${news.newsID}`
                                })
                            }
                            style={commonStyles.longButtonNew}
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
