import React from 'react'
import { Box } from '@/components/ui/box'
import { Card } from '@/components/ui/card'
import { CloseIcon, Icon } from '@/components/ui/icon'
import { Text } from 'react-native'

const NotificationCard: React.FC<{
    notification: Notification
}> = ({ notification }) => {
    return (
        <>
            <Box>
                <Card
                    size="sm"
                    className="gap-1 p-0 overflow-hidden rounded-2xl"
                >
                    <Box
                        className={`top-0 left-0 right-0 h-10 ${
                            notification.title === 'Caution'
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                        }`}
                    />

                    <Box className="p-3 gap-2">
                        <Box className="flex flex-row justify-between items-start">
                            <Text className="font-bold">
                                {notification.title}
                            </Text>
                            <Box className="border border-solid border-black rounded-full p-2">
                                <Icon as={CloseIcon} size="sm" />
                            </Box>
                        </Box>
                        <Text>{notification.body} </Text>
                        {/* <Box className="flex flex-row justify-normal items-center gap-1 mt-5">
                            <Link href="#" className=" text-blue-500 font-bold">
                                Read More
                            </Link>
                            <Box className="border border-solid border-black rounded-full p-1">
                                <Icon as={ArrowRightIcon} size="lg" />
                            </Box>
                        </Box>*/}
                    </Box>
                </Card>
            </Box>
        </>
    )
}

export default NotificationCard
