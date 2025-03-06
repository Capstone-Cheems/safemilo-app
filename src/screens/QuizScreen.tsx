// // // import React from 'react'
// // // import { View, Text, StyleSheet } from 'react-native'
// // // import QuizQuestion from '../Components/QuizQuestion'

// // // const QuizScreen = (): JSX.Element => {
// // //     return (
// // //         <View style={styles.container}>
// // //             <Text style={styles.header}>Quick Quiz</Text>
// // //             <QuizQuestion
// // //                 question="You receive a call claiming to be from the government, demanding urgent payment. What should you do?"
// // //                 options={[
// // //                     'Pay immediately',
// // //                     'Hang up and verify',
// // //                     'Give personal details'
// // //                 ]}
// // //                 correctAnswer="Hang up and verify"
// // //                 onAnswer={isCorrect =>
// // //                     console.log(isCorrect ? 'Correct!' : 'Try again!')
// // //                 }
// // //             />
// // //         </View>
// // //     )
// // // }

// // // const styles = StyleSheet.create({
// // //     container: {
// // //         flex: 1,
// // //         padding: 16,
// // //         backgroundColor: '#F9F9F9'
// // //     },
// // //     header: {
// // //         fontSize: 22,
// // //         fontWeight: 'bold',
// // //         marginBottom: 10
// // //     }
// // // })

// // // export default QuizScreen

// // import React, { useState } from 'react'
// // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// // import { useNavigation } from '@react-navigation/native'

// // const quizQuestions = [
// //     {
// //         question: 'What is a common sign of a phishing email?',
// //         options: [
// //             'Spelling mistakes',
// //             'From a known company',
// //             'Contains no links'
// //         ],
// //         correctAnswer: 'Spelling mistakes'
// //     },
// //     {
// //         question: 'What should you do if someone asks for your password?',
// //         options: ["Give it if it's urgent", 'Never share it', 'Write it down'],
// //         correctAnswer: 'Never share it'
// //     },
// //     {
// //         question: 'Which is a sign of a scam website?',
// //         options: ['No HTTPS', 'Uses official branding', 'Has contact info'],
// //         correctAnswer: 'No HTTPS'
// //     },
// //     {
// //         question: 'How should you verify a suspicious message?',
// //         options: [
// //             'Call the sender directly',
// //             'Reply to the message',
// //             'Ignore it'
// //         ],
// //         correctAnswer: 'Call the sender directly'
// //     },
// //     {
// //         question: 'What should you do if you suspect fraud?',
// //         options: ['Report it', 'Ignore it', 'Click the links to check'],
// //         correctAnswer: 'Report it'
// //     }
// // ]

// // const QuizScreen = (): JSX.Element => {
// //     const navigation = useNavigation()
// //     const [currentQuestion, setCurrentQuestion] = useState(0)
// //     const [score, setScore] = useState(0)
// //     const [quizCompleted, setQuizCompleted] = useState(false)

// //     const handleAnswer = (answer: string) => {
// //         if (answer === quizQuestions[currentQuestion].correctAnswer) {
// //             setScore(score + 10)
// //         }

// //         if (currentQuestion + 1 < quizQuestions.length) {
// //             setCurrentQuestion(currentQuestion + 1)
// //         } else {
// //             setQuizCompleted(true)
// //         }
// //     }

// //     return (
// //         <View style={styles.container}>
// //             {!quizCompleted ? (
// //                 <>
// //                     <Text style={styles.header}>
// //                         {quizQuestions[currentQuestion].question}
// //                     </Text>
// //                     {quizQuestions[currentQuestion].options.map(
// //                         (option, index) => (
// //                             <TouchableOpacity
// //                                 key={index}
// //                                 style={styles.option}
// //                                 onPress={() => handleAnswer(option)}
// //                             >
// //                                 <Text style={styles.optionText}>{option}</Text>
// //                             </TouchableOpacity>
// //                         )
// //                     )}
// //                 </>
// //             ) : (
// //                 <>
// //                     <Text style={styles.header}>Quiz Completed!</Text>
// //                     <Text style={styles.score}>Your Score: {score} points</Text>
// //                     <Text style={styles.achievement}>
// //                         🏆 You earned the "Scam Spotter" badge!
// //                     </Text>

// //                     <TouchableOpacity
// //                         style={styles.button}
// //                         onPress={() => navigation.navigate('Achievements')}
// //                     >
// //                         <Text style={styles.buttonText}>View Achievements</Text>
// //                     </TouchableOpacity>
// //                 </>
// //             )}
// //         </View>
// //     )
// // }

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 16,
// //         backgroundColor: '#F9F9F9',
// //         justifyContent: 'center'
// //     },
// //     header: {
// //         fontSize: 22,
// //         fontWeight: 'bold',
// //         marginBottom: 10
// //     },
// //     option: {
// //         backgroundColor: '#DDD',
// //         padding: 12,
// //         borderRadius: 5,
// //         marginVertical: 6
// //     },
// //     optionText: {
// //         fontSize: 16
// //     },
// //     score: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //         marginVertical: 10
// //     },
// //     achievement: {
// //         fontSize: 16,
// //         fontStyle: 'italic',
// //         color: 'green',
// //         marginVertical: 10
// //     },
// //     button: {
// //         backgroundColor: '#444',
// //         padding: 12,
// //         borderRadius: 5,
// //         marginTop: 20,
// //         alignItems: 'center'
// //     },
// //     buttonText: {
// //         color: '#FFF',
// //         fontSize: 16
// //     }
// // })

