import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const Tour1start = (): React.JSX.Element => {
    const router = useRouter()

    const handleProceed = (): void => {
        router.replace('/onboarding/tour2tip')
    }

    const handleDeny = (): void => {
        router.replace('/home')
    }

    return (
        <View style={styles.container}>
            <Text>
                <Text style={styles.boldText}>Take a Tour of SafeMilo!</Text>
                <Text style={styles.messageText}>
                    Explore and discover our app features
                </Text>
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleProceed}>
                <Text style={styles.buttonText}>Take the tour</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleDeny}>
                <Text style={styles.buttonText}>No thanks</Text>
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

export default Tour1start
