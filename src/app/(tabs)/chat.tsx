import { Avatar, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar'
import { Box } from '@/components/ui/box'
import { HStack } from '@/components/ui/hstack'
import { ArrowUpIcon, Icon } from '@/components/ui/icon'
import { VStack } from '@/components/ui/vstack'
import { useAuth, useFetchData } from '@/src/shared'
import { Message } from '@/src/widget/chat/types'
import { getAuth } from '@react-native-firebase/auth'
import { useNavigation } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
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
        <Box className="bg-[#83D1FF] flex-1  p-5">
            <StatusBar style="light" />
            <ScrollView>
                <VStack space="md" reversed={false}>
                {messages.map(msg => (
                    <Box key={msg.id}
                        className={`  ${msg.sender === 'user' ? 'self-start' : 'self-end'}`}
                    >
                        <HStack space="md" reversed={false} className="justify-items-center items-center">
                        {msg.sender !== 'user' && (
                            <Box>
                                <Image
                                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                                    source={require('../../../assets/images/ChatIcon.png')}
                                    className="max-w-10 max-h-10"
                                />
                            </Box>
                        )}
                        <Box
                            
                            className={`p-5 rounded-3xl bg-white max-w-80`}
                        >
                            <Markdown>{msg.text}</Markdown>
                        </Box>
                        {msg.sender === 'user' && (
                            <Box >
                                <Avatar size="md">
                                    <AvatarFallbackText>
                                        {getAuth().currentUser?.displayName}
                                    </AvatarFallbackText>
                                    <AvatarImage
                                        source={{
                                            uri: getAuth().currentUser?.photoURL ?? ''
                                        }}
                                    />
                                </Avatar>
                            </Box>
                        )}
                        </HStack>
                    </Box>
                ))}
                {loading && <ActivityIndicator size="small" color="#007AFF" />}
                {error && <Text style={styles.errorText}>{error}</Text>}
                </VStack>
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
        </Box>
    )
}

const styles = StyleSheet.create({
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
