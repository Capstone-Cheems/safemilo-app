import { StyleSheet } from 'react-native'

const commonStyles = StyleSheet.create({
    // Onboarding
    appLogo: {
        width: 290,
        height: 200,
        marginBottom: 120,
        alignSelf: 'center'
    },
    messageText: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 30
    },
    accent: {
        color: 'black'
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
    authContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fbede5'
    },
    authInputContainer: {
        width: '100%',
        marginBottom: 16,
        alignSelf: 'center',
        alignItems: 'center'
    },
    authInputLabel: {
        alignSelf: 'flex-start',
        marginLeft: 32
    },
    viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30a8fd'
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
        padding: 13.5,
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        width: '80%',
        borderWidth: 2,
        borderColor: '#0d1b2a',
        borderStyle: 'solid'
    },
    longButtonWhite: {
        backgroundColor: '#FFFFFF',
        padding: 13.5,
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        width: '80%',
        borderWidth: 2,
        borderColor: '#0d1b2a',
        borderStyle: 'solid'
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
    buttonTextWhite: {
        color: '#294141',
        fontSize: 22,
        textAlign: 'center'
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        padding: 10
    },
    backIcon: {
        width: 30,
        height: 30
    },
    iconButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center', // Centers both icon & text
        width: '100%'
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginLeft: 8
    },
    appleIcon: {
        width: 30,
        height: 30,
        marginLeft: 8
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 16,
        width: '80%',
        alignSelf: 'center'
    },
    dividerLine: {
        flex: 1,
        height: 2,
        backgroundColor: '#D3D3D3'
    },
    dividerText: {
        marginHorizontal: 10,
        fontSize: 16,
        color: '#333',
        fontWeight: '500'
    },
    mascotImage: {
        width: 250,
        height: 250,
        marginTop: 10,
        marginBottom: 30,
        marginLeft: -60,
        resizeMode: 'contain'
    },
    jumpWaveLoopAnimation: {
        width: 350,
        height: 350,
        marginTop: 10,
        marginBottom: 30,
        marginLeft: -60,
        resizeMode: 'contain'
    },
    lookPhoneAnimation: {
        width: 420,
        height: 420,
        marginTop: 10,
        marginBottom: 30,
        marginLeft: -60,
        resizeMode: 'contain'
    },
    moduleCompleteAnimation: {
        width: 320,
        height: 320,
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
        padding: 13.5,
        margin: 10,
        borderRadius: 16,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#7b7b7b',
        borderStyle: 'solid'
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
        backgroundColor: '#0d1b2a',
        padding: 15,
        borderRadius: 16,
        width: '80%'
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
    //Profile Section
    largeformButton: {
        backgroundColor: 'grey',
        padding: 10,
        width: '100%',
        marginTop: 10,
        borderRadius: 10
    },
    Logout: {
        backgroundColor: '#000000',
        padding: 10,
        width: '100%',
        marginTop: 25,
        borderRadius: 10
    },
    profileImage: {
        width: 50,
        height: 80,
        borderRadius: 80,
        marginBottom: 20
    },
    profilePlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#666',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    leftText: {
        fontWeight: 'bold',
        fontSize: 28,
        alignItems: 'flex-start',
        textAlign: 'left',
        marginBottom: 10
    },
    popupText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10
    },
    //Saved Posts
    removeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 2,
        borderRadius: 45
    },
    removeButtonText: {
        color: 'red',
        fontWeight: 'bold'
    },
    saveButton: {
        backgroundColor: '#4CAF50',
        padding: 8,
        borderRadius: 5,
        marginTop: 10
    },
    noSavedPosts: {
        marginTop: 20,
        alignItems: 'center'
    },
    savedPostItem: {
        position: 'relative',
        marginBottom: 10,
        padding: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    removeAllButton: {
        padding: 10,
        marginBottom: 5,
        alignSelf: 'flex-end',
        borderRadius: 5,
        top: -15
    },
    removeAllButtonText: {
        color: '#FF3B30',
        fontWeight: 'bold'
    },
    browseButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10
    },
    browseButtonText: {
        color: 'white'
    },
    //FAQS
    faqItem: {
        backgroundColor: '#f5f5f5',
        padding: 15,
        marginVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd'
    },
    faqQuestion: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    faqAnswer: {
        marginTop: 5,
        fontSize: 14,
        color: '#555'
    },
    featureSection: {
        marginBottom: 20
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: '600'
    },
    featureDescription: {
        fontSize: 14,
        marginVertical: 10,
        color: '#555'
    },
    featureLink: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4
    },
    //Report a bug
    inputSection: {
        marginBottom: 20
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8
    },
    buginput: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10,
        borderRadius: 4,
        fontSize: 14,
        minHeight: 100
    }
})

export default commonStyles
