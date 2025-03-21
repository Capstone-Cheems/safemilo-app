import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'

const INITIAL_JUMP_FRAMES = [
    require('../assets/animations/Initial-Jump-01.png'),
    require('../assets/animations/Initial-Jump-02.png'),
    require('../assets/animations/Initial-Jump-03.png'),
    require('../assets/animations/Initial-Jump-04.png'),
    require('../assets/animations/Initial-Jump-05.png'),
    require('../assets/animations/Initial-Jump-06.png'),
    require('../assets/animations/Initial-Jump-07.png'),
    require('../assets/animations/Initial-Jump-08.png'),
    require('../assets/animations/Initial-Jump-09.png'),
    require('../assets/animations/Initial-Jump-10.png'),
    require('../assets/animations/Initial-Jump-11.png'),
    require('../assets/animations/Initial-Jump-12.png'),
    require('../assets/animations/Initial-Jump-13.png'),
    require('../assets/animations/Initial-Jump-14.png'),
    require('../assets/animations/Initial-Jump-15.png'),
    require('../assets/animations/Initial-Jump-16.png'),
    require('../assets/animations/Initial-Jump-17.png'),
    require('../assets/animations/Initial-Jump-18.png'),
    require('../assets/animations/Initial-Jump-19.png'),
    require('../assets/animations/Initial-Jump-20.png'),
    require('../assets/animations/Initial-Jump-21.png'),
    require('../assets/animations/Initial-Jump-22.png'),
    require('../assets/animations/Initial-Jump-23.png'),
]

const WAVE_LOOP_FRAMES = [
    require('../assets/animations/Wave-Loop-01.png'),
    require('../assets/animations/Wave-Loop-02.png'),
    require('../assets/animations/Wave-Loop-03.png'),
    require('../assets/animations/Wave-Loop-04.png'),
    require('../assets/animations/Wave-Loop-05.png'),
    require('../assets/animations/Wave-Loop-06.png'),
    require('../assets/animations/Wave-Loop-07.png'),
    require('../assets/animations/Wave-Loop-08.png'),
    require('../assets/animations/Wave-Loop-09.png'),
    require('../assets/animations/Wave-Loop-10.png'),
    require('../assets/animations/Wave-Loop-11.png'),
    require('../assets/animations/Wave-Loop-12.png'),
    require('../assets/animations/Wave-Loop-13.png'),
    require('../assets/animations/Wave-Loop-14.png'),
    require('../assets/animations/Wave-Loop-15.png'),
    require('../assets/animations/Wave-Loop-16.png'),
    require('../assets/animations/Wave-Loop-17.png'),
    require('../assets/animations/Wave-Loop-18.png'),
    require('../assets/animations/Wave-Loop-19.png'),
    require('../assets/animations/Wave-Loop-20.png'),
    require('../assets/animations/Wave-Loop-21.png'),
    require('../assets/animations/Wave-Loop-22.png'),
    require('../assets/animations/Wave-Loop-23.png'),
]

interface MascotAnimationProps {
    frameRate?: number // Speed of animation
    style?: object // Custom styles
}

const JumpWaveLoopAnimation: React.FC<MascotAnimationProps> = ({
    frameRate = 40,
    style = {},
}) => {
    const [currentFrame, setCurrentFrame] = useState(0)
    const [isPlayingInitial, setIsPlayingInitial] = useState(true)

    useEffect(() => {
        let frameInterval: NodeJS.Timeout

        if (isPlayingInitial) {
            // Play Initial-Jump animation once
            frameInterval = setInterval(() => {
                setCurrentFrame((prev) => {
                    if (prev < INITIAL_JUMP_FRAMES.length - 1) {
                        return prev + 1
                    } else {
                        clearInterval(frameInterval)
                        setIsPlayingInitial(false) // Switch to looping animation
                        return 0
                    }
                })
            }, frameRate)
        } else {
            // Play Wave-Loop animation in a continuous loop
            frameInterval = setInterval(() => {
                setCurrentFrame((prev) => (prev + 1) % WAVE_LOOP_FRAMES.length)
            }, frameRate)
        }

        return () => clearInterval(frameInterval)
    }, [isPlayingInitial, frameRate])

    return (
        <Image
            source={
                isPlayingInitial
                    ? INITIAL_JUMP_FRAMES[currentFrame]
                    : WAVE_LOOP_FRAMES[currentFrame]
            }
            style={style}
        />
    )
}

export default JumpWaveLoopAnimation
