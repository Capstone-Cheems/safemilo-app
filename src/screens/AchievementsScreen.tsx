import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import Badge from '../Components/Badge'

const achievements = [
    { id: '1', name: 'Cautious Clicker' },
    { id: '2', name: 'Scam Spotter' }
]

const AchievementsScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Achievements</Text>
            <FlatList
                data={achievements}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Badge name={item.name} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9F9F9'
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    }
})

export default AchievementsScreen
