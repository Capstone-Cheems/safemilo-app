import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import * as Speech from 'expo-speech'
import ProgressBar from '@/src/widget/Components/ProgressBar'
import { useCourses } from '../learning/useCourses' // ✅ Import course progress manager
import ModuleCompleteAnimation from '../../../components/ModuleCompleteAnimation'

const quizQuestions = [
    {
        question: 'What is a common sign of a phishing email?',
        options: [
            'Spelling mistakes',
            'From a known company',
            'Contains no links'
        ],
        correctAnswer: 'Spelling mistakes',
        explanation:
            'Scammers often use poor grammar and spelling mistakes in phishing emails.'
    },
    {
        question: 'What should you do if someone asks for your password?',
        options: ["Give it if it's urgent", 'Never share it', 'Write it down'],
        correctAnswer: 'Never share it',
        explanation: 'Legitimate companies will never ask for your password.'
    },
    {
        question: 'Which is a sign of a scam website?',
        options: ['No HTTPS', 'Uses official branding', 'Has contact info'],
        correctAnswer: 'No HTTPS',
        explanation: "Secure websites always have 'https://' in the URL."
    },
    {
        question: 'How should you verify a suspicious message?',
        options: [
            'Call the sender directly',
            'Reply to the message',
            'Ignore it'
        ],
        correctAnswer: 'Call the sender directly',
        explanation:
            'Always verify requests by contacting the official organization.'
    },
    {
        question: 'What should you do if you suspect fraud?',
        options: ['Report it', 'Ignore it', 'Click the links to check'],
        correctAnswer: 'Report it',
        explanation:
            'Reporting scams helps prevent others from becoming victims.'
    }
]

const QuizScreen = ({ courseId }: { courseId: string }): JSX.Element => {
    const router = useRouter()
    const { updateCourseProgress } = useCourses() // ✅ Import progress update function
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showExplanation, setShowExplanation] = useState<boolean>(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
    const [showAnimation, setShowAnimation] = useState<boolean>(false) // ✅ Track animation state

    const progressPercentage =
        ((currentQuestion + 1) / quizQuestions.length) * 100

    const handleAnswer = (answer: string): void => {
        setSelectedAnswer(answer)
    }

    const handleSubmit = (): void => {
        if (selectedAnswer) {
            const isCorrectAnswer =
                selectedAnswer === quizQuestions[currentQuestion].correctAnswer
            setIsCorrect(isCorrectAnswer)

            if (isCorrectAnswer) {
                setScore(prevScore => prevScore + 20) // ✅ Adds 20 points per correct answer
            }
            setShowExplanation(true)
        }
    }

    const handleNextQuestion = async (): Promise<void> => {
        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null)
            setShowExplanation(false)
            setIsCorrect(null)
        } else {
            console.log('🟡 Quiz Completed! Updating Course Progress...')
            setShowAnimation(true) // ✅ Show animation when quiz is completed

            await updateCourseProgress(courseId, 100) // ✅ Move course to Completed Courses

            console.log('🟢 Course should now be completed:', courseId)

            // Ensure Learn tab refreshes
            setTimeout(() => {
                setShowAnimation(false)
                router.replace('/(tabs)/learn')
            }, 2000)
        }
    }

    const handleBackToLearn = (): void => {
        router.replace('../(tabs)/learn') // ✅ Navigate to the Learn tab correctly
    }

    const handleListen = (): void => {
        Speech.speak(quizQuestions[currentQuestion].question)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.points}>Points: {score}</Text>
            <ProgressBar progress={progressPercentage} />

            <TouchableOpacity
                style={styles.listenButton}
                onPress={handleListen}
            >
                <Text style={styles.buttonText}>Listen</Text>
            </TouchableOpacity>

            {showAnimation ? (
                // ✅ Show animation when the quiz is completed
                <View style={styles.animationContainer}>
                    <ModuleCompleteAnimation style={styles.animation} />
                    <Text style={styles.header}>Quiz Completed!</Text>
                    <Text style={styles.points}>
                        Final Score: {score} / 100
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleBackToLearn}
                    >
                        <Text style={styles.buttonText}>Back to Learn</Text>
                    </TouchableOpacity>
                </View>
            ) : showExplanation ? (
                <View>
                    <Text style={styles.header}>
                        {isCorrect
                            ? "That's correct, good job!"
                            : 'Oops! That’s not quite right'}
                    </Text>
                    <Text>{quizQuestions[currentQuestion].explanation}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleNextQuestion}
                    >
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <Text style={styles.header}>
                        {quizQuestions[currentQuestion].question}
                    </Text>
                    {quizQuestions[currentQuestion].options.map(
                        (option, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.option,
                                    selectedAnswer === option
                                        ? option ===
                                          quizQuestions[currentQuestion]
                                              .correctAnswer
                                            ? styles.correctOption
                                            : styles.wrongOption
                                        : {}
                                ]}
                                onPress={() => handleAnswer(option)}
                            >
                                <Text>{option}</Text>
                            </TouchableOpacity>
                        )
                    )}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSubmit}
                        disabled={!selectedAnswer}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    animationContainer: { alignItems: 'center', justifyContent: 'center' },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    points: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    listenButton: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#444',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center'
    },
    buttonText: { color: '#FFF', fontSize: 16 },
    option: {
        backgroundColor: '#DDD',
        padding: 12,
        borderRadius: 5,
        marginVertical: 6,
        alignItems: 'center'
    },
    correctOption: { backgroundColor: 'green' },
    wrongOption: { backgroundColor: 'red' },
    animation: { width: 200, height: 200, marginBottom: 20 } // ✅ Adjust animation size
})

export default QuizScreen
