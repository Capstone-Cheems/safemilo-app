import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

interface LessonCardProps {
    title: string
    lessonNumber: number
    completed: boolean
    onPress: () => void
}

const LessonCard: React.FC<LessonCardProps> = ({
    title,
    lessonNumber,
    completed,
    onPress
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Text style={styles.lessonNumber}>Lesson {lessonNumber}</Text>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.status}>
                {completed ? '✔ Completed' : '🕒 In Progress'}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 8,
        marginVertical: 6,
        elevation: 2
    },
    lessonNumber: {
        fontSize: 14,
        color: '#888'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    status: {
        fontSize: 14,
        marginTop: 4,
        color: 'green'
    }
})

export default LessonCard
