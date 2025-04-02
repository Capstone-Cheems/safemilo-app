import React from 'react'
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import commonStyles from '../../../styles/commonStyles'
import ActionSheet from 'react-native-action-sheet'

const PostDetail = (): React.JSX.Element => {
    const { newsID, title, content, scamTypeTag, createdAt } =
        useLocalSearchParams()
    const router = useRouter()

    const handleBack = (): void => {
        router.replace('/(organization)/createdPost')
    }

    const handleOpenMenu = (): void => {
        ActionSheet.showActionSheetWithOptions(
            {
                options: ['Cancel', 'Edit'],
                cancelButtonIndex: 0
            },
            buttonIndex => {
                if (buttonIndex === 1) {
                    handleEdit()
                }
            }
        )
    }

    const handleEdit = (): void => {
        router.push({
            pathname: '/news/editPost',
            params: {
                newsID,
                title,
                content,
                scamTypeTag
            }
        })
    }

    return (
        <View style={commonStyles.detailContainer}>
            <TouchableOpacity
                style={commonStyles.backButton}
                onPress={handleBack}
            >
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../../assets/images/dark-back-button.png')}
                    style={commonStyles.backIcon}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={commonStyles.backIcon}
                onPress={handleOpenMenu}
            >
                <Image
                    // eslint-disable-next-line @typescript-eslint/no-require-imports
                    source={require('../../../../assets/images/more-icon.png')}
                    style={commonStyles.backIcon}
                />
            </TouchableOpacity>

            <Text style={commonStyles.title}>{title}</Text>
            <Text style={commonStyles.detailDate}>
                Posted on {new Date(createdAt as string).toDateString()}
            </Text>
            <Text style={commonStyles.detailTag}>#{scamTypeTag}</Text>
            <ScrollView style={commonStyles.container}>
                <Text style={commonStyles.detailContent}>{content}</Text>
            </ScrollView>
        </View>
    )
}

export default PostDetail
