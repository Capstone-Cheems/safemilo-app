import React, { useLayoutEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour3lesson = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])
    const handleDeny = (): void => {
        router.replace('/home')
    }

    const handleNext = (): void => {
        router.replace('/onboarding/tour4news')
    }

    return (
        <View style={commonStyles.container}>
            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../../assets/images/tour-learn.png')}
                className="w-[100%] h-[10%] mb-8"
            />

            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.messageText}>
                    Learn to spot and avoid scams with our quick, helpful safety
                    lessons!
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
                    style={commonStyles.buttonWhite}
                    onPress={handleDeny}
                >
                    <Text style={commonStyles.buttonTextWhite}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={commonStyles.dialogButton}
                    onPress={handleNext}
                >
                    <Text style={commonStyles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Tour3lesson
