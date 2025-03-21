/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react'
import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'

type Course = {
    id: string
    title: string
    description: string
    image: any
}

const courses: Course[] = [
    {
        id: '1',
        title: 'Fake Pop-Ups',
        description:
            'A pop-up warns of a virus, urging you to call a number or download software.',
        image: require('../../../assets/images/specific-cat-fake.png')
    },
    {
        id: '2',
        title: 'Cold Calls from “Tech Support”',
        description:
            'A caller claims your device has a problem from a trusted company.',
        image: require('../../../assets/images/specific-cat-cold.png')
    },
    {
        id: '3',
        title: 'Search Engine Scams',
        description:
            'Scammers create fake support sites, tricking you into paying or granting device access.',
        image: require('../../../assets/images/specific-cat-search.png')
    }
]

const SpecificCategoryScreen = (): JSX.Element => {
    const router = useRouter()

    return (
        <View className="flex-1 bg-gray-100 p-4">
            {/* Header Section */}
            <TouchableOpacity onPress={() => router.back()} className="mb-4">
                <Text className="text-2xl">{'←'}</Text>
            </TouchableOpacity>

            {/* Category Title */}
            <Text className="text-3xl font-bold text-gray-900">
                Tech Support Scams
            </Text>
            <Text className="text-lg text-gray-600 mt-2">
                Scammers pose as tech support, claiming a virus and tricking you
                into paying, installing malware, or granting access.
            </Text>

            {/* Course List */}
            <FlatList
                data={courses}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View className="bg-white rounded-2xl shadow-md overflow-hidden my-4">
                        {/* Image Section */}
                        <View className="bg-orange-200 p-4 flex items-center rounded-t-2xl">
                            <Image source={item.image} resizeMode="contain" />
                        </View>

                        {/* Text Content Section */}
                        <View className="p-4 rounded-b-2xl bg-white">
                            <Text className="text-xl font-bold text-gray-900">
                                {item.title}
                            </Text>
                            <Text className="text-sm text-gray-600 mt-2">
                                {item.description}
                            </Text>

                            {/* Start Learning Button */}
                            <TouchableOpacity
                                className="mt-4 bg-blue-900 p-3 rounded-lg items-center"
                                onPress={() =>
                                    router.push({
                                        pathname: '/learning/quiz',
                                        params: { courseId: item.id }
                                    })
                                }
                            >
                                <Text className="text-white font-semibold">
                                    Start Learning
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default SpecificCategoryScreen
