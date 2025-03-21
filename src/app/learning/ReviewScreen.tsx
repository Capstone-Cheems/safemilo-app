/* eslint-disable prettier/prettier */
import { useRouter, useLocalSearchParams } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModuleCompletionAnimation from '../../../components/ModuleCompleteAnimation'

const ReviewScreen = (): JSX.Element => {
    const router = useRouter()
    const { courseId, totalScore } = useLocalSearchParams<{ courseId?: string; totalScore?: string }>()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect((): void => {
        const saveCompletion = async (): Promise<void> => {
            try {
                if (courseId && totalScore) {
                    // Save module as completed in AsyncStorage
                    await AsyncStorage.setItem(`completedModule_${courseId}`, 'true')
                    await AsyncStorage.setItem(`quizScore_${courseId}`, totalScore)
                    console.log(`Saved completion for course ${courseId}`)
                }
            } catch (err) {
                console.error('Error saving quiz result:', err)
            } finally {
                setLoading(false)
            }
        }

        saveCompletion()
    }, [courseId, totalScore])

    if (loading) {
        return (
            <View className="flex-1 bg-blue-300 items-center justify-center">
                <ActivityIndicator size="large" color="white" />
            </View>
        )
    }

    return (
        <View className="flex-1 bg-blue-300 items-center justify-center p-6">
            {/* Milo Animation */}
            <ModuleCompletionAnimation />

            {/* Completion Message */}
            <View className="bg-white rounded-xl p-6 mt-4 items-center shadow-md">
                <Text className="text-xl font-bold">Woohoo! Module Completed!</Text>
                <Text className="text-3xl font-bold text-blue-900 mt-2">+{totalScore} Points Earned</Text>
            </View>

            {/* Continue Learning Button */}
            <TouchableOpacity
                className="mt-6 bg-blue-900 px-6 py-3 rounded-lg"
                onPress={(): void => router.replace('/learning/LearnDashboard')}
            >
                <Text className="text-white text-lg font-semibold">Continue Learning</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ReviewScreen
