/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'

type Course = {
  id: string
  title: string
  progress: number
  score: number
}

const defaultCourses = [
  { id: '1', title: 'Scam Awareness Basics' },
  { id: '2', title: 'Phishing Scams 101' },
  { id: '3', title: 'Online Shopping Fraud' },
  { id: '4', title: 'Investment Scams' }
]

const CompletedCoursesScreen = (): JSX.Element => {
  const [completedCourses, setCompletedCourses] = useState<Course[]>([])
  const router = useRouter()

  useEffect(() => {
    const loadCompleted = async (): Promise<void> => {
      try {
        const keys = await AsyncStorage.getAllKeys()
        const completedKeys = keys.filter((key) =>
          key.startsWith('completedModule_')
        )

        const completedIds = completedKeys.map((key) =>
          key.replace('completedModule_', '')
        )

        const completed: Course[] = []

        for (const id of completedIds) {
          const courseMeta = defaultCourses.find((c) => c.id === id)
          if (!courseMeta) continue

          const progress = await AsyncStorage.getItem(`quizProgress_${id}`)
          const score = await AsyncStorage.getItem(`quizScore_${id}`)

          completed.push({
            id,
            title: courseMeta.title,
            progress: progress ? parseInt(progress) : 100,
            score: score ? parseInt(score) : 0
          })
        }

        setCompletedCourses(completed)
      } catch (err) {
        console.error('Failed to load completed modules:', err)
      }
    }

    loadCompleted()
  }, [])

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-3xl font-bold mb-4">Completed Courses</Text>

      <FlatList
        data={completedCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 rounded-xl mb-4 p-4">
            <View className="flex-row items-center">
              <Image
                source={require('../../../assets/images/learn-card1.png')}
                className="w-20 h-20 mr-4"
                resizeMode="contain"
              />
              <View className="flex-1">
                <Text className="text-lg font-bold">{item.title}</Text>
                <Text className="text-sm text-gray-600">
                  Score: {item.score} / 100
                </Text>
              </View>
            </View>

            <TouchableOpacity
              className="mt-4 bg-blue-900 px-4 py-2 rounded-lg items-center"
              onPress={() =>
                router.push({
                  pathname: '/learning/review',
                  params: { courseId: item.id }
                })
              }
            >
              <Text className="text-white font-semibold">Review</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  )
}

export default CompletedCoursesScreen
