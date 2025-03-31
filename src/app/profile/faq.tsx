import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import commonStyles from '../../styles/commonStyles';
import { useNavigation } from 'expo-router'; // Add useNavigation
import { HeaderRight } from '../../../components/HeaderRight'; // Import HeaderRight as a named export

const faqs = [
    {
        question: 'How does this app help protect me from scams?',
        answer: 'The app checks calls, emails, messages for signs of scams and alerts you through notifications to avoid them.'
    },
    {
        question: 'Is my personal information safe while using this app?',
        answer: 'Yes, your personal information is safe. We don’t collect or store it.'
    },
    {
        question: 'What should I do if I suspect an email is a scam?',
        answer: 'Don’t click any links. Use the app to check if it’s a scam.'
    },
    {
        question: 'Will the app prevent all scams?',
        answer: 'While it helps a lot, always be cautious with emails, as no app is 100% perfect.'
    }
];

const FAQ = () => {
    const [textSize, setTextSize] = useState(28); // Default text size
    const [isBold, setIsBold] = useState(true); // Whether to use bold font or not
    const navigation = useNavigation(); // Add navigation hook

    // Load settings from AsyncStorage
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedTextSize = await AsyncStorage.getItem('textSize');
                const savedIsBold = await AsyncStorage.getItem('isBold');
                if (savedTextSize) {
                    setTextSize(Number(savedTextSize));
                }
                if (savedIsBold) {
                    setIsBold(savedIsBold === 'true');
                }
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadSettings();
    }, []);

    // Set the header with HeaderRight
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />
            // headerLeft: () => (
            //     <TouchableOpacity onPress={() => navigation.goBack()}>
            //         <Image
            //             source={require('../../../assets/images/Back-arrow.png')} // Custom back button image
            //             style={{ width: 30, height: 30, marginLeft: 10 }} // Adjust size as needed
            //         />
            //     </TouchableOpacity>
            // ),
        });
    }, [navigation]);

    // Load fonts
    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
        Montserrat_500Medium,
        Montserrat_300Light,
        Montserrat_600SemiBold
    });

    if (!fontsLoaded) {
        return (
            <View style={commonStyles.loadingContainer}>
                <Text>Loading Fonts...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text
                style={[
                    styles.header,
                    {
                        fontSize: textSize + 4, // Slightly larger for header
                        fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium', // Conditional font family
                    },
                ]}
            >
                FAQ's
            </Text>

            <View style={commonStyles.faqContainer}>
                {faqs.map((faq, index) => (
                    <View key={index} style={commonStyles.faqItem}>
                        <Text
                            style={[
                                styles.question,
                                {
                                    fontSize: textSize - 4, // Apply stored font size
                                    fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_600SemiBold', // Conditional font family
                                },
                            ]}
                        >
                            {index + 1}. {faq.question}
                        </Text>
                        <Text
                            style={[
                                styles.answer,
                                {
                                    fontSize: textSize - 9, // Slightly smaller for answers
                                    fontFamily: isBold ? 'Montserrat_600SemiBold' : 'Montserrat_400Regular', // Conditional font family
                                },
                            ]}
                        >
                            {faq.answer}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        // backgroundColor: '#DADADA',
    },
    header: {
        fontSize: 24,
        marginBottom: 16,
    },
    question: {
        marginBottom: 4,
        lineHeight: 25,
    },
    answer: {
        color: '#0A2941',
        lineHeight: 25,
    },
});

export default FAQ;