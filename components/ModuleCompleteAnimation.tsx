import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'

const MODULE_COMPLETE_FRAMES = [
    require('../assets/animations/Module-Complete-00.png'),
    require('../assets/animations/Module-Complete-01.png'),
    require('../assets/animations/Module-Complete-02.png'),
    require('../assets/animations/Module-Complete-03.png'),
    require('../assets/animations/Module-Complete-04.png'),
    require('../assets/animations/Module-Complete-05.png'),
    require('../assets/animations/Module-Complete-06.png'),
    require('../assets/animations/Module-Complete-07.png'),
    require('../assets/animations/Module-Complete-08.png'),
    require('../assets/animations/Module-Complete-09.png'),
    require('../assets/animations/Module-Complete-10.png'),
    require('../assets/animations/Module-Complete-11.png'),
    require('../assets/animations/Module-Complete-12.png'),
    require('../assets/animations/Module-Complete-13.png'),
    require('../assets/animations/Module-Complete-14.png'),
    require('../assets/animations/Module-Complete-15.png'),
    require('../assets/animations/Module-Complete-16.png'),
    require('../assets/animations/Module-Complete-17.png'),
    require('../assets/animations/Module-Complete-18.png'),
    require('../assets/animations/Module-Complete-19.png'),
    require('../assets/animations/Module-Complete-20.png'),
    require('../assets/animations/Module-Complete-21.png'),
    require('../assets/animations/Module-Complete-22.png'),
    require('../assets/animations/Module-Complete-23.png'),
    require('../assets/animations/Module-Complete-24.png'),
    require('../assets/animations/Module-Complete-25.png'),
    require('../assets/animations/Module-Complete-26.png'),
    require('../assets/animations/Module-Complete-27.png'),
    require('../assets/animations/Module-Complete-28.png'),
    require('../assets/animations/Module-Complete-29.png'),
    require('../assets/animations/Module-Complete-30.png'),
    require('../assets/animations/Module-Complete-31.png'),
    require('../assets/animations/Module-Complete-32.png'),
    require('../assets/animations/Module-Complete-33.png'),
    require('../assets/animations/Module-Complete-34.png'),
    require('../assets/animations/Module-Complete-35.png'),
    require('../assets/animations/Module-Complete-36.png'),
    require('../assets/animations/Module-Complete-37.png'),
    require('../assets/animations/Module-Complete-38.png'),
    require('../assets/animations/Module-Complete-39.png'),
    require('../assets/animations/Module-Complete-40.png'),
    require('../assets/animations/Module-Complete-41.png'),
    require('../assets/animations/Module-Complete-42.png'),
    require('../assets/animations/Module-Complete-43.png'),
    require('../assets/animations/Module-Complete-44.png'),
    require('../assets/animations/Module-Complete-45.png'),
    require('../assets/animations/Module-Complete-46.png'),
    require('../assets/animations/Module-Complete-47.png'),
    require('../assets/animations/Module-Complete-48.png'),
    require('../assets/animations/Module-Complete-49.png'),
    require('../assets/animations/Module-Complete-50.png'),
    require('../assets/animations/Module-Complete-51.png'),
    require('../assets/animations/Module-Complete-52.png'),
]

interface ModuleCompleteAnimationProps {
    style?: object // Custom styles
}

const ModuleCompleteAnimation: React.FC<ModuleCompleteAnimationProps> = ({
    style = {},
}) => {
    const [currentFrame, setCurrentFrame] = useState(0)

    useEffect(() => {
        let frameInterval: NodeJS.Timeout

        frameInterval = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % MODULE_COMPLETE_FRAMES.length)
        }, 40)

        return () => clearInterval(frameInterval)
    }, [])

    return (
        <Image
            source={MODULE_COMPLETE_FRAMES[currentFrame]}
            style={style}
        />
    )
}

export default ModuleCompleteAnimation

