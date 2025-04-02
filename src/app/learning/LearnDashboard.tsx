// // /* eslint-disable @typescript-eslint/no-require-imports */
// // // import ProgressBar from '@/src/widget/Components/ProgressBar'
// // import { useRouter } from 'expo-router'
// // import React, { useEffect, useState } from 'react'
// // import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
// // import AsyncStorage from '@react-native-async-storage/async-storage'

// // type Course = {
// //     id: string
// //     title: string
// //     progress: number
// // }

// // const defaultCourses: Course[] = [
// //     { id: '1', title: 'Scam Awareness Basics', progress: 60 },
// //     { id: '2', title: 'Phishing Scams 101', progress: 40 },
// //     { id: '3', title: 'Online Shopping Fraud', progress: 30 },
// //     { id: '4', title: 'Investment Scams', progress: 20 }
// // ]

// // const LearnDashboardScreen = (): JSX.Element => {
// //     const router = useRouter()
// //     const [activeCourses, setActiveCourses] = useState<Course[]>(defaultCourses)
// //     const [completedCourses, setCompletedCourses] = useState<Course[]>([])
// //     const [awarenessScore, setAwarenessScore] = useState<number>(0)

// //     useEffect(() => {
// //         const fetchProgress = async (): Promise<void> => {
// //             try {
// //                 const keys = await AsyncStorage.getAllKeys()
// //                 console.log('Stored AsyncStorage Keys:', keys)

// //                 const completedModules = keys.filter(key =>
// //                     key.startsWith('completedModule_')
// //                 )
// //                 setAwarenessScore(completedModules.length * 50)
// //                 console.log('Completed Modules Keys:', completedModules)

// //                 const updatedCourses = await Promise.all(
// //                     defaultCourses.map(async (course): Promise<Course> => {
// //                         const storedProgress = await AsyncStorage.getItem(
// //                             `quizProgress_${course.id}`
// //                         )
// //                         return {
// //                             ...course,
// //                             progress: storedProgress
// //                                 ? JSON.parse(storedProgress)
// //                                 : 0
// //                         }
// //                     })
// //                 )

// //                 console.log('Updated Courses with Progress:', updatedCourses)

// //                 setActiveCourses(
// //                     updatedCourses.filter(
// //                         course =>
// //                             !completedModules.includes(
// //                                 `completedModule_${course.id}`
// //                             )
// //                     )
// //                 )
// //                 setCompletedCourses(
// //                     updatedCourses.filter(course =>
// //                         completedModules.includes(
// //                             `completedModule_${course.id}`
// //                         )
// //                     )
// //                 )
// //             } catch (error) {
// //                 console.error('Error fetching progress:', error)
// //             }
// //         }

// //         fetchProgress()
// //     }, [])

// //     return (
// //         <View className="flex-1 bg-gray-100 p-4">
// //             <Text className="text-3xl font-[<Montserrat-Bold>]">Learn</Text>
// //             <Text className="text-lg text-gray-600 mb-4 font-[<Montserrat-SemiBold>]">
// //                 Learn how to spot scams, recognize red flags, and take action in
// //                 time.
// //             </Text>

// //             {/* Active Courses Section
// //             <Text className="text-2xl font-bold mb-2">Active Courses</Text>
// //             <FlatList
// //                 data={activeCourses}
// //                 horizontal
// //                 showsHorizontalScrollIndicator={false}
// //                 keyExtractor={item => item.id}
// //                 renderItem={({ item }) => (
// //                     <TouchableOpacity
// //                         className="bg-white shadow-md rounded-2xl w-64 overflow-hidden mr-4"
// //                         onPress={() =>
// //                             router.push({
// //                                 pathname: '/learning/Lesson',
// //                                 params: { courseId: item.id }
// //                             })
// //                         }
// //                     >
// //                         <View
// //                             style={{
// //                                 width: '100%',
// //                                 height: 160,
// //                                 overflow: 'hidden',
// //                                 borderTopLeftRadius: 16,
// //                                 borderTopRightRadius: 16
// //                             }}
// //                         >
// //                             <Image
// //                                 source={require('../../../assets/images/learn-card1.png')}
// //                                 style={{ width: '100%', height: '100%' }}
// //                                 resizeMode="cover"
// //                             />
// //                         </View>

// //                         <View className="p-4">
// //                             <Text className="text-lg font-bold">
// //                                 {item.title}
// //                             </Text>
// //                             <View className="flex-row justify-between items-center mt-1">
// //                                 <Text className="text-sm text-gray-600">
// //                                     Lesson {Math.round(item.progress / 10)}/10
// //                                 </Text>
// //                                 <Text className="text-sm font-semibold text-gray-800">
// //                                     {item.progress}% Complete
// //                                 </Text>
// //                             </View>

// //                             <ProgressBar progress={item.progress} />

// //                             <TouchableOpacity
// //                                 className="mt-3 bg-blue-900 p-3 rounded-lg items-center"
// //                                 onPress={() =>
// //                                     router.push({
// //                                         pathname: '/learning/Lesson',
// //                                         params: { courseId: item.id }
// //                                     })
// //                                 }
// //                             >
// //                                 <Text className="text-white font-semibold">
// //                                     {item.progress > 0
// //                                         ? 'Continue Learning'
// //                                         : 'Start Learning'}
// //                                 </Text>
// //                             </TouchableOpacity>
// //                         </View>
// //                     </TouchableOpacity>
// //                 )}
// //             /> */}
// //             {/* Active Courses Section */}
// //             <Text
// //                 style={{
// //                     fontSize: 20,
// //                     fontFamily: 'Montserrat-Bold',
// //                     marginBottom: 8
// //                 }}
// //             >
// //                 Active Courses
// //             </Text>
// //             <FlatList
// //                 data={activeCourses}
// //                 horizontal
// //                 showsHorizontalScrollIndicator={false}
// //                 keyExtractor={item => item.id}
// //                 renderItem={({ item }) => (
// //                     <TouchableOpacity
// //                         style={{
// //                             backgroundColor: '#fff',
// //                             borderRadius: 16,
// //                             shadowColor: '#000',
// //                             shadowOffset: { width: 0, height: 2 },
// //                             shadowOpacity: 0.1,
// //                             shadowRadius: 4,
// //                             elevation: 2,
// //                             overflow: 'hidden',
// //                             width: 260,
// //                             marginRight: 16
// //                         }}
// //                         onPress={() =>
// //                             router.push({
// //                                 pathname: '/learning/Lesson',
// //                                 params: { courseId: item.id }
// //                             })
// //                         }
// //                     >
// //                         {/* Top Image */}
// //                         <View
// //                             style={{
// //                                 width: '100%',
// //                                 height: 140,
// //                                 overflow: 'hidden',
// //                                 borderTopLeftRadius: 16,
// //                                 borderTopRightRadius: 16
// //                             }}
// //                         >
// //                             <Image
// //                                 source={require('../../../assets/images/learn-card1.png')}
// //                                 style={{ width: '100%', height: '100%' }}
// //                                 resizeMode="cover"
// //                             />
// //                         </View>

