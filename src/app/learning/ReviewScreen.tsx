// import React from 'react'
// import { View, Text, TouchableOpacity } from 'react-native'
// import { useRouter, useLocalSearchParams } from 'expo-router'

// // ✅ Ensure this path is correct and the animation file exists
// import ModuleCompleteAnimation from '@/components/ModuleCompleteAnimation'

// const ReviewScreen = (): JSX.Element => {
//     const router = useRouter()
//     const { totalScore } = useLocalSearchParams<{ totalScore?: string }>()

//     return (
//         <View className="flex-1 bg-[#3B82F6] items-center justify-center px-6">
//             {/* ✅ Animation */}
//             <ModuleCompleteAnimation style={{ width: 200, height: 200 }} />

//             {/* ✅ Speech Bubble */}
//             <View className="bg-white px-6 py-3 rounded-2xl shadow-lg mt-4">
//                 <Text className="text-xl font-bold text-center">
//                     Woohoo! Module Completed!
//                 </Text>
//             </View>

//             {/* ✅ Points Earned */}
//             <View className="bg-white rounded-xl p-6 mt-6 w-64 items-center shadow-md">
//                 <Text className="text-3xl font-bold text-blue-900">
//                     +{totalScore || 0} Points Earned
//                 </Text>
//             </View>

//             {/* ✅ Continue Learning Button */}
//             <TouchableOpacity
//                 className="mt-6 bg-blue-900 px-6 py-3 rounded-lg w-64"
//                 onPress={() => router.replace('/(tabs)/learn')}
//             >
//                 <Text className="text-white text-lg font-semibold text-center">
//                     Continue Learning
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default ReviewScreen

import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import ModuleCompleteAnimation from '@/components/ModuleCompleteAnimation'
export const unstable_settings = {
    headerShown: false
}

const { width } = Dimensions.get('window')

const ReviewScreen = (): JSX.Element => {
    const router = useRouter()
    const { totalScore } = useLocalSearchParams<{ totalScore?: string }>()

    return (
        <View style={styles.container}>
            {/* Top Blue Circle Background */}
            <View style={styles.topCircle} />

            {/* Speech Bubble */}
            <View style={styles.speechBubble}>
                <Text style={styles.speechText}>Woohoo! Module Completed!</Text>
            </View>

            {/* Milo Animation positioned above Score Card */}
            <View style={styles.miloWrapper}>
                <ModuleCompleteAnimation style={{ width: 150, height: 180 }} />
            </View>

            {/* Score Box */}
            <View style={styles.scoreCard}>
                <Text style={styles.pointsText}>+{totalScore || 0}</Text>
                <Text style={styles.pointsLabel}>Points Earned</Text>
            </View>

            {/* Button */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => router.replace('/(tabs)/learn')}
            >
                <Text style={styles.buttonText}>Continue Learning</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3B82F6',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100,
        position: 'relative'
    },
    topCircle: {
        position: 'absolute',
        top: -250,
        left: -110,
        width: width * 1.5,
        height: width * 1.5,
        backgroundColor: '#60A5FA',
        borderRadius: width,
        zIndex: 0
    },
    speechBubble: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 12,
        marginBottom: 20,
        zIndex: 2
    },
    speechText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    miloWrapper: {
        zIndex: 3,
        marginBottom: -40
    },
    scoreCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 30,
        paddingHorizontal: 40,
        alignItems: 'center',
        width: 300,
        zIndex: 2
    },
    pointsText: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#0A2941'
    },
    pointsLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#0A2941',
        marginTop: 4
    },
    button: {
        marginTop: 40,
        backgroundColor: '#0A2941',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: 300,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
})

export default ReviewScreen
