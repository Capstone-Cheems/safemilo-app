/* eslint-disable @typescript-eslint/no-require-imports */
// /* eslint-disable @typescript-eslint/no-require-imports */
// import React from 'react'
// import { View, Text, TouchableOpacity, Image } from 'react-native'

// interface CourseCardProps {
//     title: string
//     progress: number
//     onPress: () => void
// }

// const CourseCard: React.FC<CourseCardProps> = ({
//     title,
//     progress,
//     onPress
// }) => {
//     return (
//         <View className="bg-white rounded-2xl shadow-lg overflow-hidden w-[292px] h-[445px]">
//             {/* Top Image Section */}
//             <Image
//                 source={require('../../../assets/images/learn-card1.png')}
//                 resizeMode="contain"
//             />

//             {/* Content Section */}
//             <View className="p-4">
//                 {/* Course Title */}
//                 <Text className="text-[22px] font-bold leading-[35px] text-[#1C1C1C] font-[Montserrat]">
//                     {title}
//                 </Text>
//                 {/* Progress Bar */}
//                 <View className="flex-row justify-between items-center mt-3">
//                     <Text className="text-sm text-gray-600">Lesson 05/10</Text>
//                     <Text className="text-sm text-gray-600">
//                         {progress}% Complete
//                     </Text>
//                 </View>

//                 <View className="w-full bg-gray-300 h-2 rounded-full mt-1">
//                     <View
//                         className="bg-blue-500 h-2 rounded-full"
//                         style={{ width: `${progress}%` }}
//                     />
//                 </View>

//                 {/* Continue Learning Button */}
//                 <TouchableOpacity
//                     className="mt-5 bg-[#0A2941] py-3 rounded-lg items-center"
//                     onPress={onPress}
//                 >
//                     <Text className="text-white text-lg font-semibold">
//                         Continue Learning
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default CourseCard

import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'

interface CourseCardProps {
    title: string
    progress: number
    onPress: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    progress,
    onPress
}) => {
    return (
        <View style={styles.card}>
            <Image
                source={require('../../../assets/images/learn-card1.png')}
                style={styles.image}
                resizeMode="contain"
            />

            {/* Content */}
            <View style={styles.content}>
                <Text style={styles.title}>{title}</Text>

                {/* Progress */}
                <View style={styles.progressRow}>
                    <Text style={styles.progressLabel}>Lesson 05/10</Text>
                    <Text style={styles.progressLabel}>
                        {progress}% Complete
                    </Text>
                </View>
                <View style={styles.progressBarBackground}>
                    <View
                        style={[
                            styles.progressBarFill,
                            { width: `${progress}%` }
                        ]}
                    />
                </View>

                {/* Button */}
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>Continue Learning</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
        width: 292,
        height: 445,
        marginBottom: 16
    },
    image: {
        width: '100%',
        height: 180,
        alignSelf: 'center'
    },
    content: {
        padding: 16
    },
    title: {
        fontFamily: 'Montserrat',
        fontSize: 22,
        fontWeight: '700',
        color: '#1C1C1C',
        lineHeight: 35
    },
    progressRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 12
    },
    progressLabel: {
        fontSize: 14,
        color: '#666'
    },
    progressBarBackground: {
        width: '100%',
        backgroundColor: '#D9D9D9',
        height: 8,
        borderRadius: 4,
        marginTop: 6
    },
    progressBarFill: {
        height: 8,
        borderRadius: 4,
        backgroundColor: '#007BFF'
    },
    button: {
        marginTop: 20,
        backgroundColor: '#0A2941',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600'
    }
})

export default CourseCard
