import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CourseCard from './CourseCard';
import Badge from './Badge';
import VideoPlayer from './VideoPlayer';
import QuizQuestion from './QuizQuestion';

const Stack = createStackNavigator();

const ActiveCoursesScreen = ({ navigation }) => {
    const activeCourses = [
        { id: '1', title: 'Scam Awareness Basics', progress: 50 },
    ];
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Active Courses</Text>
            <FlatList
                data={activeCourses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CourseCard title={item.title} progress={item.progress} onPress={() => navigation.navigate('Lesson')} />
                )}
            />
        </View>
    );
};

const CompletedCoursesScreen = () => {
    const completedCourses = [
        { id: '2', title: 'Charity Scams', progress: 100 },
    ];
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Completed Courses</Text>
            <FlatList
                data={completedCourses}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CourseCard title={item.title} progress={item.progress} onPress={() => {}} />
                )}
            />
        </View>
    );
};

const AchievementsScreen = () => {
    const achievements = [{ id: '1', name: 'Cautious Clicker' }];
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Your Achievements</Text>
            <View style={styles.badgeContainer}>
                {achievements.map((badge) => (
                    <Badge key={badge.id} name={badge.name} />
                ))}
            </View>
        </View>
    );
};

const LessonScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Lesson Preview</Text>
            <VideoPlayer uri="https://www.example.com/sample-video.mp4" />
            <Text style={styles.sectionTitle}>Ready for a quiz?</Text>
            <Text style={styles.link} onPress={() => navigation.navigate('Quiz')}>Take the Quiz</Text>
        </View>
    );
};

const QuizScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quick Quiz</Text>
            <QuizQuestion
                question="You receive a call claiming to be from the government, demanding urgent payment. What should you do?"
                options={["Pay immediately", "Hang up and verify", "Give personal details"]}
                correctAnswer="Hang up and verify"
                onAnswer={(isCorrect) => console.log(isCorrect ? 'Correct!' : 'Try again!')}
            />
        </View>
    );
};

const LearnNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="ActiveCourses" component={ActiveCoursesScreen} options={{ title: 'Active Courses' }} />
                <Stack.Screen name="CompletedCourses" component={CompletedCoursesScreen} options={{ title: 'Completed Courses' }} />
                <Stack.Screen name="Achievements" component={AchievementsScreen} options={{ title: 'Your Achievements' }} />
                <Stack.Screen name="Lesson" component={LessonScreen} options={{ title: 'Lesson Preview' }} />
                <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quick Quiz' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9F9F9',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    badgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    link: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 10,
    },
});

export default LearnNavigator;
