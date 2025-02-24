import React, { useEffect, useState } from 'react'
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../types/types'

interface ScamNews {
    newsID: string
    title: string
    content: string
    image?: string
    scamTypeTags: string[]
}

type PostDetailsRouteProp = RouteProp<RootStackParamList, 'post details'>

interface Props {
    route: PostDetailsRouteProp
}

const PostDetails = ({ route }: Props): React.JSX.Element => {
    const { newsID } = route.params
    const [news, setNews] = useState<ScamNews | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchNewsDetails = async (): Promise<void> => {
            setLoading(true)
            try {
                const response = await fetch(
                    `http://localhost:3000/news/${newsID}`
                )
                const data = await response.json()
                setNews(data)
            } catch (error) {
                console.error('Error fetching news details:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchNewsDetails()
    }, [newsID])

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />
    }

    if (!news) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={{ fontSize: 18, color: 'red' }}>
                    News not found.
                </Text>
            </View>
        )
    }

    return (
        <ScrollView style={{ padding: 20 }}>
            {news.image && (
                <Image
                    source={{ uri: news.image[0] }}
                    style={{ width: '100%', height: 200, borderRadius: 10 }}
                />
            )}
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>
                {news.title}
            </Text>
            <Text style={{ color: '#555', marginBottom: 10 }}>
                {news.scamTypeTags.join(', ')}
            </Text>
            <Text style={{ fontSize: 16 }}>{news.content}</Text>
        </ScrollView>
    )
}

export default PostDetails
