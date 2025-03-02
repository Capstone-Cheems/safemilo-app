import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const CallPermission = (): React.JSX.Element => {
    const router = useRouter()

    const handleAllow = (): void => {
        router.replace('/home')
    }

    const handleDeny = (): void => {
        router.replace('/onboarding/callPermissionDenied')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.messageText}>
                <Text style={styles.boldText}>Call Permission:</Text> To protect
                you from scam calls, I need permission to access incoming calls.
                Your data will be safe and secure with us.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleAllow}>
                <Text style={styles.buttonText}>Allow</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleDeny}>
                <Text style={styles.buttonText}>Deny</Text>
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

export default CallPermission
