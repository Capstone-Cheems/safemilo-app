import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface CourseCardProps {
    title: string
    progress: number // percentage
    onPress: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    progress,
    onPress
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.progressBar}>
                <View style={[styles.progress, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressText}>{progress}% Complete</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 3
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    progressBar: {
        height: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginVertical: 8,
        overflow: 'hidden'
    },
    progress: {
        height: '100%',
        backgroundColor: '#FF5733'
    },
    progressText: {
        fontSize: 14,
        color: '#666'
    }
})

export default CourseCard
