import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Modal,
    Image,
} from 'react-native';
import axios from 'axios';
import commonStyles from '../../styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from 'expo-router'; // Add useNavigation (useFocusEffect already imported)
import { Buffer } from 'buffer';
import { useFonts } from 'expo-font';
import {
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import { white } from 'tailwindcss/colors';
import { HeaderRight } from '../../../components/HeaderRight'; // Import HeaderRight
import Constants from 'expo-constants';

const ReportBug = (): React.JSX.Element => {
    const [bugDescription, setBugDescription] = useState('');
    const [textSize, setTextSize] = useState(28); // Default text size
    const [isBold, setIsBold] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false); // Confirmation Modal
    const [isThankYouModalVisible, setIsThankYouModalVisible] = useState(false); // Thank You Modal
    const navigation = useNavigation(); // Add navigation hook

    const JIRA_API_URL = Constants.expoConfig?.extra?.JIRA_API_URL
    const JIRA_EMAIL = Constants.expoConfig?.extra?.JIRA_EMAIL
    const JIRA_API_TOKEN = Constants.expoConfig?.extra?.JIRA_API_TOKEN
    interface UserData {
        displayName: string | null;
        email: string;
        uid: string;
        providerData: { providerId: string }[];
        photoURL: string | null;
    }
    const [userData, setUserData] = useState<UserData | null>(null);

    // Load settings and user data from AsyncStorage
    const loadSettings = useCallback(async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize');
            const storedBold = await AsyncStorage.getItem('isBold');
            const storedUserData = await AsyncStorage.getItem('user');

            console.log('Stored User Data:', storedUserData); // Debug log

            if (storedSize) setTextSize(parseInt(storedSize));
            if (storedBold) setIsBold(storedBold === 'true');
            if (storedUserData) {
                const parsedUserData = JSON.parse(storedUserData);
                console.log('Parsed User Data:', parsedUserData); // Debug log
                setUserData(parsedUserData);
            } else {
                console.log('No user data found in AsyncStorage');
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadSettings();
        }, [loadSettings])
    );

    // Set the header with HeaderRight
    React.useLayoutEffect(() => {
        navigation.setOptions({
           
        });
    }, [navigation]);

    // Load fonts
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
        Montserrat_500Medium,
        Montserrat_300Light,
        Montserrat_600SemiBold,
    });

    if (!fontsLoaded) {
        return (
            <View style={commonStyles.loadingContainer}>
                <Text>Loading Fonts...</Text>
            </View>
        );
    }

    const handleReportBug = async () => {
        if (!bugDescription) {
            setIsModalVisible(false);
            return;
        }

        // Show modal for confirmation
        setIsModalVisible(true);
    };

    const confirmReportBug = async () => {
        setIsModalVisible(false);

        const issueData = {
            fields: {
                project: { key: 'SCRUM' },
                summary: `Bug Reported to Jira By Safe Milo User${userData?.displayName ? `: ${userData.displayName}` : ''}`,
                description: {
                    type: 'doc',
                    version: 1,
                    content: [
                        {
                            type: 'paragraph',
                            content: [{ type: 'text', text: bugDescription }],
                        },
                    ],
                },
                issuetype: { name: 'Bug' },
            },
        };

        try {
            const authToken = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64');

            const response = await axios.post(JIRA_API_URL, issueData, {
                headers: {
                    Authorization: `Basic ${authToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (response.status === 201) {
                setBugDescription('');
                setIsThankYouModalVisible(true); // Show Thank You Modal
            }
        } catch (error) {
            console.error(
                'Error creating Jira ticket:',
                (axios.isAxiosError(error) && error.response?.data) || error
            );
        }
    };

    const cancelReportBug = () => {
        setIsModalVisible(false);
    };

    return (
        <ScrollView contentContainerStyle={commonStyles.container}>
            {/* Header Text */}
            <View style={{ position: 'absolute', top: 0, left: 5, padding: 10 }}>
                <Text
                    style={{
                        fontSize: textSize + 7,
                        fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                        marginBottom: 10,
                    }}
                >
                    Report a Bug
                </Text>
                <Text
                    style={{
                        fontSize: textSize - 7,
                        fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                    }}
                >
                    Encountered an issue? Let us know so we can fix it!
                </Text>
            </View>

            <View style={commonStyles.inputSection}>
                <TextInput
                    style={[
                        commonStyles.buginput,
                        {
                            fontSize: textSize - 5,
                            textAlignVertical: 'top',
                            backgroundColor: white,
                            height: 300,
                            fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                        },
                    ]}
                    value={bugDescription}
                    onChangeText={setBugDescription}
                    placeholder="Your Feedback..."
                    multiline
                    numberOfLines={7}
                />
            </View>

            <TouchableOpacity style={commonStyles.button} onPress={handleReportBug}>
                <Text
                    style={[
                        {
                            fontSize: textSize - 2,
                            fontFamily: 'Montserrat_700Bold'
                        },
                        commonStyles.PbuttonText,
                    ]}
                >
                    Send Report
                </Text>
            </TouchableOpacity>

            {/* Confirmation Modal */}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={cancelReportBug}
            >
                <View style={commonStyles.modalOverlay}>
                    <View style={commonStyles.modalContainer}>
                        <Text
                            style={[
                                commonStyles.modalTitle,
                                { fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_600SemiBold' },
                            ]}
                        >
                            Send report?
                        </Text>
                        <Text
                            style={{
                                fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_600SemiBold',
                                fontSize: textSize - 8,
                                textAlign: 'center',
                            }}
                        >
                            We will look into it as soon as possible.
                        </Text>
                        <View style={commonStyles.modalbuttonContainer}>
                            <TouchableOpacity onPress={cancelReportBug}>
                                <Text style={[commonStyles.closeButton, { fontFamily: 'Montserrat_600SemiBold' }]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={confirmReportBug}>
                                <Text style={[commonStyles.closeButton, { fontFamily: 'Montserrat_600SemiBold' }]}>Yes</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Thank You Modal */}
            <Modal
                visible={isThankYouModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setIsThankYouModalVisible(false)}
            >
                <View style={commonStyles.modalOverlay}>
                    <View style={commonStyles.modalContainer}>
                        <Text
                            style={[
                                commonStyles.modalTitle,
                                { fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_600SemiBold', textAlign: 'center' },
                            ]}
                        >
                            Thank You!
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Montserrat_600SemiBold',
                                fontSize: textSize - 6,
                                textAlign: 'center',
                            }}
                        >
                            Your report has been sent successfully.
                        </Text>
                        <TouchableOpacity
                            onPress={() => setIsThankYouModalVisible(false)}
                            style={commonStyles.button}
                        >
                            <Text style={[commonStyles.PbuttonText, { fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_600SemiBold', textAlign: 'center' }]}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default ReportBug;