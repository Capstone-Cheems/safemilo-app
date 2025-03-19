import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'

import { NativeModules } from 'react-native'
import commonStyles from '../../styles/commonStyles'

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
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Notifications</Text>
            {messages && messages.length > 0 ? (
                <FlatList
                    data={messages}
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
                                {item.sender}
                            </Text>
                            <Text>{item.description}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>
                                {new Date(item.timestamp).toLocaleString()}
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <Text>No Messages yet.</Text>
            )}
        </View>
    )
}

export default Messages
