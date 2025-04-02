import { Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeModules } from 'react-native'
import { Box } from '@/components/ui/box'
import { Heading } from '@/components/ui/heading'
import { Divider } from '@/components/ui/divider'
import { VStack } from '@/components/ui/vstack'
import { HStack } from '@/components/ui/hstack'
import { Icon, InfoIcon, SlashIcon, createIcon } from '@/components/ui/icon'
import { Card } from '@/components/ui/card'
import { getDayFromDate, getTimeFromDate } from '@/src/shared'
import { Path } from 'react-native-svg'

const { CustomModule } = NativeModules

type SpamNumber = {
    number: string
    description: string
    timestamp: string
}

const Calls = (): React.JSX.Element => {
    const CallIcon = createIcon({
        viewBox: '0 0 32 32',
        path: (
            <>
                <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.6515 7.00003C15.6515 3.49257 18.4925 0.65155 22 0.65155C25.5075 0.65155 28.3485 3.49257 28.3485 7.00003C28.3485 10.5075 25.5075 13.3485 22 13.3485C18.4925 13.3485 15.6515 10.5075 15.6515 7.00003ZM22 2.5485C19.5405 2.5485 17.5485 4.54048 17.5485 7.00003C17.5485 7.88585 17.8101 8.70801 18.2566 9.40163L24.4016 3.25661C23.708 2.8101 22.8858 2.5485 22 2.5485ZM19.5984 10.7434C20.292 11.1899 21.1142 11.4516 22 11.4516C24.4595 11.4516 26.4515 9.45957 26.4515 7.00003C26.4515 6.1142 26.1899 5.29204 25.7434 4.59842L19.5984 10.7434ZM23.6395 16.3335C23.8878 16.3941 24.1412 16.4561 24.3858 16.4561C25.3355 16.6438 26.1915 17.1545 26.8092 17.9021C27.4268 18.6496 27.7683 19.5881 27.7759 20.559V24.7743C27.7766 25.3683 27.6522 25.9558 27.4108 26.4982C27.1694 27.0406 26.8164 27.5257 26.375 27.9217C25.6037 28.6109 24.6063 28.9911 23.5733 28.9896C23.3914 29.0035 23.2088 29.0035 23.027 28.9896C17.1964 28.2258 11.7799 25.5538 7.6175 21.388C3.46424 17.213 0.800336 11.7801 0.0388466 5.93192C-0.043441 5.3291 0.00535392 4.71555 0.181879 4.13344C0.358404 3.55133 0.658475 3.01445 1.06147 2.55968C1.45629 2.11693 1.93993 1.76288 2.48071 1.52073C3.02149 1.27858 3.60718 1.15381 4.1994 1.15459H8.41599C9.41718 1.13998 10.3907 1.48441 11.1611 2.12584C11.9316 2.76727 12.4485 3.66356 12.6186 4.65328C12.6606 4.9624 12.7166 5.28557 12.7867 5.59469C12.928 6.22429 13.1105 6.84387 13.333 7.44942C13.5694 8.10127 13.5571 8.81778 13.2985 9.46109C13.0399 10.1044 12.5532 10.629 11.9321 10.9341L11.2877 11.2291C12.0593 12.5937 13.0008 13.8544 14.0895 14.9807C15.2124 16.0727 16.4693 17.017 17.8298 17.7909L18.1379 17.1446C18.4421 16.5216 18.9651 16.0335 19.6065 15.7741C20.2479 15.5147 20.9622 15.5024 21.6121 15.7395C22.2104 15.9645 22.8236 16.1476 23.4472 16.2875C23.5108 16.302 23.575 16.3177 23.6395 16.3335Z"
                    fill="#0A2941"
                />
            </>
        )
    })

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
                    All Scam Calls
                </Heading>
            </Box>
            {spamNumbers && spamNumbers.length > 0 ? (
                <FlatList
                    style={{ padding: 16 }}
                    data={spamNumbers}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <Card
                            size="md"
                            className="mb-4 rounded-2xl border border-[#0A2941] color-[#FEFEFE]"
                        >
                            <VStack space="sm" reversed={false} className="p-2">
                                <Box className="flex flex-row gap-4 items-center">
                                    <Icon
                                        as={CallIcon}
                                        style={{ width: 36, height: 36 }}
                                    />
                                    <Text
                                        style={{
                                            fontFamily: 'Montserrat-Regular',
                                            fontSize: 24,
                                            color: '#0A2941'
                                        }}
                                    >
                                        {item.number}
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
                                                color: '#191919'
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
                                                    color: '#191919'
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
                    <Text className="font-bold">No Calls yet.</Text>
                </Box>
            )}
        </Box>
    )
}

export default Calls
