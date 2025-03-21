// import React from 'react'
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     Alert,
//     Modal,
//     StyleSheet
// } from 'react-native'
// import commonStyles from '../../styles/commonStyles'

// const FeatureWalkthrough = (): React.JSX.Element => {
//     const [isModalVisible, setIsModalVisible] = React.useState(false)
//     const [modalContent, setModalContent] = React.useState('')
//     const [modalTitle, setModalTitle] = React.useState('')

//     const showFeatureDetails = (feature: string) => {
//         let message = ''

//         switch (feature) {
//             case 'scamCallDetection':
//                 message =
//                     'Safe Milo uses AI-powered scam call detection to identify potential scammers by analyzing incoming calls. It warns you in real-time when a call is suspected to be a scam.'
//                 break
//             case 'scamMessageAlerts':
//                 message =
//                     'Safe Milo scans your incoming messages for phishing attempts and potential scam texts. You will receive alerts for suspicious messages to protect your personal information.'
//                 break
//             case 'scamNewsDatabase':
//                 message =
//                     'Stay up to date with the latest scam trends. Safe Milo provides an updated scam news database so you can be informed about emerging threats and learn about recent scams.'
//                 break
//             case 'scamReporting':
//                 message =
//                     'If you encounter a scam, you can easily report it within the app. The report will help others avoid the same scam, contributing to a safer community.'
//                 break
//             case 'scamAlertsPreferences':
//                 message =
//                     'Customize your scam alert preferences to suit your needs. You can select which types of scams to be alerted about, allowing you to focus on the ones that matter most to you.'
//                 break
//             default:
//                 message = 'No details available.'
//                 break
//         }

//         setModalTitle(feature.replace(/([A-Z])/g, ' $1').trim())
//         setModalContent(message)
//         setIsModalVisible(true)
//     }

//     const closeModal = () => {
//         setIsModalVisible(false)
//     }

//     return (
//         <ScrollView
//             contentContainerStyle={{
//                 paddingBottom: 30,
//                 paddingHorizontal: 15,
//                 paddingTop: 20,
//                 flexGrow: 1 // Ensures the ScrollView expands to fit content
//             }}
//             style={{ flex: 1 }} // Ensuring ScrollView takes up available space
//         >
//             <Text
//                 style={[
//                     {
//                         marginTop: 10,
//                         textAlign: 'center',
//                         fontSize: 28,
//                         fontWeight: '700',
//                         color: '#4A4A4A'
//                     },
//                     commonStyles.header
//                 ]}
//             >
//                 Feature Walkthrough
//             </Text>

//             {[
//                 {
//                     title: 'Scam Call Detection',
//                     description:
//                         'Safe Milo uses AI-powered scam call detection to warn you when you receive a call from a potential scammer. Stay alert and protect yourself.',
//                     feature: 'scamCallDetection'
//                 },
//                 {
//                     title: 'Scam Message Alerts',
//                     description:
//                         'Receive notifications about potential scam messages. Safe Milo scans incoming texts and warns you about phishing attempts.',
//                     feature: 'scamMessageAlerts'
//                 },
//                 {
//                     title: 'Scam News Database',
//                     description:
//                         'Safe Milo features a constantly updated scam news database that helps you stay informed about the latest scam trends.',
//                     feature: 'scamNewsDatabase'
//                 },
//                 {
//                     title: 'Scam Reporting',
//                     description:
//                         'Quickly report scams you encounter to help others stay safe. You can easily submit a scam report with relevant details.',
//                     feature: 'scamReporting'
//                 }
//             ].map(({ title, description, feature }, index) => (
//                 <View
//                     key={index}
//                     style={[
//                         commonStyles.featureSection,
//                         {
//                             backgroundColor: '#F9FAFB',
//                             borderRadius: 10,
//                             padding: 15,
//                             marginBottom: 20,
//                             shadowColor: '#000',
//                             shadowOffset: { width: 0, height: 3 },
//                             shadowOpacity: 0.1,
//                             shadowRadius: 5
//                         }
//                     ]}
//                 >
//                     <Text
//                         style={[
//                             commonStyles.featureTitle,
//                             { fontSize: 20, fontWeight: '600', color: '#333' }
//                         ]}
//                     >
//                         {index + 1}. {title}
//                     </Text>
//                     <Text
//                         style={[
//                             commonStyles.featureDescription,
//                             {
//                                 marginTop: 5,
//                                 fontSize: 16,
//                                 color: '#0A2941',
//                                 lineHeight: 24
//                             }
//                         ]}
//                     >
//                         {description}
//                     </Text>
//                     <TouchableOpacity
//                         style={[
//                             commonStyles.featureLink,
//                             {
//                                 marginTop: 10,
//                                 backgroundColor: '#0A2941',
//                                 paddingVertical: 8,
//                                 paddingHorizontal: 12,
//                                 borderRadius: 25
//                             }
//                         ]}
//                         onPress={() => showFeatureDetails(feature)}
//                     >
//                         <Text
//                             style={[
//                                 commonStyles.linkText,
//                                 { color: '#fff', fontWeight: '500' }
//                             ]}
//                         >
//                             Learn More
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             ))}

