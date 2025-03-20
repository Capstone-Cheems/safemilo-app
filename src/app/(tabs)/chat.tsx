import { Box } from '@/components/ui/box'
import { ArrowUpIcon, Icon } from '@/components/ui/icon'
import { useAuth, useFetchData } from '@/src/shared'
import { Message } from '@/src/widget/chat/types'
import { useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { getAuth } from 'firebase/auth'
import React, { ReactNode, useState, useEffect, useLayoutEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native'
import Markdown from 'react-native-markdown-display'
const API_ENDPOINT = 'chatbot'

const tips = [
    '**Never share** One Time Password or codes with anyone, not even your bank!',
    'Be cautious of emails asking for personal information, phishing scams are common.',
    'If a deal sounds too good to be true, it probably is a scam!',
    'Avoid clicking on unknown links in messages or emails.'
]

export default function Chat(): ReactNode {
    const [randomTip, setRandomTip] = useState<string>('')
    const navigation = useNavigation()
    const { user } = useAuth()
    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * tips.length)
        setRandomTip(tips[randomIndex])
    }, [])
    const [messages, setMessages] = useState<Message[]>([
        {
            id: Date.now().toString(),
            text: `${randomTip} Do you need assistance?`,
            sender: 'bot'
        },
        {
            id: Date.now().toString(),
            text: `${randomTip} Do you need assistance?`,
            sender: 'user'
        }
    ])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#0A2941' // Change to your desired color
            },
            headerTintColor: '#F9F4F4',
            headerTitleAlign: 'left',
            headerTitle: () => (
                <Box className="flex flex-row items-center gap-3">
                    <Image
                        // eslint-disable-next-line @typescript-eslint/no-require-imports
                        source={require('../../../assets/images/ChatIcon.png')}
                        className="max-w-10 max-h-10"
                    />
                    <Text className="font-bold text-[#F9F4F4]">
                        Chat with Milo
                    </Text>
                </Box>
            ),
            headerRight: () => <></>
        })
    }, [navigation])
    const [inputText, setInputText] = useState<string>('')

    const { data, loading, error, fetchData } = useFetchData<
        { reply: string },
        { prompt: string }
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
        await fetchData('POST', { prompt: inputText })
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
        <View className="bg-[#83D1FF] flex flex-1 p-5">
            <StatusBar style="light" />
            <ScrollView>
                {messages.map(msg => (
                    <Box
                        className={`flex flex-row gap-1 items-center ${msg.sender === 'user' ? 'self-start' : 'self-end'} grow`}
                    >
                        {msg.sender !== 'user' && (
                            <Image
                                // eslint-disable-next-line @typescript-eslint/no-require-imports
                                source={require('../../../assets/images/ChatIcon.png')}
                                className="max-w-10 max-h-10"
                            />
                        )}
                        <View
                            key={msg.id}
                            className={`p-5 rounded-3xl  bg-white`}
                        >
                            <Markdown>{msg.text}</Markdown>
                        </View>
                        {msg.sender === 'user' && (
                            <Image
                                source={{
                                    uri:
                                        getAuth().currentUser?.photoURL ||
                                        'path_to_default_image'
                                }}
                            />
                        )}
                    </Box>
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
                    onPress={sendMessage}
                    disabled={loading}
                    className="border rounded-full p-4"
                >
                    <Icon as={ArrowUpIcon} size="xl" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    input: { flex: 1, fontSize: 16, padding: 10 }
})
