import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const CallPermission = (): React.JSX.Element => {
    const router = useRouter()

    const handleAllow = (): void => {
        router.replace('/onboarding/tour1start')
    }

    const handleDeny = (): void => {
        router.replace('/onboarding/callPermissionDenied')
    }

    const handleBack = (): void => {
        router.replace('/onboarding/messagePermission')
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/raw-circle-arrow-left.png')}
                    style={styles.backIcon}
                />
            </TouchableOpacity>

            <Text style={styles.messageText}>
                <Text style={styles.boldText}>Call Permission:</Text> To protect
                you from scam calls, I need permission to access incoming calls.
                Your data will be safe and secure with us.
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 10
    },
    backIcon: {
        width: 30,
        height: 30
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

export default CallPermission
