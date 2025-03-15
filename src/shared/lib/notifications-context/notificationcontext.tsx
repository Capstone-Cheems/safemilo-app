import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    ReactNode,
    useCallback
} from 'react'
import * as Notifications from 'expo-notifications'
import { RegisterForPushNotificationsAsync } from '../../utils'
import { useFetchData } from '../use-fetchdata'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface NotificationContextType {
    expoPushToken: string | null
    notification: Notifications.Notification | null
    error: Error | null
}

export type Notification = {
    title: string
    body: string
    timestamp: string
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
)

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error(
            'useNotification must be used within a NotificationProvider'
        )
    }
    return context
}

interface NotificationProviderProps {
    children: ReactNode
}

const API_ENDPOINT = 'notifications'
export const NotificationProvider: React.FC<NotificationProviderProps> = ({
    children
}) => {
    const { fetchData } = useFetchData<
        { status: string },
        { token: string; type: string }
    >(API_ENDPOINT)

    const [expoPushToken, setExpoPushToken] = useState<string | null>(null)
    const [notification, setNotification] =
        useState<Notifications.Notification | null>(null)
    const [error, setError] = useState<Error | null>(null)

    const notificationListener = useRef<Notifications.EventSubscription>()
    const responseListener = useRef<Notifications.EventSubscription>()
    const handleToken = useCallback(
        (token: string | undefined): void => {
            if (token) {
                setExpoPushToken(token)
                fetchData('POST', { token: token, type: 'ALL' })
            }
        },
        [setExpoPushToken, fetchData]
    )
    useEffect(() => {
        RegisterForPushNotificationsAsync().then(
            token => handleToken(token),
            error => setError(error)
        )

        notificationListener.current =
            Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification)
                const { title, body } = notification.request.content
                saveNotification({
                    title: title ?? '',
                    body: body ?? '',
                    timestamp: new Date().toISOString()
                })
            })

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(response => {
                const { title, body } = response.notification.request.content
                saveNotification({
                    title: title ?? '',
                    body: body ?? '',
                    timestamp: new Date().toISOString()
                })
            })

        return (): void => {
            if (notificationListener.current) {
                Notifications.removeNotificationSubscription(
                    notificationListener.current
                )
            }
            if (responseListener.current) {
                Notifications.removeNotificationSubscription(
                    responseListener.current
                )
            }
        }
    }, [handleToken])

    const saveNotification = async (
        notification: Notification
    ): Promise<void> => {
        try {
            const existing = await AsyncStorage.getItem('notifications')
            const notifications = existing ? JSON.parse(existing) : []
            notifications.push(notification)
            await AsyncStorage.setItem(
                'notifications',
                JSON.stringify(notifications)
            )
        } catch (error) {
            console.error('Error saving notification:', error)
        }
    }

    return (
        <NotificationContext.Provider
            value={{ expoPushToken, notification, error }}
        >
            {children}
        </NotificationContext.Provider>
    )
}
