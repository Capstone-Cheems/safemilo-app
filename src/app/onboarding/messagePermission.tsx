import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import LookPhoneMessageAnimation from '../../../components/LookPhoneMessageAnimation'

const MessagePermission = (): React.JSX.Element => {
    const router = useRouter()

    const handleAllow = (): void => {
        router.replace('/onboarding/callPermission')
    }

    const handleDeny = (): void => {
        router.replace('/onboarding/messagePermissionDenied')
    }

    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    return (
        <View style={commonStyles.viewContainer}>
            <View style={commonStyles.dialogBox}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/message-permission-icon.png')}
                    style={commonStyles.permissionIcon}
                />
                <Text style={commonStyles.title}>
                    Allow Access to your Message
                </Text>
                <Text style={commonStyles.description}>
                    Allowing 'SafeMilo' to access your messages will help
                    protect you from scam messages.
                </Text>

                <View style={commonStyles.buttonContainer}>
                    <TouchableOpacity
                        style={commonStyles.buttonWhite}
                        onPress={handleDeny}
                    >
                        <Text style={commonStyles.buttonTextWhite}>Deny</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={commonStyles.dialogButton}
                        onPress={handleAllow}
                    >
                        <Text style={commonStyles.buttonText}>Allow</Text>
                    </TouchableOpacity>
                </View>

                <View style={commonStyles.triangle} />
            </View>

            <LookPhoneMessageAnimation
                style={commonStyles.lookPhoneAnimation}
            />
        </View>
    )
}

export default MessagePermission
