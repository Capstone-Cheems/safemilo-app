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
    viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f1eb'
    },
    dialogBox: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        width: 300,
        position: 'relative'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    description: {
        fontSize: 22,
        textAlign: 'center',
        color: '#000',
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap: 16
    },
    longButton: {
        backgroundColor: '#0d1b2a',
        padding: 15,
        borderRadius: 8,
        marginTop: 10,
        marginBottom: 10,
        width: '80%'
    },
    button: {
        backgroundColor: '#0d1b2a',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center'
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
        marginTop: 10,
        marginBottom: 30,
        marginLeft: -60,
        resizeMode: 'contain'
    },
    triangle: {
        position: 'absolute',
        bottom: -10,
        left: '50%',
        marginLeft: -10,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: 'white'
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
    },
    // Scam news (Post)
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    newsItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    content: {
        fontSize: 14,
        marginTop: 5,
        color: '#555'
    },
    tag: {
        fontSize: 12,
        color: '#007AFF',
        marginTop: 5
    },
    date: {
        fontSize: 12,
        color: '#888',
        marginTop: 5
    },
    noNewsText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20
    },
    editButton: {
        backgroundColor: '#0d1b2a',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 5,
        marginLeft: -10
    },
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    postContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff'
    },
    postnewsItem: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 120,
        overflow: 'hidden'
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        maxWidth: '80%'
    },
    detailContainer: {
        flex: 1,
        padding: 30,
        paddingTop: 80,
        backgroundColor: '#ffffff'
    },
    detailDate: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5
    },
    detailTag: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#007AFF',
        marginBottom: 10
    },
    detailContent: {
        fontSize: 16,
        lineHeight: 24
    },
    postInput: {
        width: '100%',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10
    },
    buttonDisabled: {
        backgroundColor: 'gray'
    },
    cancelButton: {
        marginTop: 10,
        padding: 10,
        alignItems: 'center'
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#007AFF'
    },
    cardContent: {
        fontSize: 14,
        marginTop: 5,
        color: '#555',
        maxWidth: '80%'
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20
    },
    moreButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        padding: 10
    }
})

export default commonStyles
