import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const Tour5chat = (): React.JSX.Element => {
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/onboarding/tour4news')
    }

    const handleNext = (): void => {
        router.replace('/home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.messageText}>
                <Text>Got a question? </Text>
                <Text>
                    Tap me below, and I'll help with any scam-related doubts!
                </Text>
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleBack}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    button: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        flex: 1,
        marginHorizontal: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    }
})

export default Tour5chat
