import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

interface BadgeProps {
    name: string
}

const Badge: React.FC<BadgeProps> = ({ name }) => {
    return (
        <View style={styles.badge}>
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    badge: {
        backgroundColor: '#FFBB33',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    text: {
        fontSize: 14,
        fontWeight: 'bold'
    }
})

export default Badge