// //                         {/* Card Content */}
// //                         <View style={{ padding: 16 }}>
// //                             <Text
// //                                 style={{
// //                                     fontSize: 18,
// //                                     fontFamily: 'Montserrat-Bold',
// //                                     marginBottom: 4
// //                                 }}
// //                             >
// //                                 {item.title}
// //                             </Text>

// //                             <View
// //                                 style={{
// //                                     flexDirection: 'row',
// //                                     justifyContent: 'space-between',
// //                                     marginBottom: 6
// //                                 }}
// //                             >
// //                                 <Text
// //                                     style={{
// //                                         fontSize: 14,
// //                                         color: '#6B7280',
// //                                         fontFamily: 'Montserrat-SemiBold'
// //                                     }}
// //                                 >
// //                                     Lesson {Math.round(item.progress / 10)}
// //                                     /10
// //                                 </Text>
// //                                 <Text
// //                                     style={{
// //                                         fontSize: 14,
// //                                         fontFamily: 'Montserrat-SemiBold',
// //                                         color: '#1F2937'
// //                                     }}
// //                                 >
// //                                     {item.progress || 0}% Complete
// //                                 </Text>
// //                             </View>

// //                             {/* Progress Bar */}
// //                             <View
// //                                 style={{
// //                                     height: 15,
// //                                     width: '100%',
// //                                     backgroundColor: '#D1D1D1',
// //                                     borderRadius: 12,
// //                                     overflow: 'hidden',
// //                                     marginTop: 8,
// //                                     marginBottom: 12
// //                                 }}
// //                             >
// //                                 <View
// //                                     style={{
// //                                         height: '100%',
// //                                         width: `${item.progress || 0}%`, // ✅ Use progress or default to 0
// //                                         backgroundColor: '#1980F5',
// //                                         borderRadius: 12
// //                                     }}
// //                                 />
// //                             </View>

// //                             {/* Button */}
// //                             <TouchableOpacity
// //                                 style={{
// //                                     backgroundColor: '#0A2941',
// //                                     paddingVertical: 15,
// //                                     borderRadius: 10,
// //                                     alignItems: 'center'
// //                                 }}
// //                                 onPress={() =>
// //                                     router.push({
// //                                         pathname: '/learning/Lesson',
// //                                         params: { courseId: item.id }
// //                                     })
// //                                 }
// //                             >
// //                                 <Text
// //                                     style={{
// //                                         color: '#fff',
// //                                         fontFamily: 'Montserrat-Bold',
// //                                         fontSize: 20
// //                                     }}
// //                                 >
// //                                     {item.progress > 0
// //                                         ? 'Continue Learning'
// //                                         : 'Start Learning'}
// //                                 </Text>
// //                             </TouchableOpacity>
// //                         </View>
// //                     </TouchableOpacity>
// //                 )}
// //             />

// //             {/* Completed Courses Section */}
// //             {completedCourses.length > 0 && (
// //                 <>
// //                     <Text
// //                         style={{
// //                             fontSize: 20,
// //                             fontFamily: 'Montserrat-Bold',
// //                             marginTop: 24,
// //                             marginBottom: 8
// //                         }}
// //                     >
// //                         Completed Courses
// //                     </Text>
// //                     <FlatList
// //                         data={completedCourses}
// //                         horizontal
// //                         showsHorizontalScrollIndicator={false}
// //                         keyExtractor={item => item.id}
// //                         renderItem={({ item }) => (
// //                             <TouchableOpacity
// //                                 style={{
// //                                     backgroundColor: '#fff',
// //                                     borderRadius: 16,
// //                                     shadowColor: '#000',
// //                                     shadowOffset: { width: 0, height: 2 },
// //                                     shadowOpacity: 0.1,
// //                                     shadowRadius: 4,
// //                                     elevation: 2,
// //                                     overflow: 'hidden',
// //                                     width: 260,
// //                                     marginRight: 16
// //                                 }}
// //                                 onPress={() =>
// //                                     router.push({
// //                                         pathname: '/learning/Lesson',
// //                                         params: { courseId: item.id }
// //                                     })
// //                                 }
// //                             >
// //                                 {/* Image Section */}
// //                                 <View
// //                                     style={{
// //                                         width: '100%',
// //                                         height: 140,
// //                                         overflow: 'hidden',
// //                                         borderTopLeftRadius: 16,
// //                                         borderTopRightRadius: 16
// //                                     }}
// //                                 >
// //                                     <Image
// //                                         source={require('../../../assets/images/learn-card1.png')}
// //                                         style={{
// //                                             width: '100%',
// //                                             height: '100%'
// //                                         }}
// //                                         resizeMode="cover"
// //                                     />
// //                                 </View>

// //                                 {/* Text Section */}
// //                                 <View style={{ padding: 16 }}>
// //                                     <Text
// //                                         style={{
// //                                             fontSize: 18,
// //                                             fontFamily: 'Montserrat-Bold',
// //                                             color: '#1C1C1C',
// //                                             marginBottom: -10
// //                                         }}
// //                                     >
// //                                         {item.title}
// //                                     </Text>

// //                                     <Text
// //                                         style={{
// //                                             fontSize: 14,
// //                                             color: '#6B7280',
// //                                             marginBottom: 20,
// //                                             lineHeight: 20,
// //                                             fontFamily: 'Montserrat-SemiBold'
// //                                         }}
// //                                     >
// //                                         You've completed this course! Tap below
// //                                         to review.
// //                                     </Text>

// //                                     <TouchableOpacity
// //                                         style={{
// //                                             backgroundColor: '#0A2941',
// //                                             paddingVertical: 15,
// //                                             borderRadius: 10,
// //                                             alignItems: 'center'
// //                                         }}
// //                                         onPress={() =>
// //                                             router.push({
// //                                                 pathname: '/learning/Lesson',
// //                                                 params: { courseId: item.id }
// //                                             })
// //                                         }
// //                                     >
// //                                         <Text
// //                                             style={{
// //                                                 color: '#fff',
// //                                                 fontFamily: 'Montserrat-Bold',
// //                                                 fontSize: 20
// //                                             }}
// //                                         >
// //                                             Review
// //                                         </Text>
// //                                     </TouchableOpacity>
// //                                 </View>
// //                             </TouchableOpacity>
// //                         )}
// //                     />
// //                 </>
// //             )}

