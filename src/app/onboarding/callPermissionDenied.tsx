import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const CallPermissionDenied = (): React.JSX.Element => {
    const router = useRouter()

    const handleContinue = (): void => {
        router.replace('//onboarding/tour1start')
    }

    const handleBack = (): void => {
        router.replace('/onboarding/callPermission')
    }

    return (
        <View style={commonStyles.container}>
            <TouchableOpacity
                style={commonStyles.backButton}
                onPress={handleBack}
            >
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/raw-circle-arrow-left.png')}
                    style={commonStyles.backIcon}
                />
            </TouchableOpacity>
            <Text style={commonStyles.messageText}>
                That's okay! You can enable it later in settings for extra
                protection.
            </Text>

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

export default CallPermissionDenied
