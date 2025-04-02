// /* eslint-disable @typescript-eslint/no-require-imports */
// import React from 'react'
// import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
// import { useRouter } from 'expo-router'

// type Course = {
//     id: string
//     title: string
//     description: string
//     image: number
// }

// const courses: Course[] = [
//     {
//         id: '1',
//         title: 'Scam Awareness Basics',
//         description:
//             'A pop-up warns of a virus, urging you to call a number or download software.',
//         image: require('../../../assets/images/specific-cat-fake.png')
//     },
//     {
//         id: '2',
//         title: 'Phishing Scams 101”',
//         description:
//             'A caller claims your device has a problem from a trusted company.',
//         image: require('../../../assets/images/specific-cat-cold.png')
//     },
//     {
//         id: '3',
//         title: 'Online Shopping Fraud',
//         description:
//             'Scammers create fake support sites, tricking you into paying or granting device access.',
//         image: require('../../../assets/images/specific-cat-search.png')
//     }
// ]

// const SpecificCategoryScreen = (): JSX.Element => {
//     const router = useRouter()

//     return (
//         <View className="flex-1 bg-gray-100 p-4">
//             {/* Category Title */}
//             <Text className="text-3xl font-[<Montserrat-Bold>] text-gray-900">
//                 Tech Support Scams
//             </Text>
//             <Text className="text-lg text-gray-600 mt-2 font-[<Montserrat-SemiBold>]">
//                 Scammers pose as tech support, claiming a virus and tricking you
//                 into paying, installing malware, or granting access.
//             </Text>

//             {/* Course List */}
//             <FlatList
//                 data={courses}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <View className="bg-white rounded-2xl shadow-md overflow-hidden my-4">
//                         {/* Image Section */}
//                         <View className="bg-orange-200 p-4 flex items-center rounded-t-2xl">
//                             <Image source={item.image} resizeMode="contain" />
//                         </View>

//                         {/* Text Content Section */}
//                         <View className="p-4 rounded-b-2xl bg-white">
//                             <Text className="text-xl font-[<Montserrat-Bold>] text-gray-900">
//                                 {item.title}
//                             </Text>
//                             <Text className="text-sm text-gray-600 mt-2 font-[<Montserrat-SemiBold>]">
//                                 {item.description}
//                             </Text>

//                             {/* Start Learning Button */}
//                             <TouchableOpacity
//                                 className="mt-4 bg-blue-900 p-3 rounded-lg items-center"
//                                 onPress={() =>
//                                     router.push({
//                                         pathname: '/learning/Lesson',
//                                         params: { courseId: item.id }
//                                     })
//                                 }
//                             >
//                                 <Text className="text-white font-[<Montserrat-Bold] text-xl">
//                                     Start Learning
//                                 </Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 )}
//             />
//         </View>
//     )
// }

// export default SpecificCategoryScreen

/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react'
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import { Card } from '@/components/ui/card'
import { VStack } from '@/components/ui/vstack'
import { Box } from '@/components/ui/box'

type Course = {
    id: string
    title: string
    description: string
    image: number
}

const courses: Course[] = [
    {
        id: '1',
        title: 'Scam Awareness Basics',
        description:
            'A pop-up warns of a virus, urging you to call a number or download software.',
        image: require('../../../assets/images/specific-cat-fake.png')
    },
    {
        id: '2',
        title: 'Phishing Scams 101',
        description:
            'A caller claims your device has a problem from a trusted company.',
        image: require('../../../assets/images/specific-cat-cold.png')
    },
    {
        id: '3',
        title: 'Online Shopping Fraud',
        description:
            'Scammers create fake support sites, tricking you into paying or granting device access.',
        image: require('../../../assets/images/specific-cat-search.png')
    }
]

const SpecificCategoryScreen = (): JSX.Element => {
    const router = useRouter()

    return (
        <ScrollView className="flex-1 bg-[#DADADA] p-4">
            {/* Header */}
            <Text className="text-[32px] font-[<Montserrat-Bold>] text-[#1C1C1C]">
                Tech Support Scams
            </Text>
            <Text className="text-[20px] leading-[32px] text-'#1C1C1C' mt-2 font-[<Montserrat-Regular>] mb-[50px]">
                Scammers pose as tech support, claiming a virus and tricking you
                into paying, installing malware, or granting access.
            </Text>

            {/* Card List */}
            {courses.map(item => (
                <Card
                    key={item.id}
                    className="bg-[#DADADA] mx-0 px-0 py-0 mb-[20px]"
                >
                    <VStack>
                        <Box className="rounded-t-[16] overflow-hidden">
                            <Image
                                source={item.image}
                                style={{ width: '100%', height: 220 }}
                                resizeMode="cover"
                            />
                        </Box>

                        <Box className="flex flex-col justify-between gap-3 bg-white rounded-[16] mt-[-10] px-4 py-4">
                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    fontSize: 26,
                                    fontFamily: 'Montserrat-SemiBold',
                                    height: 40,
                                    lineHeight: 32
                                }}
                            >
                                {item.title}
                            </Text>

                            <Text
                                numberOfLines={3}
                                style={{
                                    fontSize: 18,
                                    fontFamily: 'Montserrat-Regular',
                                    color: '#374151'
                                }}
                            >
                                {item.description}
                            </Text>

                            <TouchableOpacity
                                onPress={() =>
                                    router.push({
                                        pathname: '/learning/Lesson',
                                        params: { courseId: item.id }
                                    })
                                }
                                style={{
                                    backgroundColor: '#0A2941',
                                    paddingVertical: 12,
                                    borderRadius: 10,
                                    alignItems: 'center',
                                    marginTop: 4
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#FFFFFF',
                                        fontFamily: 'Montserrat-Bold',
                                        fontSize: 20
                                    }}
                                >
                                    Start Learning
                                </Text>
                            </TouchableOpacity>
                        </Box>
                    </VStack>
                </Card>
            ))}
        </ScrollView>
    )
}

export default SpecificCategoryScreen