// // export default QuizScreen

// import React, { useState } from 'react'
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
// import { useNavigation } from '@react-navigation/native'

// const quizQuestions = [
//     {
//         question: 'What is a common sign of a phishing email?',
//         options: [
//             'Spelling mistakes',
//             'From a known company',
//             'Contains no links'
//         ],
//         correctAnswer: 'Spelling mistakes'
//     },
//     {
//         question: 'What should you do if someone asks for your password?',
//         options: ["Give it if it's urgent", 'Never share it', 'Write it down'],
//         correctAnswer: 'Never share it'
//     },
//     {
//         question: 'Which is a sign of a scam website?',
//         options: ['No HTTPS', 'Uses official branding', 'Has contact info'],
//         correctAnswer: 'No HTTPS'
//     },
//     {
//         question: 'How should you verify a suspicious message?',
//         options: [
//             'Call the sender directly',
//             'Reply to the message',
//             'Ignore it'
//         ],
//         correctAnswer: 'Call the sender directly'
//     },
//     {
//         question: 'What should you do if you suspect fraud?',
//         options: ['Report it', 'Ignore it', 'Click the links to check'],
//         correctAnswer: 'Report it'
//     }
// ]

// const QuizScreen = (): JSX.Element => {
//     const navigation = useNavigation()
//     const [currentQuestion, setCurrentQuestion] = useState(0)
//     const [score, setScore] = useState(0)
//     const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
//     const [quizCompleted, setQuizCompleted] = useState(false)

//     const handleAnswer = (answer: string) => {
//         setSelectedAnswer(answer)

//         if (answer === quizQuestions[currentQuestion].correctAnswer) {
//             setScore(score + 20) // Increase score for each correct answer
//         }

//         setTimeout(() => {
//             if (currentQuestion + 1 < quizQuestions.length) {
//                 setCurrentQuestion(currentQuestion + 1)
//                 setSelectedAnswer(null)
//             } else {
//                 setQuizCompleted(true)
//             }
//         }, 1000) // Delay to show correct/incorrect feedback before moving to next question
//     }

//     return (
//         <View style={styles.container}>
//             {!quizCompleted ? (
//                 <>
//                     <Text style={styles.header}>
//                         {quizQuestions[currentQuestion].question}
//                     </Text>
//                     {quizQuestions[currentQuestion].options.map(
//                         (option, index) => {
//                             const isCorrect =
//                                 option ===
//                                 quizQuestions[currentQuestion].correctAnswer
//                             const isWrong =
//                                 selectedAnswer &&
//                                 option === selectedAnswer &&
//                                 !isCorrect
//                             return (
//                                 <TouchableOpacity
//                                     key={index}
//                                     style={[
//                                         styles.option,
//                                         isCorrect && selectedAnswer
//                                             ? styles.correctOption
//                                             : {},
//                                         isWrong ? styles.incorrectOption : {}
//                                     ]}
//                                     onPress={() => handleAnswer(option)}
//                                     disabled={selectedAnswer !== null} // Prevent multiple selections
//                                 >
//                                     <Text style={styles.optionText}>
//                                         {option}
//                                     </Text>
//                                 </TouchableOpacity>
//                             )
//                         }
//                     )}

//                     {selectedAnswer && (
//                         <Text
//                             style={
//                                 selectedAnswer ===
//                                 quizQuestions[currentQuestion].correctAnswer
//                                     ? styles.correctText
//                                     : styles.incorrectText
//                             }
//                         >
//                             {selectedAnswer ===
//                             quizQuestions[currentQuestion].correctAnswer
//                                 ? '✅ Correct!'
//                                 : '❌ Incorrect!'}
//                         </Text>
//                     )}
//                 </>
//             ) : (
//                 <>
//                     <Text style={styles.header}>Quiz Completed!</Text>
//                     <Text style={styles.score}>Your Score: {score} points</Text>
//                     <Text style={styles.achievement}>
//                         🏆 You earned the "Scam Spotter" badge!
//                     </Text>

