import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { PlayIcon, CloseCircleIcon } from '@/components/ui/icon'
import React, { ComponentPropsWithRef } from 'react'

export const ButtonWidget: React.FC<
    {
        text: string
        playIcon?: boolean
        stopIcon?: boolean
        onPress?: () => void
    } & ComponentPropsWithRef<typeof Button>
> = ({ text, playIcon, stopIcon, ...rest }) => {
    return (
        <>
            <Button {...rest}>
                {playIcon && <ButtonIcon as={PlayIcon} />}
                {stopIcon && <ButtonIcon as={CloseCircleIcon} />}
                <ButtonText>{text}</ButtonText>
            </Button>
        </>
    )
}

export default ButtonWidget
