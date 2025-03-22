import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import commonStyles from '../../styles/commonStyles'

// Enable animation for Android (iOS works by default)
if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

const faqs = [
    {
        question: 'What is Safe Milo?',
        answer: 'Safe Milo is a scam protection app that helps you detect fraudulent calls, messages, and news. It provides real-time alerts and educational resources to keep you safe.'
    },
    {
        question: 'How does Safe Milo detect scams?',
        answer: 'Safe Milo uses AI-powered scam detection, a scam database, and user reports to identify suspicious activities. It also warns you about known scam patterns.'
    },
    {
        question: 'What should I do if I receive a scam call or message?',
        answer: 'Do not respond or click on any links. Report the scam using Safe Milo’s reporting feature, block the sender, and alert your bank if financial information is involved.'
    },
    {
        question: 'How can I report a scam?',
        answer: 'You can report a scam directly through the app by navigating to the "Report Scam" section and filling out the necessary details.'
    },

    {
        question: 'How do I protect myself from scams?',
        answer: 'Always verify the source of messages and calls, avoid sharing personal information, and use Safe Milo’s scam alerts to stay updated on trending scams.'
    },
    {
        question: 'Can I customize the scam alerts?',
        answer: 'Yes! Safe Milo allows you to set preferences for the types of scams you want to be alerted about, ensuring you stay informed about the scams most relevant to you.'
    },
    {
        question: 'Is my data secure in Safe Milo?',
        answer: 'Yes! Safe Milo prioritizes your privacy. All data is encrypted, and we do not share your personal information with third parties without your consent.'
    }
]

const alerts = [
    {
        title: 'New Scam Alert: Fake Tech Support Call',
        description:
            'A new scam targeting users claiming to offer tech support services. Do not share any personal information with them.'
    },
    {
        title: 'Urgent: SMS Phishing Attack',
        description:
            'Be cautious of SMS messages claiming to be from your bank. Do not click on any links in these messages.'
    }
]

const FAQ = (): React.JSX.Element => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const [expandedAlertIndex, setExpandedAlertIndex] = useState<number | null>(
        null
    )
    const [textSize, setTextSize] = useState(20) // Default text size
    const [isBold, setIsBold] = useState(true)

    // Load settings from AsyncStorage
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedTextSize = await AsyncStorage.getItem('textSize')
                const savedIsBold = await AsyncStorage.getItem('isBold')
                if (savedTextSize) {
                    setTextSize(Number(savedTextSize))
                }
                if (savedIsBold) {
                    setIsBold(savedIsBold === 'true')
                }
            } catch (error) {
                console.error('Error loading settings:', error)
            }
        }

        loadSettings()
    }, [])

    // Save settings to AsyncStorage
    useEffect(() => {
        const saveSettings = async () => {
            try {
                await AsyncStorage.setItem('textSize', textSize.toString())
                await AsyncStorage.setItem('isBold', isBold.toString())
            } catch (error) {
                console.error('Error saving settings:', error)
            }
        }

        saveSettings()
    }, [textSize, isBold])

    const toggleFAQ = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    const toggleAlert = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpandedAlertIndex(expandedAlertIndex === index ? null : index)
    }

    return (
        <ScrollView contentContainerStyle={commonStyles.faqcontainer}>
            <Text
                style={[
                    commonStyles.faqheader,
                    {
                        fontSize: textSize + 2, // Adjust for header size
                        fontWeight: isBold ? 'bold' : 'normal'
                    }
                ]}
            >
                Safe Milo - FAQ's
            </Text>

            {/* FAQ Section */}
            {faqs.map((faq, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => toggleFAQ(index)}
                    style={[
                        commonStyles.faqItem,
                        expandedIndex === index && commonStyles.expandedItem
                    ]}
                >
                    <Text
                        style={{
                            fontSize: textSize - 3, // Use the dynamic text size
                            fontWeight: isBold ? 'bold' : 'normal'
                        }}
                    >
                        {faq.question}
                    </Text>
                    {expandedIndex === index && (
                        <View style={commonStyles.faqcontainer}>
                            <Text
                                style={{
                                    fontSize: textSize - 5, // Slightly smaller for the answer
                                    fontWeight: isBold ? 'bold' : 'normal'
                                }}
                            >
                                {faq.answer}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}

            {/* Alerts Section */}
            <Text
                style={[
                    commonStyles.faqheader,
                    {
                        fontSize: textSize + 2,
                        fontWeight: isBold ? 'bold' : 'normal'
                    }
                ]}
            >
                Latest Scam Alerts
            </Text>

            {alerts.map((alert, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => toggleAlert(index)}
                    style={[
                        commonStyles.faqItem,
                        expandedAlertIndex === index &&
                            commonStyles.expandedItem
                    ]}
                >
                    <Text
                        style={{
                            fontSize: textSize,
                            fontWeight: isBold ? 'bold' : 'normal'
                        }}
                    >
                        {alert.title}
                    </Text>
                    {expandedAlertIndex === index && (
                        <View style={commonStyles.faqcontainer}>
                            <Text
                                style={{
                                    fontSize: textSize - 2, // Slightly smaller for description
                                    fontWeight: isBold ? 'bold' : 'normal'
                                }}
                            >
                                {alert.description}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default FAQ
