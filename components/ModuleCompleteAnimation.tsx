import React, { useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet } from 'react-native'

interface ModuleCompleteAnimationProps {
    style?: object
}

const ModuleCompleteAnimation: React.FC<ModuleCompleteAnimationProps> = ({
    style = {}
}) => {
    const animationRef = useRef<LottieView>(null)

    useEffect(() => {
        animationRef.current?.play()
    }, [])

    return (
        <View style={[styles.container, style]}>
            <LottieView
                ref={animationRef}
                source={require('../assets/lottie/ModuleComplete.json')}
                loop={false}
                autoPlay
                style={StyleSheet.absoluteFill}
            />
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

export default ModuleCompleteAnimation
