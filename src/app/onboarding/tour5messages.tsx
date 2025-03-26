import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour5messages = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const handleNext = (): void => {
        router.replace('/home')
    }

    return (
        <ImageBackground
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            source={require('../../../assets/images/bg-messages.png')}
            style={{
                width: '100%',
                aspectRatio: 390 / 1312,
                transform: [{ translateY: -400 }]
            }}
            resizeMode="cover"
        >
            <View
                style={
                    (commonStyles.container,
                    { position: 'absolute', top: 730, left: 32 })
                }
            >
                <View style={commonStyles.dialogBox}>
                    <View style={commonStyles.progressBarContainer}>
                        <View style={commonStyles.progressBarFill100} />
                    </View>
                    <Text style={commonStyles.dialogText}>
                        Track the messages that are flagged as scams
                    </Text>
                    <View style={commonStyles.buttonContainer}>
                        <TouchableOpacity
                            style={commonStyles.dialogButton}
                            onPress={handleNext}
                        >
                            <Text style={commonStyles.buttonText}>Done</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={commonStyles.triangle} />
                </View>
            </View>
        </ImageBackground>
    )
}

export default Tour5messages
