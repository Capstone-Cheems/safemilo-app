import React, { useState } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

interface QuizQuestionProps {
    question: string
    options: string[]
    correctAnswer: string
    onAnswer: (isCorrect: boolean) => void
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
    question,
    options,
    correctAnswer,
    onAnswer
}) => {
    const [selected, setSelected] = useState<string | null>(null)

    const handleAnswer = (option: string): void => {
        setSelected(option)
        onAnswer(option === correctAnswer)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            {options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[
                        styles.option,
                        selected === option
                            ? {
                                  backgroundColor:
                                      option === correctAnswer ? 'green' : 'red'
                              }
                            : {}
                    ]}
                    onPress={() => handleAnswer(option)}
                >
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16
    },
    question: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12
    },
    option: {
        backgroundColor: '#DDD',
        padding: 12,
        borderRadius: 5,
        marginVertical: 6
    },
    optionText: {
        fontSize: 16
    }
})

export default QuizQuestion
