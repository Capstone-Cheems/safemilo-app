import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
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
            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../../assets/images/tour-news.png')}
                className="w-[100%] h-[23%] mb-8"
            />

            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.messageText}>
                    Get real-time scam alerts from banks, insurers, and police.
                    Stay ahead!
                </Text>
                <View style={commonStyles.triangle} />
            </View>
            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../../assets/images/onBoardingMascotImage.png')}
                style={commonStyles.mascotImage}
            />

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
