import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour5chat = (): React.JSX.Element => {
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/onboarding/tour4news')
    }

    const handleNext = (): void => {
        router.replace('/home')
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.messageText}>
                <Text>Got a question? </Text>
                <Text>
                    Tap me below, and I'll help with any scam-related doubts!
                </Text>
            </Text>

            <View style={commonStyles.buttonContainer}>
                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={handleBack}
                >
                    <Text style={commonStyles.buttonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={commonStyles.button}
                    onPress={handleNext}
                >
                    <Text style={commonStyles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Tour5chat
