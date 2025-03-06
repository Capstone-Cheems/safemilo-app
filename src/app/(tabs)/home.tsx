import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native'
import { Box } from '@/components/ui/box'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const tips = [
    'Never share One Time Password or codes with anyone, not even your bank!',
    'Be cautious of emails asking for personal information, phishing scams are common.',
    'If a deal sounds too good to be true, it probably is a scam!',
    'Avoid clicking on unknown links in messages or emails.'
]

const Home = (): React.JSX.Element => {
    const router = useRouter()
    const [randomTip, setRandomTip] = useState<string>('')

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tips.length)
        setRandomTip(tips[randomIndex])
    }, [])

    const checkProfile = (): void => {
        router.push('/profile')
    }

    const checkNotification = (): void => {
        router.push('/notification')
    }

    return (
        <ScrollView className="p-4 bg-white">
            {/* Welcome Message */}
            <View className="mb-4 flex-row justify-between items-center">
                <View>
                    <Text className="text-[1.5rem] font-semibold">
                        Welcome,
                    </Text>
                    <Text className="text-xl font-bold">User</Text>
                </View>
                <View className="flex-row gap-4">
                    <TouchableOpacity onPress={checkProfile}>
                        <Image
                            // eslint-disable-next-line @typescript-eslint/no-require-imports
                            source={require('../../../assets/images/profile-icon.png')}
                            style={commonStyles.backIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={checkNotification}>
                        <Image
                            // eslint-disable-next-line @typescript-eslint/no-require-imports
                            source={require('../../../assets/images/notification-icon.png')}
                            style={commonStyles.backIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tip of the Day */}
            <Box className="bg-gray-100 rounded-2xl px-4 py-8 mb-6">
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
                <TouchableOpacity
                    className="flex-row bg-yellow-100 rounded-2xl"
                    onPress={() => router.push('/news/news')}
                >
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/home-news.png')}
                        className="w-30 h-36"
                        style={{ bottom: -14 }}
                        resizeMode="contain"
                    />
                    <View className="flex-1 gap-4 bg-gray-100 p-4 rounded-tr-2xl rounded-br-2xl">
                        <Text className="text-[24px] font-bold">News</Text>
                        <Text className="text-[16px]">
                            Read the scam-related news from verified authorities
                        </Text>
                        <Text className="text-[16px]">Read News {'>'}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row bg-orange-100 rounded-2xl"
                    onPress={() => router.push('/screening/calls')}
                >
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/home-call.png')}
                        className="w-30 h-36"
                        style={{ bottom: -10 }}
                        resizeMode="contain"
                    />
                    <View className="flex-1 gap-4 bg-gray-100 p-4 rounded-tr-2xl rounded-br-2xl">
                        <Text className="text-[24px] font-bold">Calls</Text>
                        <Text className="text-[16px]">
                            For the list of phone numbers identified as scams
                        </Text>
                        <Text className="text-[16px]">View More {'>'}</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row bg-blue-100 rounded-2xl"
                    onPress={() => router.push('/screening/messages')}
                >
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/home-message.png')}
                        className="w-44 h-36"
                        style={{ bottom: -16 }}
                        resizeMode="contain"
                    />
                    <View className="flex-1 gap-4 bg-gray-100 p-4 rounded-tr-2xl rounded-br-2xl">
                        <Text className="text-[24px] font-bold">Message</Text>
                        <Text className="text-[16px]">
                            For the list of messages flagged as scams
                        </Text>
                        <Text className="text-[16px]">View More {'>'}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Home
