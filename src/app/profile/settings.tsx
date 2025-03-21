import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    Switch,
    Modal,
    ScrollView
} from 'react-native'
import Slider from '@react-native-community/slider'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Contacts from 'expo-contacts'
import * as SMS from 'expo-sms'
import { Audio } from 'expo-av'
import commonStyles from '../../styles/commonStyles'
import { Image } from 'react-native'
import { Picker } from '@react-native-picker/picker'

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
            const contacts = await Contacts.getPermissionsAsync()
            setContactsPermission(
                contacts.status as 'granted' | 'denied' | null
            )

            const messages = await SMS.isAvailableAsync()
            setMessagesPermission(messages ? 'granted' : 'denied')

            const mic = await Audio.getPermissionsAsync()
            setMicrophonePermission(
                mic.status === 'granted' ? 'granted' : 'denied'
            )
        }

        checkPermissions()
    }, [])

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
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={showSlider}
                        onRequestClose={() => setShowSlider(false)}
                    >
                        <View style={commonStyles.detailContainer}>
                            <View style={commonStyles.modalView}>
                                <Text
                                    style={[
                                        commonStyles.ptext,
                                        {
                                            fontSize: textSize,
                                            fontWeight: isBold
                                                ? 'bold'
                                                : 'normal'
                                        }
                                    ]}
                                >
                                    Adjust Text Size
                                </Text>
                                <Slider
                                    style={{ width: 200, height: 40 }}
                                    minimumValue={20}
                                    maximumValue={30}
                                    value={textSize}
                                    onValueChange={setTextSize}
                                />
                                <TouchableOpacity
                                    style={commonStyles.modalButton}
                                    onPress={() => setShowSlider(false)}
                                >
                                    <Text style={commonStyles.modalButton}>
                                        x
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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

                <TouchableOpacity style={commonStyles.toplargeformButton}>
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
                    <Picker
                        selectedValue={microphonePermission}
                        onValueChange={() =>
                            setMicrophonePermission(
                                microphonePermission === 'granted'
                                    ? 'denied'
                                    : 'granted'
                            )
                        }
                    >
                        <Picker.Item label="Granted" value="granted" />
                        <Picker.Item label="Denied" value="denied" />
                    </Picker>
                </TouchableOpacity>

                <TouchableOpacity style={commonStyles.largeformButton}>
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
                    <Picker
                        selectedValue={contactsPermission}
                        onValueChange={() =>
                            setContactsPermission(
                                contactsPermission === 'granted'
                                    ? 'denied'
                                    : 'granted'
                            )
                        }
                    >
                        <Picker.Item label="Granted" value="granted" />
                        <Picker.Item label="Denied" value="denied" />
                    </Picker>
                </TouchableOpacity>

                <TouchableOpacity style={commonStyles.bottomlargeformButton}>
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
                    <Picker
                        selectedValue={messagesPermission}
                        onValueChange={() =>
                            setMessagesPermission(
                                messagesPermission === 'granted'
                                    ? 'denied'
                                    : 'granted'
                            )
                        }
                    >
                        <Picker.Item label="Granted" value="granted" />
                        <Picker.Item label="Denied" value="denied" />
                    </Picker>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default Settings
