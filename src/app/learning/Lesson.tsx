import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native'
import { useLocalSearchParams } from 'expo-router'
import LoaderForLesson from '@/components/LoaderForLesson'

const LessonScreen = (): JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)

     useEffect(() => {
            navigation.setOptions({
                headerTitle: '', // remove the default title
            })
        }, [navigation])

    const { courseId } = useLocalSearchParams()
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lesson Video</Text>

            <View style={styles.webviewWrapper}>
                <WebView
                    source={{ uri: 'https://www.youtube.com/embed/ar2MOvn2aDc' }}
                    style={styles.video}
                    allowsFullscreenVideo
                    onLoadStart={() => setLoading(true)}
                    onLoadEnd={() => setLoading(false)}
                />
                {loading && (
                    <View style={styles.loaderWrapper}>
                        <LoaderForLesson />
                    </View>
                )}
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() =>
                    router.push({
                        pathname: '/learning/Quiz',
                        params: { courseId }
                    })
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
        fontFamily: 'Montserrat-Bold',
        marginBottom: 10
    },
    video: {
        width: 340,
        height: 100,
        borderRadius: 20
    },
    button: {
        backgroundColor: '#0A2941',
        paddingVertical: 15,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginTop: 30,
        marginBottom: 20,
        width: '90%',
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontFamily: 'Montserrat-Bold'
    },
    webviewWrapper: {
        position: 'relative',
        width: 'auto',
        height: '80%',
        borderRadius: 20,
        overflow: 'hidden'
    },
    loaderWrapper: {
        ...StyleSheet.absoluteFillObject,
        display: 'flex',
        backgroundColor: 'rgba(255,255,255,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    }
})

export default LessonScreen
