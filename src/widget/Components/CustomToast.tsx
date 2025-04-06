import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')

type CustomToastProps = {
  visible: boolean
  message: string
}

const CustomToast: React.FC<CustomToastProps> = ({ visible, message }) => {
  if (!visible) return null

  return (
    <View style={[styles.overlay, { height: SCREEN_HEIGHT }]}>
      <View style={styles.toastContainer}>
        <Text style={styles.toastText}>{message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 9999,
    pointerEvents: 'none',
    backgroundColor: 'transparent'
  },
  toastContainer: {
    marginBottom: 180,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#0A2941',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    width: '90%'
  },
  toastText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Bold',
    textAlign: 'center'
  }
})

export default CustomToast
