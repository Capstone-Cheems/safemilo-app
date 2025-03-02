import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const Tour1start = (): React.JSX.Element => {
    const router = useRouter()

    const handleProceed = (): void => {
        router.replace('/onboarding/tour2tip')
    }

    const handleDeny = (): void => {
        router.replace('/home')
    }

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Take a Tour of SafeMilo!</Text>
            <Text style={commonStyles.messageText}>
                Explore and discover our app features
            </Text>

            <TouchableOpacity
                style={commonStyles.longButton}
                onPress={handleProceed}
            >
                <Text style={commonStyles.buttonText}>Take the tour</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={commonStyles.longButton}
                onPress={handleDeny}
            >
                <Text style={commonStyles.buttonText}>No thanks</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Tour1start
