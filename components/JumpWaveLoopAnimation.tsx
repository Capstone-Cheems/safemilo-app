import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet } from 'react-native'

interface MascotAnimationProps {
    style?: object
}

const JumpWaveLoopAnimation: React.FC<MascotAnimationProps> = ({ style = {} }) => {
    const [isInitialDone, setIsInitialDone] = useState(false)
    const initialRef = useRef<LottieView>(null)
    const loopRef = useRef<LottieView>(null)

    useEffect(() => {
        if (initialRef.current) {
            initialRef.current.play()
        }
    }, [])

    const handleInitialFinish = () => {
        setIsInitialDone(true)
        if (loopRef.current) {
            loopRef.current.play()
        }
    }

    return (
        <View style={[styles.container, style]}>
            {!isInitialDone ? (
                <LottieView
                    ref={initialRef}
                    source={require('../assets/lottie/InitialJump.json')}
                    loop={false}
                    onAnimationFinish={handleInitialFinish}
                    style={StyleSheet.absoluteFill}
                />
            ) : (
                <LottieView
                    ref={loopRef}
                    source={require('../assets/lottie/WaveLoop.json')}
                    loop
                    autoPlay
                    style={StyleSheet.absoluteFill}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        alignSelf: 'center'
    }
})

export default JumpWaveLoopAnimation
