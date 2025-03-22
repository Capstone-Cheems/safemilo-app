// import CourseCard from '@/src/widget/Components/CourseCard'
// import React from 'react'
// import { View, Text, FlatList, StyleSheet } from 'react-native'

// const activeCourses = [
//     { id: '1', title: 'Scam Awareness Basics', progress: 50 }
// ]

// const ActiveCoursesScreen = (): JSX.Element => {
//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Active Courses</Text>
//             <FlatList
//                 data={activeCourses}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <CourseCard
//                         title={item.title}
//                         progress={item.progress}
//                         onPress={() => {}}
//                     />
//                 )}
//             />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#F9F9F9'
//     },
//     header: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 10
//     }
// })

// export default ActiveCoursesScreen

// import CourseCard from '@/src/widget/Components/CourseCard'
// import React from 'react'
// import { View, Text, FlatList } from 'react-native'

// const activeCourses = [
//     { id: '1', title: 'Scam Awareness Basics', progress: 50 }
// ]

// const ActiveCoursesScreen = (): JSX.Element => {
//     return (
//         <View className="flex-1 bg-gray-100 p-6">
//             <Text className="text-2xl font-bold text-gray-900 mb-4">
//                 Active Courses
//             </Text>
//             <FlatList
//                 data={activeCourses}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <CourseCard
//                         title={item.title}
//                         progress={item.progress}
//                         onPress={() => {}}
//                     />
//                 )}
//                 contentContainerStyle={{ alignItems: 'center' }}
//             />
//         </View>
//     )
// }

// export default ActiveCoursesScreen
import CourseCard from '@/src/widget/Components/CourseCard'
import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Course = {
    id: string
    title: string
    progress: number
}

const defaultCourses: Course[] = [
    { id: '1', title: 'Scam Awareness Basics', progress: 0 },
    { id: '2', title: 'Phishing Scams 101', progress: 0 },
    { id: '3', title: 'Online Shopping Fraud', progress: 0 },
    { id: '4', title: 'Investment Scams', progress: 0 }
]

const ActiveCoursesScreen = (): JSX.Element => {
    const [activeCourses, setActiveCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        const fetchCourses = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys()
                const completedKeys = keys.filter(key =>
                    key.startsWith('completedModule_')
                )

                const updated = await Promise.all(
                    defaultCourses.map(async course => {
                        const progress = await AsyncStorage.getItem(
                            `quizProgress_${course.id}`
                        )
                        return {
                            ...course,
                            progress: progress ? parseInt(progress) : 0
                        }
                    })
                )

                const filtered = updated.filter(
                    course =>
                        !completedKeys.includes(`completedModule_${course.id}`)
                )

                setActiveCourses(filtered)
            } catch (err) {
                console.error('Failed to load active courses:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    return (
        <View className="flex-1 bg-gray-100 p-6">
            <Text className="text-2xl font-bold text-gray-900 mb-4">
                Active Courses
            </Text>

            {loading ? (
                <ActivityIndicator size="large" color="#000" />
            ) : (
                <FlatList
                    data={activeCourses}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CourseCard
                            title={item.title}
                            progress={item.progress}
                            onPress={() => {}}
                        />
                    )}
                    contentContainerStyle={{ alignItems: 'center' }}
                />
            )}
        </View>
    )
}

export default ActiveCoursesScreen
