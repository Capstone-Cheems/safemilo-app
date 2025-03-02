import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour2tip = (): React.JSX.Element => {
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/onboarding/tour1start')
    }

    const handleNext = (): void => {
        router.replace('/onboarding/tour3lesson')
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Milo's Tip of the Day</Text>
            <Text style={commonStyles.boldText}>Did you know?</Text>

            <Text style={commonStyles.messageText}>
                Never share One time password or codes with anyone -- not even
                your bank!
            </Text>

            <Text style={commonStyles.messageText}>
                Every day, I'll share a quick tip to help you spot and avoid
                scams. Stay one step ahead!
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

export default Tour2tip
