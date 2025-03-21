/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-require-imports */
// import ProgressBar from '@/src/widget/Components/ProgressBar'
// import { useRouter } from 'expo-router'
// import React from 'react'
// import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'

// const courses = [
//     { id: '1', title: 'Scam Awareness Basics', progress: 0 },
//     { id: '2', title: 'Phishing Scams 101', progress: 20 },
//     { id: '3', title: 'Online Shopping Fraud', progress: 50 },
//     { id: '4', title: 'Investment Scams', progress: 100 }
// ]

// const LearnDashboardScreen = (): JSX.Element => {
//     const router = useRouter()

//     return (
//         <View className="flex-1 bg-gray-100 p-4">
//             {/* Header */}
//             <Text className="text-3xl font-bold">Learn</Text>
//             <Text className="text-lg text-gray-600 mb-4">
//                 Learn how to spot scams, recognize red flags, and take action in
//                 time.
//             </Text>

//             {/* Active Courses */}
//             <Text className="text-2xl font-bold mb-2">Active Courses</Text>
//             <FlatList
//                 data={courses}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 keyExtractor={item => item.id}
//                 contentContainerStyle={{ paddingBottom: 10 }}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity
//                         className="bg-white shadow-md rounded-2xl w-64 overflow-hidden mr-4"
//                         onPress={() =>
//                             router.push({
//                                 pathname: '/learning/Lesson',
//                                 params: { courseId: item.id }
//                             })
//                         }
//                     >
//                         {/* Course Image */}
//                         <View className="bg-orange-200 p-4 flex items-center">
//                             <Image
//                                 source={require('../../../assets/images/learn-card1.png')}
//                                 className="w-24 h-24"
//                                 resizeMode="contain"
//                             />
//                         </View>

//                         {/* Course Details */}
//                         <View className="p-4">
//                             <Text className="text-lg font-bold">
//                                 {item.title}
//                             </Text>
//                             <View className="flex-row justify-between items-center mt-1">
//                                 <Text className="text-sm text-gray-600">
//                                     Lesson {item.lessons}
//                                 </Text>
//                                 <Text className="text-sm font-semibold text-gray-800">
//                                     {item.progress}% Complete
//                                 </Text>
//                             </View>

//                             {/* Progress Bar */}
//                             <ProgressBar progress={item.progress} />

//                             {/* Action Button */}
//                             <TouchableOpacity
//                                 className="mt-3 bg-blue-900 p-3 rounded-lg items-center"
//                                 onPress={() =>
//                                     router.push({
//                                         pathname: '/learning/Lesson',
//                                         params: { courseId: item.id }
//                                     })
//                                 }
//                             >
//                                 <Text className="text-white font-semibold">
//                                     {item.progress > 0
//                                         ? 'Continue Learning'
//                                         : 'Start Learning'}
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </TouchableOpacity>
//                 )}
//             />

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
//                     <Text className="text-lg font-bold">
//                         Browse Scam Categories
//                     </Text>
//                     <Text className="text-sm text-gray-600">
//                         Explore more modules!
//                     </Text>

//                     <TouchableOpacity className="mt-2 bg-orange-200 p-2 rounded-full w-10 h-10 items-center justify-center">
//                         <Text className="text-lg font-bold text-gray-800">
//                             {'→'}
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </TouchableOpacity>

//             {/* Check Out Your Achievements */}
//             <TouchableOpacity
//                 className="flex-row bg-blue-100 rounded-2xl mt-4"
//                 onPress={() => router.push('/learning/Achievements')}
//             >
//                 <Image
//                     source={require('../../../assets/images/learn-achieve.png')}
//                     className="w-30 h-max rounded-tl-2xl rounded-bl-2xl"
//                     resizeMode="contain"
//                 />
//                 <View className="flex-1 gap-2 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
//                     <Text className="text-lg font-bold">
//                         Check out Your Achievements
//                     </Text>
//                     <Text className="text-sm text-gray-600">
//                         Your current score:{' '}
//                         <Text className="font-bold">376</Text>
//                     </Text>

//                     <TouchableOpacity className="mt-2 bg-orange-200 p-2 rounded-full w-10 h-10 items-center justify-center">
//                         <Text className="text-lg font-bold text-gray-800">
//                             {'→'}
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default LearnDashboardScreen


