import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font'; // Importing useFonts hook from expo-font
import { Montserrat_300Light, Montserrat_400Regular, Montserrat_500Medium, Montserrat_600SemiBold, Montserrat_700Bold } from '@expo-google-fonts/montserrat' // Import Montserrat fonts
import commonStyles from '../../styles/commonStyles';

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
    const [textSize, setTextSize] = useState(20); // Default text size
    const [isBold, setIsBold] = useState(true); // Whether to use bold font or not

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

    // Load fonts
       const [fontsLoaded] = useFonts({
           Montserrat_400Regular,
           Montserrat_700Bold,
           Montserrat_500Medium,
           Montserrat_300Light,
           Montserrat_600SemiBold
       })
   

    if (!fontsLoaded) {
        return <Text>Loading Fonts...</Text>; // Show loading message if fonts are not loaded
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
        backgroundColor: '#F2F2F2',
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
