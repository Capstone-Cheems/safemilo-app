/* eslint-disable @typescript-eslint/no-require-imports */
import { useRouter } from 'expo-router'
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native'

const categories = [
    {
        id: '1',
        title: 'Text Message Scams',
        icon: require('../../../assets/images/text-message-scams.png')
    },
    {
        id: '2',
        title: 'Romance Scams',
        icon: require('../../../assets/images/romance-scams.png')
    },
    {
        id: '3',
        title: 'Phone Call Scams',
        icon: require('../../../assets/images/phone-call-scams.png')
    },
    {
        id: '4',
        title: 'Tech Support Scams',
        icon: require('../../../assets/images/tech-support-scams.png')
    }
]

const BrowseCategoriesScreen = (): JSX.Element => {
    const router = useRouter()
    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>Scam Categories</Text>
            <Text style={styles.subHeader}>
                Search or tap on a scam category to uncover red flags and
                protection tips.
            </Text>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    placeholderTextColor="#999"
                />
                <Image
                    source={require('../../../assets/images/search-icon.png')}
                    style={styles.searchIcon}
                />
            </View>

            {/* Categories */}
            <FlatList
                data={categories}
                keyExtractor={item => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.categoryCard}
                        onPress={() =>
                            router.push({
                                pathname: '/learning/SpecificCategory',
                                params: { categoryName: item.title }
                            })
                        }
                    >
                        <Image source={item.icon} style={styles.categoryIcon} />
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333'
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#666'
    },
    categoryCard: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        margin: 8,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3
    },
    categoryIcon: {
        width: 60,
        height: 60,
        marginBottom: 8
    },
    categoryText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default BrowseCategoriesScreen
