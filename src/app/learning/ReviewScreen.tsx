import { useRouter, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import ModuleCompletionAnimation from '../../../components/ModuleCompleteAnimation'

const ReviewScreen = (): JSX.Element => {
    const router = useRouter()
    const { totalScore } = useLocalSearchParams<{ totalScore?: string }>()
    const finalScore = totalScore ? parseInt(totalScore, 10) : 0

    return (
        <View className="flex-1 bg-blue-300 items-center justify-center p-6">
            {/* Milo Animation */}
            <ModuleCompletionAnimation />

            {/* Completion Message */}
            <View className="bg-white rounded-xl p-6 mt-4 items-center shadow-md">
                <Text className="text-xl font-bold">
                    Woohoo! Module Completed!
                </Text>
                <Text className="text-3xl font-bold text-blue-900 mt-2">
                    +{finalScore} Points Earned
                </Text>
            </View>

            {/* Continue Learning Button */}
            <TouchableOpacity
                className="mt-6 bg-blue-900 px-6 py-3 rounded-lg"
                onPress={() => router.push('/learning')}
            >
                <Text className="text-white text-lg font-semibold">
                    Continue Learning
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default ReviewScreen
