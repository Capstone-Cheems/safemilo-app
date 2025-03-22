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
import { useFocusEffect } from '@react-navigation/native'
import commonStyles from '../../styles/commonStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'

// eslint-disable-next-line import/no-unresolved
import { useAuth } from '@/src/shared'

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
            if (!auth.currentUser) return

            await updateProfile(auth.currentUser, {
                displayName: newDisplayName
            })

            const updatedUser = auth.currentUser
            const updatedUserData: UserData = {
                displayName: updatedUser.displayName,
                email: updatedUser.email || '',
                uid: updatedUser.uid,
                providerData: updatedUser.providerData,
                photoURL: updatedUser.photoURL
            }

            setUserData(updatedUserData)
            await AsyncStorage.setItem('user', JSON.stringify(updatedUserData))
            Alert.alert('Success', 'Display name updated!')
        } catch (error) {
            Alert.alert('Error', 'Could not update display name.')
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
                {userData?.displayName && (
                    <View
                        style={{
                            marginTop: 60,
                            backgroundColor: 'white',
                            borderRadius: 60, // Circular shape
                            padding: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 120, // Fixed width
                            height: 120, // Ensure height matches width
                            aspectRatio: 1, // Maintain a 1:1 ratio for circle
                            borderWidth: 0.5, // Set the border thickness
                            borderColor: 'black' // Set the border color
                        }}
                    >
                        <Text
                            style={{
                                fontSize: textSize + 4,
                                fontWeight: isBold ? 'bold' : 'normal',
                                color: 'black' // Text color for contrast
                            }}
                        >
                            {userData.displayName
                                .split(' ')
                                .map((name, index, arr) =>
                                    index === 0 || index === arr.length - 1
                                        ? name.charAt(0).toUpperCase()
                                        : ''
                                )
                                .join('')}
                        </Text>
                    </View>
                )}
            </View>

            {userData?.displayName ? (
                <Text
                    style={{
                        fontSize: textSize + 6,
                        fontWeight: isBold ? 'bold' : 'normal'
                    }}
                >
                    {userData.displayName}
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
                style={{
                    fontSize: textSize - 7,
                    fontWeight: isBold ? 'bold' : 'normal',
                    marginBottom: 10
                }}
            >
                {userData ? userData.email : 'Guest'}
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
