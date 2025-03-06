import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import CourseCard from '../Components/CourseCard'

const completedCourses = [{ id: '2', title: 'Charity Scams', progress: 100 }]

const CompletedCoursesScreen = (): JSX.Element => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Completed Courses</Text>
            <FlatList
                data={completedCourses}
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

export default CompletedCoursesScreen
