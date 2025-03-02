import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour3lesson = (): React.JSX.Element => {
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/onboarding/tour2tip')
    }

    const handleNext = (): void => {
        router.replace('/onboarding/tour4news')
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.messageText}>
                Learn to spot and avoid scams with our quick, helpful safety
                lessons!
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

export default Tour3lesson
