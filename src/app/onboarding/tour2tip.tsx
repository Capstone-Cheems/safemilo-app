import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour2tip = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])
    const handleDeny = (): void => {
        router.replace('/home')
    }

    const handleNext = (): void => {
        router.replace('/onboarding/tour3news')
    }

    return (
        <ImageBackground
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            source={require('../../../assets/images/bg-tip.png')}
            style={{
                width: '100%',
                aspectRatio: 390 / 1312,
                transform: [{ translateY: -110 }]
            }}
            resizeMode="cover"
        >
            <View
                style={
                    (commonStyles.container,
                    { position: 'absolute', top: 380, left: 42 })
                }
            >
                <View style={commonStyles.dialogBox}>
                    <View style={commonStyles.invertedTriangle} />

                    <View style={commonStyles.progressBarContainer}>
                        <View style={commonStyles.progressBarFill25} />
                    </View>
                    <Text style={commonStyles.dialogText}>
                        I'll share a quick tip daily to help you spot and avoid
                        scams.
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
                </View>
            </View>
        </ImageBackground>
    )
}

export default Tour2tip
