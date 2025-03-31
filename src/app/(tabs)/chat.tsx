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
import { Text } from '@/components/ui/text'
import React, {
    ReactNode,
    useState,
    useEffect,
    useLayoutEffect,
    useRef
} from 'react'
import {
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    Image
} from 'react-native'
import Markdown from 'react-native-markdown-display'
import * as Speech from 'expo-speech'
import { ButtonWidget } from '@/src/widget'
import { white } from 'tailwindcss/colors'

const API_ENDPOINT = 'chatbot'

const tips = [
    '**Never share** One Time Password or codes with anyone, not even your bank!',
    'Be cautious of emails asking for personal information, phishing scams are common.',
    'If a deal sounds too good to be true, it probably is a scam!',
    'Avoid clicking on unknown links in messages or emails.'
]

export default function Chat(): ReactNode {
    const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(
        null
    )
    const [randomTip, setRandomTip] = useState<string>('')
    const navigation = useNavigation()
    const { user } = useAuth()
    const scrollViewRef = useRef<ScrollView>(null)

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
                backgroundColor: '#0A2941'
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
                    <Text
                        className="font-bold text-[#F9F4F4]"
                        style={{ fontFamily: 'Montserrat-Bold', fontSize: 18 }}
                    >
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

    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true })
    }, [messages])

    const handleListen = (textToRead: string, messageId: string): void => {
        setSpeakingMessageId(messageId)
        Speech.speak(textToRead, {
            language: 'en-US',
            onDone: () => setSpeakingMessageId(null),
            onStopped: () => setSpeakingMessageId(null)
        })
    }

    const handleStop = (): void => {
        Speech.stop()
        setSpeakingMessageId(null)
    }

    return (
        <Box className="bg-[#83D1FF] flex-1">
            <StatusBar style="light" />

            <ScrollView ref={scrollViewRef} style={{padding:10}}>
                <VStack space="md" reversed={false}>
                    {messages.map(msg => (
                        <HStack
                            space="sm"
                            reversed={false}
                            className="justify-items-center items-center"
                            key={msg.id}
                        >
                            {msg.sender !== 'user' && (
                                <Avatar size="md" className="">
                                    <AvatarImage
                                        source={require('../../../assets/images/ChatIcon.png')}
                                    />
                                </Avatar>
                            )}
                            <Box
                                className={`p-2 rounded-3xl grow shrink ${msg.sender !== 'user' ? 'bg-white' : 'bg-[#0A2941]'}`}
                            >
                                {msg.sender !== 'user' && (
                                    <Box className="">
                                        {speakingMessageId !== msg.id ? (
                                            <ButtonWidget
                                                text="Listen"
                                                // eslint-disable-next-line @typescript-eslint/no-require-imports
                                                imageIcon={require('../../../assets/images/listen-icon.png')}
                                                onPress={() =>
                                                    handleListen(
                                                        msg.text,
                                                        msg.id
                                                    )
                                                }
                                            />
                                        ) : (
                                            <ButtonWidget
                                                text="Stop"
                                                // eslint-disable-next-line @typescript-eslint/no-require-imports
                                                imageIcon={require('../../../assets/images/stop-icon.png')}
                                                onPress={handleStop}
                                            />
                                        )}
                                    </Box>
                                )}
                                <Markdown
                                    style={
                                        msg.sender !== 'user'
                                            ? markdownStyles
                                            : markdownUserStyles
                                    }
                                >
                                    {msg.text}
                                </Markdown>
                            </Box>
                            {msg.sender === 'user' && (
                                <Avatar size="md">
                                    <AvatarFallbackText>
                                        {getAuth().currentUser?.displayName}
                                    </AvatarFallbackText>
                                    <AvatarImage
                                        source={{
                                            uri:
                                                getAuth().currentUser
                                                    ?.photoURL ?? ''
                                        }}
                                    />
                                </Avatar>
                            )}
                        </HStack>
                    ))}
                    {loading && (
                        <ActivityIndicator size="small" color="#007AFF" />
                    )}
                    {error && <Text style={styles.errorText}>{error}</Text>}
                </VStack>
            </ScrollView>

            <Box className='bg-[#0A2941] mt-3 p-4'>
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
        </Box>
    )
}

const styles = StyleSheet.create({
    errorText: { color: 'red', textAlign: 'center', marginTop: 10 },
    inputContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 30,
        alignItems:'center'
    },
    input: { flex: 1, fontSize: 18, padding: 10,fontFamily: 'Montserrat-Regular' },

})

const markdownStyles = StyleSheet.create({
    // Apply fontFamily to TextStyle

    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18
    }
})

const markdownUserStyles = StyleSheet.create({
    // Apply fontFamily to TextStyle

    text: {
        fontFamily: 'Montserrat-Regular',
        fontSize: 18,
        color: white
    }
})
