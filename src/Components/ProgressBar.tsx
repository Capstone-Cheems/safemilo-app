import React from 'react'
import { View, StyleSheet } from 'react-native'

interface ProgressBarProps {
    progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 10,
        backgroundColor: '#E0E0E0',
        borderRadius: 5,
        overflow: 'hidden'
    },
    progress: {
        height: '100%',
        backgroundColor: '#FF5733'
    }
})

export default ProgressBar
