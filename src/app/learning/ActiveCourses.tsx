import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import CourseCard from '../../widget/Components/CourseCard'
import { useCourses } from './useCourses'

const ActiveCourses = (): JSX.Element => {
    // ✅ Add explicit return type
    const { activeCourses, updateCourseProgress } = useCourses()

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Active Courses</Text>
            {activeCourses.length === 0 ? (
                <Text style={styles.noCourses}>No active courses</Text>
            ) : (
                <FlatList
                    data={activeCourses}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <CourseCard
                            id={item.id} // ✅ `id` is now recognized
                            title={item.title}
                            progress={item.progress}
                            onPress={async () =>
                                await updateCourseProgress(
                                    item.id,
                                    item.progress + 20
                                )
                            } // Ensure `onPress` is a Promise
                        />
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
    noCourses: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20
    }
})

export default ActiveCourses
