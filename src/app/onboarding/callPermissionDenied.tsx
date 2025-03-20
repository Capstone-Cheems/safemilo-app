import React, { useLayoutEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import RequestDeniedAnimation from '@/components/RequestDeniedAnimation'

const CallPermissionDenied = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])
    const handleContinue = (): void => {
        router.replace('/onboarding/tour1start')
    }

    const handleBack = (): void => {
        router.replace('/onboarding/callPermission')
    }

    return (
        <View style={commonStyles.viewContainer}>
            <TouchableOpacity
                style={commonStyles.backButton}
                onPress={handleBack}
            >
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/light-back-button.png')}
                    style={commonStyles.backIcon}
                />
            </TouchableOpacity>

            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.description}>
                    That's okay! You can enable it later in settings for extra
                    protection.
                </Text>

                <TouchableOpacity
                    style={commonStyles.longButton}
                    onPress={handleContinue}
                >
                    <Text style={commonStyles.buttonText}>Next</Text>
                </TouchableOpacity>

                <View style={commonStyles.triangle} />
            </View>

            <RequestDeniedAnimation
                style={commonStyles.moduleCompleteAnimation}
            />
        </View>
    )
}

export default CallPermissionDenied