// /* eslint-disable @typescript-eslint/no-require-imports */
// import { useRouter } from 'expo-router'
// import React, { useEffect, useState } from 'react'
// import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Card } from '@/components/ui/card'
// import { VStack } from '@/components/ui/vstack'
// import { Box } from '@/components/ui/box'

// const defaultCourses = [
//   { id: '1', title: 'Scam Awareness Basics', progress: 60 },
//   { id: '2', title: 'Phishing Scams 101', progress: 40 },
//   { id: '3', title: 'Online Shopping Fraud', progress: 30 },
//   { id: '4', title: 'Investment Scams', progress: 20 }
// ]

// const LearnDashboardScreen = (): JSX.Element => {
//   const router = useRouter()
//   const [activeCourses, setActiveCourses] = useState(defaultCourses)
//   const [completedCourses, setCompletedCourses] = useState([])
//   const [awarenessScore, setAwarenessScore] = useState(0)

//   useEffect(() => {
//     const fetchProgress = async (): Promise<void> => {
//       try {
//         const keys = await AsyncStorage.getAllKeys()
//         const completedModules = keys.filter(key => key.startsWith('completedModule_'))
//         setAwarenessScore(completedModules.length * 50)

//         const updatedCourses = await Promise.all(
//           defaultCourses.map(async course => {
//             const storedProgress = await AsyncStorage.getItem(`quizProgress_${course.id}`)
//             return {
//               ...course,
//               progress: storedProgress ? JSON.parse(storedProgress) : 0
//             }
//           })
//         )

//         setActiveCourses(updatedCourses.filter(course => !completedModules.includes(`completedModule_${course.id}`)))
//         setCompletedCourses(updatedCourses.filter(course => completedModules.includes(`completedModule_${course.id}`)))
//       } catch (error) {
//         console.error('Error fetching progress:', error)
//       }
//     }

//     fetchProgress()
//   }, [])

//   const renderCourseCard = (item, isCompleted = false) => (
//     <Card className="bg-[#DADADA] w-[260]">
//       <VStack>
//         <Box>
//           <Image
//             source={require('../../../assets/images/learn-card1.png')}
//             style={{ width: '100%', height: 140 }}
//             resizeMode="cover"
//             className="aspect-video max-w-full max-h-full rounded-t-[16]"
//           />
//         </Box>
//         <Box className="flex flex-col justify-between gap-4 bg-white rounded-[16] mt-[-10] px-4 pb-3">
//           <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', alignSelf: 'flex-end' }}>
//             Lesson {Math.round(item.progress / 10)}/10
//           </Text>
//           <Text style={{ fontSize: 20, fontFamily: 'Montserrat-SemiBold' }}>{item.title}</Text>
//           <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Regular' }}>
//             {isCompleted
//               ? "You've completed this course! Tap below to review."
//               : `${item.progress || 0}% Complete`}
//           </Text>
//           <TouchableOpacity
//             onPress={() =>
//               router.push({ pathname: '/learning/Lesson', params: { courseId: item.id } })
//             }
//             style={{ backgroundColor: '#0A2941', paddingVertical: 12, borderRadius: 10, alignItems: 'center' }}
//           >
//             <Text style={{ color: '#fff', fontFamily: 'Montserrat-Bold', fontSize: 18 }}>
//               {isCompleted ? 'Review' : item.progress > 0 ? 'Continue Learning' : 'Start Learning'}
//             </Text>
//           </TouchableOpacity>
//         </Box>
//       </VStack>
//     </Card>
//   )

//   return (
//     <View className="flex-1 bg-gray-100 p-4">
//       <Text className="text-3xl font-[<Montserrat-Bold>]">Learn</Text>
//       <Text className="text-lg text-gray-600 mb-4 font-[<Montserrat-SemiBold>]">
//         Learn how to spot scams, recognize red flags, and take action in time.
//       </Text>

//       <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginBottom: 8 }}>Active Courses</Text>
//       <FlatList
//         data={activeCourses}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => renderCourseCard(item)}
//       />

//       {completedCourses.length > 0 && (
//         <>
//           <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginTop: 24, marginBottom: 8 }}>
//             Completed Courses
//           </Text>
//           <FlatList
//             data={completedCourses}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             keyExtractor={item => item.id}
//             renderItem={({ item }) => renderCourseCard(item, true)}
//           />
//         </>
//       )}

//             {/* Browse Scam Categories */}
//             <TouchableOpacity
//                 className="flex-row bg-blue-100 rounded-2xl mt-6"
//                 onPress={() => router.push('/learning/BrowseCategories')}
//             >
//                 <Image
//                     source={require('../../../assets/images/learn-browse.png')}
//                     className="w-30 h-max rounded-tl-2xl rounded-bl-2xl"
//                     resizeMode="contain"
//                 />
//                 <View className="flex-1 gap-2 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
//                     <Text className="text-3xl  font-[<Montserrat-Bold>]">
//                         Browse Scam Categories
//                     </Text>
//                     <Text className="text-xl text-gray-600 font-[<Montserrat-SemiBold>]">
//                         Explore more modules!
//                     </Text>

//                     <Image
//                         source={require('../../../assets/images/Card-Navigation.png')}
//                         style={{
//                             marginTop: 20
//                         }}
//                         resizeMode="cover"
//                     />
//                 </View>
//             </TouchableOpacity>

//             {/* Check Out Your Achievements */}
//             <TouchableOpacity
//                 className="flex-row bg-blue-100 rounded-2xl mt-4"
//                 onPress={() => router.push('/learning/Achievements')}
//             >
//                 <Image
//                     source={require('../../../assets/images/learn-achieve.png')}
//                     className="w-30 h-full rounded-tl-2xl rounded-bl-2xl"
//                     resizeMode="contain"
//                 />
//                 <View className="flex-1 gap-2 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
//                     <Text className="text-3xl font-[<Montserrat-Bold>]">
//                         Check out Your Achievements
//                     </Text>
//                     <Text className="text-lg text-gray-600 font-[<Montserrat-SemiBold] mt-2>]">
//                         Your current score:{' '}
//                         <Text className="text-xl font-[<Montserrat-Bold>]">
//                         {awarenessScore}
//                         </Text>
//                     </Text>

//                     <Image
//                         source={require('../../../assets/images/Card-Navigation.png')}
//                         style={{
//                             marginTop: 20
//                         }}
//                         resizeMode="cover"
//                     />
//                 </View>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default LearnDashboardScreen

