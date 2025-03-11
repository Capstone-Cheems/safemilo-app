// import React, { useState, useEffect } from 'react'
// import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native'
// import Slider from '@react-native-community/slider'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import * as Contacts from 'expo-contacts'
// import * as SMS from 'expo-sms'
// import { Audio } from 'expo-av'
// import commonStyles from '../../styles/commonStyles'

// const Settings = (): React.JSX.Element => {
//     // Load text size from storage
//     const [textSize, setTextSize] = useState(20) // Default text size
//     const [showSlider, setShowSlider] = useState(false)
//     const [isBold, setIsBold] = useState(true)

//     //Mobile Permissions

//     const [contactsPermission, setContactsPermission] = useState<
//         'granted' | 'denied' | null
//     >(null)
//     const [messagesPermission, setMessagesPermission] = useState<
//         'granted' | 'denied' | null
//     >(null)
//     const [microphonePermission, setMicrophonePermission] = useState<
//         'granted' | 'denied' | null
//     >(null)

//     useEffect(() => {
//         const checkPermissions = async (): Promise<void> => {
//             const contacts = await Contacts.getPermissionsAsync()
//             setContactsPermission(
//                 contacts.status as 'granted' | 'denied' | null
//             )

//             const messages = await SMS.isAvailableAsync()
//             setMessagesPermission(messages ? 'granted' : 'denied')

//             const mic = await Audio.getPermissionsAsync()
//             setMicrophonePermission(
//                 mic.status === 'granted' ? 'granted' : 'denied'
//             )
//         }

//         checkPermissions()
//     }, [])

//     const handlePermissionRequest = async (
//         type: 'contacts' | 'messages' | 'microphone'
//     ) => {
//         let status: 'granted' | 'denied' = 'denied'

//         if (type === 'contacts') {
//             const { status: newStatus } =
//                 await Contacts.requestPermissionsAsync()
//             status = newStatus === 'granted' ? 'granted' : 'denied'
//             setContactsPermission(status)
//             await AsyncStorage.setItem('contactsPermission', status)
//         } else if (type === 'messages') {
//             const available = await SMS.isAvailableAsync()
//             status = available ? 'granted' : 'denied'
//             setMessagesPermission(status)
//             await AsyncStorage.setItem('messagesPermission', status)
//         } else if (type === 'microphone') {
//             const { status: newStatus } = await Audio.requestPermissionsAsync()
//             status = newStatus === 'granted' ? 'granted' : 'denied'
//             setMicrophonePermission(status)
//             await AsyncStorage.setItem('microphonePermission', status)
//         }

//         Alert.alert(
//             status === 'granted' ? 'Permission Granted' : 'Permission Denied',
//             `You ${status === 'granted' ? 'can' : 'cannot'} use ${type}.`
//         )
//     }
//     // Load font settings from storage
//     useEffect(() => {
//         const Settings = async () => {
//             const storedSize = await AsyncStorage.getItem('textSize')
//             if (storedSize) {
//                 setTextSize(parseInt(storedSize))
//             }
//             const storedBold = await AsyncStorage.getItem('isBold')
//             if (storedBold) {
//                 setIsBold(storedBold === 'true')
//             }
//         }
//         Settings()
//     }, [])

//     const handleTextSizeChange = async (size: number) => {
//         setTextSize(size)
//         await AsyncStorage.setItem('textSize', size.toString())
//     }
//     //  Setting text as bold
//     const toggleBold = async () => {
//         const newBoldState = !isBold
//         setIsBold(newBoldState)
//         await AsyncStorage.setItem('isBold', newBoldState.toString())
//     }

//     //Returning componrnts
//     return (
//         <View style={commonStyles.container}>
//             <Text
//                 style={[
//                     commonStyles.leftText,
//                     {
//                         fontSize: textSize,
//                         fontWeight: isBold ? 'bold' : 'normal'
//                     }
//                 ]}
//             >
//                 Settings
//             </Text>
//             <Text
//                 style={[
//                     commonStyles.leftText,
//                     {
//                         fontSize: textSize,
//                         fontWeight: isBold ? 'bold' : 'normal'
//                     }
//                 ]}
//             >
//                 Accessibility
//             </Text>
//             <TouchableOpacity
//                 onPress={() => setShowSlider(!showSlider)}
//                 style={commonStyles.largeformButton}
//             >
//                 <Text style={commonStyles.buttonText}>Adjust Text Size</Text>
//             </TouchableOpacity>

