import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ProgressBar from '../Components/ProgressBar'
import * as Speech from 'expo-speech'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../types/types'

// Define navigation type for QuizScreen
type QuizScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Quiz'>

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

const QuizScreen = (): JSX.Element => {
    const navigation = useNavigation<QuizScreenNavigationProp>()
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [quizCompleted, setQuizCompleted] = useState<boolean>(false)
    const [showExplanation, setShowExplanation] = useState<boolean>(false)
    const [showCourseCompleted, setShowCourseCompleted] =
        useState<boolean>(false)
    const [showBadgeAchieved, setShowBadgeAchieved] = useState<boolean>(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

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
                setScore(prevScore => prevScore + 20) // Adds 20 points for each correct answer
            }
            setShowExplanation(true)
        }
    }

    const handleNextQuestion = (): void => {
        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null)
            setShowExplanation(false)
            setIsCorrect(null)
        } else {
            setQuizCompleted(true)
            setShowCourseCompleted(true)

            setTimeout(() => {
                setShowCourseCompleted(false)
                setShowBadgeAchieved(true)
            }, 2000)
        }
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

            {showCourseCompleted ? (
                <View>
                    <Text style={styles.header}>Woohoo! Module completed.</Text>
                    <Text style={styles.points}>
                        Total Score: {score} / 100
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Achievements')}
                    >
                        <Text style={styles.buttonText}>View Achievements</Text>
                    </TouchableOpacity>
                </View>
            ) : showBadgeAchieved ? (
                <View>
                    <Text style={styles.header}>Congratulations!</Text>
                    <Text>You have achieved the 'Cautious Clicker' badge!</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Achievements')}
                    >
                        <Text style={styles.buttonText}>View Achievements</Text>
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
            ) : !quizCompleted ? (
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
            ) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#F9F9F9' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    points: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
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
    wrongOption: { backgroundColor: 'red' }
})

export default QuizScreen
