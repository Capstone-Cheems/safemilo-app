import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet } from 'react-native'

interface TourStartAnimationProps {
  style?: object
}

const TourStartAnimation: React.FC<TourStartAnimationProps> = ({ style = {} }) => {
  const [stage, setStage] = useState<'initial' | 'loop'>('initial')
  const initialRef = useRef<LottieView>(null)
  const loopRef = useRef<LottieView>(null)

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current.play()
    }
  }, [])

  const handleInitialFinish = () => {
    setStage('loop')
    loopRef.current?.play()
  }

  return (
    <View style={[styles.container, style]}>
      {stage === 'initial' ? (
        <LottieView
          ref={initialRef}
          source={require('../assets/lottie/PointInitial.json')}
          loop={false}
          onAnimationFinish={handleInitialFinish}
          autoPlay
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <LottieView
          ref={loopRef}
          source={require('../assets/lottie/PointLoop.json')}
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

export default TourStartAnimation