//             {showSlider && (
//                 <Slider
//                     style={{ width: 200, height: 40 }}
//                     minimumValue={20}
//                     maximumValue={40}
//                     value={textSize}
//                     onValueChange={handleTextSizeChange}
//                     minimumTrackTintColor="#FFFFFF"
//                     maximumTrackTintColor="#000000"
//                 />
//             )}

//             <TouchableOpacity
//                 style={commonStyles.largeformButton}
//                 onPress={toggleBold}
//             >
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                     }}
//                 >
//                     <Text style={commonStyles.buttonText}>
//                         {isBold ? 'Bold Text' : 'Normal Text'}
//                     </Text>
//                     <Switch value={isBold} onValueChange={toggleBold} />
//                 </View>
//             </TouchableOpacity>

//             {/* Contacts Permission */}
//             <TouchableOpacity
//                 style={commonStyles.largeformButton}
//                 onPress={() => handlePermissionRequest('contacts')}
//             >
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                     }}
//                 >
//                     <Text style={commonStyles.buttonText}>
//                         {contactsPermission === 'granted'
//                             ? 'Contacts Access On'
//                             : 'Contacts Access Off'}
//                     </Text>
//                     <Switch
//                         value={contactsPermission === 'granted'}
//                         onValueChange={() =>
//                             handlePermissionRequest('contacts')
//                         }
//                     />
//                 </View>
//             </TouchableOpacity>

//             {/* Messages Permission */}
//             <TouchableOpacity
//                 style={commonStyles.largeformButton}
//                 onPress={() => handlePermissionRequest('messages')}
//             >
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                     }}
//                 >
//                     <Text style={commonStyles.buttonText}>
//                         {messagesPermission === 'granted'
//                             ? 'SMS Access On'
//                             : 'SMS Access Off'}
//                     </Text>
//                     <Switch
//                         value={messagesPermission === 'granted'}
//                         onValueChange={() =>
//                             handlePermissionRequest('messages')
//                         }
//                     />
//                 </View>
//             </TouchableOpacity>

//             {/* Microphone Permission */}
//             <TouchableOpacity
//                 style={commonStyles.largeformButton}
//                 onPress={() => handlePermissionRequest('microphone')}
//             >
//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'center',
//                         justifyContent: 'space-between'
//                     }}
//                 >
//                     <Text style={commonStyles.buttonText}>
//                         {microphonePermission === 'granted'
//                             ? 'Microphone Access On'
//                             : 'Microphone Access Off'}
//                     </Text>
//                     <Switch
//                         value={microphonePermission === 'granted'}
//                         onValueChange={() =>
//                             handlePermissionRequest('microphone')
//                         }
//                     />
//                 </View>
//             </TouchableOpacity>
//         </View>
//     )
// }

// export default Settings
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Switch, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Contacts from 'expo-contacts'
import * as SMS from 'expo-sms'
import { Audio } from 'expo-av'
import commonStyles from '../../styles/commonStyles'
import {
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack
} from '@/components/ui/slider'

