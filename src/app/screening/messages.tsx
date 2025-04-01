import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NativeModules } from 'react-native'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { Divider } from '@/components/ui/divider'
import { Icon, InfoIcon, SlashIcon, createIcon } from '@/components/ui/icon'
import { HStack } from '@/components/ui/hstack'
import { VStack } from '@/components/ui/vstack'
import { Card } from '@/components/ui/card'
import { getDayFromDate, timeAgo } from '@/src/shared'
import { Path } from 'react-native-svg'

const { CustomModule } = NativeModules

type Message = {
    sender: string
    description: string
    timestamp: string
}

const Messages = (): React.JSX.Element => {
    const MessageIcon = createIcon({
        viewBox: '0 0 32 32',
        path: (
            <>
                <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M22 0.5C18.4088 0.5 15.5 3.40882 15.5 7C15.5 10.5912 18.4088 13.5 22 13.5C25.5912 13.5 28.5 10.5912 28.5 7C28.5 3.40882 25.5912 0.5 22 0.5ZM17.3571 7C17.3571 4.43475 19.4348 2.35714 22 2.35714C22.9462 2.35714 23.8227 2.64333 24.5568 3.12955L18.1295 9.55677C17.6433 8.82273 17.3571 7.9462 17.3571 7ZM22 11.6429C21.0538 11.6429 20.1773 11.3567 19.4432 10.8705L25.8705 4.44323C26.3567 5.17727 26.6429 6.0538 26.6429 7C26.6429 9.56524 24.5652 11.6429 22 11.6429ZM14 7C14 8.81562 14.6048 10.49 15.624 11.8326L14 12.8735L0.951758 4.50985C1.72202 3.58806 2.89109 3 4.2 3H15.0703C14.3896 4.17669 14 5.54285 14 7ZM14.821 15.5958L17.7025 13.7489C18.9438 14.541 20.4183 15 22 15C24.3894 15 26.5341 13.9525 28 12.2916V20.875C28 23.1532 26.1196 25 23.8 25H4.2C1.8804 25 0 23.1532 0 20.875V7.14837L13.179 15.5958C13.6729 15.9125 14.3271 15.9125 14.821 15.5958Z"
                    fill="#0A2941"
                />
            </>
        )
    })

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
        <Box className="bg-[#EFEFEF]">
            <Box className="p-4 mt-5">
                <Heading
                    size="2xl"
                    style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: 32,
                        color: '#1C1C1C'
                    }}
                >
                    All Scam Messages
                </Heading>
            </Box>
            {messages && messages.length > 0 ? (
                <FlatList
                    style= {{padding:16}}
                    data={messages}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card
                            size="md"
                            className="mb-4 rounded-2xl border border-[#0A2941] color-[#FEFEFE]"
                        >
                            <VStack space="sm" reversed={false} className='p-2'>
                                <Box className="flex flex-row gap-4 items-center">
                                    <Icon
                                        as={MessageIcon}
                                        style={{ width: 36, height: 36 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Montserrat-Regular',
                                            fontSize: 24,
                                            color: '#0A2941'
                                        }}
                                    >
                                        {item.sender}
                                    </Text>
                                </Box>
                                <Box>
                                    <HStack
                                        space="sm"
                                        className="justify-between items-center"
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    'Montserrat-Regular',
                                                fontSize: 20,
                                                color:'#191919'
                                            }}
                                        >
                                            Banking Scam
                                        </Text>
                                        <Box className="flex-row flex-nowrap gap-2 items-center">
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        'Montserrat-Regular',
                                                    fontSize: 20,
                                                    color:'#191919'
                                                }}
                                            >
                                                {getDayFromDate(item.timestamp)}
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                            </VStack>
                        </Card>
                    )}
                />
            ) : (
                <Box className="items-center">
                    <Text className="font-bold">No Messages yet.</Text>
                </Box>
            )}
        </Box>
    )
}

export default Messages
