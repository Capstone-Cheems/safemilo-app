import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet } from 'react-native'

interface LookPhoneCallAnimationProps {
    style?: object
}

const LookPhoneCallAnimation: React.FC<LookPhoneCallAnimationProps> = ({ style = {} }) => {
    const [stage, setStage] = useState<'getPhone' | 'loop'>('getPhone')

    const getPhoneRef = useRef<LottieView>(null)
    const flagLoopRef = useRef<LottieView>(null)

    useEffect(() => {
        getPhoneRef.current?.play()
    }, [])

    const handleGetPhoneFinish = () => {
        setStage('loop')
        flagLoopRef.current?.play()
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
                    ref={flagLoopRef}
                    source={require('../assets/lottie/FlagCall.json')}
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

export default LookPhoneCallAnimation
