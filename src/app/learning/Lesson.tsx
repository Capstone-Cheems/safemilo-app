import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'

const LessonScreen = (): JSX.Element => {
    const router = useRouter()
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
                onPress={
                    () =>
                        router.push({
                            pathname: '/learning/Quiz',
                            params: { lessonId: '1' }
                        }) // Correct navigation
                }
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
