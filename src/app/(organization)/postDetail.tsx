import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const PostDetail = (): React.JSX.Element => {
    const { title, content, scamTypeTag, createdAt } = useLocalSearchParams()
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/(organization)/createdPost')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>
                Posted on {new Date(createdAt as string).toDateString()}
            </Text>
            <Text style={styles.tag}>#{scamTypeTag}</Text>
            <Text style={styles.content}>{content}</Text>

            <TouchableOpacity
                style={commonStyles.backButton}
                onPress={handleBack}
            >
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/raw-circle-arrow-left.png')}
                    style={commonStyles.backIcon}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    date: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5
    },
    tag: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 10
    },
    content: {
        fontSize: 16,
        lineHeight: 24
    }
})

export default PostDetail
