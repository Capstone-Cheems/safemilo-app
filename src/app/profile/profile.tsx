import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    Image
} from 'react-native'
import { useNavigation, useRouter } from 'expo-router'
import { getAuth, signOut, updateProfile } from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import commonStyles from '../../styles/commonStyles'
import { useAuth } from '@/src/shared'

const Profile = (): React.JSX.Element => {
    // Load text size from storage
    const [textSize, setTextSize] = useState(20) // Default text size
    // State to track whether the text is bold
    const [isBold, setIsBold] = useState(true)

    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Profile' })
    }, [navigation])

    // Load settings from storage
    useEffect(() => {
        const Settings = async () => {
            const storedSize = await AsyncStorage.getItem('textSize')
            if (storedSize) {
                setTextSize(parseInt(storedSize))
            }
            const storedBold = await AsyncStorage.getItem('isBold')
            if (storedBold) {
                setIsBold(storedBold === 'true')
            }
        }
        Settings()
    }, [])

    interface UserData {
        displayName: string | null
        email: string
        uid: string
        providerData: { providerId: string }[]
        photoURL: string | null
    }

    const [userData, setUserData] = useState<UserData | null>(null)
    const [newDisplayName, setNewDisplayName] = useState<string>('')
    const router = useRouter()
    const auth = getAuth()
    const { logout } = useAuth()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUserData = await AsyncStorage.getItem('user')
                console.log('Stored User Data:', storedUserData)
                if (storedUserData) {
                    setUserData(JSON.parse(storedUserData))
                }
            } catch (error) {
                console.error('Error fetching user data:', error)
            }
        }
        fetchUserData()
    }, [])

    const handleLogout = async () => {
        try {
            logout()
            await AsyncStorage.removeItem('userData') // Clear stored user data
            await signOut(auth)
            Alert.alert('Success', 'You have been logged out!')
            router.replace('/auth/login')
        } catch (error) {
            Alert.alert('Logout Failed', (error as Error).message)
        }
    }

    const navigateTo = (path: string) => {
        router.push(path)
    }

    const handleDisplayNameChange = async () => {
        try {
            // Update displayName in Firebase
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: newDisplayName
                })
                // Update local state and stored user data
                setUserData(prevData => ({
                    ...prevData,
                    displayName: newDisplayName,
                    email: prevData?.email || '',
                    uid: prevData?.uid || '',
                    providerData: prevData?.providerData || [],
                    photoURL: prevData?.photoURL || null
                }))
                await AsyncStorage.setItem('user', JSON.stringify(userData))
                Alert.alert('Success', 'Display name updated!')
            }
        } catch (error) {
            Alert.alert('Error', 'Could not update display name.')
        }
    }

    return (
        <View style={commonStyles.container}>
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
                    Welcome, {userData.displayName} !
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

            {/* Conditionally render photo URL */}
            {userData?.photoURL ? (
                <Image
                    source={{ uri: userData.photoURL }}
                    style={commonStyles.profileImage} // Add appropriate styles
                />
            ) : (
                <View style={commonStyles.profilePlaceholder}>
                    <Text style={commonStyles.boldText}>No Profile Image</Text>
                    {/* Optionally, add a button to upload a profile image */}
                </View>
            )}

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

export default Profile
