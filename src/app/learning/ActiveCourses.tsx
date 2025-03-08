import CourseCard from '@/src/widget/Components/CourseCard'
import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'

const activeCourses = [
    { id: '1', title: 'Scam Awareness Basics', progress: 50 }
]

const ActiveCoursesScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Active Courses</Text>
            <FlatList
                data={activeCourses}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <CourseCard
                        title={item.title}
                        progress={item.progress}
                        onPress={() => {}}
                    />
                )}
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

export default ActiveCoursesScreen
