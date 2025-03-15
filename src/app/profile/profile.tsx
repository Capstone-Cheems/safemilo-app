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
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import commonStyles from '../../styles/commonStyles'
import { useAuth } from '@/src/shared'
import { WebView } from 'react-native-webview'

const Profile = (): React.JSX.Element => {
    const [textSize, setTextSize] = useState(20) // Default text size
    const [isBold, setIsBold] = useState(true)
    const [userData, setUserData] = useState<UserData | null>(null)
    const [newDisplayName, setNewDisplayName] = useState<string>('')

    const navigation = useNavigation()
    const router = useRouter()
    const auth = getAuth()
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
            const storedUserData = await AsyncStorage.getItem('user')

            if (storedSize) {
                setTextSize(parseInt(storedSize))
            }

            if (storedBold) {
                setIsBold(storedBold === 'true')
            }

            if (storedUserData) {
                setUserData(JSON.parse(storedUserData))
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
            await AsyncStorage.removeItem('user') // Clear stored user data
            await signOut(auth)
            Alert.alert('Success', 'You have been logged out!')
            router.replace('/auth/login')
        } catch (error) {
            Alert.alert('Logout Failed', (error as Error).message)
        }
    }

    const handleDisplayNameChange = async () => {
        try {
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: newDisplayName
                })

                const updatedUserData = {
                    ...userData,
                    displayName: newDisplayName,
                    email: userData?.email || '',
                    uid: userData?.uid || '',
                    providerData: userData?.providerData || [],
                    photoURL: userData?.photoURL || null
                }

                setUserData(updatedUserData)
                await AsyncStorage.setItem(
                    'user',
                    JSON.stringify(updatedUserData)
                )
                Alert.alert('Success', 'Display name updated!')
            }
        } catch (error) {
            Alert.alert('Error', 'Could not update display name.')
        }
    }

    const navigateTo = (path: string) => {
        router.push(path)
    }

    return (
        <View style={commonStyles.container}>
            <View style={styles.container}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/milo-mascot.png')}
                    style={styles.image}
                />
            </View>
            <Text
                style={[
                    { fontSize: textSize + 4 },
                    { fontWeight: isBold ? 'bold' : 'normal' }
                ]}
            >
                Profile
            </Text>
            {userData?.displayName ? (
                <Text
                    style={[
                        { fontWeight: isBold ? 'bold' : 'normal' },
                        { fontSize: textSize }
                    ]}
                >
                    Welcome, {userData.displayName}!
                </Text>
            ) : (
                <View>
                    <Text style={commonStyles.boldText}>
                        Set your Display Name
                    </Text>
                    <TextInput
                        style={commonStyles.input}
                        value={newDisplayName}
                        onChangeText={setNewDisplayName}
                        placeholder="Enter Display Name"
                    />
                    <TouchableOpacity
                        onPress={handleDisplayNameChange}
                        style={commonStyles.largeformButton}
                    >
                        <Text style={commonStyles.buttonText}>
                            Set Display Name
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            <Text
                style={[
                    { fontWeight: isBold ? 'bold' : 'normal' },
                    { fontSize: textSize - 8 }
                ]}
            >
                {userData ? userData.email : 'Guest'}
            </Text>

            <TouchableOpacity
                onPress={() => navigateTo('./settings')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.buttonText,
                        { fontWeight: isBold ? 'bold' : 'normal' }
                    ]}
                >
                    Settings
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./saved-posts')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.buttonText,
                        { fontWeight: isBold ? 'bold' : 'normal' }
                    ]}
                >
                    Saved Posts
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./feature-walkthrough')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.buttonText,
                        { fontWeight: isBold ? 'bold' : 'normal' }
                    ]}
                >
                    Feature WalkThrough
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./faq')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.buttonText,
                        { fontWeight: isBold ? 'bold' : 'normal' }
                    ]}
                >
                    Frequently Asked Questions
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./report-bug')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.buttonText,
                        { fontWeight: isBold ? 'bold' : 'normal' }
                    ]}
                >
                    Report a Bug
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleLogout}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.buttonText,
                        { fontWeight: isBold ? 'bold' : 'normal' }
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
        width: 200,
        height: 200,
        borderRadius: 50
    }
})

export default Profile