// /* eslint-disable @typescript-eslint/no-require-imports */
// import { useRouter } from 'expo-router'
// import React, { useEffect, useState } from 'react'
// import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Card } from '@/components/ui/card'
// import { VStack } from '@/components/ui/vstack'
// import { Box } from '@/components/ui/box'

// type Course = {
//   id: string
//   title: string
//   progress: number
// }

// const defaultCourses: Course[] = [
//   { id: '1', title: 'Scam Awareness Basics', progress: 60 },
//   { id: '2', title: 'Phishing Scams 101', progress: 40 },
//   { id: '3', title: 'Online Shopping Fraud', progress: 30 },
//   { id: '4', title: 'Investment Scams', progress: 20 }
// ]

// const LearnDashboardScreen = (): JSX.Element => {
//   const router = useRouter()
//   const [activeCourses, setActiveCourses] = useState<Course[]>([])
//   const [completedCourses, setCompletedCourses] = useState<Course[]>([])
//   const [awarenessScore, setAwarenessScore] = useState<number>(0)

//   useEffect(() => {
//     const fetchProgress = async (): Promise<void> => {
//       try {
//         const keys = await AsyncStorage.getAllKeys()
//         const completedModules = keys.filter(key => key.startsWith('completedModule_'))
//         setAwarenessScore(completedModules.length * 50)

//         const updatedCourses = await Promise.all(
//           defaultCourses.map(async course => {
//             const storedProgress = await AsyncStorage.getItem(`quizProgress_${course.id}`)
//             return {
//               ...course,
//               progress: storedProgress ? JSON.parse(storedProgress) : 0
//             }
//           })
//         )

//         setActiveCourses(
//           updatedCourses.filter(course => !completedModules.includes(`completedModule_${course.id}`))
//         )
//         setCompletedCourses(
//           updatedCourses.filter(course => completedModules.includes(`completedModule_${course.id}`))
//         )
//       } catch (err) {
//         console.error('Error loading progress', err)
//       }
//     }

//     fetchProgress()
//   }, [])

//   const ActiveCourseCard = ({ course }: { course: Course }) => (
//     <Card className="bg-[#DADADA] w-[260] mr-4">
//       <VStack>
//         <Box>
//           <Image
//             source={require('../../../assets/images/learn-card1.png')}
//             style={{ width: '100%', height: 140 }}
//             resizeMode="cover"
//             className="aspect-video max-w-full max-h-full rounded-t-[16]"
//           />
//         </Box>
//         <Box className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4">
//           <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', alignSelf: 'flex-end' }}>
//             Lesson {Math.round(course.progress / 10)}/10
//           </Text>
//           <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Bold' }}>{course.title}</Text>
//           <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: '#374151' }}>
//             {course.progress}% Complete
//           </Text>
//           <View
//             style={{
//               height: 8,
//               backgroundColor: '#E5E7EB',
//               borderRadius: 10,
//               overflow: 'hidden'
//             }}
//           >
//             <View
//               style={{
//                 height: '100%',
//                 width: `${course.progress}%`,
//                 backgroundColor: '#1980F5'
//               }}
//             />
//           </View>
//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/learning/Lesson', params: { courseId: course.id } })}
//             style={{
//               marginTop: 8,
//               backgroundColor: '#0A2941',
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: 'center'
//             }}
//           >
//             <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16 }}>
//               {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
//             </Text>
//           </TouchableOpacity>
//         </Box>
//       </VStack>
//     </Card>
//   )

//   const CompletedCourseCard = ({ course }: { course: Course }) => (
//     <Card className="bg-[#DADADA] w-[260] mr-4">
//       <VStack>
//         <Box>
//           <Image
//             source={require('../../../assets/images/learn-card1.png')}
//             style={{ width: '100%', height: 140 }}
//             resizeMode="cover"
//             className="aspect-video max-w-full max-h-full rounded-t-[16]"
//           />
//         </Box>
//         <Box className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4">
//           <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Bold' }}>{course.title}</Text>
//           <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', color: '#374151' }}>
//             You've completed this course! Tap below to review.
//           </Text>
//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/learning/Lesson', params: { courseId: course.id } })}
//             style={{
//               marginTop: 8,
//               backgroundColor: '#0A2941',
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: 'center'
//             }}
//           >
//             <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16 }}>
//               Review
//             </Text>
//           </TouchableOpacity>
//         </Box>
//       </VStack>
//     </Card>
//   )

//   return (
//     <View style={{ flex: 1, backgroundColor: '#F3F4F6', padding: 16 }}>
//       <Text style={{ fontSize: 28, fontFamily: 'Montserrat-Bold' }}>Learn</Text>
//       <Text style={{ fontSize: 16, fontFamily: 'Montserrat-SemiBold', color: '#6B7280', marginBottom: 16 }}>
//         Learn how to spot scams, recognize red flags, and take action in time.
//       </Text>

//       <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginBottom: 8 }}>Active Courses</Text>
//       <FlatList
//         data={activeCourses}
//         keyExtractor={item => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => <ActiveCourseCard course={item} />}
//       />

//       {completedCourses.length > 0 && (
//         <>
//           <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginVertical: 16 }}>Completed Courses</Text>
//           <FlatList
//             data={completedCourses}
//             keyExtractor={item => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => <CompletedCourseCard course={item} />}
//           />
//         </>
//       )}
//     </View>
//   )
// }

// export default LearnDashboardScreen

// /* eslint-disable @typescript-eslint/no-require-imports */
// import { useRouter } from 'expo-router'
// import React, { useEffect, useState } from 'react'
// import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Card } from '@/components/ui/card'
// import { VStack } from '@/components/ui/vstack'
// import { Box } from '@/components/ui/box'

// type Course = {
//   id: string
//   title: string
//   progress: number
// }

// const defaultCourses: Course[] = [
//   { id: '1', title: 'Scam Awareness Basics', progress: 60 },
//   { id: '2', title: 'Phishing Scams 101', progress: 40 },
//   { id: '3', title: 'Online Shopping Fraud', progress: 30 },
//   { id: '4', title: 'Investment Scams', progress: 20 }
// ]

// const LearnDashboardScreen = (): JSX.Element => {
//   const router = useRouter()
//   const [activeCourses, setActiveCourses] = useState<Course[]>([])
//   const [completedCourses, setCompletedCourses] = useState<Course[]>([])
//   const [awarenessScore, setAwarenessScore] = useState<number>(0)

//   useEffect(() => {
//     const fetchProgress = async (): Promise<void> => {
//       try {
//         const keys = await AsyncStorage.getAllKeys()
//         const completedModules = keys.filter(key => key.startsWith('completedModule_'))
//         setAwarenessScore(completedModules.length * 50)

