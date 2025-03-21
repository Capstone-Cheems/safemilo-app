// import React, { useState } from 'react'
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     StyleSheet
// } from 'react-native'
// import commonStyles from '../../styles/commonStyles'

// const faqs = [
//     {
//         question: 'What is Safe Milo?',
//         answer: 'Safe Milo is a scam protection app that helps you detect fraudulent calls, messages, and news. It provides real-time alerts and educational resources to keep you safe.'
//     },
//     {
//         question: 'How does Safe Milo detect scams?',
//         answer: 'Safe Milo uses AI-powered scam detection, a scam database, and user reports to identify suspicious activities. It also warns you about known scam patterns.'
//     },
//     {
//         question: 'What should I do if I receive a scam call or message?',
//         answer: 'Do not respond or click on any links. Report the scam using Safe Milo’s reporting feature, block the sender, and alert your bank if financial information is involved.'
//     },
//     {
//         question: 'How can I report a scam?',
//         answer: 'You can report a scam directly through the app by navigating to the "Report Scam" section and filling out the necessary details.'
//     },

// const FAQ = (): React.JSX.Element => {
//     const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

//     const toggleFAQ = (index: number) => {
//         setExpandedIndex(expandedIndex === index ? null : index)
//     }

//     return (
//         <ScrollView contentContainerStyle={commonStyles.faqcontainer}>
//             <Text style={commonStyles.faqheader}>Safe Milo - FAQ's</Text>

//             {faqs.map((faq, index) => (
//                 <TouchableOpacity
//                     key={index}
//                     onPress={() => toggleFAQ(index)}
//                     style={[
//                         commonStyles.faqItem,
//                         expandedIndex === index && commonStyles.expandedItem
//                     ]}
//                 >
//                     <Text style={commonStyles.faqQuestion}>{faq.question}</Text>
//                     {expandedIndex === index && (
//                         <Text style={commonStyles.faqAnswer}>{faq.answer}</Text>
//                     )}
//                 </TouchableOpacity>
//             ))}
//         </ScrollView>
//     )
// }

// export default FAQ
import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    LayoutAnimation,
    UIManager,
    Platform
} from 'react-native'
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
        question: 'Is Safe Milo available in all countries?',
        answer: 'Safe Milo is currently available in multiple countries and regions, but some features may be restricted in certain areas due to local regulations.'
    },
    {
        question: 'How do I update the app?',
        answer: 'You can update Safe Milo through the App Store (iOS) or Google Play Store (Android) whenever a new version is available.'
    },
    {
        question: 'Is my data secure in Safe Milo?',
        answer: 'Yes! Safe Milo prioritizes your privacy. All data is encrypted, and we do not share your personal information with third parties without your consent.'
    }
]

const FAQ = (): React.JSX.Element => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

    const toggleFAQ = (index: number) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        setExpandedIndex(expandedIndex === index ? null : index)
    }

    return (
        <ScrollView contentContainerStyle={commonStyles.faqcontainer}>
            <Text style={commonStyles.faqheader}>Safe Milo - FAQ's</Text>

            {faqs.map((faq, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => toggleFAQ(index)}
                    style={[
                        commonStyles.faqItem,
                        expandedIndex === index && commonStyles.expandedItem
                    ]}
                >
                    <Text style={commonStyles.faqQuestion}>{faq.question}</Text>
                    {expandedIndex === index && (
                        <View style={commonStyles.faqcontainer}>
                            <Text style={commonStyles.faqAnswer}>
                                {faq.answer}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}

export default FAQ