const Settings = (): React.JSX.Element => {
    // Load text size from storage
    const [textSize, setTextSize] = useState(20) // Default text size
    const [showSlider, setShowSlider] = useState(false)
    const [isBold, setIsBold] = useState(true)

    //Mobile Permissions

    const [contactsPermission, setContactsPermission] = useState<
        'granted' | 'denied' | null
    >(null)
    const [messagesPermission, setMessagesPermission] = useState<
        'granted' | 'denied' | null
    >(null)
    const [microphonePermission, setMicrophonePermission] = useState<
        'granted' | 'denied' | null
    >(null)

    //Mobile Permissions
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
    // // Handeling Permissions
    // const handlePermissionRequest = async (
    //     type: 'contacts' | 'messages' | 'microphone'
    // ) => {
    //     let status: 'granted' | 'denied' = 'denied'

    //     if (type === 'contacts') {
    //         const { status: newStatus } =
    //             await Contacts.requestPermissionsAsync()
    //         status = newStatus === 'granted' ? 'granted' : 'denied'
    //         setContactsPermission(status)
    //         await AsyncStorage.setItem('contactsPermission', status)
    //     } else if (type === 'messages') {
    //         const available = await SMS.isAvailableAsync()
    //         status = available ? 'granted' : 'denied'
    //         setMessagesPermission(status)
    //         await AsyncStorage.setItem('messagesPermission', status)
    //     } else if (type === 'microphone') {
    //         const { status: newStatus } = await Audio.requestPermissionsAsync()
    //         status = newStatus === 'granted' ? 'granted' : 'denied'
    //         setMicrophonePermission(status)
    //         await AsyncStorage.setItem('microphonePermission', status)
    //     }

    //     Alert.alert(
    //         status === 'granted' ? 'Permission Granted' : 'Permission Denied',
    //         `You ${status === 'granted' ? 'can' : 'cannot'} use ${type}.`
    //     )
    // }
    const handlePermissionToggle = async (
        type: 'contacts' | 'messages' | 'microphone'
    ) => {
        let newStatus: 'granted' | 'denied' = 'denied'

        if (type === 'contacts') {
            newStatus = contactsPermission === 'granted' ? 'denied' : 'granted'
            setContactsPermission(newStatus)
            await AsyncStorage.setItem('contactsPermission', newStatus)
        } else if (type === 'messages') {
            newStatus = messagesPermission === 'granted' ? 'denied' : 'granted'
            setMessagesPermission(newStatus)
            await AsyncStorage.setItem('messagesPermission', newStatus)
        } else if (type === 'microphone') {
            newStatus =
                microphonePermission === 'granted' ? 'denied' : 'granted'
            setMicrophonePermission(newStatus)
            await AsyncStorage.setItem('microphonePermission', newStatus)
        }

        Alert.alert(
            newStatus === 'granted'
                ? 'Permission Enabled'
                : 'Permission Disabled',
            `You have ${newStatus === 'granted' ? 'enabled' : 'disabled'} ${type} access.`
        )
    }

    // Load font settings from storage
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

    const handleTextSizeChange = async (size: number) => {
        setTextSize(size)
        await AsyncStorage.setItem('textSize', size.toString())
    }
    //  Setting text as bold
    const toggleBold = async () => {
        const newBoldState = !isBold
        setIsBold(newBoldState)
        await AsyncStorage.setItem('isBold', newBoldState.toString())
    }

    //Returning componrnts
    return (
        <View style={commonStyles.container}>
            <Text
                style={[
                    commonStyles.leftText,
                    {
                        fontSize: textSize,
                        fontWeight: isBold ? 'bold' : 'normal'
                    }
                ]}
            >
                Settings
            </Text>
            <Text
                style={[
                    commonStyles.leftText,
                    {
                        fontSize: textSize,
                        fontWeight: isBold ? 'bold' : 'normal'
                    }
                ]}
            >
                Accessibility
            </Text>
            <TouchableOpacity
                onPress={() => setShowSlider(!showSlider)}
                style={commonStyles.largeformButton}
            >
                <Text style={commonStyles.buttonText}>Adjust Text Size</Text>
            </TouchableOpacity>

            {showSlider && (
                <Slider
                    style={{ width: 200, height: 40 }}
                    value={textSize}
                    onChange={handleTextSizeChange}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            )}

            <TouchableOpacity
                style={commonStyles.largeformButton}
                onPress={toggleBold}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={commonStyles.buttonText}>
                        {isBold ? 'Bold Text' : 'Normal Text'}
                    </Text>
                    <Switch value={isBold} onValueChange={toggleBold} />
                </View>
            </TouchableOpacity>

            {/* Contacts Permission */}
            <TouchableOpacity
                style={commonStyles.largeformButton}
                onPress={() => handlePermissionToggle('contacts')}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={commonStyles.buttonText}>
                        {contactsPermission === 'granted'
                            ? 'Contacts Access On'
                            : 'Contacts Access Off'}
                    </Text>
                    <Switch
                        value={contactsPermission === 'granted'}
                        onValueChange={() => handlePermissionToggle('contacts')}
                    />
                </View>
            </TouchableOpacity>

            {/* Messages Permission */}
            <TouchableOpacity
                style={commonStyles.largeformButton}
                onPress={() => handlePermissionToggle('messages')}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={commonStyles.buttonText}>
                        {messagesPermission === 'granted'
                            ? 'SMS Access On'
                            : 'SMS Access Off'}
                    </Text>
                    <Switch
                        value={messagesPermission === 'granted'}
                        onValueChange={() => handlePermissionToggle('messages')}
                    />
                </View>
            </TouchableOpacity>

            {/* Microphone Permission */}
            <TouchableOpacity
                style={commonStyles.largeformButton}
                onPress={() => handlePermissionToggle('microphone')}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    <Text style={commonStyles.buttonText}>
                        {microphonePermission === 'granted'
                            ? 'Microphone Access On'
                            : 'Microphone Access Off'}
                    </Text>
                    <Switch
                        value={microphonePermission === 'granted'}
                        onValueChange={() =>
                            handlePermissionToggle('microphone')
                        }
                    />
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default Settings
