import React, { useState, useCallback } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    Image,
    StyleSheet
} from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import commonStyles from '../../styles/commonStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'

// eslint-disable-next-line import/no-unresolved
import { useAuth } from '@/src/shared'
import { getAuth, updateProfile } from '@react-native-firebase/auth'
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage
} from '@/components/ui/avatar'

const Profile = (): React.JSX.Element => {
    const [textSize, setTextSize] = useState(20) // Default text size
    const [isBold, setIsBold] = useState(true)

    const navigation = useNavigation()
    const router = useRouter()
    const { logout } = useAuth()

    interface UserData {
        displayName: string | null
        email: string
        uid: string
        providerData: { providerId: string }[]
        photoURL: string | null
    }

    // Function to load settings
    const loadSettings = useCallback(async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize')
            const storedBold = await AsyncStorage.getItem('isBold')

            if (storedSize) {
                setTextSize(parseInt(storedSize))
            }

            if (storedBold) {
                setIsBold(storedBold === 'true')
            }
        } catch (error) {
            console.error('Error loading settings:', error)
        }
    }, [])

    // Load settings when the screen is focused
    useFocusEffect(
        useCallback(() => {
            loadSettings()
        }, [loadSettings])
    )

    const handleLogout = async () => {
        try {
            logout()
            Alert.alert('Success', 'You have been logged out!')
        } catch (error) {
            Alert.alert('Logout Failed', (error as Error).message)
        }
    }


    const navigateTo = (path: string) => {
        router.push(path)
    }

    return (
        <View style={commonStyles.profilecontainer}>
            {/* Profile text hooked to the top-left */}
            <View
                style={{ position: 'absolute', top: 0, left: 0, padding: 10 }}
            >
                <Text
                    style={{
                        fontSize: textSize + 10,
                        fontWeight: isBold ? 'bold' : 'normal'
                    }}
                >
                    Profile
                </Text>
            </View>

            <View style={styles.container}>
                <Avatar size="2xl">
                    <AvatarFallbackText>
                        {getAuth()?.currentUser?.displayName}
                    </AvatarFallbackText>
                    <AvatarImage
                        source={{
                            uri: getAuth().currentUser?.photoURL ?? ''
                        }}
                    />
                    <AvatarBadge />
                </Avatar>
            </View>

            <Text
                style={{
                    fontSize: textSize + 6,
                    fontWeight: isBold ? 'bold' : 'normal'
                }}
            >
                {getAuth().currentUser?.displayName}
            </Text>

            <Text
                style={{
                    fontSize: textSize - 7,
                    fontWeight: isBold ? 'bold' : 'normal',
                    marginBottom: 10
                }}
            >
                {getAuth() ? getAuth().currentUser?.email : 'Guest'}
            </Text>

            {/* Buttons */}
            <TouchableOpacity
                onPress={() => navigateTo('./settings')}
                style={commonStyles.toplargeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]}
                >
                    Settings
                </Text>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./saved-posts')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]}
                >
                    Saved Posts
                </Text>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./feature-walkthrough')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]}
                >
                    Feature Walkthrough
                </Text>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./faq')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]}
                >
                    FAQ's
                </Text>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./report-bug')}
                style={commonStyles.bottomlargeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]}
                >
                    Report a Bug
                </Text>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: 20, height: 20, marginLeft: 10 }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
                <Text
                    style={[
                        commonStyles.ltext,
                        {
                            fontSize: textSize - 3,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]}
                >
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#ccc',
        marginBottom: 10
    }
})

export default Profile
