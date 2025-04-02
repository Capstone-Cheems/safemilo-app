import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import LoaderAnimation from './LoaderAnimation'

const LoaderForView = (): React.JSX.Element => {
    return (
        <View style={styles.wrapper}>
            <LoaderAnimation style={styles.loaderAnimation} />
            <Text style={styles.loaderText} >Loading...</Text>
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
        borderRadius: 25
    },
    loaderAnimation: {
        width: 120,
        height: 120,
        marginTop: 10,
        marginBottom: -20,
        marginLeft: 10,
        resizeMode: 'contain'
    },
    loaderText: {
        marginTop: 20,
        fontFamily: 'Montserrat-Bold'
    }
})

export default LoaderForView