//             {/* Modal Component */}
//             <Modal
//                 visible={isModalVisible}
//                 animationType="fade"
//                 transparent={true}
//                 onRequestClose={closeModal}
//             >
//                 <View style={commonStyles.modalBackground}>
//                     <View style={commonStyles.modalContainer}>
//                         <Text style={commonStyles.modalTitle}>
//                             {modalTitle}
//                         </Text>
//                         <Text style={commonStyles.modalContent}>
//                             {modalContent}
//                         </Text>
//                         <TouchableOpacity
//                             style={commonStyles.closeButton}
//                             onPress={closeModal}
//                         >
//                             <Text style={commonStyles.closeButtonText}>
//                                 Close
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </ScrollView>
//     )
// }

// export default FeatureWalkthrough

import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    StyleSheet
} from 'react-native'
import commonStyles from '../../styles/commonStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const FeatureWalkthrough = (): React.JSX.Element => {
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalContent, setModalContent] = useState('')
    const [modalTitle, setModalTitle] = useState('')
    const [textSize, setTextSize] = useState(20) // Default text size
    const [isBold, setIsBold] = useState(true) // Default bold state

    // Function to load settings from AsyncStorage
    const loadSettings = async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize')
            const storedBold = await AsyncStorage.getItem('isBold')

            if (storedSize) {
                setTextSize(parseInt(storedSize))
            }

            if (storedBold) {
                setIsBold(storedBold === 'true')
            }
        } catch (error) {
            console.error('Error loading settings:', error)
        }
    }

    // Load settings on component mount
    useEffect(() => {
        loadSettings()
    }, [])

    const showFeatureDetails = (feature: string) => {
        let message = ''

        switch (feature) {
            case 'scamCallDetection':
                message =
                    'Safe Milo uses AI-powered scam call detection to identify potential scammers by analyzing incoming calls. It warns you in real-time when a call is suspected to be a scam.'
                break
            case 'scamMessageAlerts':
                message =
                    'Safe Milo scans your incoming messages for phishing attempts and potential scam texts. You will receive alerts for suspicious messages to protect your personal information.'
                break
            case 'scamNewsDatabase':
                message =
                    'Stay up to date with the latest scam trends. Safe Milo provides an updated scam news database so you can be informed about emerging threats and learn about recent scams.'
                break
            case 'scamReporting':
                message =
                    'If you encounter a scam, you can easily report it within the app. The report will help others avoid the same scam, contributing to a safer community.'
                break
            case 'scamAlertsPreferences':
                message =
                    'Customize your scam alert preferences to suit your needs. You can select which types of scams to be alerted about, allowing you to focus on the ones that matter most to you.'
                break
            default:
                message = 'No details available.'
                break
        }

        setModalTitle(feature.replace(/([A-Z])/g, ' $1').trim())
        setModalContent(message)
        setIsModalVisible(true)
    }

    const closeModal = () => {
        setIsModalVisible(false)
    }

    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 30,
                paddingHorizontal: 15,
                paddingTop: 20,
                flexGrow: 1 // Ensures the ScrollView expands to fit content
            }}
            style={{ flex: 1 }} // Ensuring ScrollView takes up available space
        >
            <Text
                style={[
                    {
                        marginTop: 10,
                        textAlign: 'center',
                        fontSize: textSize,
                        fontWeight: isBold ? 'bold' : 'normal',
                        color: '#4A4A4A'
                    },
                    commonStyles.header
                ]}
            >
                Feature Walkthrough
            </Text>

            {[
                {
                    title: 'Scam Call Detection',
                    description:
                        'Safe Milo uses AI-powered scam call detection to warn you when you receive a call from a potential scammer. Stay alert and protect yourself.',
                    feature: 'scamCallDetection'
                },
                {
                    title: 'Scam Message Alerts',
                    description:
                        'Receive notifications about potential scam messages. Safe Milo scans incoming texts and warns you about phishing attempts.',
                    feature: 'scamMessageAlerts'
                },
                {
                    title: 'Scam News Database',
                    description:
                        'Safe Milo features a constantly updated scam news database that helps you stay informed about the latest scam trends.',
                    feature: 'scamNewsDatabase'
                },
                {
                    title: 'Scam Reporting',
                    description:
                        'Quickly report scams you encounter to help others stay safe. You can easily submit a scam report with relevant details.',
                    feature: 'scamReporting'
                }
            ].map(({ title, description, feature }, index) => (
                <View
                    key={index}
                    style={[
                        commonStyles.featureSection,
                        {
                            backgroundColor: '#F9FAFB',
                            borderRadius: 10,
                            padding: 15,
                            marginBottom: 20,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.1,
                            shadowRadius: 5
                        }
                    ]}
                >
                    <Text
                        style={[
                            commonStyles.featureTitle,
                            {
                                fontSize: textSize + 2,
                                fontWeight: isBold ? 'bold' : 'normal',
                                color: '#333'
                            }
                        ]}
                    >
                        {index + 1}. {title}
                    </Text>
                    <Text
                        style={[
                            commonStyles.featureDescription,
                            {
                                marginTop: 5,
                                fontSize: textSize - 4,
                                color: '#0A2941',
                                lineHeight: 24,
                                fontWeight: isBold ? 'bold' : 'normal'
                            }
                        ]}
                    >
                        {description}
                    </Text>
                    <TouchableOpacity
                        style={[
                            commonStyles.featureLink,
                            {
                                marginTop: 10,
                                backgroundColor: '#0A2941',
                                paddingVertical: 8,
                                paddingHorizontal: 12,
                                borderRadius: 25
                            }
                        ]}
                        onPress={() => showFeatureDetails(feature)}
                    >
                        <Text
                            style={[
                                commonStyles.linkText,
                                { color: '#fff', fontWeight: '500' },
                                { fontSize: textSize - 3 }
                            ]}
                        >
                            Learn More
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}

            {/* Modal Component */}
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
                                    fontWeight: isBold ? 'bold' : 'normal'
                                }
                            ]}
                        >
                            {modalTitle}
                        </Text>
                        <Text
                            style={[
                                commonStyles.modalContent,
                                {
                                    fontSize: textSize - 4,
                                    fontWeight: isBold ? 'bold' : 'normal'
                                }
                            ]}
                        >
                            {modalContent}
                        </Text>
                        <TouchableOpacity
                            style={commonStyles.closeButton}
                            onPress={closeModal}
                        >
                            <Text style={commonStyles.closeButtonText}>
                                Close
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default FeatureWalkthrough
