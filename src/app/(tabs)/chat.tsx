import { useFetchData } from '@/src/shared'
import { Message } from '@/src/widget/chat/types'
import React, { ReactNode, useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import Markdown from 'react-native-markdown-display'
const API_ENDPOINT = 'chatbot'

export default function Chat(): ReactNode {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: Date.now().toString(),
            text: 'Hello! How can I assist you?',
            sender: 'bot'
        }
    ])
    const [inputText, setInputText] = useState<string>('')

    const { data, loading, error, fetchData } = useFetchData<
        { reply: string },
        { prompt: string; userId: string }
    >(API_ENDPOINT)

    const sendMessage = async (): Promise<void> => {
        if (!inputText.trim()) return

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user'
        }
        setMessages(prev => [...prev, userMessage])

        setInputText('')
        await fetchData('POST', { prompt: inputText, userId: 'user123' })
    }

    useEffect(() => {
        if (data?.reply) {
            const botMessage: Message = {
                id: Date.now().toString(),
                text: data.reply,
                sender: 'bot'
            }
            setMessages(prev => [...prev, botMessage])
        }
    }, [data])

    return (
        <View style={styles.container}>
            <ScrollView style={styles.chatContainer}>
                {messages.map(msg => (
                    <View
                        key={msg.id}
                        style={[
                            styles.message,
                            msg.sender === 'user'
                                ? styles.userMessage
                                : styles.botMessage
                        ]}
                    >
                        <Markdown>{msg.text}</Markdown>
                    </View>
                ))}
                {loading && <ActivityIndicator size="small" color="#007AFF" />}
                {error && <Text style={styles.errorText}>{error}</Text>}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Type a message..."
                    editable={!loading}
                />
                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={sendMessage}
                    disabled={loading}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
    chatContainer: { flex: 1, marginBottom: 60 },
    message: {
        maxWidth: '80%',
        padding: 10,
        marginVertical: 5,
        borderRadius: 10
    },
    userMessage: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
    botMessage: { alignSelf: 'flex-start', backgroundColor: '#ddd' },
    messageText: { fontSize: 16, color: '#fff' },
    errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
    inputContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 30,
        elevation: 5
    },
    input: { flex: 1, fontSize: 16, padding: 10 },
    sendButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20
    },
    sendButtonText: { color: '#fff', fontSize: 16 }
})
