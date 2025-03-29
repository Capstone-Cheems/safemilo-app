/* eslint-disable @typescript-eslint/no-require-imports */
// import ProgressBar from '@/src/widget/Components/ProgressBar'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Course = {
    id: string
    title: string
    progress: number
}

const defaultCourses: Course[] = [
    { id: '1', title: 'Scam Awareness Basics', progress: 60 },
    { id: '2', title: 'Phishing Scams 101', progress: 40 },
    { id: '3', title: 'Online Shopping Fraud', progress: 30 },
    { id: '4', title: 'Investment Scams', progress: 20 }
]

const LearnDashboardScreen = (): JSX.Element => {
    const router = useRouter()
    const [activeCourses, setActiveCourses] = useState<Course[]>(defaultCourses)
    const [completedCourses, setCompletedCourses] = useState<Course[]>([])
    const [awarenessScore, setAwarenessScore] = useState<number>(0)

    useEffect(() => {
        const fetchProgress = async (): Promise<void> => {
            try {
                const keys = await AsyncStorage.getAllKeys()
                console.log('Stored AsyncStorage Keys:', keys)

                const completedModules = keys.filter(key =>
                    key.startsWith('completedModule_')
                )
                setAwarenessScore(completedModules.length * 50)
                console.log('Completed Modules Keys:', completedModules)

                const updatedCourses = await Promise.all(
                    defaultCourses.map(async (course): Promise<Course> => {
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

                console.log('Updated Courses with Progress:', updatedCourses)

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
            } catch (error) {
                console.error('Error fetching progress:', error)
            }
        }

        fetchProgress()
    }, [])

    return (
        <View className="flex-1 bg-gray-100 p-4">
            <Text className="text-3xl font-[<Montserrat-Bold>]">Learn</Text>
            <Text className="text-lg text-gray-600 mb-4 font-[<Montserrat-SemiBold>]">
                Learn how to spot scams, recognize red flags, and take action in
                time.
            </Text>

            {/* Active Courses Section
            <Text className="text-2xl font-bold mb-2">Active Courses</Text>
            <FlatList
                data={activeCourses}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="bg-white shadow-md rounded-2xl w-64 overflow-hidden mr-4"
                        onPress={() =>
                            router.push({
                                pathname: '/learning/Lesson',
                                params: { courseId: item.id }
                            })
                        }
                    >
                        <View
                            style={{
                                width: '100%',
                                height: 160,
                                overflow: 'hidden',
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16
                            }}
                        >
                            <Image
                                source={require('../../../assets/images/learn-card1.png')}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                        </View>

                        <View className="p-4">
                            <Text className="text-lg font-bold">
                                {item.title}
                            </Text>
                            <View className="flex-row justify-between items-center mt-1">
                                <Text className="text-sm text-gray-600">
                                    Lesson {Math.round(item.progress / 10)}/10
                                </Text>
                                <Text className="text-sm font-semibold text-gray-800">
                                    {item.progress}% Complete
                                </Text>
                            </View>

                            <ProgressBar progress={item.progress} />

                            <TouchableOpacity
                                className="mt-3 bg-blue-900 p-3 rounded-lg items-center"
                                onPress={() =>
                                    router.push({
                                        pathname: '/learning/Lesson',
                                        params: { courseId: item.id }
                                    })
                                }
                            >
                                <Text className="text-white font-semibold">
                                    {item.progress > 0
                                        ? 'Continue Learning'
                                        : 'Start Learning'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            /> */}
            {/* Active Courses Section */}
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
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: 16,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2,
                            overflow: 'hidden',
                            width: 260,
                            marginRight: 16
                        }}
                        onPress={() =>
                            router.push({
                                pathname: '/learning/Lesson',
                                params: { courseId: item.id }
                            })
                        }
                    >
                        {/* Top Image */}
                        <View
                            style={{
                                width: '100%',
                                height: 140,
                                overflow: 'hidden',
                                borderTopLeftRadius: 16,
                                borderTopRightRadius: 16
                            }}
                        >
                            <Image
                                source={require('../../../assets/images/learn-card1.png')}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                        </View>

                        {/* Card Content */}
                        <View style={{ padding: 16 }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontFamily: 'Montserrat-Bold',
                                    marginBottom: 4
                                }}
                            >
                                {item.title}
                            </Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: 6
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 14,
                                        color: '#6B7280',
                                        fontFamily: 'Montserrat-SemiBold'
                                    }}
                                >
                                    Lesson {Math.round(item.progress / 10)}
                                    /10
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 14,
                                        fontFamily: 'Montserrat-SemiBold',
                                        color: '#1F2937'
                                    }}
                                >
                                    {item.progress || 0}% Complete
                                </Text>
                            </View>

                            {/* Progress Bar */}
                            <View
                                style={{
                                    height: 15,
                                    width: '100%',
                                    backgroundColor: '#D1D1D1',
                                    borderRadius: 12,
                                    overflow: 'hidden',
                                    marginTop: 8,
                                    marginBottom: 12
                                }}
                            >
                                <View
                                    style={{
                                        height: '100%',
                                        width: `${item.progress || 0}%`, // ✅ Use progress or default to 0
                                        backgroundColor: '#1980F5',
                                        borderRadius: 12
                                    }}
                                />
                            </View>

                            {/* Button */}
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#0A2941',
                                    paddingVertical: 15,
                                    borderRadius: 10,
                                    alignItems: 'center'
                                }}
                                onPress={() =>
                                    router.push({
                                        pathname: '/learning/Lesson',
                                        params: { courseId: item.id }
                                    })
                                }
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontFamily: 'Montserrat-Bold',
                                        fontSize: 20
                                    }}
                                >
                                    {item.progress > 0
                                        ? 'Continue Learning'
                                        : 'Start Learning'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
            />

            {/* Completed Courses Section */}
            {completedCourses.length > 0 && (
                <>
                    <Text
                        style={{
                            fontSize: 20,
                            fontFamily: 'Montserrat-Bold',
                            marginTop: 24,
                            marginBottom: 8
                        }}
                    >
                        Completed Courses
                    </Text>
                    <FlatList
                        data={completedCourses}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#fff',
                                    borderRadius: 16,
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 2,
                                    overflow: 'hidden',
                                    width: 260,
                                    marginRight: 16
                                }}
                                onPress={() =>
                                    router.push({
                                        pathname: '/learning/Lesson',
                                        params: { courseId: item.id }
                                    })
                                }
                            >
                                {/* Image Section */}
                                <View
                                    style={{
                                        width: '100%',
                                        height: 140,
                                        overflow: 'hidden',
                                        borderTopLeftRadius: 16,
                                        borderTopRightRadius: 16
                                    }}
                                >
                                    <Image
                                        source={require('../../../assets/images/learn-card1.png')}
                                        style={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                        resizeMode="cover"
                                    />
                                </View>

                                {/* Text Section */}
                                <View style={{ padding: 16 }}>
                                    <Text
                                        style={{
                                            fontSize: 18,
                                            fontFamily: 'Montserrat-Bold',
                                            color: '#1C1C1C',
                                            marginBottom: -10
                                        }}
                                    >
                                        {item.title}
                                    </Text>

                                    <Text
                                        style={{
                                            fontSize: 14,
                                            color: '#6B7280',
                                            marginBottom: 20,
                                            lineHeight: 20,
                                            fontFamily: 'Montserrat-SemiBold'
                                        }}
                                    >
                                        You've completed this course! Tap below
                                        to review.
                                    </Text>

                                    <TouchableOpacity
                                        style={{
                                            backgroundColor: '#0A2941',
                                            paddingVertical: 15,
                                            borderRadius: 10,
                                            alignItems: 'center'
                                        }}
                                        onPress={() =>
                                            router.push({
                                                pathname: '/learning/Lesson',
                                                params: { courseId: item.id }
                                            })
                                        }
                                    >
                                        <Text
                                            style={{
                                                color: '#fff',
                                                fontFamily: 'Montserrat-Bold',
                                                fontSize: 20
                                            }}
                                        >
                                            Review
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}

            {/* Browse Scam Categories */}
            <TouchableOpacity
                className="flex-row bg-blue-100 rounded-2xl mt-6"
                onPress={() => router.push('/learning/BrowseCategories')}
            >
                <Image
                    source={require('../../../assets/images/learn-browse.png')}
                    className="w-30 h-max rounded-tl-2xl rounded-bl-2xl"
                    resizeMode="contain"
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
                className="flex-row bg-blue-100 rounded-2xl mt-4"
                onPress={() => router.push('/learning/Achievements')}
            >
                <Image
                    source={require('../../../assets/images/learn-achieve.png')}
                    className="w-30 h-max rounded-tl-2xl rounded-bl-2xl"
                    resizeMode="contain"
                />
                <View className="flex-1 gap-2 bg-white p-4 rounded-tr-2xl rounded-br-2xl">
                    <Text className="text-3xl font-[<Montserrat-Bold>]">
                        Check out Your Achievements
                    </Text>
                    <Text className="text-xl text-gray-600 font-[<Montserrat-SemiBold] mt-2>]">
                        Your current score:{' '}
                        <Text className="text-2xl font-[<Montserrat-Bold>]">
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
