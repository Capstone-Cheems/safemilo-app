import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import * as Contacts from 'expo-contacts'
import commonStyles from '../../styles/commonStyles'

const CallPermission = (): React.JSX.Element => {
    const router = useRouter()
    const [permissionStatus, setPermissionStatus] =
        useState<Contacts.PermissionStatus | null>(null)
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ title: 'OnBoarding' })
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
                <Text style={commonStyles.title}>
                    Allow Access to your Calls
                </Text>
                <Text style={commonStyles.description}>
                    Allowing 'SafeMilo' to access your call will help you from
                    scam calls.
                </Text>

                <View style={commonStyles.buttonContainer}>
                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={handleDeny}
                    >
                        <Text style={commonStyles.buttonText}>Deny</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={commonStyles.button}
                        onPress={requestPermission}
                    >
                        <Text style={commonStyles.buttonText}>Allow</Text>
                    </TouchableOpacity>
                </View>

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

export default CallPermission
