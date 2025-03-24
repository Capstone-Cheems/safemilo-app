import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native'
import { View, StyleSheet } from 'react-native'

interface RequestDeniedAnimationProps {
  style?: object
}

const RequestDeniedAnimation: React.FC<RequestDeniedAnimationProps> = ({
  style = {}
}) => {
  const [stage, setStage] = useState<'smile' | 'thumbsUp'>('smile')
  const smileRef = useRef<LottieView>(null)
  const thumbsUpRef = useRef<LottieView>(null)

  useEffect(() => {
    if (smileRef.current) {
      smileRef.current.play()
    }
  }, [])

  const handleSmileFinish = () => {
    setStage('thumbsUp')
    thumbsUpRef.current?.play()
  }

  return (
    <View style={[styles.container, style]}>
      {stage === 'smile' ? (
        <LottieView
          ref={smileRef}
          source={require('../assets/lottie/Smile.json')}
          loop={false}
          onAnimationFinish={handleSmileFinish}
          autoPlay
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <LottieView
          ref={thumbsUpRef}
          source={require('../assets/lottie/ThumbsUp.json')}
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

export default RequestDeniedAnimation
