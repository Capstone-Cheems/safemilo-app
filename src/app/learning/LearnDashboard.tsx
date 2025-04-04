/* eslint-disable @typescript-eslint/no-require-imports */
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native'
import type { ImageSourcePropType } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Card } from '@/components/ui/card'
import { VStack } from '@/components/ui/vstack'
import { Box } from '@/components/ui/box'
import { useNavigation } from '@react-navigation/native'

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

    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: () => null, // Removes "Learn" from header
            headerRight: () => (
                <View
                    style={{ flexDirection: 'row', gap: 16, marginRight: 12 }}
                >
                    {/* Notification icon */}
                    <TouchableOpacity
                        onPress={() => router.push('/notifications')}
                    >
                        <Image
                            source={require('../../../assets/images/notification-icon.png')}
                            style={{ width: 32, height: 32 }}
                        />
                    </TouchableOpacity>

                    {/* Profile icon */}
                    <TouchableOpacity onPress={() => router.push('/profile')}>
                        <Image
                            source={require('../../../assets/images/profile-icon.png')}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

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
                className="flex-row bg-blue-100 rounded-2xl mb-7 mt-16"
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