//         const updatedCourses = await Promise.all(
//           defaultCourses.map(async course => {
//             const storedProgress = await AsyncStorage.getItem(`quizProgress_${course.id}`)
//             return {
//               ...course,
//               progress: storedProgress ? JSON.parse(storedProgress) : 0
//             }
//           })
//         )

//         setActiveCourses(
//           updatedCourses.filter(course => !completedModules.includes(`completedModule_${course.id}`))
//         )
//         setCompletedCourses(
//           updatedCourses.filter(course => completedModules.includes(`completedModule_${course.id}`))
//         )
//       } catch (err) {
//         console.error('Error loading progress', err)
//       }
//     }

//     fetchProgress()
//   }, [])

//   const ActiveCourseCard = ({ course }: { course: Course }) => (
//     <Card className="bg-[#DADADA] w-[260] mr-4">
//       <VStack>
//         <Box>
//           <Image
//             source={require('../../../assets/images/learn-card1.png')}
//             style={{ width: '100%', height: 140 }}
//             resizeMode="cover"
//             className="aspect-video max-w-full max-h-full rounded-t-[16]"
//           />
//         </Box>
//         <Box className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4">
//           <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Bold' }}>{course.title}</Text>

//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: '#374151' }}>
//               {course.progress}% Complete
//             </Text>
//             <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', color: '#374151' }}>
//               Lesson {Math.round(course.progress / 10)}/10
//             </Text>
//           </View>

//           <View
//             style={{
//               height: 8,
//               backgroundColor: '#E5E7EB',
//               borderRadius: 10,
//               overflow: 'hidden'
//             }}
//           >
//             <View
//               style={{
//                 height: '100%',
//                 width: `${course.progress}%`,
//                 backgroundColor: '#1980F5'
//               }}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/learning/Lesson', params: { courseId: course.id } })}
//             style={{
//               marginTop: 8,
//               backgroundColor: '#0A2941',
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: 'center'
//             }}
//           >
//             <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16 }}>
//               {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
//             </Text>
//           </TouchableOpacity>
//         </Box>
//       </VStack>
//     </Card>
//   )

//   const CompletedCourseCard = ({ course }: { course: Course }) => (
//     <Card className="bg-[#DADADA] w-[260] mr-4">
//       <VStack>
//         <Box>
//           <Image
//             source={require('../../../assets/images/learn-card1.png')}
//             style={{ width: '100%', height: 140 }}
//             resizeMode="cover"
//             className="aspect-video max-w-full max-h-full rounded-t-[16]"
//           />
//         </Box>
//         <Box className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4">
//           <Text style={{ fontSize: 18, fontFamily: 'Montserrat-Bold' }}>{course.title}</Text>

//           <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', color: '#374151' }}>
//             You've completed this course! Tap below to review.
//           </Text>

//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/learning/Lesson', params: { courseId: course.id } })}
//             style={{
//               marginTop: 8,
//               backgroundColor: '#0A2941',
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: 'center'
//             }}
//           >
//             <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16 }}>Review</Text>
//           </TouchableOpacity>
//         </Box>
//       </VStack>
//     </Card>
//   )

//   return (
//     <View style={{ flex: 1, backgroundColor: '#F3F4F6', padding: 16 }}>
//       <Text style={{ fontSize: 28, fontFamily: 'Montserrat-Bold' }}>Learn</Text>
//       <Text
//         style={{
//           fontSize: 16,
//           fontFamily: 'Montserrat-SemiBold',
//           color: '#6B7280',
//           marginBottom: 16
//         }}
//       >
//         Learn how to spot scams, recognize red flags, and take action in time.
//       </Text>

//       <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginBottom: 8 }}>Active Courses</Text>
//       <FlatList
//         data={activeCourses}
//         keyExtractor={item => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => <ActiveCourseCard course={item} />}
//       />

//       {completedCourses.length > 0 && (
//         <>
//           <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginVertical: 16 }}>Completed Courses</Text>
//           <FlatList
//             data={completedCourses}
//             keyExtractor={item => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => <CompletedCourseCard course={item} />}
//           />
//         </>
//       )}
//     </View>
//   )
// }

// export default LearnDashboardScreen

// /* eslint-disable @typescript-eslint/no-require-imports */
// import { useRouter } from 'expo-router'
// import React, { useEffect, useState } from 'react'
// import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Card } from '@/components/ui/card'
// import { VStack } from '@/components/ui/vstack'
// import { Box } from '@/components/ui/box'

// type Course = {
//   id: string
//   title: string
//   progress: number
// }

// const defaultCourses: Course[] = [
//   { id: '1', title: 'Scam Awareness Basics', progress: 60 },
//   { id: '2', title: 'Phishing Scams 101', progress: 40 },
//   { id: '3', title: 'Online Shopping Fraud', progress: 30 },
//   { id: '4', title: 'Investment Scams', progress: 20 }
// ]

// const LearnDashboardScreen = (): JSX.Element => {
//   const router = useRouter()
//   const [activeCourses, setActiveCourses] = useState<Course[]>([])
//   const [completedCourses, setCompletedCourses] = useState<Course[]>([])
//   const [awarenessScore, setAwarenessScore] = useState<number>(0)

//   useEffect(() => {
//     const fetchProgress = async (): Promise<void> => {
//       try {
//         const keys = await AsyncStorage.getAllKeys()
//         const completedModules = keys.filter(key => key.startsWith('completedModule_'))
//         setAwarenessScore(completedModules.length * 50)

//         const updatedCourses = await Promise.all(
//           defaultCourses.map(async course => {
//             const storedProgress = await AsyncStorage.getItem(`quizProgress_${course.id}`)
//             return {
//               ...course,
//               progress: storedProgress ? JSON.parse(storedProgress) : 0
//             }
//           })
//         )

//         setActiveCourses(
//           updatedCourses.filter(course => !completedModules.includes(`completedModule_${course.id}`))
//         )
//         setCompletedCourses(
//           updatedCourses.filter(course => completedModules.includes(`completedModule_${course.id}`))
//         )
//       } catch (err) {
//         console.error('Error loading progress', err)
//       }
//     }

//     fetchProgress()
//   }, [])

//   const ActiveCourseCard = ({ course }: { course: Course }) => (
//     <Card className="bg-[#DADADA] w-[260] mr-4">
//       <VStack>
//         <Box>
//           <Image
//             source={require('../../../assets/images/learn-card1.png')}
//             style={{ width: '100%', height: 140 }}
//             resizeMode="cover"
//             className="aspect-video max-w-full max-h-full rounded-t-[16]"
//           />
//         </Box>
//         <Box
//           className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4"
//           style={{ height: 190 }}
//         >
//           <Text
//             numberOfLines={2}
//             ellipsizeMode="tail"
//             style={{ fontSize: 18, fontFamily: 'Montserrat-Bold' }}
//           >
//             {course.title}
//           </Text>

