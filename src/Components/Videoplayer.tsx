import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Video, ResizeMode } from 'expo-av'

interface VideoPlayerProps {
    uri: string
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ uri }) => {
    return (
        <View style={styles.container}>
            <Video
                source={{ uri }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode={ResizeMode.CONTAIN}
                useNativeControls
                style={styles.video}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 220,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000', // Ensures video is visible on all backgrounds
        borderRadius: 10,
        overflow: 'hidden'
    },
    video: {
        width: '100%',
        height: '100%'
    }
})

export default VideoPlayer