import ProgressBar from '@/src/widget/Components/ProgressBar'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Course = {
    id: string;
    title: string;
    progress: number;
};

const defaultCourses: Course[] = [
    { id: '1', title: 'Scam Awareness Basics', progress: 0 },
    { id: '2', title: 'Phishing Scams 101', progress: 0 },
    { id: '3', title: 'Online Shopping Fraud', progress: 0 },
    { id: '4', title: 'Investment Scams', progress: 0 }
];

const LearnDashboardScreen = (): JSX.Element => {
    const router = useRouter()
    const [activeCourses, setActiveCourses] = useState<Course[]>(defaultCourses);
    const [completedCourses, setCompletedCourses] = useState<Course[]>([]);

    useEffect(() => {
        const fetchProgress = async (): Promise<void> => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const completedModules = keys.filter(key => key.startsWith('completedModule_'));

                const updatedCourses = await Promise.all(
                    defaultCourses.map(async (course): Promise<Course> => {
                        const storedProgress = await AsyncStorage.getItem(`quizProgress_${course.id}`);
                        return {
                            ...course,
                            progress: storedProgress ? JSON.parse(storedProgress) : 0
                        };
                    })
                );

                setActiveCourses(updatedCourses.filter(course => !completedModules.includes(`completedModule_${course.id}`)));
                setCompletedCourses(updatedCourses.filter(course => completedModules.includes(`completedModule_${course.id}`)));
            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        };

        fetchProgress();
    }, []);

    return (
        <View className="flex-1 bg-gray-100 p-4">
            <Text className="text-3xl font-bold">Learn</Text>
            <Text className="text-lg text-gray-600 mb-4">
                Learn how to spot scams, recognize red flags, and take action in time.
            </Text>

            <Text className="text-2xl font-bold mb-2">Active Courses</Text>
            <FlatList
                data={activeCourses}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity className="bg-white shadow-md rounded-2xl w-64 overflow-hidden mr-4"
                        onPress={() =>
                            router.push({ pathname: '/learning/Lesson', params: { courseId: item.id } })
                        }
                    >
                        <View className="bg-orange-200 p-4 flex items-center">
                            <Image
                                source={require('../../../assets/images/learn-card1.png')}
                                className="w-24 h-24"
                                resizeMode="contain"
                            />
                        </View>

                        <View className="p-4">
                            <Text className="text-lg font-bold">{item.title}</Text>
                            <View className="flex-row justify-between items-center mt-1">
                                <Text className="text-sm text-gray-600">Lesson {Math.round(item.progress / 10)}/10</Text>
                                <Text className="text-sm font-semibold text-gray-800">{item.progress}% Complete</Text>
                            </View>

                            <ProgressBar progress={item.progress} />

                            <TouchableOpacity className="mt-3 bg-blue-900 p-3 rounded-lg items-center"
                                onPress={() =>
                                    router.push({ pathname: '/learning/Lesson', params: { courseId: item.id } })
                                }
                            >
                                <Text className="text-white font-semibold">
                                    {item.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {completedCourses.length > 0 && (
                <>
                    <Text className="text-2xl font-bold mb-2 mt-6">Completed Courses</Text>
                    <FlatList
                        data={completedCourses}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity className="bg-gray-300 shadow-md rounded-2xl w-64 overflow-hidden mr-4">
                                <View className="bg-gray-400 p-4 flex items-center">
                                    <Image
                                        source={require('../../../assets/images/learn-card1.png')}
                                        className="w-24 h-24"
                                        resizeMode="contain"
                                    />
                                </View>

                                <View className="p-4">
                                    <Text className="text-lg font-bold">{item.title}</Text>
                                    <Text className="text-sm text-gray-600 mt-1">Completed</Text>

                                    <TouchableOpacity className="mt-3 bg-green-600 p-3 rounded-lg items-center"
                                        onPress={() =>
                                            router.push({ pathname: '/learning/review', params: { courseId: item.id } })
                                        }
                                    >
                                        <Text className="text-white font-semibold">Review</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
        </View>
    );
};

export default LearnDashboardScreen;
