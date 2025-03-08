import React, { useLayoutEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const OnboardingScreen = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    const handleContinue = (): void => {
        router.replace('/onboarding/messagePermission')
    }
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])
    return (
        <View style={commonStyles.viewContainer}>
            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.title}>Hi! I’m Mylo,</Text>
                <Text style={commonStyles.description}>
                    Your scam-free buddy. I’ll help you stay safe from online
                    scams.
                </Text>
                <Text style={commonStyles.description}>Let’s begin!</Text>

                <TouchableOpacity
                    style={commonStyles.longButton}
                    onPress={handleContinue}
                >
                    <Text style={commonStyles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <View style={commonStyles.triangle} />
            </View>
            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../../assets/images/onBoardingMascotImage.png')}
                style={commonStyles.mascotImage}
            />
        </View>
    )
}

export default OnboardingScreen