//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: '#374151' }}>
//               {course.progress}% Complete
//             </Text>
//             <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', color: '#374151' }}>
//               Lesson {Math.round(course.progress / 10)}/10
//             </Text>
//           </View>

//           <View
//             style={{
//               height: 8,
//               backgroundColor: '#E5E7EB',
//               borderRadius: 10,
//               overflow: 'hidden'
//             }}
//           >
//             <View
//               style={{
//                 height: '100%',
//                 width: `${course.progress}%`,
//                 backgroundColor: '#1980F5'
//               }}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/learning/Lesson', params: { courseId: course.id } })}
//             style={{
//               backgroundColor: '#0A2941',
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: 'center'
//             }}
//           >
//             <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16 }}>
//               {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
//             </Text>
//           </TouchableOpacity>
//         </Box>
//       </VStack>
//     </Card>
//   )

//   const CompletedCourseCard = ({ course }: { course: Course }) => (
//     <Card className="bg-[#DADADA] w-[260] mr-4">
//       <VStack>
//         <Box>
//           <Image
//             source={require('../../../assets/images/learn-card1.png')}
//             style={{ width: '100%', height: 140 }}
//             resizeMode="cover"
//             className="aspect-video max-w-full max-h-full rounded-t-[16]"
//           />
//         </Box>
//         <Box
//           className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4"
//           style={{ height: 190 }}
//         >
//           <Text
//             numberOfLines={2}
//             ellipsizeMode="tail"
//             style={{ fontSize: 18, fontFamily: 'Montserrat-Bold' }}
//           >
//             {course.title}
//           </Text>

//           <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', color: '#374151' }}>
//             You've completed this course! Tap below to review.
//           </Text>

//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/learning/Lesson', params: { courseId: course.id } })}
//             style={{
//               backgroundColor: '#0A2941',
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: 'center'
//             }}
//           >
//             <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16 }}>
//               Review
//             </Text>
//           </TouchableOpacity>
//         </Box>
//       </VStack>
//     </Card>
//   )

//   return (
//     <View style={{ flex: 1, backgroundColor: '#F3F4F6', padding: 16 }}>
//       <Text style={{ fontSize: 28, fontFamily: 'Montserrat-Bold' }}>Learn</Text>
//       <Text
//         style={{
//           fontSize: 16,
//           fontFamily: 'Montserrat-SemiBold',
//           color: '#6B7280',
//           marginBottom: 16
//         }}
//       >
//         Learn how to spot scams, recognize red flags, and take action in time.
//       </Text>

//       <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginBottom: 8 }}>Active Courses</Text>
//       <FlatList
//         data={activeCourses}
//         keyExtractor={item => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => <ActiveCourseCard course={item} />}
//       />

//       {completedCourses.length > 0 && (
//         <>
//           <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginVertical: 16 }}>
//             Completed Courses
//           </Text>
//           <FlatList
//             data={completedCourses}
//             keyExtractor={item => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => <CompletedCourseCard course={item} />}
//           />
//         </>
//       )}
//     </View>
//   )
// }

// export default LearnDashboardScreen

// /* eslint-disable @typescript-eslint/no-require-imports */
// import { useRouter } from 'expo-router'
// import React, { useEffect, useState } from 'react'
// import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { Card } from '@/components/ui/card'
// import { VStack } from '@/components/ui/vstack'
// import { Box } from '@/components/ui/box'

// type Course = {
//   id: string
//   title: string
//   progress: number
// }

// const defaultCourses: Course[] = [
//   { id: '1', title: 'Scam Awareness Basics', progress: 60 },
//   { id: '2', title: 'Phishing Scams 101', progress: 40 },
//   { id: '3', title: 'Online Shopping Fraud', progress: 30 },
//   { id: '4', title: 'Investment Scams', progress: 20 }
// ]

// const LearnDashboardScreen = (): JSX.Element => {
//   const router = useRouter()
//   const [activeCourses, setActiveCourses] = useState<Course[]>([])
//   const [completedCourses, setCompletedCourses] = useState<Course[]>([])
//   const [awarenessScore, setAwarenessScore] = useState<number>(0)

//   useEffect(() => {
//     const fetchProgress = async (): Promise<void> => {
//       try {
//         const keys = await AsyncStorage.getAllKeys()
//         const completedModules = keys.filter(key => key.startsWith('completedModule_'))
//         setAwarenessScore(completedModules.length * 50)

//         const updatedCourses = await Promise.all(
//           defaultCourses.map(async course => {
//             const storedProgress = await AsyncStorage.getItem(`quizProgress_${course.id}`)
//             return {
//               ...course,
//               progress: storedProgress ? JSON.parse(storedProgress) : 0
//             }
//           })
//         )

//         setActiveCourses(
//           updatedCourses.filter(course => !completedModules.includes(`completedModule_${course.id}`))
//         )
//         setCompletedCourses(
//           updatedCourses.filter(course => completedModules.includes(`completedModule_${course.id}`))
//         )
//       } catch (err) {
//         console.error('Error loading progress', err)
//       }
//     }

//     fetchProgress()
//   }, [])

//   const ActiveCourseCard = ({ course }: { course: Course }) => (
//     <Card className="bg-[#DADADA] w-[260] mr-4">
//       <VStack>
//         <Box>
//           <Image
//             source={require('../../../assets/images/learn-card1.png')}
//             style={{ width: '100%', height: 140 }}
//             resizeMode="cover"
//             className="aspect-video max-w-full max-h-full rounded-t-[16]"
//           />
//         </Box>
//         <Box className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4">
//           <Text
//             numberOfLines={2}
//             ellipsizeMode="tail"
//             style={{
//               fontSize: 18,
//               fontFamily: 'Montserrat-Bold',
//               height: 48,
//               lineHeight: 24
//             }}
//           >
//             {course.title}
//           </Text>

//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <Text style={{ fontSize: 14, fontFamily: 'Montserrat-SemiBold', color: '#374151' }}>
//               {course.progress}% Complete
//             </Text>
//             <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', color: '#374151' }}>
//               Lesson {Math.round(course.progress / 10)}/10
//             </Text>
//           </View>

//           <View
//             style={{
//               height: 8,
//               backgroundColor: '#E5E7EB',
//               borderRadius: 10,
//               overflow: 'hidden'
//             }}
//           >
//             <View
//               style={{
//                 height: '100%',
//                 width: `${course.progress}%`,
//                 backgroundColor: '#1980F5'
//               }}
//             />
//           </View>

