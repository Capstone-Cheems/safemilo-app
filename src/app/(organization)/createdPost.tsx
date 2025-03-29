import React, { useEffect, useState, useCallback } from 'react'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Image
} from 'react-native'
import { useRouter } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import commonStyles from '../../styles/commonStyles'
import { useAuth } from '@/src/shared'

type NewsItem = {
    newsID: string
    title: string
    content: string
    scamTypeTag: string
    createdAt: string
    images?: string[]
}

const CreatedPost = (): React.JSX.Element => {
    const { user, logout } = useAuth()
    const router = useRouter()
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return
        fetchNews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    useFocusEffect(
        useCallback(() => {
            if (!user) return
            fetchNews()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [user])
    )

    const fetchNews = async (): Promise<void> => {
        try {
            const token = await user?.getIdToken()
            const response = await fetch(
                `http://34.235.29.56:8080/news/organization/${user?.uid}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            )
            const data = await response.json()
            setNews(data.data)
        } catch (error) {
            console.error('Error fetching news:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={commonStyles.postContainer}>
            <TouchableOpacity
                onPress={logout}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 10
                }}
            >
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/logout-icon.png')}
                    style={{ width: 28, height: 28 }}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            <Text style={commonStyles.header}>Your Scam News</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#000000" />
            ) : !news || news.length === 0 ? (
                <Text style={commonStyles.noNewsText}>No scam news found.</Text>
            ) : (
                <FlatList
                    data={news}
                    keyExtractor={item => item.newsID}
                    renderItem={({ item }) => (
                        <View style={commonStyles.postnewsItem}>
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: `/post/${item.newsID}`,
                                        params: {
                                            newsID: item.newsID,
                                            title: item.title,
                                            content: item.content,
                                            scamTypeTag: item.scamTypeTag,
                                            createdAt: item.createdAt,
                                            images: JSON.stringify(item.images)
                                        }
                                    })
                                }
                            >
                                <Text
                                    style={commonStyles.postTitle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={commonStyles.cardContent}
                                    numberOfLines={2}
                                    ellipsizeMode="tail"
                                >
                                    {item.content}
                                </Text>
                                <Text style={commonStyles.tag}>
                                    #{item.scamTypeTag}
                                </Text>
                                <Text style={commonStyles.date}>
                                    Posted on{' '}
                                    {new Date(item.createdAt).toDateString()}
                                </Text>
                            </TouchableOpacity>

                            {/* Edit Button */}
                            <TouchableOpacity
                                style={commonStyles.editButton}
                                onPress={() =>
                                    router.push({
                                        pathname: '/news/editPost',
                                        params: {
                                            newsID: item.newsID,
                                            title: item.title,
                                            content: item.content,
                                            scamTypeTag: item.scamTypeTag,
                                            images: JSON.stringify(item.images)
                                        }
                                    })
                                }
                            >
                                <Text style={commonStyles.editButtonText}>
                                    Edit
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    )
}

export default CreatedPost
