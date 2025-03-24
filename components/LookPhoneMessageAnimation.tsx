import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet } from 'react-native'

interface LookPhoneMessageAnimationProps {
    style?: object
}

const LookPhoneMessageAnimation: React.FC<LookPhoneMessageAnimationProps> = ({
    style = {}
}) => {
    const [stage, setStage] = useState<'getPhone' | 'loop'>('getPhone')

    const getPhoneRef = useRef<LottieView>(null)
    const loopRef = useRef<LottieView>(null)

    useEffect(() => {
        getPhoneRef.current?.play()
    }, [])

    const handleGetPhoneFinish = () => {
        setStage('loop')
        loopRef.current?.play()
    }

    return (
        <View style={[styles.container, style]}>
            {stage === 'getPhone' && (
                <LottieView
                    ref={getPhoneRef}
                    source={require('../assets/lottie/GetPhone.json')}
                    loop={false}
                    onAnimationFinish={handleGetPhoneFinish}
                    style={StyleSheet.absoluteFill}
                />
            )}
            {stage === 'loop' && (
                <LottieView
                    ref={loopRef}
                    source={require('../assets/lottie/FlagMessage.json')}
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

export default LookPhoneMessageAnimation
