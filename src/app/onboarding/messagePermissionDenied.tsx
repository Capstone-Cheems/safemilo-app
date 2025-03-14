import React, { useLayoutEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const MessagePermissionDenied = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])
    const handleContinue = (): void => {
        router.replace('/onboarding/callPermission')
    }

    const handleBack = (): void => {
        router.replace('/onboarding/messagePermission')
    }

    return (
        <View style={commonStyles.viewContainer}>
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

            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.description}>
                    That's okay! You can enable it later in settings for extra
                    protection.
                </Text>

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
                source={require('../../../assets/images/permission-milo-1.png')}
                style={commonStyles.mascotImage}
            />
        </View>
    )
}

export default MessagePermissionDenied
