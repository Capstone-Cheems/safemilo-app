import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LearnDashboardScreen from './LearnDashboardScreen'
import ActiveCoursesScreen from './ActiveCoursesScreen'
import CompletedCoursesScreen from './CompletedCoursesScreen'
import AchievementsScreen from './AchievementsScreen'
import LessonScreen from './LessonScreen'
import QuizScreen from './QuizScreen'
import BrowseCategoriesScreen from './BrowseCategoriesScreen'
import SpecificCategoryScreen from './SpecificCategoryScreen'

const Stack = createStackNavigator()

const LearnNavigator = (): JSX.Element => {
    return (
        <Stack.Navigator initialRouteName="LearnDashboard">
            <Stack.Screen
                name="LearnDashboard"
                component={LearnDashboardScreen}
                options={{ title: 'Learn' }}
            />
            <Stack.Screen
                name="ActiveCourses"
                component={ActiveCoursesScreen}
                options={{ title: 'Active Courses' }}
            />
            <Stack.Screen
                name="CompletedCourses"
                component={CompletedCoursesScreen}
                options={{ title: 'Completed Courses' }}
            />
            <Stack.Screen
                name="Achievements"
                component={AchievementsScreen}
                options={{ title: 'Your Achievements' }}
            />
            <Stack.Screen
                name="Lesson"
                component={LessonScreen}
                options={{ title: 'Lesson Preview' }}
            />
            <Stack.Screen
                name="Quiz"
                component={QuizScreen}
                options={{ title: 'Quick Quiz' }}
            />
            <Stack.Screen
                name="BrowseCategories"
                component={BrowseCategoriesScreen}
                options={{ title: 'Browse Scam Categories' }}
            />
            <Stack.Screen
                name="SpecificCategory"
                component={SpecificCategoryScreen}
                options={{ title: 'Scam Category' }}
            />
        </Stack.Navigator>
    )
}

export default LearnNavigator
