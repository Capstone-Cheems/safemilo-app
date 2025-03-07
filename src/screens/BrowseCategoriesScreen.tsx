import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../types/types'

type BrowseCategoriesScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'BrowseCategories'
>

const categories = [
    { id: '1', title: 'Text Message Scams' },
    { id: '2', title: 'Phishing Scams' },
    { id: '3', title: 'Grandparent Scams' },
    { id: '4', title: 'Phone Call Scams' },
    { id: '5', title: 'Romance Scams' },
    { id: '6', title: 'Tech Support Scams' }
]

const BrowseCategoriesScreen = (): JSX.Element => {
    const navigation = useNavigation<BrowseCategoriesScreenNavigationProp>()

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Scam Categories</Text>
            <Text style={styles.subHeader}>
                Search or tap on a scam category to uncover red flags and
                protection tips.
            </Text>

            <FlatList
                data={categories}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.categoryCard}
                        onPress={() =>
                            navigation.navigate('SpecificCategory', {
                                categoryName: item.title
                            })
                        }
                    >
                        <Text style={styles.categoryText}>{item.title}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9F9F9'
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20
    },
    categoryCard: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 10,
        margin: 8,
        flex: 1,
        alignItems: 'center'
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default BrowseCategoriesScreen
