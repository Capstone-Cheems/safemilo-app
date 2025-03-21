import React, { useLayoutEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour5chat = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const handleNext = (): void => {
        router.replace('/home')
    }

    return (
        <View style={commonStyles.container}>
            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../../assets/images/tour-chat.png')}
                className="w-[100%] h-[10%] mb-8"
            />

            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.messageText}>
                    Got a question? Tap me below, and I'll help with any
                    scam-related doubts!
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
                    onPress={handleNext}
                >
                    <Text style={commonStyles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Tour5chat
