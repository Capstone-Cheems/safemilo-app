import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const Tour2tip = (): React.JSX.Element => {
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/onboarding/tour1start')
    }

    const handleNext = (): void => {
        router.replace('/onboarding/tour3lesson')
    }

    return (
        <View style={styles.container}>
            <Text>
                <Text style={styles.boldText}>Milo's Tip of the Day</Text>
                <Text style={styles.boldText}>Did you know?</Text>
                <Text style={styles.messageText}>
                    Never share One time password or codes with anyone--not even
                    your bank!
                </Text>
            </Text>

            <Text style={styles.messageText}>
                Every day, I'll share a quick tip to help you spot and avoid
                scams. Stay one step ahead!
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

export default Tour2tip
