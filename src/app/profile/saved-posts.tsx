import React, { useState, useCallback } from 'react';
import {
    View,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router'; // Add useNavigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import commonStyles from '../../styles/commonStyles';
import { useFonts } from 'expo-font';
import {
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import { Center } from '@/components/ui/center';
import { HeaderRight } from '../../../components/HeaderRight'; // Import HeaderRight
import { Text } from '@/components/ui/text';

type NewsItem = {
    newsID: string;
    title: string;
    content: string;
    scamTypeTag: string;
    createdAt: string;
};

const SavedPosts = (): React.JSX.Element => {
    const [savedPosts, setSavedPosts] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [textSize, setTextSize] = useState(28);
    const [isBold, setIsBold] = useState(true);
    const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
    const router = useRouter();
    const navigation = useNavigation(); // Add navigation hook

    const loadSettings = useCallback(async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize');
            const storedBold = await AsyncStorage.getItem('isBold');

            if (storedSize) setTextSize(parseInt(storedSize));
            if (storedBold) setIsBold(storedBold === 'true');
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadSettings();
        }, [loadSettings])
    );

    // Set the header with HeaderRight
      React.useLayoutEffect(() => {
          navigation.setOptions({
            
          });
      }, [navigation]);
  
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
        Montserrat_500Medium,
        Montserrat_300Light,
        Montserrat_600SemiBold
    });

    const fetchSavedPosts = async (): Promise<void> => {
        try {
            setLoading(true);
            const savedPostsData = await AsyncStorage.getItem('savedPosts');
            setSavedPosts(savedPostsData ? JSON.parse(savedPostsData) : []);
        } catch (error) {
            console.error('Error fetching saved posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchSavedPosts();
        }, [])
    );

    const handleRemovePost = async (newsID: string): Promise<void> => {
        const updatedSavedPosts = savedPosts.filter(
            post => post.newsID !== newsID
        );
        setSavedPosts(updatedSavedPosts);
        try {
            await AsyncStorage.setItem(
                'savedPosts',
                JSON.stringify(updatedSavedPosts)
            );
        } catch (error) {
            console.error('Error removing post:', error);
        }
    };

    const handleRemoveAllPosts = async (): Promise<void> => {
        setSavedPosts([]);
        try {
            await AsyncStorage.removeItem('savedPosts');
        } catch (error) {
            console.error('Error clearing saved posts:', error);
        }
    };

    const toggleExpand = (newsID: string) => {
        setExpandedPosts(prev => {
            const newSet = new Set(prev);
            if (newSet.has(newsID)) {
                newSet.delete(newsID);
            } else {
                newSet.add(newsID);
            }
            return newSet;
        });
    };

    if (!fontsLoaded || loading) {
        return (
            <View style={commonStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text>{!fontsLoaded ? 'Loading Fonts...' : 'Loading saved posts...'}</Text>
            </View>
        );
    }

    if (savedPosts.length === 0) {
        return (
            <View style={[styles.container]}>
                <Text
                    style={{
                        fontSize: textSize + 4,
                        fontFamily: 'Montserrat_700Bold',
                        marginBottom: 10
                    }}
                    className='pt-5 color-[#1C1C1C]'
                >
                    Saved Posts
                </Text>
                <View style={commonStyles.faqContainer}>
                    <Text className='color-[#191919]'
                        style={{
                            fontSize: textSize - 5,
                            padding: 5,
                            textAlign: 'left',
                            fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                        }}
                    >
                        No saved posts yet!
                    </Text>
                    <Text
                        style={{
                            fontSize: textSize - 9,
                            fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                            marginTop: 20,
                            marginBottom: 20,
                            padding:4,
                            lineHeight:22
                        }}
                        className='color-[#191919]'
                    >
                        Start saving your favorite posts for easy access later.
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push('./browsePost')}
                        style={commonStyles.browseButton}
                    >
                        <Text
                            style={[
                                commonStyles.browseButtonText,
                                { fontSize: textSize - 6 },
                                { fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium' },
                                { padding: 2 },

                            ]}
                        >
                            Browse Posts
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    return (
        <FlatList
            style={styles.container}
            data={savedPosts}
            keyExtractor={item => item.newsID}
            ListHeaderComponent={
                <View>
                    <Text
                        style={{
                            fontSize: textSize + 4,
                            fontFamily:  'Montserrat_700Bold',
                            marginBottom: 10
                        }}
                        className='p-5 color-[##1C1C1C]'
                    >
                        Saved Posts
                    </Text>
                    <TouchableOpacity
                        onPress={handleRemoveAllPosts}
                        style={commonStyles.removeAllButton}
                    >
                        <Text
                            style={[
                                { fontSize: textSize - 4 },
                                {
                                    ...commonStyles.removeAllButtonText,
                                    fontFamily: isBold
                                        ? 'Montserrat_700Bold'
                                        : 'Montserrat_400Regular',
                                    marginBottom: 3,
                                    textAlign: 'left'
                                }
                            ]}
                            className='pt-2'
                        >
                            Delete All
                        </Text>
                    </TouchableOpacity>
                </View>
            }
            renderItem={({ item }) => (
                <View style={commonStyles.savedPostItem}>
                    <Text
                        style={{
                            fontSize: textSize,
                            marginTop: 5,
                            fontFamily:'Montserrat_700Bold',
                            lineHeight:30
                        }}
                        className='pt-2 color-[##1C1C1C]'
                    >
                        {item.title}
                    </Text>
                    <Text
                        style={{
                            marginTop: 5,
                            marginBottom: 5,
                            fontSize: textSize - 10,
                            fontFamily: isBold
                                ? 'Montserrat_700Bold'
                                : 'Montserrat_600SemiBold'
                        }}
                        numberOfLines={expandedPosts.has(item.newsID) ? 16 : 2}
                        ellipsizeMode="tail"
                        className='pt-2 color-[##1C1C1C]'
                    >
                        {item.content}
                    </Text>
                    <Text
                        style={{
                            ...commonStyles.tag,
                            fontFamily: isBold
                                ? 'Montserrat_700Bold'
                                : 'Montserrat_Regular'
                        }}
                    >
                        Scam Type: #{item.scamTypeTag}
                    </Text>
                    <Text style={commonStyles.date}>
                        Saved on: {new Date(item.createdAt).toDateString()}
                    </Text>
                    <TouchableOpacity
                        onPress={() => toggleExpand(item.newsID)}
                        style={{ marginBottom: 5 }}
                    >
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10,paddingTop:10 }}>
                            <Text
                                style={{
                                    fontSize: textSize - 8,
                                    color: '#0A2941',
                                   
                                    fontFamily: 'Montserrat_700Bold'
                                }}
                            >
                                {expandedPosts.has(item.newsID) ? 'Show Less' : 'Read More'}
                            </Text>
                            <Image
                                source={require('../../../assets/images/profile-arrow.png')}
                                style={{ width: 20, height: 20, marginLeft: 15 }}
                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handleRemovePost(item.newsID)}
                        style={commonStyles.removeButton}
                    >
                        <Image
                            source={require('../../../assets/images/remove.png')}
                            style={commonStyles.removeButton}
                        />
                    </TouchableOpacity>
                </View>
            )}
            ListFooterComponent={
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
            }
        />
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#F2F2F2'
    }
});

export default SavedPosts;