import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour4news = (): React.JSX.Element => {
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/onboarding/tour3lesson')
    }

    const handleNext = (): void => {
        router.replace('/onboarding/tour5chat')
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.messageText}>
                <Text>
                    Get real-time scam alerts from banks, insurers, and police.
                </Text>
                <Text>Stay ahead!</Text>
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
                    <Text style={commonStyles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Tour4news
