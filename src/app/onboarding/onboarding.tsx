import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const OnboardingScreen = (): React.JSX.Element => {
    const router = useRouter()

    const handleContinue = (): void => {
        router.replace('/onboarding/messagePermission')
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Hi, I'm Milo!</Text>

            <Text style={commonStyles.messageText}>
                Your scam-free buddy. I'll help you stay safe from daily scams.
            </Text>

            <Text style={commonStyles.messageText}>Let's begin!</Text>

            <TouchableOpacity
                style={commonStyles.longButton}
                onPress={handleContinue}
            >
                <Text style={commonStyles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../../assets/images/onBoardingMascotImage.png')}
                style={commonStyles.mascotImage}
            />
        </View>
    )
}

export default OnboardingScreen
