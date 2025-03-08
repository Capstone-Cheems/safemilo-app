import { Box } from '@/components/ui/box'
import { NewsSection } from '@/src/features/news/news-section'
import { useNavigation } from 'expo-router'
import React, { ReactNode, useLayoutEffect } from 'react'
import { ScrollView } from 'react-native'

const BrowsePosts = (): ReactNode => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Browse News', headerShown: true })
    }, [navigation])

    return (
        <ScrollView>
            <Box className="flex justify-center bg-white">
                <NewsSection />
            </Box>
        </ScrollView>
    )
}

export default BrowsePosts

// import React, { useEffect, useState } from 'react'
// import {
//     View,
//     Text,
//     FlatList,
//     ActivityIndicator,
//     TouchableOpacity
// } from 'react-native'
// import { useRouter } from 'expo-router'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import commonStyles from '../../styles/commonStyles'

// type NewsItem = {
//     newsID: string
//     title: string
//     content: string
//     scamTypeTag: string
//     createdAt: string
// }

// const BrowsePosts = (): React.JSX.Element => {
//     const [news, setNews] = useState<NewsItem[]>([])
//     const [savedPosts, setSavedPosts] = useState<NewsItem[]>([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState<string | null>(null)
//     const router = useRouter()

//     useEffect(() => {
//         const fetchNews = async (): Promise<void> => {
//             try {
//                 const response = await fetch('http://34.235.29.56:8080/news/')
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch news')
//                 }
//                 const data = await response.json()
//                 setNews(data.data) // Assuming API returns { data: [...] }
//             } catch (error) {
//                 console.error('Error fetching news:', error)
//                 setError('Failed to load news. Please try again later.')
//             } finally {
//                 setLoading(false)
//             }
//         }

//         const fetchSavedPosts = async () => {
//             try {
//                 const savedPostsData = await AsyncStorage.getItem('savedPosts')
//                 if (savedPostsData) {
//                     console.log(
//                         'Saved Posts retrieved:',
//                         JSON.parse(savedPostsData)
//                     )
//                     setSavedPosts(JSON.parse(savedPostsData))
//                 }
//             } catch (error) {
//                 console.error('Error fetching saved posts:', error)
//             }
//         }

//         fetchNews()
//         fetchSavedPosts()
//     }, [])

//     const handleSavePost = async (post: NewsItem) => {
//         try {
//             const savedPostsData = await AsyncStorage.getItem('savedPosts')
//             const savedPostsArray: NewsItem[] = savedPostsData
//                 ? JSON.parse(savedPostsData)
//                 : []

//             const postExists = savedPostsArray.some(
//                 savedPost => savedPost.newsID === post.newsID
//             )

//             if (!postExists) {
//                 const updatedSavedPosts = [...savedPostsArray, post]

//                 await AsyncStorage.setItem(
//                     'savedPosts',
//                     JSON.stringify(updatedSavedPosts)
//                 )
//                 setSavedPosts(updatedSavedPosts)
//                 console.log('Post saved:', post)
//             } else {
//                 console.log('Post already saved:', post)
//             }
//         } catch (error) {
//             console.error('Error saving post:', error)
//         }
//     }
//     const handlePostClick = (post: NewsItem) => {
//         router.push({
//             pathname: '../news/postDetail',
//             params: post
//         })
//     }

//     if (loading) {
//         return (
//             <View style={commonStyles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#000000" />
//                 <Text>Loading posts...</Text>
//             </View>
//         )
//     }

//     if (error) {
//         return (
//             <View style={commonStyles.errorContainer}>
//                 <Text style={commonStyles.errorText}>{error}</Text>
//             </View>
//         )
//     }

//     return (
//         <View style={commonStyles.container}>
//             <Text style={commonStyles.header}>Browse Posts</Text>

//             <FlatList
//                 data={news}
//                 keyExtractor={item => item.newsID}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity
//                         onPress={() => handlePostClick(item)}
//                         style={commonStyles.newsItem}
//                     >
//                         <Text
//                             style={commonStyles.cardTitle}
//                             numberOfLines={1}
//                             ellipsizeMode="tail"
//                         >
//                             {item.title}
//                         </Text>
//                         <Text
//                             style={commonStyles.content}
//                             numberOfLines={2}
//                             ellipsizeMode="tail"
//                         >
//                             {item.content}
//                         </Text>
//                         <Text style={commonStyles.tag}>
//                             #{item.scamTypeTag}
//                         </Text>
//                         <Text style={commonStyles.date}>
//                             {new Date(item.createdAt).toDateString()}
//                         </Text>

//                         {/* Save post button */}
//                         <TouchableOpacity
//                             onPress={() => handleSavePost(item)}
//                             style={commonStyles.saveButton}
//                         >
//                             <Text style={commonStyles.buttonText}>Save</Text>
//                         </TouchableOpacity>
//                     </TouchableOpacity>
//                 )}
//             />
//         </View>
//     )
// }

// export default BrowsePosts
