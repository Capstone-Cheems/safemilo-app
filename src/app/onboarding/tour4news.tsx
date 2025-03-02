import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const Tour4news = (): React.JSX.Element => {
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/onboarding/tour3lesson')
    }

    const handleNext = (): void => {
        router.replace('/onboarding/tour5chat')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.messageText}>
                <Text>
                    Get real-time scam alerts from banks, insurers, and police.
                </Text>
                <Text>Stay ahead!</Text>
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleBack}>
                <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    messageText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30
    },
    boldText: {
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    }
})

export default Tour4news
