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
    dialogText: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Montserrat-Medium'
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
        marginLeft: 32,
        fontFamily: 'Montserrat-SemiBold'
    },
    viewContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30a8fd'
    },
    viewDeniedContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#30a8fd',
        paddingTop: 110
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
        width: 360,
        position: 'relative'
    },
    title: {
        fontSize: 30,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    },
    description: {
        fontSize: 22,
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center',
        color: '#000',
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 16
    },
    buttonContainerMid: {
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
        borderStyle: 'solid',
        alignSelf: 'center'
    },
    longButtonNew: {
        backgroundColor: '#0A2941',
        padding: 13.5,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        borderWidth: 2,
        borderColor: '#0A2941',
        borderStyle: 'solid',
        alignSelf: 'center'
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
        borderStyle: 'solid',
        alignSelf: 'center'
    },
    longButtonWhiteNew: {
        backgroundColor: '#FFFFFF',
        padding: 13.5,
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        borderWidth: 2,
        borderColor: '#0d1b2a',
        borderStyle: 'solid',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#0A2941',
        paddingVertical: 10,
        paddingHorizontal: 30,
        width: '100%',
        borderRadius: 16,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#0d1b2a',
        borderStyle: 'solid'
    },
    dialogButton: {
        backgroundColor: '#0d1b2a',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 16,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#0d1b2a',
        borderStyle: 'solid',
        width: '45%'
    },
    dialogButtonMid: {
        backgroundColor: '#0d1b2a',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 16,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#0d1b2a',
        borderStyle: 'solid',
        width: '100%'
    },
    buttonWhite: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 16,
        marginTop: 10,
        borderWidth: 2,
        borderColor: '#0d1b2a',
        borderStyle: 'solid',
        width: '45%'
    },
    buttonText: {
        color: 'white',
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold'
    },
    newscardLongButton: {
        backgroundColor: '#0A2941',
        padding: 10,
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 10,
        width: '100%',
        borderWidth: 2,
        borderColor: '#0A2941',
        borderStyle: 'solid',
        alignSelf: 'center'
    },
    newscardButtonText: {
        color: 'white',
        fontSize: 28,
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold'
    },
    PbuttonText: {
        color: 'white',
        textAlign: 'center'
    },
    buttonTextWhite: {
        color: '#0d1b2a',
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Montserrat-SemiBold'
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
        fontFamily: 'Montserrat-SemiBold'
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
        marginBottom: -10,
        marginLeft: -60,
        resizeMode: 'contain'
    },
    lookPhoneMessageAnimation: {
        width: 420,
        height: 280,
        marginTop: 10,
        marginBottom: 5,
        marginLeft: 30,
        resizeMode: 'contain'
    },
    lookPhoneCallAnimation: {
        width: 420,
        height: 280,
        marginTop: 10,
        marginBottom: -20,
        marginLeft: 30,
        resizeMode: 'contain'
    },
    permissionDeniedAnimation: {
        width: 320,
        height: 320,
        marginTop: 10,
        marginBottom: -35,
        marginLeft: -100,
        resizeMode: 'contain'
    },
    tourStartAnimation: {
        width: 320,
        height: 320,
        marginTop: 10,
        marginBottom: 15,
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
    loaderAnimation: {
        width: 120,
        height: 120,
        marginTop: 10,
        marginBottom: -20,
        marginLeft: 30,
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
    triangle2: {
        position: 'absolute',
        bottom: -9,
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
    invertedTriangle: {
        position: 'absolute',
        top: -10,
        left: '50%',
        marginLeft: -20,
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderStyle: 'solid',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'white'
    },
    permissionIcon: {
        width: 40,
        height: 40
    },
    progressBarContainer: {
        width: '100%',
        height: 10,
        backgroundColor: '#D1D1D1',
        borderRadius: 4,
        marginBottom: 12,
        overflow: 'hidden'
    },
    progressBarFill25: {
        width: '25%',
        height: '100%',
        backgroundColor: '#1980F5',
        borderRadius: 4
    },
    progressBarFill50: {
        width: '50%',
        height: '100%',
        backgroundColor: '#1980F5',
        borderRadius: 4
    },
    progressBarFill75: {
        width: '75%',
        height: '100%',
        backgroundColor: '#1980F5',
        borderRadius: 4
    },
    progressBarFill100: {
        width: '100%',
        height: '100%',
        backgroundColor: '#1980F5',
        borderRadius: 4
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
        borderStyle: 'solid',
        fontFamily: 'Montserrat-SemiBold'
    },
    errorText: {
        color: 'red',
        marginBottom: 10
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
        gap: 20,
        fontFamily: 'Montserrat-SemiBold'
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
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: 'Montserrat-SemiBold'
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
        fontSize: 16,
        color: '#007AFF',
        marginTop: 5,
        fontFamily: 'Montserrat-Medium'
    },
    date: {
        fontSize: 16,
        color: '#191919',
        marginTop: 5,
        fontFamily: 'Montserrat-Medium'
    },
    noNewsText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
        marginTop: 20,
        fontFamily: 'Montserrat-SemiBold'
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
        fontFamily: 'Montserrat-SemiBold'
    },
    postContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    postnewsItem: {
        backgroundColor: '#ffffff',
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
        fontFamily: 'Montserrat-SemiBold',
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
        marginBottom: 10,
        backgroundColor: '#ffffff',
        fontFamily: 'Montserrat-SemiBold'
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
        maxWidth: '80%',
        fontFamily: 'Montserrat-Medium'
    },
    newsInputLabel: {
        color: '#000',
        fontFamily: 'Montserrat-SemiBold'
    },
    customIcon: {
        width: 24,
        height: 24
    },
    widgetButtonText: {
        color: '#0D1B2A',
        fontSize: 26,
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center',
        paddingTop: 10
    },
    toastContainer: {
        position: 'absolute',
        top: 700,
        left: 20,
        right: 20,
        backgroundColor: '#FBEDE5',
        padding: 12,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
    },
    toastText: {
        color: '#0D1B2A',
        fontFamily: 'Montserrat-Bold',
        fontSize: 16
    },
    //Profile Section
    largeformButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom:.7,
        width: '100%',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    toplargeformButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom:.7,
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    bottomlargeformButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    ptext: {
        color: 'black',
        fontSize: 28,
        textAlign: 'left'
    },
    ltext: {
        color: 'black',
        fontSize: 28,
        padding: 30,
        fontWeight: 'bold',
        textAlign: 'center'
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
        marginBottom: 10,
        marginTop: 10
    },
    popupText: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10
    },
    profilecontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E0E7',
        padding: 20
    },
    //Saved Posts
    removeButton: {
        position: 'absolute',
        top: 5,
        right: 5,
        padding: 10,
        height: 25,
        width: 25
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
        marginTop: 25,
        padding: 20,
    },
    savedPostItem: {
        position: 'relative',
        marginBottom: 10,
        padding: 6,
        backgroundColor: 'white',
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
        backgroundColor: '#0A2941',
        padding: 16,
        alignSelf: 'center',
        width: '80%',
        borderRadius: 16,
        alignItems: 'center',
        marginVertical: 10,
        marginTop: 20
    },
    browseButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
    pcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    mcontainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        paddingTop: 25,
        paddingBottom: 25, 
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    //FAQS
    faqContainer: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    faqheader: {
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: '#4A4A4A',
        marginBottom: 20
    },
    faqItem: {
        marginBottom: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    expandedItem: {
        backgroundColor: '#F0F4F8' // Light grey for expanded items
    },
    faqQuestion: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333'
    },
    faqAnswer: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
        lineHeight: 24
    },
    //Features
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
        backgroundColor: '#0A2941',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4
    },
    //Report a bug
    inputSection: {
        marginBottom: 10,
        marginTop: -20,
        width: '100%'
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8
    },
    buginput: {
        borderColor: '#0A2941',
        borderWidth: 1,
        padding: 10,
        borderRadius: 10,
        fontSize: 14,
        minHeight: 200
    },
    scrollViewContainer: {
        // alignItems: 'center', // Example style, adjust as needed
        // justifyContent: 'center' // Example style, adjust as needed
        // Any other styles for the ScrollView container
    },

    // Modals
    modalView: {
        margin: 20,

        backgroundColor: 'white',

        borderRadius: 20,

        padding: 35,

        alignItems: 'center',

        shadowColor: '#000',

        shadowOffset: {
            width: 0,

            height: 2
        },

        shadowOpacity: 0.25,

        shadowRadius: 4,

        elevation: 5
    },
    modalText: {
        marginBottom: 15,

        textAlign: 'center'
    },
    modalButton: {
        borderRadius: 20,

        padding: 10,

        elevation: 2
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)' // Semi-transparent background
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5 // For Android
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
        color: '#0A2941'
    },
    modalContent: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
        marginBottom: 20
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        backgroundColor: '#0A2941',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 15,
        alignItems: 'center',
        color: 'white',
        fontWeight: '500'
    },
    closeButtonText: {
        color: 'white',
        fontWeight: '500'
    },
    modalbuttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginTop: 20,
        gap: 10
    },
    //Setting
    scontainer: {
        flex: 1,
        padding: 15
    },
    //  home
     homebuttonText: {
        color: 'white',
        textAlign: 'center'
    }
})

export default commonStyles
