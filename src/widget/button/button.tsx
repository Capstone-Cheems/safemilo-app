import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { PlayIcon, CloseCircleIcon } from '@/components/ui/icon'
import React, { ComponentPropsWithRef } from 'react'
import { Image } from 'react-native'
import commonStyles from '../../styles/commonStyles'

export const ButtonWidget: React.FC<
    {
        text: string
        playIcon?: boolean
        stopIcon?: boolean
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        imageIcon?: any
        onPress?: () => void
    } & ComponentPropsWithRef<typeof Button>
> = ({ text, playIcon, stopIcon, imageIcon, ...rest }) => {
    return (
        <Button
            {...rest}
            className="bg-[#0D1B2A] w-[134px] h-[50px] rounded-full flex-row items-center justify-center"
        >
            {playIcon && <ButtonIcon as={PlayIcon} />}
            {stopIcon && <ButtonIcon as={CloseCircleIcon} />}
            {imageIcon && (
                <Image
                    source={imageIcon}
                    style={commonStyles.customIcon}
                    resizeMode="contain"
                />
            )}
            <ButtonText style={commonStyles.widgetButtonText}>
                {text}
            </ButtonText>
        </Button>
    )
}

export default ButtonWidget
