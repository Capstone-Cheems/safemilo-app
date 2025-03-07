import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const NewsDetail = (): React.JSX.Element => {
    const { title, content, scamTypeTag, createdAt } = useLocalSearchParams()

    return (
        <View style={commonStyles.detailContainer}>
            <Text style={commonStyles.title}>{title}</Text>
            <Text style={commonStyles.detailDate}>
                Posted on {new Date(createdAt as string).toDateString()}
            </Text>
            <Text style={commonStyles.detailTag}>#{scamTypeTag}</Text>
            <Text style={commonStyles.detailContent}>{content}</Text>
        </View>
    )
}

export default NewsDetail