//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/learning/Lesson', params: { courseId: course.id } })}
//             style={{
//               backgroundColor: '#0A2941',
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: 'center'
//             }}
//           >
//             <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16 }}>
//               {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
//             </Text>
//           </TouchableOpacity>
//         </Box>
//       </VStack>
//     </Card>
//   )

//   const CompletedCourseCard = ({ course }: { course: Course }) => (
//     <Card className="bg-[#DADADA] w-[260]">
//       <VStack>
//         <Box>
//           <Image
//             source={require('../../../assets/images/learn-card1.png')}
//             style={{ width: '100%', height: 140 }}
//             resizeMode="cover"
//             className="aspect-video max-w-full max-h-full rounded-t-[16]"
//           />
//         </Box>
//         <Box className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4">
//           <Text
//             numberOfLines={2}
//             ellipsizeMode="tail"
//             style={{
//               fontSize: 18,
//               fontFamily: 'Montserrat-Bold',
//               height: 48,
//               lineHeight: 24
//             }}
//           >
//             {course.title}
//           </Text>

//           <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Regular', color: '#374151' }}>
//             You've completed this course! Tap below to review.
//           </Text>

//           <TouchableOpacity
//             onPress={() => router.push({ pathname: '/learning/Lesson', params: { courseId: course.id } })}
//             style={{
//               backgroundColor: '#0A2941',
//               paddingVertical: 12,
//               borderRadius: 10,
//               alignItems: 'center'
//             }}
//           >
//             <Text style={{ color: '#FFFFFF', fontFamily: 'Montserrat-Bold', fontSize: 16 }}>
//               Review
//             </Text>
//           </TouchableOpacity>
//         </Box>
//       </VStack>
//     </Card>
//   )
//     {/* Browse Scam Categories */}
//     <TouchableOpacity
//     className="flex-row bg-blue-100 rounded-2xl mt-6"
//     onPress={() => router.push('/learning/BrowseCategories')}
// >
//     <Image
//         source={require('../../../assets/images/learn-browse.png')}
//         className="w-30 h-max rounded-tl-2xl rounded-bl-2xl"
//         resizeMode="contain"
//     />
//     <View className="flex-1 gap-2 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
//         <Text className="text-3xl  font-[<Montserrat-Bold>]">
//             Browse Scam Categories
//         </Text>
//         <Text className="text-xl text-gray-600 font-[<Montserrat-SemiBold>]">
//             Explore more modules!
//         </Text>

//         <Image
//             source={require('../../../assets/images/Card-Navigation.png')}
//             style={{
//                 marginTop: 20
//             }}
//             resizeMode="cover"
//         />
//     </View>
// </TouchableOpacity>

// {/* Check Out Your Achievements */}
// <TouchableOpacity
//     className="flex-row bg-blue-100 rounded-2xl mt-4"
//     onPress={() => router.push('/learning/Achievements')}
// >
//     <Image
//         source={require('../../../assets/images/learn-achieve.png')}
//         className="w-30 h-full rounded-tl-2xl rounded-bl-2xl"
//         resizeMode="contain"
//     />
//     <View className="flex-1 gap-2 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
//         <Text className="text-3xl font-[<Montserrat-Bold>]">
//             Check out Your Achievements
//         </Text>
//         <Text className="text-lg text-gray-600 font-[<Montserrat-SemiBold] mt-2>]">
//             Your current score:{' '}
//             <Text className="text-xl font-[<Montserrat-Bold>]">
//             {awarenessScore}
//             </Text>
//         </Text>

//         <Image
//             source={require('../../../assets/images/Card-Navigation.png')}
//             style={{
//                 marginTop: 20
//             }}
//             resizeMode="cover"
//         />
//     </View>
// </TouchableOpacity>

//   return (
//     <View style={{ flex: 1, backgroundColor: '#F3F4F6', padding: 16 }}>
//       <Text style={{ fontSize: 28, fontFamily: 'Montserrat-Bold' }}>Learn</Text>
//       <Text
//         style={{
//           fontSize: 16,
//           fontFamily: 'Montserrat-SemiBold',
//           color: '#6B7280',
//           marginBottom: 16
//         }}
//       >
//         Learn how to spot scams, recognize red flags, and take action in time.
//       </Text>

//       <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginBottom: 8 }}>Active Courses</Text>
//       <FlatList
//         data={activeCourses}
//         keyExtractor={item => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => <ActiveCourseCard course={item} />}
//       />

//       {completedCourses.length > 0 && (
//         <>
//           <Text style={{ fontSize: 20, fontFamily: 'Montserrat-Bold', marginVertical: 16 }}>
//             Completed Courses
//           </Text>
//           <FlatList
//             data={completedCourses}
//             keyExtractor={item => item.id}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => <CompletedCourseCard course={item} />}
//           />
//         </>
//       )}
//     </View>
//   )

// }

// export default LearnDashboardScreen

/* eslint-disable @typescript-eslint/no-require-imports */
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import type { ImageSourcePropType } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card } from '@/components/ui/card'
import { VStack } from '@/components/ui/vstack'
import { Box } from '@/components/ui/box'

type Course = {
    id: string
    title: string
    progress: number
    image: ImageSourcePropType
}

const defaultCourses: Course[] = [
    {
        id: '1',
        title: 'Scam Awareness Basics',
        progress: 0,
        image: require('../../../assets/images/specific-cat-fake.png')
    },
    {
        id: '2',
        title: 'Phishing Scams 101',
        progress: 0,
        image: require('../../../assets/images/specific-cat-cold.png')
    },
    {
        id: '3',
        title: 'Online Shopping Fraud',
        progress: 0,
        image: require('../../../assets/images/specific-cat-search.png')
    },
    {
        id: '4',
        title: 'Investment Scams',
        progress: 0,
        image: require('../../../assets/images/learn-card1.png')
    }
]

