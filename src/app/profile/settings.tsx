import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    ActivityIndicator,
    Image
} from 'react-native';
import { useNavigation } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms';
import * as Notifications from 'expo-notifications';
import { Audio } from 'expo-av';
import commonStyles from '../../styles/commonStyles';
import {
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack
} from '@/components/ui/slider';
import { useFonts } from 'expo-font';
import {
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import { HeaderRight } from '../../../components/HeaderRight';

const Settings = (): React.JSX.Element => {
    const [textSize, setTextSize] = useState(20);
    const [showSlider, setShowSlider] = useState(false);
    const [isBold, setIsBold] = useState(true);

    const [contactsPermission, setContactsPermission] = useState<'granted' | 'denied' | null>(null);
    const [messagesPermission, setMessagesPermission] = useState<'granted' | 'denied' | null>(null);
    const [microphonePermission, setMicrophonePermission] = useState<'granted' | 'denied' | null>(null);
    const [callPermission, setCallPermission] = useState<'granted' | 'denied' | null>(null);
    const [notificationPermission, setNotificationPermission] = useState<'granted' | 'denied' | null>(null);

    interface UserData {
        displayName: string | null;
        email: string;
        uid: string;
        providerData: { providerId: string }[];
        photoURL: string | null;
    }

    const [userData, setUserData] = useState<UserData | null>(null);
    const navigation = useNavigation();

    const loadSettings = useCallback(async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize');
            const storedBold = await AsyncStorage.getItem('isBold');
            const storedUserData = await AsyncStorage.getItem('user');

            if (storedSize) setTextSize(parseInt(storedSize));
            if (storedBold) setIsBold(storedBold === 'true');
            if (storedUserData) setUserData(JSON.parse(storedUserData));
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }, []);

    useFocusEffect(useCallback(() => { loadSettings(); }, [loadSettings]));

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />,
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../../assets/images/Back-arrow.png')} // Custom back button image
                        style={{ width: 30, height: 30, marginLeft: 10 }} // Adjust size as needed
                    />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
        Montserrat_500Medium,
        Montserrat_300Light,
        Montserrat_600SemiBold
    });

    useEffect(() => {
        const checkPermissions = async (): Promise<void> => {
            const contacts = await Contacts.getPermissionsAsync();
            setContactsPermission(contacts.status as 'granted' | 'denied');
            const messages = await SMS.isAvailableAsync();
            setMessagesPermission(messages ? 'granted' : 'denied');
            const mic = await Audio.getPermissionsAsync();
            setMicrophonePermission(mic.status === 'granted' ? 'granted' : 'denied');
            const call = await Audio.getPermissionsAsync();
            setCallPermission(call.status === 'granted' ? 'granted' : 'denied');
            const notificationStatus = await Notifications.getPermissionsAsync();
            setNotificationPermission(notificationStatus.status === 'granted' ? 'granted' : 'denied');
        };
        checkPermissions();
    }, []);

    const requestCallPermission = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        setCallPermission(status === 'granted' ? 'granted' : 'denied');
    };

    const requestContactsPermission = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        setContactsPermission(status as 'granted' | 'denied');
    };

    const requestMessagesPermission = async () => {
        if (!messagesPermission) {
            const available = await SMS.isAvailableAsync();
            if (available) setMessagesPermission('granted');
            else Alert.alert('SMS not supported on this device');
        }
    };

    const requestMicrophonePermission = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        setMicrophonePermission(status === 'granted' ? 'granted' : 'denied');
    };

    const requestNotificationPermission = async () => {
        const { status } = await Notifications.requestPermissionsAsync();
        setNotificationPermission(status === 'granted' ? 'granted' : 'denied');
    };

    useEffect(() => {
        const saveSettings = async () => {
            await AsyncStorage.setItem('textSize', textSize.toString());
            await AsyncStorage.setItem('isBold', isBold.toString());
        };
        saveSettings();
    }, [textSize, isBold]);

    if (!fontsLoaded) {
        return (
            <View style={commonStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text>{!fontsLoaded ? 'Loading Fonts...' : 'Loading saved posts...'}</Text>
            </View>
        );
    }

    // Custom Toggle Component
    const CustomToggle = ({ value, onPress }: { value: boolean; onPress: () => void }) => (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={
                    value
                        ? require('../../../assets/images/on.png') // Path to your "on" image
                        : require('../../../assets/images/off.png') // Path to your "off" image
                }
                style={{ width: 40, height: 30 }} // Adjust size as needed
            />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[{ flex: 1 }]}>
            <Text
                style={[
                    {
                        fontSize: textSize + 6,
                        padding: 20,
                        fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                    }
                ]}
            >
                Settings
            </Text>
            <Text
                style={[
                    {
                        fontSize: textSize - 3,
                        paddingLeft: 20,
                        fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                    }
                ]}
            >
                Accessibility
            </Text>
            <View style={commonStyles.scontainer}>
                <TouchableOpacity
                    onPress={() => setShowSlider(!showSlider)}
                    style={commonStyles.toplargeformButton}
                >
                    <Text
                        style={[
                            commonStyles.ptext,
                            {
                                fontSize: textSize - 4,
                                fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                            }
                        ]}
                    >
                        Adjust Text Size
                    </Text>
                    <Image
                        source={require('../../../assets/images/profile-arrow.png')}
                        style={{ width: textSize - 4, height: textSize - 4, marginRight: 5 }}
                    />
                </TouchableOpacity>

                {showSlider && (
                    <View style={[commonStyles.dividerContainer, { marginTop: 10 }]}>
                        <Text
                            style={[
                                commonStyles.ptext,
                                {
                                    fontSize: textSize - 4,
                                    fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                                    marginRight: 5,
                                    marginLeft: -20
                                }
                            ]}
                        >
                            aA
                        </Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: 230 }}>
                                <Slider
                                    minValue={20}
                                    maxValue={29}
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
                        </View>
                        <Text
                            style={[
                                commonStyles.ptext,
                                {
                                    fontSize: textSize,
                                    fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
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
                                fontSize: textSize - 4,
                                fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                            }
                        ]}
                    >
                        {isBold ? 'Bold Text' : 'Normal Text'}
                    </Text>
                    <CustomToggle value={isBold} onPress={() => setIsBold(!isBold)} />
                </TouchableOpacity>

                <Text
                    style={[
                        {
                            fontSize: textSize - 3,
                            paddingLeft: 5,
                            paddingTop: 20,
                            paddingBottom: 20,
                            fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                        }
                    ]}
                >
                    App Permissions
                </Text>

                <TouchableOpacity
                    style={commonStyles.toplargeformButton}
                    onPress={requestMicrophonePermission}
                >
                    <Text
                        style={[
                            {
                                fontSize: textSize - 4,
                                fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                            }
                        ]}
                    >
                        Microphone Access
                    </Text>
                    <CustomToggle
                        value={microphonePermission === 'granted'}
                        onPress={requestMicrophonePermission}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={commonStyles.largeformButton}
                    onPress={requestCallPermission}
                >
                    <Text
                        style={[
                            commonStyles.ptext,
                            {
                                fontSize: textSize - 4,
                                fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                            }
                        ]}
                    >
                        Call Access
                    </Text>
                    <CustomToggle
                        value={callPermission === 'granted'}
                        onPress={requestCallPermission}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={commonStyles.bottomlargeformButton}
                    onPress={requestContactsPermission}
                >
                    <Text
                        style={[
                            commonStyles.ptext,
                            {
                                fontSize: textSize - 4,
                                fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                            }
                        ]}
                    >
                        Contacts Access
                    </Text>
                    <CustomToggle
                        value={contactsPermission === 'granted'}
                        onPress={requestContactsPermission}
                    />
                </TouchableOpacity>

                <Text
                    style={[
                        {
                            fontSize: textSize - 3,
                            paddingLeft: 5,
                            paddingTop: 20,
                            paddingBottom: 20,
                            fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                        }
                    ]}
                >
                    SMS & Notifications
                </Text>

                <TouchableOpacity
                    style={commonStyles.toplargeformButton}
                    onPress={requestMessagesPermission}
                >
                    <Text
                        style={[
                            {
                                fontSize: textSize - 4,
                                fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                            }
                        ]}
                    >
                        SMS Access
                    </Text>
                    <CustomToggle
                        value={messagesPermission === 'granted'}
                        onPress={requestMessagesPermission}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    style={commonStyles.bottomlargeformButton}
                    onPress={requestNotificationPermission}
                >
                    <Text
                        style={[
                            commonStyles.ptext,
                            {
                                fontSize: textSize - 4,
                                fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                            }
                        ]}
                    >
                        Notification Access
                    </Text>
                    <CustomToggle
                        value={notificationPermission === 'granted'}
                        onPress={requestNotificationPermission}
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Settings;