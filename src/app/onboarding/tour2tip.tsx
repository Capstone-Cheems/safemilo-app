import React, { useLayoutEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour2tip = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Walkthrough' })
    }, [navigation])
    const handleBack = (): void => {
        router.replace('/onboarding/tour1start')
    }

    const handleNext = (): void => {
        router.replace('/onboarding/tour3lesson')
    }

    return (
        <View style={commonStyles.container}>
            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../../assets/images/tour-tip.png')}
                className="w-[100%] h-[26%] mb-8"
            />

            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.messageText}>
                    Every day, I'll share a quick tip to help you spot and avoid
                    scams. Stay one step ahead!
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

export default Tour2tip
