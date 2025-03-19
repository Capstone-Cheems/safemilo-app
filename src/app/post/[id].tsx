/* eslint-disable import/no-unresolved */
import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, Image, ActivityIndicator, ScrollView } from 'react-native'
import { useAuth } from '@/src/shared'
import { VStack } from '@/components/ui/vstack'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { ShareButtonWidget } from '@/src/widget/button'
import { timeAgo } from '@/src/shared'
import {
    scamTypeImages,
    DEFAULT_SCAM_IMAGE
} from '@/src/shared/ui/image/scam-news-image'

type NewsItem = {
    newsID: string
    title: string
    content: string
    scamTypeTag: string
    createdAt: string
    images?: string[]
}

const OrganizationNewsDetail = (): React.JSX.Element => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { user } = useAuth()
    const [news, setNews] = useState<NewsItem | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return
        fetchNews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const fetchNews = async (): Promise<void> => {
        try {
            const token = await user?.getIdToken()
            const response = await fetch(
                `http://34.235.29.56:8080/news/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            const data: NewsItem = await response.json()
            setNews(data)
        } catch (error) {
            console.error('Error fetching news:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <ActivityIndicator size="large" color="#000" />

    if (!news) return <Text>No news found.</Text>

    const imageSource = scamTypeImages[news.scamTypeTag] || DEFAULT_SCAM_IMAGE

    return (
        <ScrollView>
            <VStack space="md" className="m-4">
                <Box className="relative">
                    {news.images && news.images.length > 0 ? (
                        <ScrollView horizontal>
                            {news.images.map((img, index) => (
                                <Image
                                    key={index}
                                    source={{ uri: img }}
                                    style={{
                                        width: 320,
                                        height: 200,
                                        marginRight: 10,
                                        borderRadius: 8
                                    }}
                                    resizeMode="contain"
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <Image
                            source={imageSource}
                            style={{
                                width: '100%',
                                height: 200,
                                maxWidth: 320,
                                maxHeight: 200
                            }}
                            resizeMode="contain"
                        />
                    )}
                </Box>

                <Heading>{news.title}</Heading>
                <Box className="flex-row flex-nowrap justify-between">
                    <Text>{news.scamTypeTag}</Text>
                    <Text>{timeAgo(news.createdAt)}</Text>
                </Box>
                <Box>
                    <Text>{news.content}</Text>
                </Box>

                {/* Share Button */}
                <ShareButtonWidget
                    message={`${news.title}\n#${news.scamTypeTag}\n\n${news.content}\n\nStay safe from scams!\nby SafeMilo:fox_face:`}
                />
            </VStack>
        </ScrollView>
    )
}

export default OrganizationNewsDetail
