import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native'
import { Box } from '@/components/ui/box'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import { useAuth } from '@/src/shared'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
    const [textSize, setTextSize] = useState<number>(20) // Default text size
    const [isBold, setIsBold] = useState<boolean>(true) // Default bold state
    const router = useRouter()
    const [randomTip, setRandomTip] = useState<string>('')
    const { user } = useAuth()

    const loadSettings = useCallback(async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize')
            if (storedSize) setTextSize(parseInt(storedSize)) // Set size if exists
        } catch (error) {
            console.error('Error loading settings:', error)
        }
        try {
            const storedBold = await AsyncStorage.getItem('isBold')
            if (storedBold) setIsBold(storedBold === 'true') // Convert string to boolean
        } catch (error) {
            console.error('Error loading settings:', error)
        }
    }, [])

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tips.length)
        setRandomTip(tips[randomIndex])
    }, [])

    return (
        <ScrollView className="p-4 bg-gray-100">
            {/* Welcome Message */}
            <View className="mb-4 flex-row justify-between items-center">
                <View>
                    <Text
                        className="text-[1.5rem] font-semibold"
                        style={{ fontSize: textSize + 6 }}
                    >
                        Welcome,{user?.displayName}
                    </Text>
                </View>
            </View>

            {/* Tip of the Day */}
            <Box className="bg-white rounded-2xl px-4 py-8 mb-6">
                <View className="flex-col items-center gap-4">
                    <View className="flex-row items-center w-[100%]">
                        <Image
                            // eslint-disable-next-line @typescript-eslint/no-require-imports
                            source={require('../../../assets/images/home-tip.png')}
                            className="w-20 h-22 mr-4"
                            resizeMode="contain"
                        />
                        <Text
                            style={{
                                fontSize: textSize + 5,
                                fontWeight: isBold ? 'bold' : 'normal'
                            }}
                        >
                            Milo’s Tip of the Day
                        </Text>
                    </View>
                    <Text
                        style={{
                            fontSize: textSize - 4,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }}
                    >
                        {randomTip}
                    </Text>
                </View>
            </Box>

            {/* Main Section */}
            <View className="flex-col gap-8 mb-8">
                <View className="flex-row bg-yellow-100 rounded-2xl">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/home-news.png')}
                        className="w-30 h-max rounded-tl-2xl rounded-bl-2xl"
                        resizeMode="contain"
                    />
                    <View className="flex-1 gap-4 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
                        <Text
                            style={{
                                fontSize: textSize + 3,
                                fontWeight: isBold ? 'bold' : 'normal'
                            }}
                        >
                            News
                        </Text>
                        <Text
                            style={{
                                fontSize: textSize - 4,
                                fontWeight: isBold ? 'bold' : 'normal'
                            }}
                        >
                            Read the scam-related news from verified authorities
                        </Text>

                        <TouchableOpacity
                            style={commonStyles.longButton}
                            onPress={() => router.push('/news/news')}
                        >
                            <Text style={commonStyles.buttonText}>
                                Read News
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row bg-orange-100 rounded-2xl">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/home-call.png')}
                        className="w-30 h-max rounded-tl-2xl rounded-bl-2xl"
                        resizeMode="contain"
                    />
                    <View className="flex-1 gap-4 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
                        <Text
                            style={{
                                fontSize: textSize + 3,
                                fontWeight: isBold ? 'bold' : 'normal'
                            }}
                        >
                            Calls
                        </Text>
                        <Text
                            style={{
                                fontSize: textSize - 4,
                                fontWeight: isBold ? 'bold' : 'normal'
                            }}
                        >
                            For the list of phone numbers identified as scams
                        </Text>

                        <TouchableOpacity
                            style={commonStyles.longButton}
                            onPress={() => router.push('/screening/calls')}
                        >
                            <Text style={commonStyles.buttonText}>
                                View More
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="flex-row bg-blue-100 rounded-2xl">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/home-message.png')}
                        className="w-30 h-max rounded-tl-2xl rounded-bl-2xl"
                        resizeMode="contain"
                    />
                    <View className="flex-1 gap-4 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
                        <Text
                            style={{
                                fontSize: textSize + 3,
                                fontWeight: isBold ? 'bold' : 'normal'
                            }}
                        >
                            Message
                        </Text>
                        <Text
                            style={{
                                fontSize: textSize - 4,
                                fontWeight: isBold ? 'bold' : 'normal'
                            }}
                        >
                            For the list of messages flagged as scams
                        </Text>

                        <TouchableOpacity
                            style={commonStyles.longButton}
                            onPress={() => router.push('/screening/messages')}
                        >
                            <Text style={commonStyles.buttonText}>
                                View More
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Home
