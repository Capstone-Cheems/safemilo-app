import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const OnboardingScreen = (): React.JSX.Element => {
    const router = useRouter()

    const handleContinue = (): void => {
        router.replace('/onboarding/messagePermission')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Hi, I'm Milo!</Text>

            <Text style={styles.welcomeText}>
                Your scam-free buddy. I'll help you stay safe from daily scams.
            </Text>

            <Text style={styles.welcomeText}>Let's begin!</Text>

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

export default OnboardingScreen
