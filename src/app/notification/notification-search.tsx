import { VStack } from '@/components/ui/vstack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import NotificationCard from './notification-card'
import { Box } from '@/components/ui/box'

const NotificationSearch: React.FC<{ type: string }> = ({ type }) => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    // Fetch notifications on mount
    useEffect(() => {
        const getNotifications = async (): Promise<void> => {
            try {
                const data = await AsyncStorage.getItem('notifications')
                const notificationsArray: Notification[] = data
                    ? JSON.parse(data)
                    : []
                if (type === 'All') {
                    setNotifications(notificationsArray)
                } else if (type === 'News') {
                    setNotifications(
                        notificationsArray.filter(
                            notification => notification.title !== 'Caution'
                        )
                    )
                } else if (type === 'Alerts') {
                    setNotifications(
                        notificationsArray.filter(
                            notification => notification.title === 'Caution'
                        )
                    )
                } else {
                    setNotifications([])
                }
            } catch (error) {
                console.error('Error retrieving notifications:', error)
            }
        }
        getNotifications()
    }, [type])
    return (
        <>
            {notifications.length > 0 ? (
                <VStack space="md" className="m-2">
                    {notifications.map((item, index) => {
                        return (
                            <NotificationCard
                                notification={item}
                                key={index}
                            ></NotificationCard>
                        )
                    })}
                </VStack>
            ) : (
                <Box className="items-center p-5">
                    <Text style={{
                    fontFamily:
                        'Montserrat-Bold',
                    fontSize: 24,
                  
                    textAlign:'center'
                }}>No new notifications at the moment.</Text>
                </Box>
            )}
        </>
    )
}

export default NotificationSearch
