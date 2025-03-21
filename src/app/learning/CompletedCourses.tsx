import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useCourses } from './useCourses'

const CompletedCourses = (): JSX.Element => {
    // Explicit return type added
    const { completedCourses } = useCourses()

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Completed Courses</Text>
            {completedCourses.length === 0 ? (
                <Text style={styles.noCourses}>No completed courses yet</Text>
            ) : (
                <FlatList
                    data={completedCourses}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.completedCard}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.completedText}>
                                ✔ Completed
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    completedCard: {
        backgroundColor: '#DFF0D8',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    completedText: {
        fontSize: 14,
        color: 'green'
    },
    noCourses: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20
    }
})

export default CompletedCourses
