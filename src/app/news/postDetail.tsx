import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const PostDetail = (): React.JSX.Element => {
    const { title, content, scamTypeTag, createdAt } = useLocalSearchParams()
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/(organization)/createdPost')
    }

    return (
        <View style={commonStyles.detailContainer}>
            <Text style={commonStyles.title}>{title}</Text>
            <Text style={commonStyles.detailDate}>
                Posted on {new Date(createdAt as string).toDateString()}
            </Text>
            <Text style={commonStyles.detailTag}>#{scamTypeTag}</Text>
            <Text style={commonStyles.detailContent}>{content}</Text>

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

export default PostDetail
