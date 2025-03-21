import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

interface CourseCardProps {
    id: string
    title: string
    progress: number // percentage
    onPress: () => void
}

const CourseCard: React.FC<CourseCardProps> = ({
    id,
    title,
    progress,
    onPress
}) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {/* Placeholder Image */}
            <Image
                source={{ uri: 'https://via.placeholder.com/80' }}
                style={styles.image}
                resizeMode="cover"
            />

            <View style={styles.content}>
                {/* Course Title */}
                <Text style={styles.title}>{title}</Text>

                {/* Progress Bar */}
                <View style={styles.progressBar}>
                    <View
                        style={[styles.progress, { width: `${progress}%` }]}
                    />
                </View>

                {/* Progress Percentage */}
                <Text style={styles.progressText}>{progress}% Complete</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 3 }
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 12
    },
    content: {
        flex: 1
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
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
