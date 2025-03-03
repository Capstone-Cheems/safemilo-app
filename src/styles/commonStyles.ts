import { StyleSheet } from 'react-native'

const commonStyles = StyleSheet.create({
    // Onboarding
    messageText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 30
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 28,
        textAlign: 'center',
        marginBottom: 10
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%'
    },
    button: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        flex: 1,
        marginHorizontal: 10
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center'
    },
    longButton: {
        backgroundColor: '#000000',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        width: '80%'
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        padding: 10
    },
    backIcon: {
        width: 30,
        height: 30
    },
    mascotImage: {
        width: 200,
        height: 200,
        marginBottom: 30
    },
    // Auth
    link: {
        marginTop: 20
    },
    linkText: {
        color: 'blue'
    },
    input: {
        width: '80%',
        padding: 10,
        margin: 10,
        borderWidth: 1,
        borderRadius: 5
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 20
    },
    formButton: {
        backgroundColor: '#000000',
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    }
})

export default commonStyles
