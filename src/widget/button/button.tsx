import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { PlayIcon } from '@/components/ui/icon'
import React, { ComponentPropsWithRef } from 'react'

export const ButtonWidget: React.FC<
    {
        text: string
        playIcon?: boolean
    } & ComponentPropsWithRef<typeof Button>
> = ({ text, playIcon, ...rest }) => {
    return (
        <>
            <Button {...rest}>
                {playIcon && <ButtonIcon as={PlayIcon} />}
                <ButtonText>{text}</ButtonText>
            </Button>
        </>
    )
}

export default ButtonWidget
