import React from 'react'
import { ScrollView, Text, View, TouchableOpacity, Image } from 'react-native'
import { Box } from '@/components/ui/box'
import { useRouter } from 'expo-router'

const Home = (): React.JSX.Element => {
    const router = useRouter()

    return (
        <ScrollView className="p-4 bg-white">
            {/* Welcome Message */}
            <View className="mb-4">
                <Text className="text-lg font-semibold">Welcome,</Text>
                <Text className="text-xl font-bold">User</Text>
            </View>

            {/* Tip of the Day */}
            <Box className="bg-gray-100 rounded-2xl p-4 mb-6 shadow-md">
                <View className="flex-row items-center">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/raw-circle-arrow-left.png')}
                        className="w-14 h-14 mr-4"
                        resizeMode="contain"
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-bold">
                            Milo’s Tip of the Day
                        </Text>
                        <Text className="text-sm text-gray-600">
                            Never share One time password or codes with
                            anyone—not even your bank!
                        </Text>
                    </View>
                </View>
            </Box>

            {/* Main Section */}
            <View className="space-y-4">
                <TouchableOpacity
                    className="flex-row bg-yellow-100 rounded-2xl p-4 shadow-md"
                    onPress={() => router.push('/news')}
                >
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/raw-circle-arrow-left.png')}
                        className="w-14 h-14 mr-4"
                        resizeMode="contain"
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-bold">News</Text>
                        <Text className="text-sm text-gray-600">
                            Read the scam-related news from verified authorities
                        </Text>
                        <Text className="text-blue-500 mt-2">
                            Read News {'>'}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row bg-orange-100 rounded-2xl p-4 shadow-md"
                    onPress={() => router.push('/calls')}
                >
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/raw-circle-arrow-left.png')}
                        className="w-14 h-14 mr-4"
                        resizeMode="contain"
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-bold">Calls</Text>
                        <Text className="text-sm text-gray-600">
                            For the list of phone numbers identified as scams
                        </Text>
                        <Text className="text-blue-500 mt-2">
                            View More {'>'}
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row bg-blue-100 rounded-2xl p-4 shadow-md"
                    onPress={() => router.push('/messages')}
                >
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/raw-circle-arrow-left.png')}
                        className="w-14 h-14 mr-4"
                        resizeMode="contain"
                    />
                    <View className="flex-1">
                        <Text className="text-lg font-bold">Message</Text>
                        <Text className="text-sm text-gray-600">
                            For the list of messages flagged as scams
                        </Text>
                        <Text className="text-blue-500 mt-2">
                            View More {'>'}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Home
