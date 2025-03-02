import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const MessagePermission = (): React.JSX.Element => {
    const router = useRouter()

    const handleAllow = (): void => {
        router.replace('/onboarding/callPermission')
    }

    const handleDeny = (): void => {
        router.replace('/onboarding/messagePermissionDenied')
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Message</Text>
            <Text style={commonStyles.messageText}>
                To protect you from scam messages, I need permission to access
                your messages. Your data will be safe and secure with us.
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

export default MessagePermission
