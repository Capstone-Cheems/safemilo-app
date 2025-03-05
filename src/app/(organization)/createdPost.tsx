import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { useAuth } from '../../contexts/AuthContext'
import { FIREBASE_AUTH } from '../../config/firebaseConfig'
import { useRouter } from 'expo-router'

type NewsItem = {
    newsID: string
    title: string
    content: string
    scamTypeTag: string
    createdAt: string
}

const CreatedPost = (): React.JSX.Element => {
    const { user } = useAuth()
    const router = useRouter()
    const [news, setNews] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!user) return
        fetchNews()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const fetchNews = async (): Promise<void> => {
        try {
            const token = await FIREBASE_AUTH.currentUser?.getIdToken()
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
        <View style={styles.container}>
            <Text style={styles.header}>Your Scam News</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#000000" />
            ) : news.length === 0 ? (
                <Text style={styles.noNewsText}>No scam news found.</Text>
            ) : (
                <FlatList
                    data={news}
                    keyExtractor={item => item.newsID}
                    renderItem={({ item }) => (
                        <View style={styles.newsItem}>
                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: '/(organization)/postDetail',
                                        params: {
                                            title: item.title,
                                            content: item.content,
                                            scamTypeTag: item.scamTypeTag,
                                            createdAt: item.createdAt
                                        }
                                    })
                                }
                            >
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.content}>
                                    {item.content}
                                </Text>
                                <Text style={styles.tag}>
                                    #{item.scamTypeTag}
                                </Text>
                                <Text style={styles.date}>
                                    Posted on{' '}
                                    {new Date(item.createdAt).toDateString()}
                                </Text>
                            </TouchableOpacity>

                            {/* Edit Button */}
                            <TouchableOpacity
                                style={styles.editButton}
                                onPress={() =>
                                    router.push({
                                        pathname: '/(organization)/editPost',
                                        params: {
                                            newsID: item.newsID,
                                            title: item.title,
                                            content: item.content,
                                            scamTypeTag: item.scamTypeTag
                                        }
                                    })
                                }
                            >
                                <Text style={styles.editButtonText}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    noNewsText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20
    },
    newsItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 14,
        marginTop: 5,
        flex: 1 // Allow text to take up remaining space
    },
    tag: {
        fontSize: 12,
        color: '#555',
        marginTop: 5
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop: 5
    },
    editButton: {
        backgroundColor: '#0d1b2a',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5
    },
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default CreatedPost
