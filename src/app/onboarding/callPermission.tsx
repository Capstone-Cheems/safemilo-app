import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import * as Contacts from 'expo-contacts'
import commonStyles from '../../styles/commonStyles'
import LookPhoneCallAnimation from '../../../components/LookPhoneCallAnimation'

const CallPermission = (): React.JSX.Element => {
    const router = useRouter()
    const [permissionStatus, setPermissionStatus] =
        useState<Contacts.PermissionStatus | null>(null)
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])
    useEffect(() => {
        const checkPermission = async (): Promise<void> => {
            const { status } = await Contacts.getPermissionsAsync()
            setPermissionStatus(status)
            console.log('Initial Permission Status:', permissionStatus)
        }

        checkPermission()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const requestPermission = async (): Promise<void> => {
        const { status } = await Contacts.requestPermissionsAsync()
        setPermissionStatus(status)
        console.log('Updated Permission Status:', permissionStatus)

        if (status === 'granted') {
            router.replace('/onboarding/tour1start')
        } else {
            Alert.alert(
                'Permission Denied',
                'You need to enable contact access in your device settings to use this feature.'
            )
            router.replace('/onboarding/callPermissionDenied')
        }
    }

    const handleDeny = (): void => {
        router.replace('/onboarding/callPermissionDenied')
    }

    // const handleBack = (): void => {
    //     router.replace('/onboarding/messagePermission')
    // }

    return (
        <View style={commonStyles.viewContainer}>
            {/* <TouchableOpacity
                style={commonStyles.backButton}
                onPress={handleBack}
            >
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/light-back-button.png')}
                    style={commonStyles.backIconNew}
                />
            </TouchableOpacity> */}

            <View style={commonStyles.dialogBox}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/call-permission-icon.png')}
                    style={commonStyles.permissionIcon}
                />
                <Text style={commonStyles.title}>
                    Allow Access to your Calls
                </Text>
                <Text style={commonStyles.description}>
                    Allowing 'SafeMilo' to access your call will help you from
                    scam calls.
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
                        onPress={requestPermission}
                    >
                        <Text style={commonStyles.buttonText}>Allow</Text>
                    </TouchableOpacity>
                </View>

                <View style={commonStyles.triangle} />
            </View>

            <LookPhoneCallAnimation
                style={commonStyles.lookPhoneCallAnimation}
            />
        </View>
    )
}

export default CallPermission
