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
    const router = useRouter()

    const fetchSavedPosts = async () => {
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

    const handleRemovePost = async (newsID: string) => {
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

    const handleRemoveAllPosts = async () => {
        setSavedPosts([])
        try {
            await AsyncStorage.removeItem('savedPosts')
        } catch (error) {
            console.error('Error clearing saved posts:', error)
        }
    }

    const handlePostClick = (post: NewsItem) => {
        router.push({
            pathname: '../news/postDetail',
            params: post
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
        <View style={commonStyles.container}>
            <Text style={commonStyles.header}>Saved Posts</Text>

            {/* Browse Posts Button */}
            <TouchableOpacity
                onPress={() => router.push('./browsePost')}
                style={commonStyles.browseButton}
            >
                <Text style={commonStyles.browseButtonText}>Browse Posts</Text>
            </TouchableOpacity>

            {savedPosts.length === 0 ? (
                <View style={commonStyles.noSavedPosts}>
                    <Text>No saved posts! Browse and save some.</Text>
                </View>
            ) : (
                <>
                    <TouchableOpacity
                        onPress={handleRemoveAllPosts}
                        style={commonStyles.removeAllButton}
                    >
                        <Text style={commonStyles.removeAllButtonText}>
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
                                    style={commonStyles.cardTitle}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {item.title}
                                </Text>
                                <Text
                                    style={commonStyles.content}
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
                                    {new Date(item.createdAt).toDateString()}
                                </Text>

                                {/* Remove saved post button */}
                                <TouchableOpacity
                                    onPress={() =>
                                        handleRemovePost(item.newsID)
                                    }
                                    style={commonStyles.removeButton}
                                >
                                    <Text style={commonStyles.removeButtonText}>
                                        X
                                    </Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
        </View>
    )
}

export default SavedPosts
