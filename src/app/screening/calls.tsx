import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NativeModules } from 'react-native'
import commonStyles from '../../styles/commonStyles'

const { CustomModule } = NativeModules

type SpamNumber = {
    number: string
    description: string
    timestamp: string
}

const Calls = (): React.JSX.Element => {
    const [spamNumbers, setSpanNumbers] = useState<SpamNumber[]>()

    const getSpamNUmbers = (): void => {
        CustomModule.getSpamNumbers((data: SpamNumber[]) => {
            setSpanNumbers(data)
        })
    }

    useEffect(() => {
        getSpamNUmbers()
    }, [])

    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Notifications</Text>
            {spamNumbers && spamNumbers.length > 0 ? (
                <FlatList
                    data={spamNumbers}
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
                                {item.number}
                            </Text>
                            <Text>{item.description}</Text>
                            <Text style={{ fontSize: 12, color: 'gray' }}>
                                {new Date(item.timestamp).toLocaleString()}
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <Text>No Calls yet.</Text>
            )}
        </View>
    )
}

export default Calls
