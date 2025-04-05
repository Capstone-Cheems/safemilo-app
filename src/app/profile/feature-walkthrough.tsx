import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet, Image } from 'react-native';
import commonStyles from '../../styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation, useRouter } from 'expo-router'; // Add useNavigation
import { HeaderRight } from '../../../components/HeaderRight'; // Import HeaderRight

const FeatureWalkthrough = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [textSize, setTextSize] = useState(28);
    const [isBold, setIsBold] = useState(true);
    const router = useRouter();
    const navigation = useNavigation(); // Add navigation hook

    const loadSettings = async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize');
            const storedBold = await AsyncStorage.getItem('isBold');

            if (storedSize) {
                setTextSize(parseInt(storedSize));
            }

            if (storedBold) {
                setIsBold(storedBold === 'true');
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    };

    useEffect(() => {
        loadSettings();
    }, []);

    // Set the header with HeaderRight
     React.useLayoutEffect(() => {
         navigation.setOptions({
             headerRight: () => <HeaderRight />
            //  headerLeft: () => (
            //      <TouchableOpacity onPress={() => navigation.goBack()}>
            //          <Image
            //              source={require('../../../assets/images/Back-arrow.png')} // Custom back button image
            //              style={{ width: 30, height: 30, marginLeft: 10 }} // Adjust size as needed
            //          />
            //      </TouchableOpacity>
            //  ),
         });
     }, [navigation]);
 
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
        Montserrat_500Medium,
        Montserrat_300Light,
        Montserrat_600SemiBold
    });

    const closeModal = () => {
        setIsModalVisible(false);
    };

    const handleConfirm = () => {
        setIsModalVisible(false);
        router.push('../onboarding/tour1start');
    };

    if (!fontsLoaded) {
        return (
            <View style={commonStyles.loadingContainer}>
                <Text>Loading Fonts...</Text>
            </View>
        );
    }

    return (
        <ScrollView
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingVertical: 15,
                flexGrow: 1
            }}
            style={{ flex: 1 }}
        >
            <Text
                style={[
                    localStyles.header,
                    {
                        fontSize: textSize + 4,
                        fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                    },
                ]}
            >
                Feature Walkthrough
            </Text>
            <View style={[commonStyles.faqContainer, { height: 'auto', minHeight: 300, justifyContent: 'space-evenly', alignItems: 'flex-start', paddingHorizontal: 20 }]}>
                <Text 
                    style={[
                        localStyles.question,
                        {
                            fontSize: textSize - 1,
                            fontFamily:  'Montserrat_700Bold',
                            textAlign: 'left',
                        },
                    ]}
                >
                    Start Walkthrough
                </Text>
                <Text
                    style={[
                        localStyles.question,
                        {
                            fontSize: textSize - 5,
                            fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_400Regular',
                           
                            marginBottom: 10,
                            lineHeight: 30,
                            textAlign: 'left',
                        }
                    ]}
                >
                    Revisiting the Key Features will help you use them better
                </Text>
                <TouchableOpacity
                    style={[commonStyles.button, { alignSelf: 'flex-start' }]}
                    onPress={() => {
                        setModalTitle('Feature Walkthrough');
                        setModalContent('This step will guide you through the key features of the app. You can explore them at your own pace.');
                        setIsModalVisible(true);
                    }}
                >
                    <Text
                        style={[
                            {
                                fontSize: textSize - 4,
                                fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium',
                                textAlign: 'left',
                            },
                            commonStyles.PbuttonText
                        ]}
                    >
                        Explore Features
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Modal with Close and Confirm buttons */}
            <Modal
                visible={isModalVisible}
                animationType="fade"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={commonStyles.modalBackground}>
                    <View style={commonStyles.modalContainer}>
                        <Text
                            style={[
                                commonStyles.modalTitle,
                                {
                                    fontSize: textSize,
                                    fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_600SemiBold'
                                }
                            ]}
                        >
                            {modalTitle}
                        </Text>
                        <Text
                            style={[
                                commonStyles.modalContent,
                                {
                                    fontSize: textSize - 5,
                                    fontFamily: isBold ? 'Montserrat_500Medium' : 'Montserrat_400Regular',
                                }
                            ]}
                        >
                            {modalContent}
                        </Text>
                        <View style={{ 
                            flexDirection: 'row', 
                            justifyContent: 'space-between', 
                            width: '100%',
                        }}>
                            <TouchableOpacity
                                style={[commonStyles.closeButton, { flex: 1, marginRight: 10 }]}
                                onPress={closeModal}
                            >
                                <Text style={[commonStyles.closeButtonText, { fontSize: textSize - 6, fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium' }]}>
                                    Close
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[commonStyles.closeButton, { flex: 1 }]} 
                                onPress={handleConfirm}
                            >
                                 <Text style={[commonStyles.closeButtonText, { fontSize: textSize - 6, fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_500Medium' }]}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const localStyles = StyleSheet.create({
    header: {
        marginVertical: 10,
    },
    question: {
        marginBottom: 4,
        lineHeight: 25,
    },
});

export default FeatureWalkthrough;