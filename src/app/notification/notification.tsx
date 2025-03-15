import { View, Text, FlatList } from 'react-native'

import commonStyles from '../../styles/commonStyles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Notification } from '@/src/shared'
import { useEffect, useState } from 'react'

const Notifications = (): React.JSX.Element => {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const getNotifications = async (): Promise<void> => {
        try {
            const data = await AsyncStorage.getItem('notifications')
            setNotifications(data ? JSON.parse(data) : [])
        } catch (error) {
            console.error('Error retrieving notifications:', error)
        }
    }

    // Fetch notifications on mount
    useEffect(() => {
        getNotifications()
    }, [])
    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Notifications</Text>
            {notifications.length > 0 ? (
                <FlatList
                    data={notifications}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                padding: 10,
                                borderBottomWidth: 1,
                                borderColor: '#ccc'
                            }}
                        >
                            <Text style={{ fontWeight: 'bold' }}>
                                {item.title}
                            </Text>
                            <Text>{item.body}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>
                                {new Date(item.timestamp).toLocaleString()}
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <Text>No notifications yet.</Text>
            )}
        </View>
    )
}

export default Notifications
