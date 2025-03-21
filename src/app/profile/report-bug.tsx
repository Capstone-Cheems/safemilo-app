// import React, { useState } from 'react'
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

// const JIRA_API_URL =
//     'https://mylangara-team-2502.atlassian.net/rest/api/3/issue'
// const JIRA_AUTH = btoa(
//     'h279@mylangara.ca:ATATT3xFfGF08xUFn3TkvstKVg-tmLlvxPBbPQvgbV33e5ncQU6VyObo9k-lUZINjdID4S_nDXGJgszcvBp6-8FmsdyHywoJGE2o2oW0_yCH6VwoTF6gkMiVDhA82a2rrtmOTMgHMMLh_AG0Da6i7j6Wz_LSnmbEK_SDAH2Co9QX8-yqEr6R0uU=00A7B451'
// ) // Base64 encode email:API Token

// const ReportBug = (): React.JSX.Element => {
//     const [bugDescription, setBugDescription] = useState('')

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
//             const response = await axios.post(JIRA_API_URL, issueData, {
//                 headers: {
//                     Authorization: `Basic ${JIRA_AUTH}`,
//                     'Content-Type': 'application/json',
//                     Accept: 'application/json' // Ensure the API accepts JSON
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
//                 // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                 (error as any).response?.data || error
//             )
//             Alert.alert('Error', 'Failed to submit the bug report.')
//         }
//     }

//     return (
//         <ScrollView contentContainerStyle={commonStyles.container}>
//             <Text style={commonStyles.header}>Report a Bug</Text>

//             <View style={commonStyles.inputSection}>
//                 <Text style={commonStyles.inputLabel}>Bug Description</Text>
//                 <TextInput
//                     style={commonStyles.buginput}
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
//                 <Text style={commonStyles.buttonText}>Submit Report</Text>
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

const JIRA_API_URL =
    'https://mylangara-team-2502.atlassian.net/rest/api/3/issue'
const JIRA_AUTH = btoa(
    'h279@mylangara.ca:ATATT3xFfGF08xUFn3TkvstKVg-tmLlvxPBbPQvgbV33e5ncQU6VyObo9k-lUZINjdID4S_nDXGJgszcvBp6-8FmsdyHywoJGE2o2oW0_yCH6VwoTF6gkMiVDhA82a2rrtmOTMgHMMLh_AG0Da6i7j6Wz_LSnmbEK_SDAH2Co9QX8-yqEr6R0uU=00A7B451'
) // Base64 encode email:API Token

const ReportBug = (): React.JSX.Element => {
    const [bugDescription, setBugDescription] = useState('')
    const [textSize, setTextSize] = useState(20) // Default text size
    const [isBold, setIsBold] = useState(true)

    // Function to load settings
    const loadSettings = useCallback(async () => {
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
    }, [])

    // Load settings when the screen is focused
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
            const response = await axios.post(JIRA_API_URL, issueData, {
                headers: {
                    Authorization: `Basic ${JIRA_AUTH}`,
                    'Content-Type': 'application/json',
                    Accept: 'application/json' // Ensure the API accepts JSON
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
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (error as any).response?.data || error
            )
            Alert.alert('Error', 'Failed to submit the bug report.')
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
