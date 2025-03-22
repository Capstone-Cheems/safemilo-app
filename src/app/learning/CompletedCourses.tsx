/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable prettier/prettier */
import React, { useState, useCallback } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRouter } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'

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

  const loadCompleted = useCallback(async (): Promise<void> => {
    try {
      console.log('Fetching completed courses...')
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

      console.log('Updated Completed Courses:', completed)
      setCompletedCourses(completed)
    } catch (err) {
      console.error('Failed to load completed modules:', err)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      console.log('Refreshing completed courses on focus...')
      loadCompleted()
    }, [loadCompleted])
  )

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-3xl font-bold mb-4">Completed Courses</Text>

      <FlatList
        data={completedCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 rounded-xl mb-4 p-4 shadow-md">
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
                  pathname: '/learning/ReviewScreen',
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

// /* eslint-disable @typescript-eslint/no-require-imports */
// /* eslint-disable prettier/prettier */
// import React, { useState, useCallback } from 'react'
// import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { useRouter } from 'expo-router'
// import { useFocusEffect } from '@react-navigation/native'

// type Course = {
//   id: string
//   title: string
//   progress: number
//   score: number
// }

// const defaultCourses = [
//   { id: '1', title: 'Scam Awareness Basics' },
//   { id: '2', title: 'Phishing Scams 101' },
//   { id: '3', title: 'Online Shopping Fraud' },
//   { id: '4', title: 'Investment Scams' }
// ]

// const CompletedCoursesScreen = (): JSX.Element => {
//   const [completedCourses, setCompletedCourses] = useState<Course[]>([])
//   const router = useRouter()

//   const loadCompleted = useCallback(async (): Promise<void> => {
//     try {
//       console.log('Fetching completed courses...')
//       const keys = await AsyncStorage.getAllKeys()
//       const completedKeys = keys.filter((key) =>
//         key.startsWith('completedModule_')
//       )

//       const completedIds = completedKeys.map((key) =>
//         key.replace('completedModule_', '')
//       )

//       const completed: Course[] = []

//       for (const id of completedIds) {
//         const courseMeta = defaultCourses.find((c) => c.id === id)
//         if (!courseMeta) continue

//         const progress = await AsyncStorage.getItem(`quizProgress_${id}`)
//         const score = await AsyncStorage.getItem(`quizScore_${id}`)

//         completed.push({
//           id,
//           title: courseMeta.title,
//           progress: progress ? parseInt(progress) : 100,
//           score: score ? parseInt(score) : 0
//         })
//       }

//       console.log('Updated Completed Courses:', completed)
//       setCompletedCourses(completed)
//     } catch (err) {
//       console.error('Failed to load completed modules:', err)
//     }
//   }, [])

//   useFocusEffect(
//     useCallback(() => {
//       console.log('Refreshing completed courses on focus...')
//       loadCompleted()
//     }, [loadCompleted])
//   )

//   return (
//     <View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
//       <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>
//         Completed Courses
//       </Text>

//       <FlatList
//         data={completedCourses}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View
//             style={{
//               backgroundColor: '#fff',
//               borderRadius: 16,
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 2 },
//               shadowOpacity: 0.1,
//               shadowRadius: 4,
//               elevation: 2,
//               marginBottom: 20,
//               overflow: 'hidden'
//             }}
//           >
//             {/* Image */}
//             <View
//               style={{
//                 width: '100%',
//                 height: 140,
//                 overflow: 'hidden',
//                 borderTopLeftRadius: 16,
//                 borderTopRightRadius: 16
//               }}
//             >
//               <Image
//                 source={require('../../../assets/images/learn-card1.png')}
//                 style={{ width: '100%', height: '100%' }}
//                 resizeMode="cover"
//               />
//             </View>

//             {/* Text Content */}
//             <View style={{ padding: 16 }}>
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: 'bold',
//                   color: '#1C1C1C',
//                   marginBottom: 6
//                 }}
//               >
//                 {item.title}
//               </Text>

//               {/* Add optional description if available */}
//               {/* <Text style={{ fontSize: 14, color: '#4B5563', marginBottom: 8 }}>
//                 Description goes here if you want it later.
//               </Text> */}

//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#6B7280',
//                   marginBottom: 12
//                 }}
//               >
//                 Score: {item.score} / 100
//               </Text>

//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#1980F5',
//                   paddingVertical: 15,
//                   borderRadius: 10,
//                   alignItems: 'center'
//                 }}
//                 onPress={() =>
//                   router.push({
//                     pathname: '/learning/ReviewScreen',
//                     params: { courseId: item.id }
//                   })
//                 }
//               >
//                 <Text
//                   style={{
//                     color: '#fff',
//                     fontWeight: 'bold',
//                     fontSize: 18
//                   }}
//                 >
//                   Review
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   )
// }

// export default CompletedCoursesScreen
