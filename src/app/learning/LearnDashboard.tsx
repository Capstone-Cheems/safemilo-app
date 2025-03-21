import ProgressBar from '@/src/widget/Components/ProgressBar'
import { useRouter } from 'expo-router'
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { useCourses } from './useCourses' // ✅ Import Course State Hook

const LearnDashboardScreen = (): JSX.Element => {
    const router = useRouter()
    const { activeCourses, completedCourses } = useCourses() // ✅ Get Active & Completed Courses

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Learn</Text>
            <Text style={styles.subHeader}>
                Learn how to spot scams, recognize red flags, and take action in
                time.
            </Text>

            {/* ✅ Active Courses Section */}
            <Text style={styles.sectionTitle}>Active Courses</Text>
            {activeCourses.length === 0 ? (
                <Text style={styles.noCourses}>
                    No active courses. Start a new one!
                </Text>
            ) : (
                <FlatList
                    data={activeCourses}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.courseList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() =>
                                router.push({
                                    pathname: '/learning/Lesson',
                                    params: { courseId: item.id }
                                })
                            }
                        >
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.progressText}>
                                Lesson 0/10 | {item.progress}% Complete
                            </Text>
                            <ProgressBar progress={item.progress} />
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() =>
                                    router.push({
                                        pathname: '/learning/Lesson',
                                        params: { courseId: item.id }
                                    })
                                }
                            >
                                <Text style={styles.buttonText}>
                                    Continue Learning
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* ✅ Completed Courses Section */}
            <Text style={styles.sectionTitle}>Completed Courses</Text>
            {completedCourses.length === 0 ? (
                <Text style={styles.noCourses}>No completed courses yet.</Text>
            ) : (
                <FlatList
                    data={completedCourses}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.courseList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[styles.card, styles.completedCard]}
                            onPress={() =>
                                router.push({
                                    pathname: '/learning/CompletedLesson',
                                    params: { courseId: item.id }
                                })
                            }
                        >
                            <Text style={styles.cardTitle}>{item.title}</Text>
                            <Text style={styles.completedText}>
                                ✔ Completed
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            )}

            {/* ✅ Additional Learning Options */}
            <TouchableOpacity
                style={styles.infoCard}
                onPress={() => router.push('/learning/BrowseCategories')}
            >
                <Text style={styles.infoTitle}>Browse Scam Categories</Text>
                <Text style={styles.infoText}>
                    Find other learning modules.
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.infoCard}
                onPress={() => router.push('/learning/Achievements')}
            >
                <Text style={styles.infoTitle}>
                    Check out Your Achievements
                </Text>
                <Text style={styles.infoText}>
                    Your Awareness Score is:{' '}
                    <Text style={styles.score}>367</Text>
                </Text>
            </TouchableOpacity>
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
        fontSize: 28,
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    courseList: {
        paddingBottom: 10
    },
    card: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 10,
        marginRight: 12,
        width: 200,
        justifyContent: 'space-between'
    },
    completedCard: {
        backgroundColor: '#DFF0D8' // ✅ Different background for completed courses
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    progressText: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5
    },
    completedText: {
        fontSize: 16,
        color: 'green',
        fontWeight: 'bold',
        marginTop: 5
    },
    button: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16
    },
    infoCard: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 10,
        marginVertical: 8
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    infoText: {
        fontSize: 14,
        color: '#666'
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    noCourses: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 10
    }
})

export default LearnDashboardScreen
