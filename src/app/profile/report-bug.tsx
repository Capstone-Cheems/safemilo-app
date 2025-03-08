import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native'
import commonStyles from '../../styles/commonStyles'

const ReportBug = (): React.JSX.Element => {
    const [bugDescription, setBugDescription] = useState('')

    const handleReportBug = () => {
        if (!bugDescription) {
            Alert.alert('Please describe the bug before submitting.')
            return
        }
        // Logic to send bug report goes here, e.g., saving to a database or sending via email

        Alert.alert(
            'Bug Reported',
            'Thank you for reporting the bug. We will investigate it shortly.'
        )
        setBugDescription('') // Clear the text input after submission
    }

    return (
        <ScrollView contentContainerStyle={commonStyles.container}>
            <Text style={commonStyles.header}>Report a Bug</Text>

            <View style={commonStyles.inputSection}>
                <Text style={commonStyles.inputLabel}>Bug Description</Text>
                <TextInput
                    style={commonStyles.buginput}
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
                <Text style={commonStyles.buttonText}>Submit Report</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ReportBug
