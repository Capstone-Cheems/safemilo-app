import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { FIREBASE_AUTH } from '../../FirebaseConfig'

const Home = (): React.JSX.Element => {
    const handleLogout = async (): Promise<void> => {
        try {
            await FIREBASE_AUTH.signOut()
            console.log('User logged out')
        } catch (error) {
            console.error('Logout failed:', error)
        }
    }

    return (
        <View style={styles.container}>
            <Button onPress={handleLogout} title="Logout" />
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
