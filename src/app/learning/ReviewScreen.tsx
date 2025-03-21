import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'

// ✅ Ensure this path is correct and the animation file exists
import ModuleCompleteAnimation from '@/components/ModuleCompleteAnimation'

const ReviewScreen = (): JSX.Element => {
    const router = useRouter()
    const { totalScore } = useLocalSearchParams<{ totalScore?: string }>()

    return (
        <View className="flex-1 bg-[#3B82F6] items-center justify-center px-6">
            {/* ✅ Animation */}
            <ModuleCompleteAnimation style={{ width: 200, height: 200 }} />

            {/* ✅ Speech Bubble */}
            <View className="bg-white px-6 py-3 rounded-2xl shadow-lg mt-4">
                <Text className="text-xl font-bold text-center">
                    Woohoo! Module Completed!
                </Text>
            </View>

            {/* ✅ Points Earned */}
            <View className="bg-white rounded-xl p-6 mt-6 w-64 items-center shadow-md">
                <Text className="text-3xl font-bold text-blue-900">
                    +{totalScore || 0} Points Earned
                </Text>
            </View>

            {/* ✅ Continue Learning Button */}
            <TouchableOpacity
                className="mt-6 bg-blue-900 px-6 py-3 rounded-lg w-64"
                onPress={() => router.replace('/(tabs)/learn')}
            >
                <Text className="text-white text-lg font-semibold text-center">
                    Continue Learning
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ReviewScreen
