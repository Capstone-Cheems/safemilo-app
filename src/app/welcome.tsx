import React, { useLayoutEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import commonStyles from '../styles/commonStyles'

const Welcome = (): React.JSX.Element => {
    const router = useRouter()
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    return (
        <View style={commonStyles.authContainer}>
            <Image
                // eslint-disable-next-line @typescript-eslint/no-require-imports
                source={require('../../assets/images/safemilo-logo.png')}
                style={commonStyles.appLogo}
                resizeMode="contain"
            />

            <TouchableOpacity
                style={commonStyles.longButtonWhite}
                onPress={() => router.push('/auth/login')}
            >
                <Text style={commonStyles.buttonTextWhite}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={commonStyles.longButton}
                onPress={() => router.push('/auth/signup')}
            >
                <Text style={commonStyles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => router.replace('/auth/loginOrganization')}
                style={commonStyles.link}
            >
                <Text style={commonStyles.textRow}>
                    <Text>Organizational User?</Text>
                    <Text style={commonStyles.linkText}> Click here</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Welcome