const LearnDashboardScreen = (): JSX.Element => {
    const router = useRouter()
    const [activeCourses, setActiveCourses] = useState<Course[]>([])
    const [completedCourses, setCompletedCourses] = useState<Course[]>([])
    const [awarenessScore, setAwarenessScore] = useState<number>(0)

    useEffect(() => {
        const fetchProgress = async (): Promise<void> => {
            try {
                const keys = await AsyncStorage.getAllKeys()
                const completedModules = keys.filter(key =>
                    key.startsWith('completedModule_')
                )
                setAwarenessScore(completedModules.length * 50)

                const updatedCourses = await Promise.all(
                    defaultCourses.map(async course => {
                        const storedProgress = await AsyncStorage.getItem(
                            `quizProgress_${course.id}`
                        )
                        return {
                            ...course,
                            progress: storedProgress
                                ? JSON.parse(storedProgress)
                                : 0
                        }
                    })
                )

                setActiveCourses(
                    updatedCourses.filter(
                        course =>
                            !completedModules.includes(
                                `completedModule_${course.id}`
                            )
                    )
                )
                setCompletedCourses(
                    updatedCourses.filter(course =>
                        completedModules.includes(
                            `completedModule_${course.id}`
                        )
                    )
                )
            } catch (err) {
                console.error('Error loading progress', err)
            }
        }

        fetchProgress()
    }, [])

    const ActiveCourseCard = ({ course }: { course: Course }) => (
        <Card className="bg-[#DADADA] w-[260] px-0 py-0 mr-4">
            <VStack>
                <Box>
                    <Image
                        source={course.image}
                        style={{ width: '100%', height: 165 }}
                        resizeMode="cover"
                        className="aspect-video max-w-full max-h-full rounded-t-[16]"
                    />
                </Box>
                <Box className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4">
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                            fontSize: 18,
                            fontFamily: 'Montserrat-Bold',
                            height: 48,
                            lineHeight: 24
                        }}
                    >
                        {course.title}
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'Montserrat-SemiBold',
                                color: '#374151'
                            }}
                        >
                            {course.progress}% Complete
                        </Text>
                        <Text
                            style={{
                                fontSize: 14,
                                fontFamily: 'Montserrat-SemiBold',
                                color: '#374151'
                            }}
                        >
                            Lesson {Math.round(course.progress / 10)}/10
                        </Text>
                    </View>

                    <View
                        style={{
                            height: 15,
                            backgroundColor: '#E5E7EB',
                            borderRadius: 10,
                            overflow: 'hidden'
                        }}
                    >
                        <View
                            style={{
                                height: '100%',
                                width: `${course.progress}%`,
                                backgroundColor: '#1980F5'
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '/learning/Lesson',
                                params: { courseId: course.id }
                            })
                        }
                        style={{
                            backgroundColor: '#0A2941',
                            paddingVertical: 12,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 20
                            }}
                        >
                            {course.progress > 0
                                ? 'Continue Learning'
                                : 'Start Learning'}
                        </Text>
                    </TouchableOpacity>
                </Box>
            </VStack>
        </Card>
    )

    const CompletedCourseCard = ({ course }: { course: Course }) => (
        <Card className="bg-[#DADADA] w-[260] px-0 py-0 mr-4 mb-16">
            <VStack>
                <Box>
                    <Image
                        source={course.image}
                        style={{ width: '100%', height: 165 }}
                        resizeMode="cover"
                        className="aspect-video max-w-full max-h-full rounded-t-[16]"
                    />
                </Box>
                <Box className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4">
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={{
                            fontSize: 18,
                            fontFamily: 'Montserrat-Bold',
                            height: 48,
                            lineHeight: 24
                        }}
                    >
                        {course.title}
                    </Text>

                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: 'Montserrat-SemiBold',
                            color: '#374151',
                            lineHeight: 24
                        }}
                    >
                        You've completed this course! Tap below to review.
                    </Text>

                    <TouchableOpacity
                        onPress={() =>
                            router.push({
                                pathname: '/learning/Lesson',
                                params: { courseId: course.id }
                            })
                        }
                        style={{
                            backgroundColor: '#0A2941',
                            paddingVertical: 12,
                            borderRadius: 10,
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontFamily: 'Montserrat-Bold',
                                fontSize: 20
                            }}
                        >
                            Review
                        </Text>
                    </TouchableOpacity>
                </Box>
            </VStack>
        </Card>
    )

    return (
        <View style={{ flex: 1, backgroundColor: '#DADADA', padding: 16 }}>
            <Text
                style={{
                    fontSize: 32,
                    fontFamily: 'Montserrat-Bold',
                    marginBottom: 20
                }}
            >
                Learn
            </Text>
            <Text
                style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Regular',
                    color: '#1C1C1C',
                    lineHeight: 32,
                    marginBottom: 60
                }}
            >
                Learn how to spot scams, recognize red flags, and take action in
                time.
            </Text>

            <Text
                style={{
                    fontSize: 20,
                    fontFamily: 'Montserrat-Bold',
                    marginBottom: 8
                }}
            >
                Active Courses
            </Text>
            <FlatList
                data={activeCourses}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => <ActiveCourseCard course={item} />}
            />

            {completedCourses.length > 0 && (
                <>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: 'Montserrat-Bold',
                            marginVertical: 16,
                            marginTop: 60
                        }}
                    >
                        Completed Courses
                    </Text>
                    <FlatList
                        data={completedCourses}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <CompletedCourseCard course={item} />
                        )}
                    />
                </>
            )}

            {/* Browse Scam Categories */}
            <TouchableOpacity
                className="flex-row bg-blue-100 rounded-2xl mb-7"
                onPress={() => router.push('/learning/BrowseCategories')}
            >
                <Image
                    source={require('../../../assets/images/learn-browse.png')}
                    className="w-30 h-full rounded-tl-2xl rounded-bl-2xl"
                    resizeMode="cover"
                />
                <View className="flex-1 gap-2 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
                    <Text className="text-3xl  font-[<Montserrat-Bold>]">
                        Browse Scam Categories
                    </Text>
                    <Text className="text-xl text-gray-600 font-[<Montserrat-SemiBold>]">
                        Explore more modules!
                    </Text>

                    <Image
                        source={require('../../../assets/images/Card-Navigation.png')}
                        style={{
                            marginTop: 20
                        }}
                        resizeMode="cover"
                    />
                </View>
            </TouchableOpacity>

            {/* Check Out Your Achievements */}
            <TouchableOpacity
                className="flex-row bg-blue-100 rounded-2xl  mb-7"
                onPress={() => router.push('/learning/Achievements')}
            >
                <Image
                    source={require('../../../assets/images/learn-achieve.png')}
                    className="w-30 h-full rounded-tl-2xl rounded-bl-2xl"
                    resizeMode="cover"
                />
                <View className="flex-1 gap-2 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
                    <Text className="text-3xl font-[<Montserrat-Bold>]">
                        Check out Your Achievements
                    </Text>
                    <Text className="text-lg text-gray-600 font-[<Montserrat-SemiBold] mt-2>]">
                        Your current score:{' '}
                        <Text className="text-xl font-[<Montserrat-Bold>]">
                            {awarenessScore}
                        </Text>
                    </Text>

                    <Image
                        source={require('../../../assets/images/Card-Navigation.png')}
                        style={{
                            marginTop: 20
                        }}
                        resizeMode="cover"
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default LearnDashboardScreen
