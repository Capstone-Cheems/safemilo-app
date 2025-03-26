import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour4calls = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])
    const handleDeny = (): void => {
        router.replace('/home')
    }

    const handleNext = (): void => {
        router.replace('/onboarding/tour5messages')
    }

    return (
        <ImageBackground
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            source={require('../../../assets/images/bg-calls.png')}
            style={{
                width: '100%',
                aspectRatio: 390 / 1312,
                transform: [{ translateY: -180 }]
            }}
            resizeMode="cover"
        >
            <View
                style={
                    (commonStyles.container,
                    { position: 'absolute', top: 460, left: 8 })
                }
            >
                <View style={commonStyles.dialogBox}>
                    <View style={commonStyles.progressBarContainer}>
                        <View style={commonStyles.progressBarFill75} />
                    </View>
                    <Text style={commonStyles.dialogText}>
                        Track the list of phone numbers that are flagged as
                        scams
                    </Text>
                    <View style={commonStyles.buttonContainer}>
                        <TouchableOpacity
                            style={commonStyles.buttonWhite}
                            onPress={handleDeny}
                        >
                            <Text style={commonStyles.buttonTextWhite}>
                                Skip
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={commonStyles.dialogButton}
                            onPress={handleNext}
                        >
                            <Text style={commonStyles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={commonStyles.triangle} />
                </View>
            </View>
        </ImageBackground>
    )
}

export default Tour4calls
