import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    Image,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import { NavigationProp } from '@react-navigation/native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'
import { RootStackParamList } from '../../types/types'

interface RouterProps {
    navigation: NavigationProp<RootStackParamList, 'created post'>
}

interface ScamNews {
    newsID: string
    title: string
    image?: string
    content: string
    scamTypeTags: string[]
}

const CreatedPost = ({ navigation }: RouterProps): React.JSX.Element => {
    const [scamNews, setScamNews] = useState<ScamNews[]>([])
    const [loading, setLoading] = useState(false)

    const fetchScamNews = async (): Promise<void> => {
        setLoading(true)
        try {
            const user = FIREBASE_AUTH.currentUser

            if (user) {
                const response = await fetch(
                    `http://192.168.1.97:3000/news/organization/${user.uid}`
                )
                const data = await response.json()
                setScamNews(data)
            }
        } catch (error) {
            console.error('Error fetching scam news:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchScamNews()
    }, [])

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Button
                onPress={() => navigation.navigate('new post')}
                title="New Post"
            />

            <Button onPress={() => FIREBASE_AUTH.signOut()} title="Logout" />
            <Text
                style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}
            >
                Your Scam News
            </Text>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={scamNews}
                    keyExtractor={item => item.newsID}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate('post details', {
                                    newsID: item.newsID
                                })
                            }
                        >
                            <View
                                style={{
                                    marginBottom: 15,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    borderRadius: 8,
                                    overflow: 'hidden'
                                }}
                            >
                                {item.image && (
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ width: '100%', height: 150 }}
                                    />
                                )}
                                <View style={{ padding: 10 }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {item.title}
                                    </Text>
                                    <Text style={{ color: '#555' }}>
                                        {item.scamTypeTags.join(', ')}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    )
}

export default CreatedPost
