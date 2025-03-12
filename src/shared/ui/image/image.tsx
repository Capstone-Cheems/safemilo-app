import React, { ComponentPropsWithRef, useState } from 'react'
import Constants from 'expo-constants'
import { Image, ImageSourcePropType } from 'react-native'
import { scamTypeImages, DEFAULT_SCAM_IMAGE } from './scam-news-image'

export const ImageView: React.FC<
    {
        coverImage: string
        scamType?: string
    } & ComponentPropsWithRef<typeof Image>
> = ({ coverImage, scamType, ...rest }) => {
    const imageURL = Constants.expoConfig?.extra?.S3_IMAGE_URL ?? ''
    const noImage =
        Constants.expoConfig?.extra?.S3_NO_IMAGE ?? 'default-placeholder.jpg'
    const [imageSource, setImageSource] = useState<ImageSourcePropType>(
        scamType
            ? scamTypeImages[scamType] || DEFAULT_SCAM_IMAGE
            : { uri: `${imageURL}${coverImage}` }
    )
    const [hasError, setHasError] = useState(false)

    const handleImageError = (): void => {
        if (!hasError) {
            setImageSource({ uri: `${imageURL}${noImage}` })
            setHasError(true) // Prevent infinite loop
        }
    }

    return <Image source={imageSource} onError={handleImageError} {...rest} />
}
