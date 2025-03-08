import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'

// Define ScamDetails type with index signature
type ScamCategoryType = {
    id: string
    title: string
    description: string
    image: string
}

const scamDetails: Record<string, ScamCategoryType[]> = {
    'Tech Support Scams': [
        {
            id: '1',
            title: 'Fake Pop-Ups',
            description: 'Warnings that claim your device has a virus.',
            image: 'https://via.placeholder.com/300'
        },
        {
            id: '2',
            title: 'Cold Calls from "Tech Support"',
            description:
                'Scammers pretending to be tech support representatives.',
            image: 'https://via.placeholder.com/300'
        },
        {
            id: '3',
            title: 'Search Engine Scams',
            description: 'Fake tech support websites trick users.',
            image: 'https://via.placeholder.com/300'
        }
    ],
    'Phishing Scams': [
        {
            id: '1',
            title: 'Email Scams',
            description: 'Fake emails pretending to be from trusted companies.',
            image: 'https://via.placeholder.com/300'
        },
        {
            id: '2',
            title: 'SMS Phishing',
            description: 'Scam texts urging urgent action.',
            image: 'https://via.placeholder.com/300'
        },
        {
            id: '3',
            title: 'Social Media Phishing',
            description: 'Fake profiles and links on social platforms.',
            image: 'https://via.placeholder.com/300'
        }
    ]
}

const SpecificCategoryScreen = (): JSX.Element => {
    const router = useRouter()
    const { categoryName } = useLocalSearchParams<{
        categoryName: string
    }>()

    // Ensure scams exist
    const scams = scamDetails?.[categoryName] ?? []

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{categoryName}</Text>
            <Text style={styles.subHeader}>
                Scammers pose as trusted companies, claiming your device has an
                issue. They trick you into paying for fake repairs or installing
                malware.
            </Text>

            <FlatList
                data={scams}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.scamCard}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />
                        <Text style={styles.scamTitle}>{item.title}</Text>
                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                router.push({
                                    pathname: '/learning/Quiz',
                                    params: { lessonId: item.id }
                                })
                            }
                        >
                            <Text style={styles.buttonText}>
                                Start Learning
                            </Text>
                        </TouchableOpacity>
                    </View>
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
    scamCard: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10
    },
    scamTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 14,
        color: '#333',
        marginBottom: 10
    },
    button: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16
    }
})

export default SpecificCategoryScreen
