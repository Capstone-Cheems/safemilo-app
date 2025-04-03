import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import RequestDeniedAnimation from './RequestDeniedAnimation'

const CompleteMsg = (): React.JSX.Element => {
    return (
        <View style={styles.wrapper}>
            <RequestDeniedAnimation style={styles.animation} />
            <Text style={styles.text}>Post Created.</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 260,
        left: 130,
        backgroundColor: '#FFF',
        width: 160,
        height: 160,
        borderRadius: 25,
        zIndex: 999
    },
    animation: {
        width: 120,
        height: 120,
        marginTop: 10,
        marginBottom: -20,
        marginLeft: 10,
        resizeMode: 'contain',
        zIndex: 999
    },
    text: {
        marginTop: 20,
        fontFamily: 'Montserrat-Bold',
        color: '#000',
        zIndex: 999
    }
})

export default CompleteMsg
