import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

type NewsItem = {
    newsID: string
    title: string
    content: string
    scamTypeTag: string
    createdAt: string
}

const News = (): React.JSX.Element => {
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    useEffect(() => {
        const fetchNews = async (): Promise<void> => {
            try {
                const response = await fetch('http://34.235.29.56:8080/news/')
                if (!response.ok) {
                    throw new Error('Failed to fetch news')
                }
                const data = await response.json()
                setNews(data.data) // Assuming API returns { data: [...] }
            } catch (error) {
                console.error('Error fetching news:', error)
                setError('Failed to load news. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    if (loading) {
        return (
            <View style={commonStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text>Loading news...</Text>
            </View>
        )
    }

    if (error) {
        return (
            <View style={commonStyles.errorContainer}>
                <Text style={commonStyles.errorText}>{error}</Text>
            </View>
        )
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Latest Scam News</Text>
            <FlatList
                data={news}
                keyExtractor={item => item.newsID}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={commonStyles.newsItem}
                        onPress={() =>
                            router.push({
                                pathname: '/news/newsDetail',
                                params: {
                                    newsID: item.newsID,
                                    title: item.title,
                                    content: item.content,
                                    scamTypeTag: item.scamTypeTag,
                                    createdAt: item.createdAt
                                }
                            })
                        }
                    >
                        <Text style={commonStyles.cardTitle}>{item.title}</Text>
                        <Text numberOfLines={2} style={commonStyles.content}>
                            {item.content}
                        </Text>
                        <Text style={commonStyles.tag}>
                            #{item.scamTypeTag}
                        </Text>
                        <Text style={commonStyles.date}>
                            {new Date(item.createdAt).toDateString()}
                        </Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default News
