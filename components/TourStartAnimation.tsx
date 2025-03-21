import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'

const POINT_INITIAL_FRAMES = [
    require('../assets/animations/Point-Initial-00.png'),
    require('../assets/animations/Point-Initial-01.png'),
    require('../assets/animations/Point-Initial-02.png'),
    require('../assets/animations/Point-Initial-03.png'),
    require('../assets/animations/Point-Initial-04.png'),
    require('../assets/animations/Point-Initial-05.png'),
    require('../assets/animations/Point-Initial-06.png'),
    require('../assets/animations/Point-Initial-07.png'),
    require('../assets/animations/Point-Initial-08.png'),
    require('../assets/animations/Point-Initial-09.png'),
    require('../assets/animations/Point-Initial-10.png'),
    require('../assets/animations/Point-Initial-11.png'),
    require('../assets/animations/Point-Initial-12.png'),
    require('../assets/animations/Point-Initial-13.png'),
    require('../assets/animations/Point-Initial-14.png'),
    require('../assets/animations/Point-Initial-15.png'),
    require('../assets/animations/Point-Initial-16.png'),
    require('../assets/animations/Point-Initial-17.png'),
    require('../assets/animations/Point-Initial-18.png'),
    require('../assets/animations/Point-Initial-19.png'),
    require('../assets/animations/Point-Initial-20.png'),
    require('../assets/animations/Point-Initial-21.png'),
    require('../assets/animations/Point-Initial-22.png'),
    require('../assets/animations/Point-Initial-23.png'),
    require('../assets/animations/Point-Initial-24.png')
]

const POINT_LOOP_FRAMES = [
    require('../assets/animations/Point-Loop-00.png'),
    require('../assets/animations/Point-Loop-01.png'),
    require('../assets/animations/Point-Loop-02.png'),
    require('../assets/animations/Point-Loop-03.png'),
    require('../assets/animations/Point-Loop-04.png'),
    require('../assets/animations/Point-Loop-05.png'),
    require('../assets/animations/Point-Loop-06.png'),
    require('../assets/animations/Point-Loop-07.png'),
    require('../assets/animations/Point-Loop-08.png'),
    require('../assets/animations/Point-Loop-09.png'),
    require('../assets/animations/Point-Loop-10.png'),
    require('../assets/animations/Point-Loop-11.png'),
    require('../assets/animations/Point-Loop-12.png'),
    require('../assets/animations/Point-Loop-13.png'),
    require('../assets/animations/Point-Loop-14.png'),
    require('../assets/animations/Point-Loop-15.png'),
    require('../assets/animations/Point-Loop-16.png'),
    require('../assets/animations/Point-Loop-17.png'),
    require('../assets/animations/Point-Loop-18.png'),
    require('../assets/animations/Point-Loop-19.png'),
    require('../assets/animations/Point-Loop-20.png'),
    require('../assets/animations/Point-Loop-21.png'),
    require('../assets/animations/Point-Loop-22.png'),
    require('../assets/animations/Point-Loop-23.png'),
    require('../assets/animations/Point-Loop-24.png'),
    require('../assets/animations/Point-Loop-25.png'),
    require('../assets/animations/Point-Loop-26.png'),
    require('../assets/animations/Point-Loop-27.png'),
    require('../assets/animations/Point-Loop-28.png'),
    require('../assets/animations/Point-Loop-29.png'),
    require('../assets/animations/Point-Loop-30.png'),
    require('../assets/animations/Point-Loop-31.png'),
    require('../assets/animations/Point-Loop-32.png'),
    require('../assets/animations/Point-Loop-33.png'),
    require('../assets/animations/Point-Loop-34.png'),
    require('../assets/animations/Point-Loop-35.png'),
    require('../assets/animations/Point-Loop-36.png'),
    require('../assets/animations/Point-Loop-37.png'),
    require('../assets/animations/Point-Loop-38.png'),
    require('../assets/animations/Point-Loop-39.png'),
    require('../assets/animations/Point-Loop-40.png'),
    require('../assets/animations/Point-Loop-41.png'),
    require('../assets/animations/Point-Loop-42.png'),
    require('../assets/animations/Point-Loop-43.png'),
    require('../assets/animations/Point-Loop-44.png'),
    require('../assets/animations/Point-Loop-45.png'),
    require('../assets/animations/Point-Loop-46.png'),
    require('../assets/animations/Point-Loop-47.png')
]

interface TourStartAnimationProps {
    style?: object
}

const TourStartAnimation: React.FC<TourStartAnimationProps> = ({ style = {} }) => {
    const [currentFrame, setCurrentFrame] = useState(0)
    const [stage, setStage] = useState<'initial' | 'loop'>('initial')

    useEffect(() => {
        let interval: NodeJS.Timeout
        const frameRate = 40

        if (stage === 'initial') {
            interval = setInterval(() => {
                setCurrentFrame(prev => {
                    if (prev < POINT_INITIAL_FRAMES.length - 1) {
                        return prev + 1
                    } else {
                        clearInterval(interval)
                        setStage('loop')
                        return 0
                    }
                })
            }, frameRate)
        } else {
            interval = setInterval(() => {
                setCurrentFrame(prev => (prev + 1) % POINT_LOOP_FRAMES.length)
            }, frameRate)
        }

        return () => clearInterval(interval)
    }, [stage])

    const currentImage =
        stage === 'initial'
            ? POINT_INITIAL_FRAMES[currentFrame]
            : POINT_LOOP_FRAMES[currentFrame]

    return <Image source={currentImage} style={style} />
}

export default TourStartAnimation
