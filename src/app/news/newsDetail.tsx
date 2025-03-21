import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Share,
    Alert,
    ScrollView
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import commonStyles from '../../styles/commonStyles'

const NewsDetail = (): React.JSX.Element => {
    const { title, content, scamTypeTag, createdAt } = useLocalSearchParams()

    const handleShare = async (): Promise<void> => {
        try {
            const message = `${title}\n#${scamTypeTag}\n\n${content}\n\nStay safe from scams!\nby SafeMilo🦊`
            const result = await Share.share({
                message
            })

            if (result.action === Share.sharedAction) {
                Alert.alert('Shared', 'Scam news content shared successfully!')
            }
        } catch (error) {
            console.error('Error sharing:', error)
            Alert.alert('Error', 'Failed to share content.')
        }
    }

    return (
        <View style={commonStyles.detailContainer}>
            <Text style={commonStyles.title}>{title}</Text>
            <Text style={commonStyles.detailDate}>
                Posted on {new Date(createdAt as string).toDateString()}
            </Text>
            <Text style={commonStyles.detailTag}>#{scamTypeTag}</Text>

            {/* Share Button */}
            <TouchableOpacity onPress={handleShare}>
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../assets/images/share-icon.png')}
                    style={commonStyles.backIcon}
                />
            </TouchableOpacity>
            <ScrollView style={commonStyles.container}>
                <Text style={commonStyles.detailContent}>{content}</Text>
            </ScrollView>
        </View>
    )
}

export default NewsDetail
