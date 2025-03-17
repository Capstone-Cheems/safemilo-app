import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native'
import { Box } from '@/components/ui/box'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import { useAuth } from '@/src/shared'
const tips = [
    'Never share One Time Password or codes with anyone, not even your bank!',
    'Be cautious of emails asking for personal information, phishing scams are common.',
    'If a deal sounds too good to be true, it probably is a scam!',
    'Avoid clicking on unknown links in messages or emails.'
]

const Home = (): React.JSX.Element => {
    const router = useRouter()
    const [randomTip, setRandomTip] = useState<string>('')
    const { user } = useAuth()

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tips.length)
        setRandomTip(tips[randomIndex])
    }, [])

    return (
        <ScrollView className="p-4 bg-gray-100">
            {/* Welcome Message */}
            {/*<View className="mb-4 flex-row justify-between items-center">
                <View>
                    <Text className="text-[1.5rem] font-semibold">
                        Welcome,{user?.email}
                    </Text>
                </View>
            </View>*/}

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
                        <Text className="text-[24px] font-bold">
                            Milo’s Tip of the Day
                        </Text>
                    </View>
                    <Text className="text-[16px] mx-4">{randomTip}</Text>
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
                        <Text className="text-[24px] font-bold">News</Text>
                        <Text className="text-[16px]">
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
                        <Text className="text-[24px] font-bold">Calls</Text>
                        <Text className="text-[16px]">
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
                        <Text className="text-[24px] font-bold">Message</Text>
                        <Text className="text-[16px]">
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
