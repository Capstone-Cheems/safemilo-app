/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useRouter, useLocalSearchParams } from 'expo-router'
import * as Speech from 'expo-speech'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

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
    const router = useRouter()
    const navigation = useNavigation()
    const { courseId } = useLocalSearchParams<{ courseId: string }>()
    const [score, setScore] = useState<number>(0)
    const [currentQuestion, setCurrentQuestion] = useState<number>(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showExplanation, setShowExplanation] = useState<boolean>(false)
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

    const progressPercentage: number =
        ((currentQuestion + 1) / quizQuestions.length) * 100

    useEffect(() => {
        navigation.setOptions({
            headerTitle: '', // remove the default title
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()}>
                    <Image
                        source={require('../../../assets/images/Back-arrow.png')}
                        style={{ width: 28, height: 28, marginLeft: 8 }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            ),
            // <View className="bg-orange-200 px-4 py-1 rounded-full">
            //         <Text className="text-gray-800 font-[<Montserrat-Bold>] text-xl">
            //             {score} points
            //         </Text>
            //     </View>
            headerRight: () => (
                <View
                    style={{
                        backgroundColor: '#FFEACE',
                        paddingVertical: 4,
                        paddingHorizontal: 12,
                        borderRadius: 999,
                        marginRight: 8
                    }}
                >
                    <Text
                        style={{
                            color: '#1F2937',
                            fontSize: 16,
                            fontFamily: 'Montserrat-Bold'
                        }}
                    >
                        {score} points
                    </Text>
                </View>
            )
        })
    }, [navigation, score])

    useEffect((): void => {
        const initializeQuiz = async (): Promise<void> => {
            if (!courseId) return

            const isCompleted = await AsyncStorage.getItem(
                `completedModule_${courseId}`
            )

            if (isCompleted) {
                // User is retaking the quiz, reset progress
                await AsyncStorage.removeItem(`quizScore_${courseId}`)
                await AsyncStorage.removeItem(`quizProgress_${courseId}`)
                await AsyncStorage.removeItem(`completedModule_${courseId}`)
            }

            setScore(0)
        }

        initializeQuiz()
    }, [courseId])

    const handleAnswer = (answer: string): void => {
        setSelectedAnswer(answer)
    }

    const handleSubmit = (): void => {
        if (!selectedAnswer) return
        const correct: boolean =
            selectedAnswer === quizQuestions[currentQuestion].correctAnswer
        setIsCorrect(correct)
        if (correct) setScore(prev => prev + 20)
        setShowExplanation(true)
    }

    const handleNext = async (): Promise<void> => {
        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion(prev => prev + 1)
            setSelectedAnswer(null)
            setShowExplanation(false)
            setIsCorrect(null)
        } else {
            const finalScore: number = score
            try {
                if (courseId) {
                    await AsyncStorage.setItem(
                        `quizProgress_${courseId}`,
                        JSON.stringify(100)
                    )
                    await AsyncStorage.setItem(
                        `quizScore_${courseId}`,
                        JSON.stringify(finalScore)
                    )
                    await AsyncStorage.setItem(
                        `completedModule_${courseId}`,
                        'true'
                    )
                }

                router.push({
                    pathname: '/learning/ReviewScreen',
                    params: {
                        courseId,
                        totalScore: finalScore.toString()
                    }
                })
            } catch (err) {
                console.error('Failed to save quiz result:', err)
            }
        }
    }

    const handleListen = (): void => {
        Speech.speak(quizQuestions[currentQuestion].question)
    }
    return (
        <View className="flex-1 bg-[#F3F3F3] px-4 pt-6">
            {/* Progress Bar */}
            <View className="mt-2">
                <Text className="text-xl font-[<Montserrat-SemiBold>]">
                    Lesson {currentQuestion + 1}/5
                </Text>
                <View className="w-full bg-gray-300 h-4 rounded-full mt-1">
                    <View
                        className="bg-blue-500 h-4 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    />
                </View>
            </View>

            {/* Listen Button */}
            <View className="mt-4">
                <TouchableOpacity
                    className="flex-row items-center border border-gray-500 rounded-full px-4 py-2 w-[105px]"
                    onPress={handleListen}
                >
                    <Image
                        source={require('../../../assets/images/audio-icon.png')}
                        className="w-5 h-5 mr-2"
                    />
                    <Text className="text-xl font-[<Montserrat-SemiBold>] mt-1 ">
                        Listen
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Question & Options OR Explanation */}
            {showExplanation ? (
                <View className="flex-1 justify-between mt-6">
                    <View>
                        {/* Milo Icon */}
                        <View className="items-start mb-4">
                            <View className="bg-blue-500 rounded-full p-2">
                                <Image
                                    source={require('../../../assets/images/milo-icon.png')}
                                    className="w-16 h-16"
                                    resizeMode="contain"
                                />
                            </View>
                        </View>

                        {/* Feedback */}
                        <Text className="text-2xl font-[<Montserrat-Bold>] mb-3 text-gray-900">
                            {isCorrect
                                ? "That's correct, good job!"
                                : 'Oops! That’s not quite right'}
                        </Text>

                        {/* Explanation */}
                        <Text className="text-2xl  text-gray-800 font-[<Montserrat-Bold>] mt-10 leading-relaxed">
                            {quizQuestions[currentQuestion].explanation}
                        </Text>
                    </View>

                    {/* Next Button */}
                    <TouchableOpacity
                        className="bg-[#0A2941] py-4 px-6 rounded-xl items-center mb-10"
                        onPress={handleNext}
                    >
                        <Text className="text-white text-[20px] font-[<Montserrat-Bold>]">
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View className="mt-6 flex-1 justify-between">
                    <View>
                        {/* Question */}
                        <Text className="text-[22px] leading-[35px] font-[<Montserrat-Bold>] mb-4">
                            {quizQuestions[currentQuestion].question}
                        </Text>

                        {/* Options */}
                        {quizQuestions[currentQuestion].options.map(
                            (option, index) => (
                                <TouchableOpacity
                                    key={index}
                                    className={`p-7 mb-3 border rounded-xl ${
                                        selectedAnswer === option
                                            ? option ===
                                              quizQuestions[currentQuestion]
                                                  .correctAnswer
                                                ? 'bg-orange-400'
                                                : 'bg-orange-200'
                                            : 'bg-orange-100'
                                    }`}
                                    onPress={() => handleAnswer(option)}
                                >
                                    <Text className="text-[20px] leading-[32px] font-[<Montserrat-SemiBold>] text-gray-900">
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            )
                        )}
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        className={`mt-4 mb-10 py-4 px-6 rounded-xl w-full items-center ${
                            selectedAnswer ? 'bg-[#0A2941]' : 'bg-gray-400'
                        }`}
                        disabled={!selectedAnswer}
                        onPress={handleSubmit}
                    >
                        <Text className="text-white text-[20px] font-[<Montserrat-Bold>] text-center">
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default QuizScreen
