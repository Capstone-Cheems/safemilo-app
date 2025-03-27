// import React, { useState, useCallback } from 'react'
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     Alert,
//     ScrollView
// } from 'react-native'
// import axios from 'axios'
// import commonStyles from '../../styles/commonStyles'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import { useFocusEffect } from 'expo-router'
// import Constants from 'expo-constants'
// import { Buffer } from 'buffer' // Import Buffer for Base64 encoding

// const ReportBug = (): React.JSX.Element => {
//     const JIRA_API_URL = Constants.expoConfig?.extra?.JIRA_API_URL
//     const JIRA_EMAIL = Constants.expoConfig?.extra?.JIRA_EMAIL
//     const JIRA_API_TOKEN = Constants.expoConfig?.extra?.JIRA_API_TOKEN

//     const [bugDescription, setBugDescription] = useState('')
//     const [textSize, setTextSize] = useState(20)
//     const [isBold, setIsBold] = useState(true)

//     const loadSettings = useCallback(async () => {
//         try {
//             const storedSize = await AsyncStorage.getItem('textSize')
//             const storedBold = await AsyncStorage.getItem('isBold')

//             if (storedSize) setTextSize(parseInt(storedSize))
//             if (storedBold) setIsBold(storedBold === 'true')
//         } catch (error) {
//             console.error('Error loading settings:', error)
//         }
//     }, [])

//     useFocusEffect(
//         useCallback(() => {
//             loadSettings()
//         }, [loadSettings])
//     )

//     const handleReportBug = async () => {
//         if (!bugDescription) {
//             Alert.alert('Please describe the bug before submitting.')
//             return
//         }

//         const issueData = {
//             fields: {
//                 project: { key: 'SCRUM' },
//                 summary: 'Bug Reported to Jira By Safe Milo User',
//                 description: {
//                     type: 'doc',
//                     version: 1,
//                     content: [
//                         {
//                             type: 'paragraph',
//                             content: [{ type: 'text', text: bugDescription }]
//                         }
//                     ]
//                 },
//                 issuetype: { name: 'Bug' }
//             }
//         }

//         try {
//             const authToken = Buffer.from(
//                 `${JIRA_EMAIL}:${JIRA_API_TOKEN}`
//             ).toString('base64')

//             const response = await axios.post(JIRA_API_URL, issueData, {
//                 headers: {
//                     Authorization: `Basic ${authToken}`,
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json'
//                 }
//             })

//             if (response.status === 201) {
//                 Alert.alert(
//                     'Bug Reported',
//                     'Thank you for reporting the bug. We will investigate it shortly.'
//                 )
//                 setBugDescription('')
//             }
//         } catch (error) {
//             console.error(
//                 'Error creating Jira ticket:',
//                 (axios.isAxiosError(error) && error.response?.data) || error
//             )
//             Alert.alert('Error', 'Failed to submit the bug report.')
//         }
//     }

//     return (
//         <ScrollView contentContainerStyle={commonStyles.container}>
//             <Text
//                 style={{
//                     fontSize: textSize + 6,
//                     fontWeight: isBold ? 'bold' : 'normal',
//                     marginBottom: 20
//                 }}
//             >
//                 Report a Bug
//             </Text>

//             <View style={commonStyles.inputSection}>
//                 <Text
//                     style={{
//                         fontSize: textSize + 2,
//                         fontWeight: isBold ? 'bold' : 'normal',
//                         marginBottom: 5
//                     }}
//                 >
//                     Bug Description
//                 </Text>
//                 <TextInput
//                     style={[commonStyles.buginput, { fontSize: textSize - 6 }]}
//                     value={bugDescription}
//                     onChangeText={setBugDescription}
//                     placeholder="Describe the bug..."
//                     multiline
//                     numberOfLines={5}
//                 />
//             </View>

