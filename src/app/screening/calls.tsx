import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeModules } from 'react-native'
import commonStyles from '../../styles/commonStyles'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { Divider } from '@/components/ui/divider'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Icon, InfoIcon, SlashIcon } from '@/components/ui/icon'
import { Card } from '@/components/ui/card'
import { timeAgo } from '@/src/shared'

const { CustomModule } = NativeModules

type SpamNumber = {
    number: string
    description: string
    timestamp: string
}

const Calls = (): React.JSX.Element => {
    const [spamNumbers, setSpanNumbers] = useState<SpamNumber[]>()

    const getSpamNUmbers = (): void => {
        CustomModule.getSpamNumbers((data: string) => {
            setSpanNumbers(JSON.parse(data))
        })
    }

    useEffect(() => {
        getSpamNUmbers()
    }, [])

    return (
        <Box className="bg-white flex-1">
            <Box className="m-5">
                <Heading className="pb-2 text-2xl">All Scam Calls</Heading>
                <Divider />
            </Box>
            {spamNumbers && spamNumbers.length > 0 ? (
                <FlatList
                    data={spamNumbers}
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
                                        <Box className="flex flex-row gap-4">
                                            <Icon as={SlashIcon} />
                                            <Text>{item.number}</Text>
                                        </Box>

                                        <Text>{timeAgo(item.timestamp)}</Text>
                                    </HStack>
                                </Box>
                                <Box>
                                    <HStack
                                        space="2xl"
                                        className="justify-around"
                                    >
                                        <Text>Banking Scam</Text>
                                        <Icon as={InfoIcon} />
                                    </HStack>
                                </Box>
                            </VStack>
                        </Card>
                    )}
                />
            ) : (
                <Box>No Calls yet.</Box>
            )}
        </Box>
    )
}

export default Calls
