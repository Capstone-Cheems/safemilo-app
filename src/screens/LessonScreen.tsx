// // // import React from 'react'
// // // import { View, Text, StyleSheet } from 'react-native'
// // // import VideoPlayer from '../Components/Videoplayer'

// // // const LessonScreen = (): JSX.Element => {
// // //     return (
// // //         <View style={styles.container}>
// // //             <Text style={styles.header}>Lesson Preview</Text>
// // //             <VideoPlayer uri="https://www.example.com/sample-video.mp4" />
// // //         </View>
// // //     )
// // // }

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //         padding: 16,
// // //         backgroundColor: '#F9F9F9'
// // //     },
// // //     header: {
// // //         fontSize: 22,
// // //         fontWeight: 'bold',
// // //         marginBottom: 10
// // //     }
// // // })

// // // export default LessonScreen

// // import React, { useState } from 'react'
// // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// // import { useNavigation } from '@react-navigation/native'
// // import VideoPlayer from '../Components/Videoplayer'

// // const LessonScreen = (): JSX.Element => {
// //     const navigation = useNavigation()
// //     const [videoCompleted, setVideoCompleted] = useState(false)

// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.header}>Lesson Video</Text>
// //             <VideoPlayer
// //                 uri="https://www.example.com/sample-video.mp4"
// //                 onEnd={() => setVideoCompleted(true)}
// //             />

// //             {videoCompleted && (
// //                 <TouchableOpacity
// //                     style={styles.button}
// //                     onPress={() => navigation.navigate('Quiz')}
// //                 >
// //                     <Text style={styles.buttonText}>Continue</Text>
// //                 </TouchableOpacity>
// //             )}
// //         </View>
// //     )
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 16,
// //         backgroundColor: '#F9F9F9',
// //         justifyContent: 'center',
// //         alignItems: 'center'
// //     },
// //     header: {
// //         fontSize: 22,
// //         fontWeight: 'bold',
// //         marginBottom: 10
// //     },
// //     button: {
// //         backgroundColor: '#444',
// //         padding: 12,
// //         borderRadius: 5,
// //         marginTop: 20,
// //         alignItems: 'center'
// //     },
// //     buttonText: {
// //         color: '#FFF',
// //         fontSize: 16
// //     }
// // })

// // export default LessonScreen

// import React, { useRef } from 'react'
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { Video } from 'expo-av'
// import { useNavigation } from '@react-navigation/native'

// const LessonScreen = (): JSX.Element => {
//     const navigation = useNavigation()
//     const videoRef = useRef<Video>(null)

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Lesson Video</Text>
//             <Video
//                 ref={videoRef}
//                 source={{ uri: 'https://www.example.com/sample-video.mp4' }} // Replace with actual video URL
//                 style={styles.video}
//                 useNativeControls
//                 resizeMode="contain"
//             />

//             {/* Continue button is always visible */}
//             <TouchableOpacity
//                 style={styles.button}
//                 onPress={() => navigation.navigate('Quiz')}
//             >
//                 <Text style={styles.buttonText}>Continue</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#F9F9F9',
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     header: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 10
//     },
//     video: {
//         width: 320,
//         height: 180,
//         backgroundColor: 'black'
//     },
//     button: {
//         backgroundColor: '#444',
//         padding: 12,
//         borderRadius: 5,
//         marginTop: 20,
//         alignItems: 'center'
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16
//     }
// })

// export default LessonScreen

import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'

const LessonScreen = (): JSX.Element => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lesson Video</Text>

            {/* YouTube Video Embed */}
            <WebView
                source={{ uri: 'https://www.youtube.com/embed/ar2MOvn2aDc' }}
                style={styles.video}
                allowsFullscreenVideo
            />

            {/* Continue button to go to Quiz */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Quiz')}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    video: {
        width: 320,
        height: 180
    },
    button: {
        backgroundColor: '#444',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16
    }
})

export default LessonScreen