//             <TouchableOpacity
//                 style={commonStyles.button}
//                 onPress={handleReportBug}
//             >
//                 <Text
//                     style={[
//                         {
//                             fontSize: textSize - 2,
//                             fontWeight: isBold ? 'bold' : 'normal'
//                         },
//                         commonStyles.PbuttonText
//                     ]}
//                 >
//                     Submit Report
//                 </Text>
//             </TouchableOpacity>
//         </ScrollView>
//     )
// }

// export default ReportBug



import React, { useState, useCallback } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native'
import axios from 'axios'
import commonStyles from '../../styles/commonStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from 'expo-router'
import { Buffer } from 'buffer'; // This line is important for Buffer in React Native
// eslint-disable-next-line import/no-unresolved
import { JIRA_API_URL, JIRA_EMAIL, JIRA_API_TOKEN } from '@env'

const ReportBug = (): React.JSX.Element => {
    const [bugDescription, setBugDescription] = useState('')
    const [textSize, setTextSize] = useState(20) // Default text size
    const [isBold, setIsBold] = useState(true)

    const loadSettings = useCallback(async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize')
            const storedBold = await AsyncStorage.getItem('isBold')

            if (storedSize) setTextSize(parseInt(storedSize))
            if (storedBold) setIsBold(storedBold === 'true')
        } catch (error) {
            console.error('Error loading settings:', error)
        }
    }, [])

    useFocusEffect(
        useCallback(() => {
            loadSettings()
        }, [loadSettings])
    )

    const handleReportBug = async () => {
        if (!bugDescription) {
            Alert.alert('Please describe the bug before submitting.')
            return
        }

        const issueData = {
            fields: {
                project: { key: 'SCRUM' },
                summary: 'Bug Reported to Jira By Safe Milo User',
                description: {
                    type: 'doc',
                    version: 1,
                    content: [
                        {
                            type: 'paragraph',
                            content: [{ type: 'text', text: bugDescription }]
                        }
                    ]
                },
                issuetype: { name: 'Bug' }
            }
        }

        try {
            const authToken = Buffer.from(
                `${JIRA_EMAIL}:${JIRA_API_TOKEN}`
            ).toString('base64')

            const response = await axios.post(JIRA_API_URL, issueData, {
                headers: {
                    Authorization: `Basic ${authToken}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })

            if (response.status === 201) {
                Alert.alert(
                    'Bug Reported',
                    'Thank you for reporting the bug. We will investigate it shortly.'
                )
                setBugDescription('')
            }
        } catch (error) {
            console.error(
                'Error creating Jira ticket:',
                (axios.isAxiosError(error) && error.response?.data) || error
            )
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                Alert.alert('Error', error.response.data.message);
            } else {
                Alert.alert('Error', 'Failed to submit the bug report.');
            }
        }
    }

    return (
        <ScrollView contentContainerStyle={commonStyles.container}>
            <Text
                style={{
                    fontSize: textSize + 6,
                    fontWeight: isBold ? 'bold' : 'normal',
                    marginBottom: 20
                }}
            >
                Report a Bug
            </Text>

            <View style={commonStyles.inputSection}>
                <Text
                    style={{
                        fontSize: textSize + 2,
                        fontWeight: isBold ? 'bold' : 'normal',
                        marginBottom: 5
                    }}
                >
                    Bug Description
                </Text>
                <TextInput
                    style={[commonStyles.buginput, { fontSize: textSize - 6 }]}
                    value={bugDescription}
                    onChangeText={setBugDescription}
                    placeholder="Describe the bug..."
                    multiline
                    numberOfLines={5}
                />
            </View>

            <TouchableOpacity
                style={commonStyles.button}
                onPress={handleReportBug}
            >
                <Text
                    style={[
                        {
                            fontSize: textSize - 2,
                            fontWeight: isBold ? 'bold' : 'normal'
                        },
                        commonStyles.PbuttonText
                    ]}
                >
                    Submit Report
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ReportBug
