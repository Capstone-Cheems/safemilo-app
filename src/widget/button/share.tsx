import { Button, ButtonText, ButtonIcon } from '@/components/ui/button'
import { ShareIcon } from '@/components/ui/icon'
import React from 'react'
import { Share, Alert } from 'react-native'

type ShareButtonProps = {
    message: string
}

export const ShareButtonWidget: React.FC<ShareButtonProps> = ({ message }) => {
    const handleShare = async (): Promise<void> => {
        try {
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
        <Button onPress={handleShare} className="bg-blue-500 mb-8">
            <ButtonIcon as={ShareIcon} />
            <ButtonText className="text-white font-bold">Share</ButtonText>
        </Button>
    )
}

export default ShareButtonWidget
