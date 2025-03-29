import React, { useState, useEffect, useCallback } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    ScrollView,
    Alert
} from 'react-native'

import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Contacts from 'expo-contacts'
import * as SMS from 'expo-sms'
import * as Notifications from 'expo-notifications'
import { Audio } from 'expo-av'
import commonStyles from '../../styles/commonStyles'
import {
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack
} from '@/components/ui/slider'

const Settings = (): React.JSX.Element => {
    const [textSize, setTextSize] = useState(20)
    const [showSlider, setShowSlider] = useState(false)
    const [isBold, setIsBold] = useState(true)

    const [contactsPermission, setContactsPermission] = useState<
        'granted' | 'denied' | null
    >(null)
    const [messagesPermission, setMessagesPermission] = useState<
        'granted' | 'denied' | null
    >(null)
    const [microphonePermission, setMicrophonePermission] = useState<
        'granted' | 'denied' | null
    >(null)
    const [callPermission, setCallPermission] = useState<
        'granted' | 'denied' | null
    >(null)
    const [notificationPermission, setNotificationPermission] = useState<
        'granted' | 'denied' | null
    >(null)
    interface UserData {
        displayName: string | null
        email: string
        uid: string
        providerData: { providerId: string }[]
        photoURL: string | null
    }

    const [userData, setUserData] = useState<UserData | null>(null)
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

    useEffect(() => {
        const checkPermissions = async (): Promise<void> => {
            // Check Contacts Permission
            const contacts = await Contacts.getPermissionsAsync()
            setContactsPermission(contacts.status as 'granted' | 'denied')

            // Check SMS Permission
            const messages = await SMS.isAvailableAsync()
            setMessagesPermission(messages ? 'granted' : 'denied')

            // Check Microphone Permission
            const mic = await Audio.getPermissionsAsync()
            setMicrophonePermission(
                mic.status === 'granted' ? 'granted' : 'denied'
            )

            // Check Phone Permission (Placeholder, update with proper API if needed)
            const call = await Audio.getPermissionsAsync() // Update with phone call API if needed
            setCallPermission(call.status === 'granted' ? 'granted' : 'denied')

            // Check Notification Permission
            const notificationStatus = await Notifications.getPermissionsAsync()
            setNotificationPermission(
                notificationStatus.status === 'granted' ? 'granted' : 'denied'
            )
        }

        checkPermissions()
    }, [])

    // Request Call Permission (Placeholder, update with proper API if needed)
    const requestCallPermission = async () => {
        const { status } = await Audio.requestPermissionsAsync() // Update with specific phone call permission API
        setCallPermission(status === 'granted' ? 'granted' : 'denied')
    }

    const requestContactsPermission = async () => {
        const { status } = await Contacts.requestPermissionsAsync()
        setContactsPermission(status as 'granted' | 'denied')
    }

    const requestMessagesPermission = async () => {
        if (!messagesPermission) {
            const available = await SMS.isAvailableAsync()
            if (available) {
                setMessagesPermission('granted')
            } else {
                Alert.alert('SMS not supported on this device')
            }
        }
    }

    const requestMicrophonePermission = async () => {
        const { status } = await Audio.requestPermissionsAsync()
        setMicrophonePermission(status === 'granted' ? 'granted' : 'denied')
    }

    const requestNotificationPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync()
        setNotificationPermission(status === 'granted' ? 'granted' : 'denied')
    }

    useEffect(() => {
        const loadSettings = async () => {
            const storedSize = await AsyncStorage.getItem('textSize')
            if (storedSize) setTextSize(parseInt(storedSize))

            const storedBold = await AsyncStorage.getItem('isBold')
            if (storedBold) setIsBold(storedBold === 'true')
        }
        loadSettings()
    }, [])
    useEffect(() => {
        const saveSettings = async () => {
            await AsyncStorage.setItem('textSize', textSize.toString())
            await AsyncStorage.setItem('isBold', isBold.toString())
        }
        saveSettings()
    }, [textSize, isBold])

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={commonStyles.container}>
                <Text
                    style={[
                        commonStyles.leftText,
                        {
                            fontSize: textSize + 5,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]}
                >
                    Settings
                </Text>

                <TouchableOpacity
                    onPress={() => setShowSlider(!showSlider)}
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
                        Adjust Text Size
                    </Text>
                </TouchableOpacity>

                {showSlider && (
                    <View
                        style={[
                            commonStyles.dividerContainer,
                            { marginTop: 10 }
                        ]}
                    >
                        <Text
                            style={[
                                commonStyles.ptext,
                                {
                                    fontSize: textSize - 6,
                                    fontWeight: isBold ? 'bold' : 'normal',
                                    marginRight: 5,
                                    marginLeft: -20
                                }
                            ]}
                        >
                            aA
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Slider
                                minValue={20}
                                maxValue={30}
                                value={textSize}
                                onChange={setTextSize}
                                size="md"
                                orientation="horizontal"
                                isDisabled={false}
                                isReversed={false}
                                step={2}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </View>

                        <Text
                            style={[
                                commonStyles.ptext,
                                {
                                    fontSize: textSize,
                                    fontWeight: isBold ? 'bold' : 'normal',
                                    marginLeft: 10
                                }
                            ]}
                        >
                            aA
                        </Text>
                    </View>
                )}

                <TouchableOpacity
                    style={commonStyles.bottomlargeformButton}
                    onPress={() => setIsBold(!isBold)}
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
                        {isBold ? 'Bold Text' : 'Normal Text'}
                    </Text>
                    <Switch
                        value={isBold}
                        onValueChange={() => setIsBold(!isBold)}
                    />
                </TouchableOpacity>

                <Text
                    style={[
                        commonStyles.leftText,
                        {
                            fontSize: textSize,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]}
                >
                    App Permissions
                </Text>

                {/* Microphone Access */}
                <TouchableOpacity
                    style={commonStyles.toplargeformButton}
                    onPress={requestMicrophonePermission}
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
                        Microphone Access
                    </Text>
                    <Switch
                        value={microphonePermission === 'granted'}
                        onValueChange={requestMicrophonePermission}
                    />
                </TouchableOpacity>

                {/* Call Access */}
                <TouchableOpacity
                    style={commonStyles.largeformButton}
                    onPress={requestCallPermission}
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
                        Call Access
                    </Text>
                    <Switch
                        value={callPermission === 'granted'}
                        onValueChange={requestCallPermission}
                    />
                </TouchableOpacity>
                {/* Contacts Access */}
                <TouchableOpacity
                    style={commonStyles.bottomlargeformButton}
                    onPress={requestContactsPermission}
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
                        Contacts Access
                    </Text>
                    <Switch
                        value={contactsPermission === 'granted'}
                        onValueChange={requestContactsPermission}
                    />
                </TouchableOpacity>

                <Text
                    style={[
                        commonStyles.leftText,
                        {
                            fontSize: textSize,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }
                    ]}
                >
                    SMS & Notifications
                </Text>

                {/* SMS Access */}
                <TouchableOpacity
                    style={commonStyles.toplargeformButton}
                    onPress={requestMessagesPermission}
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
                        SMS Access
                    </Text>
                    <Switch
                        value={messagesPermission === 'granted'}
                        onValueChange={requestMessagesPermission}
                    />
                </TouchableOpacity>

                {/* Notification Access */}
                <TouchableOpacity
                    style={commonStyles.bottomlargeformButton}
                    onPress={requestNotificationPermission}
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
                        Notification Access
                    </Text>
                    <Switch
                        value={notificationPermission === 'granted'}
                        onValueChange={requestNotificationPermission}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Settings
