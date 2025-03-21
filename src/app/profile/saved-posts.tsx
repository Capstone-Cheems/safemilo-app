import React, { useState, useCallback } from 'react'
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import commonStyles from '../../styles/commonStyles'

type NewsItem = {
    newsID: string
    title: string
    content: string
    scamTypeTag: string
    createdAt: string
}

const SavedPosts = (): React.JSX.Element => {
    const [savedPosts, setSavedPosts] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [textSize, setTextSize] = useState(20)
    const [isBold, setIsBold] = useState(true)
    const router = useRouter()

    const loadSettings = useCallback(async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize')
            const storedBold = await AsyncStorage.getItem('isBold')

            if (storedSize) setTextSize(parseInt(storedSize))
            if (storedBold) setIsBold(storedBold === 'true')
        } catch (error) {
            console.error('Error loading settings:', error)
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            loadSettings()
        }, [loadSettings])
    )

    const fetchSavedPosts = async (): Promise<void> => {
        try {
            setLoading(true)
            const savedPostsData = await AsyncStorage.getItem('savedPosts')
            setSavedPosts(savedPostsData ? JSON.parse(savedPostsData) : [])
        } catch (error) {
            console.error('Error fetching saved posts:', error)
        } finally {
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            fetchSavedPosts()
        }, [])
    )

    const handleRemovePost = async (newsID: string): Promise<void> => {
        const updatedSavedPosts = savedPosts.filter(
            post => post.newsID !== newsID
        )
        setSavedPosts(updatedSavedPosts)
        try {
            await AsyncStorage.setItem(
                'savedPosts',
                JSON.stringify(updatedSavedPosts)
            )
        } catch (error) {
            console.error('Error removing post:', error)
        }
    }

    const handleRemoveAllPosts = async (): Promise<void> => {
        setSavedPosts([])
        try {
            await AsyncStorage.removeItem('savedPosts')
        } catch (error) {
            console.error('Error clearing saved posts:', error)
        }
    }

    const handlePostClick = (post: NewsItem): void => {
        router.push({
            pathname: '../news/newsDetail',
            params: {
                newsID: post.newsID,
                title: post.title,
                content: post.content,
                scamTypeTag: post.scamTypeTag,
                createdAt: post.createdAt
            }
        })
    }

    if (loading) {
        return (
            <View style={commonStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text>Loading saved posts...</Text>
            </View>
        )
    }

    return (
        <View style={commonStyles.pcontainer}>
            <Text
                style={{
                    fontSize: textSize + 6,
                    fontWeight: isBold ? 'bold' : 'normal',
                    marginBottom: 10
                }}
            >
                Saved Posts
            </Text>
            <View style={commonStyles.mcontainer}>
                {savedPosts.length === 0 ? (
                    <View style={commonStyles.noSavedPosts}>
                        <Text
                            style={{ fontWeight: 'bold', fontSize: textSize }}
                        >
                            No saved posts yet!
                        </Text>
                        <Text
                            style={{
                                fontSize: textSize - 3
                            }}
                        >
                            Start saving your favorite posts for easy access
                            later.
                        </Text>
                    </View>
                ) : (
                    <>
                        <TouchableOpacity
                            onPress={handleRemoveAllPosts}
                            style={commonStyles.removeAllButton}
                        >
                            <Text
                                style={[
                                    { fontSize: textSize - 6 },
                                    {
                                        ...commonStyles.removeAllButtonText,
                                        fontWeight: isBold ? 'bold' : 'normal',
                                        marginBottom: -20
                                    }
                                ]}
                            >
                                Remove All
                            </Text>
                        </TouchableOpacity>

                        <FlatList
                            data={savedPosts}
                            keyExtractor={item => item.newsID}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handlePostClick(item)}
                                    style={commonStyles.savedPostItem}
                                >
                                    <Text
                                        style={{
                                            fontSize: textSize,
                                            marginTop: 5,
                                            fontWeight: isBold
                                                ? 'bold'
                                                : 'normal'
                                        }}
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                    >
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={{
                                            marginTop: 5,
                                            marginBottom: 5,
                                            fontSize: textSize - 7,
                                            fontWeight: isBold
                                                ? 'bold'
                                                : 'normal'
                                        }}
                                        numberOfLines={2}
                                        ellipsizeMode="tail"
                                    >
                                        {item.content}
                                    </Text>
                                    <Text style={commonStyles.tag}>
                                        #{item.scamTypeTag}
                                    </Text>
                                    <Text style={commonStyles.date}>
                                        Saved on:{' '}
                                        {new Date(
                                            item.createdAt
                                        ).toDateString()}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() =>
                                            handleRemovePost(item.newsID)
                                        }
                                        style={commonStyles.removeButton}
                                    >
                                        <Text
                                            style={
                                                commonStyles.removeButtonText
                                            }
                                        >
                                            X
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )}
                        />
                    </>
                )}
                <TouchableOpacity
                    onPress={() => router.push('./browsePost')}
                    style={commonStyles.browseButton}
                >
                    <Text
                        style={[
                            commonStyles.browseButtonText,
                            { fontSize: textSize - 4 },
                            { fontWeight: 'bold' }
                        ]}
                    >
                        Browse Posts
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SavedPosts
