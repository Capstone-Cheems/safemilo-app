import { Button, ButtonIcon } from '@/components/ui/button'
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
        <Button
            onPress={handleShare}
            className="bg-transparent w-auto h-auto p-0 m-0"
            style={{
                backgroundColor: 'transparent',
                elevation: 0
            }}
        >
            <ButtonIcon
                as={ShareIcon}
                style={{ width: 28, height: 28 }}
                color="#0D1B2A"
            />
        </Button>
    )
}

export default ShareButtonWidget
