import { VStack } from '@/components/ui/vstack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import NotificationCard from './notification-card'

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
                <Text>No notifications yet.</Text>
            )}
        </>
    )
}

export default NotificationSearch
