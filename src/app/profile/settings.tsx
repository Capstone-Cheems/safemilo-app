import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Switch,
    ScrollView,
    Alert
} from 'react-native'
import Slider from '@react-native-community/slider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Contacts from 'expo-contacts'
import * as SMS from 'expo-sms'
import { Audio } from 'expo-av'
import commonStyles from '../../styles/commonStyles'

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
        }

        checkPermissions()
    }, [])

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

    useEffect(() => {
        const loadSettings = async () => {
            const storedSize = await AsyncStorage.getItem('textSize')
            if (storedSize) setTextSize(parseInt(storedSize))

            const storedBold = await AsyncStorage.getItem('isBold')
            if (storedBold) setIsBold(storedBold === 'true')
        }
        loadSettings()
    }, [])

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
                            <View style={{ position: 'absolute', left: 0 }}>
                                <Text style={{ fontSize: textSize - 7 }}>
                                    20
                                </Text>
                            </View>
                            <View style={{ position: 'absolute', left: '33%' }}>
                                <Text style={{ fontSize: textSize - 5 }}>
                                    25
                                </Text>
                            </View>
                            <View style={{ position: 'absolute', left: '66%' }}>
                                <Text style={{ fontSize: textSize }}>30</Text>
                            </View>

                            <Slider
                                style={{ width: 250, height: 40 }}
                                minimumValue={20}
                                maximumValue={30}
                                value={textSize}
                                onValueChange={setTextSize}
                            />
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

                {/* Contacts Access */}
                <TouchableOpacity
                    style={commonStyles.largeformButton}
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

                {/* SMS Access */}
                <TouchableOpacity
                    style={commonStyles.bottomlargeformButton}
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
            </View>
        </ScrollView>
    )
}

export default Settings
