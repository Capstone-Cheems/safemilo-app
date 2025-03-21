import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface Course {
    id: string
    title: string
    progress: number
}

export const useCourses = (): {
    activeCourses: Course[]
    completedCourses: Course[]
    updateCourseProgress: (courseId: string, progress: number) => Promise<void>
} => {
    const [activeCourses, setActiveCourses] = useState<Course[]>([])
    const [completedCourses, setCompletedCourses] = useState<Course[]>([])

    useEffect(() => {
        loadCourses()
    }, [])

    // ✅ Fix: Explicit return type added
    useEffect(() => {
        const debugStorage = async (): Promise<void> => {
            const active = await AsyncStorage.getItem('activeCourses')
            const completed = await AsyncStorage.getItem('completedCourses')

            console.log(
                '🟡 Active Courses from Storage:',
                JSON.parse(active || '[]')
            )
            console.log(
                '🟢 Completed Courses from Storage:',
                JSON.parse(completed || '[]')
            )
        }
        debugStorage()
    }, [activeCourses, completedCourses]) // ✅ Runs when courses update

    // ✅ Fix: Explicit return type added
    const loadCourses = async (): Promise<void> => {
        try {
            const active = await AsyncStorage.getItem('activeCourses')
            const completed = await AsyncStorage.getItem('completedCourses')

            setActiveCourses(active ? JSON.parse(active) : [])
            setCompletedCourses(completed ? JSON.parse(completed) : [])
        } catch (error) {
            console.error('Error loading courses:', error)
        }
    }

    // ✅ Fix: Explicit return type added
    const updateCourseProgress = async (
        courseId: string,
        progress: number
    ): Promise<void> => {
        let updatedActiveCourses = activeCourses.map(course =>
            course.id === courseId ? { ...course, progress } : course
        )

        if (progress >= 100) {
            const completedCourse = updatedActiveCourses.find(
                course => course.id === courseId
            )
            updatedActiveCourses = updatedActiveCourses.filter(
                course => course.id !== courseId
            )

            if (completedCourse) {
                const updatedCompletedCourses = [
                    ...completedCourses,
                    completedCourse
                ]

                console.log('✅ Moving Course to Completed:', completedCourse)

                setCompletedCourses(updatedCompletedCourses)
                await AsyncStorage.setItem(
                    'completedCourses',
                    JSON.stringify(updatedCompletedCourses)
                )
            }
        }

        setActiveCourses(updatedActiveCourses)
        await AsyncStorage.setItem(
            'activeCourses',
            JSON.stringify(updatedActiveCourses)
        )

        // ✅ Force re-fetch
        setTimeout(() => {
            loadCourses()
        }, 1000)
    }

    return { activeCourses, completedCourses, updateCourseProgress }
}
