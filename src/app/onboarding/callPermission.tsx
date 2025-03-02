import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const CallPermission = (): React.JSX.Element => {
    const router = useRouter()

    const handleAllow = (): void => {
        router.replace('/onboarding/tour1start')
    }

    const handleDeny = (): void => {
        router.replace('/onboarding/callPermissionDenied')
    }

    const handleBack = (): void => {
        router.replace('/onboarding/messagePermission')
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

            <Text style={commonStyles.boldText}>Call</Text>
            <Text style={commonStyles.messageText}>
                To protect you from scam calls, I need permission to access
                incoming calls. Your data will be safe and secure with us.
            </Text>

            <View style={commonStyles.buttonContainer}>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={handleAllow}
                >
                    <Text style={commonStyles.buttonText}>Allow</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={handleDeny}
                >
                    <Text style={commonStyles.buttonText}>Deny</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default CallPermission
