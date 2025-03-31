import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, View, TouchableOpacity, Image } from 'react-native'
import { Box } from '@/components/ui/box'
import { useFocusEffect, useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import { useAuth } from '@/src/shared'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFonts } from 'expo-font';
import {
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import { Text } from '@/components/ui/text'
const tips = [
    'Never share One Time Password or codes with anyone, not even your bank!',
    'Be cautious of emails asking for personal information, phishing scams are common.',
    'If a deal sounds too good to be true, it probably is a scam!',
    'Avoid clicking on unknown links in messages or emails.',
    'Always verify the legitimacy of a website before entering your payment details.',
    'Never give out personal information unless you are sure of the requester’s identity.',
    'If you’re not sure about a phone call or email, it’s okay to hang up or delete it and check back with the company or person directly.',
    'If you receive a call from someone claiming to be from a government agency or a company, hang up and call them back using an official number.'
]

const Home = (): React.JSX.Element => {
    const [textSize, setTextSize] = useState<number>(28)
    const [isBold, setIsBold] = useState<boolean>(false)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const navigation = useNavigation()
    const [randomTip, setRandomTip] = useState<string>('')
    const { user } = useAuth()

    interface UserData {
        displayName: string | null;
        email: string;
        uid: string;
        providerData: { providerId: string }[];
        photoURL: string | null;
    }

     const loadSettings = useCallback(async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize')
            if (storedSize) setTextSize(parseInt(storedSize))
        } catch (error) {
            console.error('Error loading settings:', error)
        }
        try {
            const storedBold = await AsyncStorage.getItem('isBold')
            if (storedBold) setIsBold(storedBold === 'true')
        } catch (error) {
            console.error('Error loading settings:', error)
        }
    }, [])

      // Load settings when the screen is focused
        useFocusEffect(
            useCallback(() => {
                loadSettings()
            }, [loadSettings])
        )

     const [fontsLoaded] = useFonts({
                Montserrat_400Regular,
                Montserrat_700Bold,
                Montserrat_500Medium,
                Montserrat_300Light,
                Montserrat_600SemiBold
            });
        

    // Set the navigation title
    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <Box style={{ marginLeft: -150, padding:2}}>
                    <Text
                        style={{
                            fontSize: textSize - 4,
                            fontFamily: 'Montserrat_700Bold',
                            paddingTop:15,
                            color: '#0A2941'
                        }}
                    >
                        Welcome,
                    </Text>
                    <Text
                        style={{
                            fontSize: textSize - 8,
                            fontFamily:  'Montserrat_600SemiBold',
                            paddingTop:2,
                            color:'#0A2941'
                        }}
                    >
                        {user?.displayName || 'User'}
                    </Text>
                </Box>
            ),
            headerStyle: { backgroundColor: 'white' },
        })
    }, [navigation, user?.displayName, textSize, isBold])

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tips.length)
        setRandomTip(tips[randomIndex])
    }, [])

    return (
        <ScrollView className="p-4 bg-[#DADADA]">
            {/* Tip of the Day */}
            <Box className="bg-white rounded-2xl px-4 py-8 mb-6">
                <View className="flex-col items-center gap-4">
                    <View className="flex-row items-center">
                        <Image
                            source={require('../../../assets/images/home-tip.png')}
                            resizeMode="contain"
                        />
                        <Text
                            style={{
                                fontSize: textSize - 2,
                                fontFamily:  'Montserrat_700Bold',
                            }}
                           className='p-2 color-[#1C1C1C]'
                        >
                            Milo’s Tip of the Day
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: textSize - 8,
                            fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                        }}
                        className='color-[#000000]'
                    >
                        {randomTip}
                    </Text>
                </View>
            </Box>

            {/* Main Section */}
            <View className="flex-col gap-8 mb-32">
                <View className="flex-row bg-yellow-100 rounded-2xl">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/home-news.png')}
                        className="w-30 h-full rounded-tl-2xl rounded-bl-2xl"
                        resizeMode="cover"
                    />
                    <View className="flex-1 gap-4 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
                        <Text
                            style={{
                                fontSize: textSize,
                                fontFamily: 'Montserrat_700Bold' ,
                            }}
                            className='p-2 color-[#1C1C1C]'
                        >
                            News
                        </Text>
                        <Text
                            style={{
                                fontSize: textSize - 10,
                                fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                            }}
                            className='color-[#1C1C1C]'
                        >
                            Read the scam-related news from verified authorities
                        </Text>

                        <TouchableOpacity
                            style={commonStyles.longButtonNew}
                            onPress={() => router.push('/news/news')}
                        >
                            <Text style={[commonStyles.homebuttonText, {
                                fontSize: textSize - 8,
                                fontFamily: 'Montserrat_600SemiBold',
                            }]}>
                                Read news
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row bg-orange-100 rounded-2xl">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/home-call.png')}
                        className="w-30 h-full rounded-tl-2xl rounded-bl-2xl"
                        resizeMode="cover"
                    />
                    <View className="flex-1 gap-4 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
                        <Text
                            style={{
                                fontSize: textSize ,
                                fontFamily:  'Montserrat_700Bold',
                            }}
                            className='p-2 color-[#1C1C1C]'
                        >
                            Calls
                        </Text>
                        <Text
                            style={{
                                fontSize: textSize - 10,
                                fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                            }}
                            className='color-[#1C1C1C]'
                        >
                            For the list of phone numbers identified as scams
                        </Text>

                        <TouchableOpacity
                            style={commonStyles.longButtonNew}
                            onPress={() => router.push('/screening/calls')}
                        >
                            <Text style={[commonStyles.homebuttonText, {
                                fontSize: textSize - 8,
                                fontFamily: 'Montserrat_600SemiBold',
                            }]}>
                                View more
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row bg-blue-100 rounded-2xl">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/home-message.png')}
                        className="w-30 h-full rounded-tl-2xl rounded-bl-2xl"
                        resizeMode="cover"
                    />
                    <View className="flex-1 gap-4 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
                        <Text
                            style={{
                                fontSize: textSize ,
                                fontFamily: 'Montserrat_700Bold',
                            }}
                            className='p-2 color-[#1C1C1C]'
                        >
                            Message
                        </Text>
                        <Text
                            style={{
                                fontSize: textSize - 10,
                                fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                            }}
                            className=' color-[#1C1C1C]'
                        >
                            For the list of messages flagged as scams
                        </Text>

                        <TouchableOpacity
                            style={commonStyles.longButtonNew}
                            onPress={() => router.push('/screening/messages')}
                        >
                            <Text style={[commonStyles.homebuttonText, {
                                fontSize: textSize - 8,
                                fontFamily:  'Montserrat_600SemiBold',
                            }]}>
                                View more
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Home
