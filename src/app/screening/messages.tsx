import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NativeModules } from 'react-native'
import commonStyles from '../../styles/commonStyles'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { Divider } from '@/components/ui/divider'
import { Icon, InfoIcon, SlashIcon } from '@/components/ui/icon'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Card } from '@/components/ui/card'
import { timeAgo } from '@/src/shared'

const { CustomModule } = NativeModules

type Message = {
    sender: string
    description: string
    timestamp: string
}

const Messages = (): React.JSX.Element => {
    const [messages, setMessages] = useState<Message[]>()

    const getMessages = (): void => {
        CustomModule.getMessages((data: string) => {
            setMessages(JSON.parse(data))
        })
    }

    useEffect(() => {
        getMessages()
    }, [])

    return (
        <Box className="bg-white flex-1">
            <Box className="m-5">
                <Heading className="pb-2 text-2xl">All Scam Calls</Heading>
                <Divider />
            </Box>
            {messages && messages.length > 0 ? (
                <FlatList
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card
                            size="md"
                            className="m-5 bg-[#F9F4F4] rounded-lg outline-2"
                        >
                            <VStack space="md" reversed={false}>
                                <Box>
                                    <HStack
                                        space="2xl"
                                        className="justify-between"
                                    >
                                        <Box className="flex flex-row gap-1">
                                            <Icon as={SlashIcon} />
                                            <Text>{item.sender}</Text>
                                        </Box>

                                        <Text>{timeAgo(item.timestamp)}</Text>
                                    </HStack>
                                </Box>
                                <Box>
                                    <Text>{item.description}</Text>
                                </Box>
                            </VStack>
                        </Card>
                    )}
                />
            ) : (
                <Text>No Messages yet.</Text>
            )}
        </Box>
    )
}

export default Messages
