import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { PlayIcon, CloseCircleIcon } from '@/components/ui/icon'
import React, { ComponentPropsWithRef } from 'react'
import { Image, StyleSheet } from 'react-native'

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
            className="bg-[#0D1B2A] w-[134px] rounded-full flex-row items-center justify-center"
        >
            {playIcon && <ButtonIcon as={PlayIcon} />}
            {stopIcon && <ButtonIcon as={CloseCircleIcon} />}
            {imageIcon && (
                <Image
                    source={imageIcon}
                    style={styles.customIcon}
                    resizeMode="contain"
                />
            )}
            <ButtonText>{text}</ButtonText>
        </Button>
    )
}

const styles = StyleSheet.create({
    customIcon: {
        width: 20,
        height: 20,
        marginRight: 8
    }
})

export default ButtonWidget
