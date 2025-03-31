import { Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeModules } from 'react-native'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { Divider } from '@/components/ui/divider'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Icon, InfoIcon, SlashIcon } from '@/components/ui/icon'
import { Card } from '@/components/ui/card'
import { getDayFromDate, getTimeFromDate } from '@/src/shared'

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
                <Heading
                    size="2xl"
                    style={{ fontFamily: 'Montserrat-Bold', fontSize: 32 }}
                >
                    All Scam Calls
                </Heading>
                <Divider />
            </Box>
            {spamNumbers && spamNumbers.length > 0 ? (
                <FlatList
                    data={spamNumbers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card
                            size="md"
                            className="m-5 bg-[#FBEDE5] rounded-lg outline-2"
                        >
                            <VStack space="md" reversed={false}>
                                <Box>
                                    <HStack
                                        space="2xl"
                                        className="justify-around"
                                    >
                                        <Box className="flex flex-row gap-2 items-center">
                                            <Icon as={SlashIcon} />
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        'Montserrat-Regular',
                                                    fontSize: 24
                                                }}
                                            >
                                                {item.number}
                                            </Text>
                                        </Box>

                                        <Text
                                            style={{
                                                fontFamily:
                                                    'Montserrat-Regular',
                                                fontSize: 20
                                            }}
                                        >
                                            {getTimeFromDate(item.timestamp)}
                                        </Text>
                                    </HStack>
                                </Box>
                                <Box>
                                    <HStack
                                        space="sm"
                                        className="justify-around items-center"
                                    >
                                        <Text
                                            style={{
                                                fontFamily:
                                                    'Montserrat-Regular',
                                                fontSize: 20
                                            }}
                                        >
                                            Banking Scam
                                        </Text>
                                        <Box className="flex-row flex-nowrap gap-2 items-center">
                                            <Text
                                                style={{
                                                    fontFamily:
                                                        'Montserrat-Regular',
                                                    fontSize: 20
                                                }}
                                            >
                                                {getDayFromDate(item.timestamp)}
                                            </Text>
                                            <Icon as={InfoIcon} />
                                        </Box>
                                    </HStack>
                                </Box>
                            </VStack>
                        </Card>
                    )}
                />
            ) : (
                <Box className="items-center">
                    <Text className="font-bold">No Calls yet.</Text>
                </Box>
            )}
        </Box>
    )
}

export default Calls
