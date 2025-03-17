import React, { useLayoutEffect } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour1start = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    const handleProceed = (): void => {
        router.replace('/onboarding/tour2tip')
    }

    const handleDeny = (): void => {
        router.replace('/home')
    }

    const handleBack = (): void => {
        router.replace('/onboarding/callPermission')
    }

    return (
        <View style={commonStyles.viewContainer}>
            <TouchableOpacity
                style={commonStyles.backButton}
                onPress={handleBack}
            >
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/raw-circle-arrow-left.png')}
                    style={commonStyles.backIcon}
                />
            </TouchableOpacity>

            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.title}>Take a tour of SafeMilo</Text>
                <Text style={commonStyles.description}>
                    Explore and discover our app features
                </Text>

                <TouchableOpacity
                    style={commonStyles.longButton}
                    onPress={handleProceed}
                >
                    <Text style={commonStyles.buttonText}>Continue</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={commonStyles.longButton}
                    onPress={handleDeny}
                >
                    <Text style={commonStyles.buttonText}>Skip</Text>
                </TouchableOpacity>

                <View style={commonStyles.triangle} />
            </View>
            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../../assets/images/permission-milo-1.png')}
                style={commonStyles.mascotImage}
            />
        </View>
    )
}

export default Tour1start
