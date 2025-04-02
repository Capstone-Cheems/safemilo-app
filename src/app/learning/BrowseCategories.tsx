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
    TextInput,
    Dimensions
} from 'react-native'

const cardWidth = (Dimensions.get('window').width - 48) / 2

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
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ gap: 16 }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.categoryCard,
                            {
                                width: (Dimensions.get('window').width - 48) / 2 // aligns with 16 padding on sides + 16 gap
                            }
                        ]}
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
        paddingHorizontal: 16,
        backgroundColor: '#DADADA'
    },
    header: {
        fontSize: 32,
        fontFamily: 'Montserrat-Bold',
        gap: 20,
        marginTop: 20
    },
    subHeader: {
        fontSize: 20,
        color: '#1C1C1C',
        marginBottom: 20,
        fontFamily: 'Montserrat-Regular',
        lineHeight: 32
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        borderWidth: 1,
        borderColor: '#1C1C1C'
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#1C1C1C',
        fontFamily: 'Montserrat-Medium'
    },
    searchIcon: {
        width: 20,
        height: 20,
        tintColor: '#1C1C1C'
    },
    categoryCard: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        flex: 1,
        maxWidth: cardWidth,
        marginVertical: 8,
        marginHorizontal: 0,
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
        fontFamily: 'Montserrat-Bold',
        textAlign: 'center'
    }
})

export default BrowseCategoriesScreen