//                     <TouchableOpacity
//                         style={styles.button}
//                         onPress={() => navigation.navigate('Achievements')}
//                     >
//                         <Text style={styles.buttonText}>View Achievements</Text>
//                     </TouchableOpacity>
//                 </>
//             )}
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#F9F9F9',
//         justifyContent: 'center'
//     },
//     header: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 10
//     },
//     option: {
//         backgroundColor: '#DDD',
//         padding: 12,
//         borderRadius: 5,
//         marginVertical: 6,
//         alignItems: 'center'
//     },
//     correctOption: {
//         backgroundColor: 'green'
//     },
//     incorrectOption: {
//         backgroundColor: 'red'
//     },
//     optionText: {
//         fontSize: 16,
//         color: '#000'
//     },
//     correctText: {
//         fontSize: 18,
//         color: 'green',
//         fontWeight: 'bold',
//         marginTop: 10
//     },
//     incorrectText: {
//         fontSize: 18,
//         color: 'red',
//         fontWeight: 'bold',
//         marginTop: 10
//     },
//     score: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginVertical: 10
//     },
//     achievement: {
//         fontSize: 16,
//         fontStyle: 'italic',
//         color: 'green',
//         marginVertical: 10
//     },
//     button: {
//         backgroundColor: '#444',
//         padding: 12,
//         borderRadius: 5,
//         marginTop: 20,
//         alignItems: 'center'
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16
//     }
// })

// export default QuizScreen

import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const quizQuestions = [
    {
        question: 'What is a common sign of a phishing email?',
        options: [
            'Spelling mistakes',
            'From a known company',
            'Contains no links'
        ],
        correctAnswer: 'Spelling mistakes'
    },
    {
        question: 'What should you do if someone asks for your password?',
        options: ["Give it if it's urgent", 'Never share it', 'Write it down'],
        correctAnswer: 'Never share it'
    },
    {
        question: 'Which is a sign of a scam website?',
        options: ['No HTTPS', 'Uses official branding', 'Has contact info'],
        correctAnswer: 'No HTTPS'
    },
    {
        question: 'How should you verify a suspicious message?',
        options: [
            'Call the sender directly',
            'Reply to the message',
            'Ignore it'
        ],
        correctAnswer: 'Call the sender directly'
    },
    {
        question: 'What should you do if you suspect fraud?',
        options: ['Report it', 'Ignore it', 'Click the links to check'],
        correctAnswer: 'Report it'
    }
]

const QuizScreen = (): JSX.Element => {
    const navigation = useNavigation()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [score, setScore] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [quizCompleted, setQuizCompleted] = useState(false)

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer)

        if (answer === quizQuestions[currentQuestion].correctAnswer) {
            setScore(score + 20) // Adds 20 points for each correct answer
        }
    }

    const handleNextQuestion = () => {
        if (currentQuestion + 1 < quizQuestions.length) {
            setCurrentQuestion(currentQuestion + 1)
            setSelectedAnswer(null)
        } else {
            setQuizCompleted(true)
        }
    }

    return (
        <View style={styles.container}>
            {!quizCompleted ? (
                <>
                    <Text style={styles.header}>
                        {quizQuestions[currentQuestion].question}
                    </Text>
                    {quizQuestions[currentQuestion].options.map(
                        (option, index) => {
                            const isCorrect =
                                option ===
                                quizQuestions[currentQuestion].correctAnswer
                            const isWrong =
                                selectedAnswer &&
                                option === selectedAnswer &&
                                !isCorrect
                            return (
                                <TouchableOpacity
                                    key={index}
                                    style={[
                                        styles.option,
                                        isCorrect && selectedAnswer
                                            ? styles.correctOption
                                            : {},
                                        isWrong ? styles.incorrectOption : {}
                                    ]}
                                    onPress={() => handleAnswer(option)}
                                    disabled={selectedAnswer !== null} // Prevent multiple selections
                                >
                                    <Text style={styles.optionText}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            )
                        }
                    )}

                    {selectedAnswer && (
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleNextQuestion}
                        >
                            <Text style={styles.buttonText}>
                                {currentQuestion + 1 < quizQuestions.length
                                    ? 'Continue'
                                    : 'Finish Quiz'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </>
            ) : (
                <>
                    <Text style={styles.header}>Quiz Completed!</Text>
                    <Text style={styles.score}>Your Score: {score} points</Text>
                    <Text style={styles.achievement}>
                        🏆 You earned the "Scam Spotter" badge!
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('Achievements')}
                    >
                        <Text style={styles.buttonText}>View Achievements</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9F9F9',
        justifyContent: 'center'
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    option: {
        backgroundColor: '#DDD',
        padding: 12,
        borderRadius: 5,
        marginVertical: 6,
        alignItems: 'center'
    },
    correctOption: {
        backgroundColor: 'green'
    },
    incorrectOption: {
        backgroundColor: 'red'
    },
    optionText: {
        fontSize: 16,
        color: '#000'
    },
    button: {
        backgroundColor: '#444',
        padding: 12,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16
    },
    score: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10
    },
    achievement: {
        fontSize: 16,
        fontStyle: 'italic',
        color: 'green',
        marginVertical: 10
    }
})

export default QuizScreen
