import React, { ComponentPropsWithRef, useState } from 'react'
import Constants from 'expo-constants'
import { Image } from 'react-native'

export const ImageView: React.FC<
    {
        coverImage: string
    } & ComponentPropsWithRef<typeof Image>
> = ({ coverImage, ...rest }) => {
    const imageURL = Constants.expoConfig?.extra?.S3_IMAGE_URL ?? ''
    const noImage =
        Constants.expoConfig?.extra?.S3_NO_IMAGE ?? 'default-placeholder.jpg'
    const [imageSource, setImageSource] = useState(`${imageURL}${coverImage}`)
    const [hasError, setHasError] = useState(false)

    const handleImageError = (): void => {
        if (!hasError) {
            setImageSource(`${imageURL}${noImage}`)
            setHasError(true) // Prevent infinite loop
        }
    }

    return (
        <Image
            source={{ uri: imageSource }}
            onError={handleImageError}
            {...rest}
        />
    )
}
