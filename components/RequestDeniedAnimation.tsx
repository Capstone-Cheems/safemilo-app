import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'

const SMILE_FRAMES = [
    require('../assets/animations/Smile-00.png'),
    require('../assets/animations/Smile-01.png'),
    require('../assets/animations/Smile-02.png'),
    require('../assets/animations/Smile-03.png'),
    require('../assets/animations/Smile-04.png'),
    require('../assets/animations/Smile-05.png'),
    require('../assets/animations/Smile-06.png'),
    require('../assets/animations/Smile-07.png'),
    require('../assets/animations/Smile-08.png'),
    require('../assets/animations/Smile-09.png'),
    require('../assets/animations/Smile-10.png'),
    require('../assets/animations/Smile-11.png'),
    require('../assets/animations/Smile-12.png'),
]

const THUMBS_UP_FRAMES = [
    require('../assets/animations/Thumbs-Up-00.png'),
    require('../assets/animations/Thumbs-Up-01.png'),
    require('../assets/animations/Thumbs-Up-02.png'),
    require('../assets/animations/Thumbs-Up-03.png'),
    require('../assets/animations/Thumbs-Up-04.png'),
    require('../assets/animations/Thumbs-Up-05.png'),
    require('../assets/animations/Thumbs-Up-06.png'),
    require('../assets/animations/Thumbs-Up-07.png'),
    require('../assets/animations/Thumbs-Up-08.png'),
    require('../assets/animations/Thumbs-Up-09.png'),
    require('../assets/animations/Thumbs-Up-10.png'),
    require('../assets/animations/Thumbs-Up-11.png'),
    require('../assets/animations/Thumbs-Up-12.png'),
    require('../assets/animations/Thumbs-Up-13.png'),
    require('../assets/animations/Thumbs-Up-14.png'),
    require('../assets/animations/Thumbs-Up-15.png'),
    require('../assets/animations/Thumbs-Up-16.png'),
    require('../assets/animations/Thumbs-Up-17.png'),
    require('../assets/animations/Thumbs-Up-18.png'),
    require('../assets/animations/Thumbs-Up-19.png'),
    require('../assets/animations/Thumbs-Up-20.png'),
    require('../assets/animations/Thumbs-Up-21.png'),
    require('../assets/animations/Thumbs-Up-22.png'),
    require('../assets/animations/Thumbs-Up-23.png'),
    require('../assets/animations/Thumbs-Up-24.png'),
    require('../assets/animations/Thumbs-Up-25.png'),
    require('../assets/animations/Thumbs-Up-26.png'),
    require('../assets/animations/Thumbs-Up-27.png'),
    require('../assets/animations/Thumbs-Up-28.png'),
    require('../assets/animations/Thumbs-Up-29.png'),
    require('../assets/animations/Thumbs-Up-30.png'),
    require('../assets/animations/Thumbs-Up-31.png'),
    require('../assets/animations/Thumbs-Up-32.png'),
    require('../assets/animations/Thumbs-Up-33.png'),
    require('../assets/animations/Thumbs-Up-34.png'),
    require('../assets/animations/Thumbs-Up-35.png'),
    require('../assets/animations/Thumbs-Up-36.png'),
    require('../assets/animations/Thumbs-Up-37.png'),
    require('../assets/animations/Thumbs-Up-38.png'),
    require('../assets/animations/Thumbs-Up-39.png'),
    require('../assets/animations/Thumbs-Up-40.png'),
    require('../assets/animations/Thumbs-Up-41.png'),
    require('../assets/animations/Thumbs-Up-42.png'),
    require('../assets/animations/Thumbs-Up-43.png'),
    require('../assets/animations/Thumbs-Up-44.png'),
    require('../assets/animations/Thumbs-Up-45.png'),
    require('../assets/animations/Thumbs-Up-46.png'),
    require('../assets/animations/Thumbs-Up-47.png'),
]

interface RequestDeniedAnimationProps {
    style?: object
}

const RequestDeniedAnimation: React.FC<RequestDeniedAnimationProps> = ({
    style = {},
}) => {
    const [currentFrame, setCurrentFrame] = useState(0)
    const [stage, setStage] = useState<'smile' | 'thumbsUp'>('smile')

    useEffect(() => {
        let frameInterval: NodeJS.Timeout
        let frameRate = 40

        if (stage === 'smile') {
            frameInterval = setInterval(() => {
                setCurrentFrame((prev) => {
                    if (prev < SMILE_FRAMES.length - 1) {
                        return prev + 1
                    } else {
                        clearInterval(frameInterval)
                        setStage('thumbsUp')
                        return 0
                    }
                })
            }, frameRate)
        } else {
            frameInterval = setInterval(() => {
                setCurrentFrame((prev) => (prev + 1) % THUMBS_UP_FRAMES.length)
            }, frameRate)
        }

        return () => clearInterval(frameInterval)
    }, [stage])

    return (
        <Image
            source={
                stage === 'smile'
                    ? SMILE_FRAMES[currentFrame]
                    : THUMBS_UP_FRAMES[currentFrame]
            }
            style={style}
        />
    )
}

export default RequestDeniedAnimation
