import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import JumpWaveLoopAnimation from '../../../components/JumpWaveLoopAnimation'

const OnboardingScreen = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const handleContinue = (): void => {
        router.replace('/onboarding/messagePermission')
    }

    return (
        <View style={commonStyles.viewContainer}>
            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.title}>Hi! I’m Milo,</Text>
                <Text style={commonStyles.description}>
                    Your scam-free buddy. I’ll help you stay safe from online
                    scams.
                </Text>
                <Text style={commonStyles.description}>Let’s begin!</Text>

                <TouchableOpacity
                    style={commonStyles.longButtonNew}
                    onPress={handleContinue}
                >
                    <Text style={commonStyles.buttonText}>Next</Text>
                </TouchableOpacity>

                <View style={commonStyles.triangle} />
            </View>

            <JumpWaveLoopAnimation style={commonStyles.jumpWaveLoopAnimation} />
        </View>
    )
}

export default OnboardingScreen
