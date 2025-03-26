import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'
import TourStartAnimation from '@/components/TourStartAnimation'

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

    return (
        <View style={commonStyles.viewContainer}>
            <View style={commonStyles.dialogBox}>
                <Text style={commonStyles.title}>Take a tour of SafeMilo</Text>
                <Text style={commonStyles.description}>
                    Explore and discover our app features
                </Text>

                <TouchableOpacity
                    style={commonStyles.longButton}
                    onPress={handleProceed}
                >
                    <Text style={commonStyles.buttonText}>Take a tour</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={commonStyles.longButtonWhite}
                    onPress={handleDeny}
                >
                    <Text style={commonStyles.buttonTextWhite}>Skip</Text>
                </TouchableOpacity>

                <View style={commonStyles.triangle2} />
            </View>

            <TourStartAnimation style={commonStyles.tourStartAnimation} />
        </View>
    )
}

export default Tour1start
