import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const MessagePermission = (): React.JSX.Element => {
    const router = useRouter()

    const handleAllow = (): void => {
        router.replace('/onboarding/callPermission')
    }

    const handleDeny = (): void => {
        router.replace('/onboarding/messagePermissionDenied')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.messageText}>
                <Text style={styles.boldText}>Message Permission:</Text> To
                protect you from scam messages, I need permission to access your
                messages. Your data will be safe and secure with us.
            </Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleAllow}>
                    <Text style={styles.buttonText}>Allow</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={handleDeny}>
                    <Text style={styles.buttonText}>Deny</Text>
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

export default MessagePermission
