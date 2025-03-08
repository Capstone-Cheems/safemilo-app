import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
import commonStyles from '../../styles/commonStyles'

const FeatureWalkthrough = (): React.JSX.Element => {
    return (
        <ScrollView contentContainerStyle={commonStyles.container}>
            <Text style={[{ marginTop: 120 }, commonStyles.header]}>
                Feature Walkthrough
            </Text>

            <View style={commonStyles.featureSection}>
                <Text style={commonStyles.featureTitle}>
                    1. Scam Call Detection
                </Text>
                <Text style={commonStyles.featureDescription}>
                    Safe Milo uses AI-powered scam call detection to warn you
                    when you receive a call from a potential scammer. Stay alert
                    and protect yourself.
                </Text>
                <TouchableOpacity
                    style={commonStyles.featureLink}
                    onPress={() => Alert.alert('Scam Call Detection')}
                >
                    <Text style={commonStyles.linkText}>Learn More</Text>
                </TouchableOpacity>
            </View>

            <View style={commonStyles.featureSection}>
                <Text style={commonStyles.featureTitle}>
                    2. Scam Message Alerts
                </Text>
                <Text style={commonStyles.featureDescription}>
                    Receive notifications about potential scam messages. Safe
                    Milo scans incoming texts and warns you about phishing
                    attempts.
                </Text>
                <TouchableOpacity
                    style={commonStyles.featureLink}
                    onPress={() => Alert.alert('Scam Message Alerts')}
                >
                    <Text style={commonStyles.linkText}>Learn More</Text>
                </TouchableOpacity>
            </View>

            <View style={commonStyles.featureSection}>
                <Text style={commonStyles.featureTitle}>
                    3. Scam News Database
                </Text>
                <Text style={commonStyles.featureDescription}>
                    Safe Milo features a constantly updated scam news database
                    that helps you stay informed about the latest scam trends.
                </Text>
                <TouchableOpacity
                    style={commonStyles.featureLink}
                    onPress={() => Alert.alert('Scam News Database')}
                >
                    <Text style={commonStyles.linkText}>Learn More</Text>
                </TouchableOpacity>
            </View>

            <View style={commonStyles.featureSection}>
                <Text style={commonStyles.featureTitle}>4. Scam Reporting</Text>
                <Text style={commonStyles.featureDescription}>
                    Quickly report scams you encounter to help others stay safe.
                    You can easily submit a scam report with relevant details.
                </Text>
                <TouchableOpacity
                    style={commonStyles.featureLink}
                    onPress={() => Alert.alert('Scam Reporting')}
                >
                    <Text style={commonStyles.linkText}>Learn More</Text>
                </TouchableOpacity>
            </View>

            <View style={commonStyles.featureSection}>
                <Text style={commonStyles.featureTitle}>
                    5. Scam Alerts Preferences
                </Text>
                <Text style={commonStyles.featureDescription}>
                    Customize your scam alert preferences to get notified about
                    specific scam types that matter to you most.
                </Text>
                <TouchableOpacity
                    style={commonStyles.featureLink}
                    onPress={() => Alert.alert('Scam Alerts Preferences')}
                >
                    <Text style={commonStyles.linkText}>Learn More</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default FeatureWalkthrough
