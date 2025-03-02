import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const MessagePermissionDenied = (): React.JSX.Element => {
    const router = useRouter()

    const handleContinue = (): void => {
        router.replace('/onboarding/callPermission')
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

            <Text style={styles.welcomeText}>
                That's okay! You can enable it later in settings for extra
                protection.
            </Text>

            <TouchableOpacity style={styles.button} onPress={handleContinue}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../../assets/images/onBoardingMascotImage.png')}
                style={styles.mascotImage}
            />
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
    mascotImage: {
        width: 200,
        height: 200,
        marginBottom: 30
    },
    welcomeText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30
    },
    button: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    }
})

export default MessagePermissionDenied
