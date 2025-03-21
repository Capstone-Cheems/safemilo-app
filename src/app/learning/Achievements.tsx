/* eslint-disable @typescript-eslint/no-require-imports */
// import React from 'react'
// import {
//     View,
//     Text,
//     StyleSheet,
//     ScrollView,
//     Image,
//     TouchableOpacity
// } from 'react-native'
// import { ProgressCircle } from 'react-native-svg-charts'
// import { Feather } from '@expo/vector-icons'
// import { NavigationProp, ParamListBase } from '@react-navigation/native'

// interface AchievementsScreenProps {
//     navigation: NavigationProp<ParamListBase>
// }

// const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
//     navigation
// }) => {
//     const awarenessScore = 367

//     return (
//         <View style={styles.container}>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 {/* Header */}
//                 <Text style={styles.heading}>Achievements</Text>
//                 <Text style={styles.subheading}>Congratulations, Mohit!</Text>
//                 <Text style={styles.description}>
//                     See the points you’ve earned and the badges you’ve unlocked
//                     as you learn to outsmart scammers.
//                 </Text>

//                 {/* Awareness Points Section */}
//                 <View style={styles.awarenessCard}>
//                     <Text style={styles.cardTitle}>Awareness Points</Text>
//                     <View
//                         style={{
//                             alignItems: 'center',
//                             justifyContent: 'center'
//                         }}
//                     >
//                         <ProgressCircle
//                             style={{ height: 120, width: 120 }}
//                             progress={awarenessScore / 500}
//                             progressColor={'#007AFF'}
//                             backgroundColor={'#E5E5E5'}
//                             strokeWidth={8}
//                         />
//                         <View
//                             style={{
//                                 position: 'absolute',
//                                 alignItems: 'center'
//                             }}
//                         >
//                             <Text style={styles.score}>{awarenessScore}</Text>
//                             <Text style={styles.scoreLabel}>Fair</Text>
//                         </View>
//                     </View>
//                     <Text style={styles.scoreDescription}>
//                         Your awareness score shows how prepared you are to
//                         handle scams. Complete more modules to boost your score!
//                     </Text>
//                 </View>

//                 {/* Completed Courses */}
//                 <View style={styles.completedCoursesCard}>
//                     <Text style={styles.cardTitle}>Completed Courses</Text>
//                     <Text style={styles.completedCount}>13</Text>
//                 </View>

//                 {/* Badges Section */}
//                 <Text style={styles.badgeTitle}>Your Badges</Text>
//                 <View style={styles.badgeContainer}>
//                     <View style={styles.badge}>
//                         {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
//                         <Image
//                             source={require('../../../assets/images/cautius-clicker.png')}
//                             style={styles.badgeIcon}
//                         />
//                         <Text style={styles.badgeText}>Cautious Clicker</Text>
//                     </View>
//                     <View style={styles.badge}>
//                         {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
//                         <Image
//                             source={require('../../../assets/images/fraud-fighter.png')}
//                             style={styles.badgeIcon}
//                         />
//                         <Text style={styles.badgeText}>Fraud Fighter</Text>
//                     </View>
//                     <View style={styles.badge}>
//                         {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
//                         <Image
//                             // eslint-disable-next-line @typescript-eslint/no-require-imports
//                             source={require('../../../assets/images/fast-learner.png')}
//                             style={styles.badgeIcon}
//                         />
//                         <Text style={styles.badgeText}>Fast Learner</Text>
//                     </View>
//                     <View style={styles.badge}>
//                         {/* eslint-disable-next-line @typescript-eslint/no-require-imports */}
//                         <Image
//                             source={require('../../../assets/images/privacy-pro.png')}
//                             style={styles.badgeIcon}
//                         />
//                         <Text style={styles.badgeText}>Privacy Pro</Text>
//                     </View>
//                 </View>
//             </ScrollView>

//             {/* Bottom Navigation */}
//             <View style={styles.bottomNav}>
//                 <TouchableOpacity onPress={() => navigation.navigate('Home')}>
//                     <Feather name="home" size={24} color="#000" />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('Learning')}
//                 >
//                     <Feather name="book-open" size={24} color="#000" />
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('AskMilo')}
//                 >
//                     <Feather name="message-circle" size={24} color="#000" />
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFE4C7'
//     },
//     scrollContainer: {
//         padding: 16
//     },
//     backButton: {
//         position: 'absolute',
//         top: 20,
//         left: 16,
//         zIndex: 10
//     },
//     heading: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginTop: 40
//     },
//     subheading: {
//         fontSize: 16,
//         textAlign: 'center',
//         marginVertical: 4
//     },
//     description: {
//         fontSize: 14,
//         textAlign: 'center',
//         color: '#555',
//         marginBottom: 20
//     },
//     awarenessCard: {
//         backgroundColor: '#FFF',
//         borderRadius: 12,
//         padding: 20,
//         alignItems: 'center',
//         marginBottom: 12
//     },
//     cardTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 10
//     },
//     progressCircle: {
//         height: 120,
//         marginBottom: 10
//     },
//     score: {
//         fontSize: 24,
//         fontWeight: 'bold'
//     },
//     scoreLabel: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: '#555'
//     },
//     scoreDescription: {
//         fontSize: 12,
//         textAlign: 'center',
//         color: '#555',
//         marginTop: 6
//     },
//     completedCoursesCard: {
//         backgroundColor: '#FFF',
//         borderRadius: 12,
//         padding: 20,
//         alignItems: 'center',
//         marginBottom: 12
//     },
//     completedCount: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginTop: 6
//     },
//     badgeTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 20,
//         marginBottom: 10
//     },
//     badgeContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'space-between'
//     },
//     badge: {
//         width: '48%',
//         backgroundColor: '#FFF',
//         borderRadius: 12,
//         alignItems: 'center',
//         padding: 10,
//         marginBottom: 12
//     },
//     badgeIcon: {
//         width: 50,
//         height: 50,
//         marginBottom: 8
//     },
//     badgeText: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         textAlign: 'center'
//     },
//     bottomNav: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         paddingVertical: 12,
//         backgroundColor: '#FFA14A'
//     }
// })

// export default AchievementsScreen

/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'
import { Feather } from '@expo/vector-icons'
import { NavigationProp, ParamListBase } from '@react-navigation/native'

interface AchievementsScreenProps {
    navigation: NavigationProp<ParamListBase>
}

const AchievementsScreen: React.FC<AchievementsScreenProps> = ({
    navigation
}) => {
    const awarenessScore = 367

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Header */}
                <Text style={styles.heading}>Achievements</Text>
                <Text style={styles.subheading}>Congratulations, Mohit!</Text>
                <Text style={styles.description}>
                    See the points you’ve earned and the badges you’ve unlocked
                    as you learn to outsmart scammers.
                </Text>

                {/* Awareness Points Section */}
                <View style={styles.awarenessCard}>
                    <Text style={styles.cardTitle}>Awareness Points</Text>
                    <View style={styles.progressContainer}>
                        <ProgressCircle
                            style={styles.progressCircle}
                            progress={awarenessScore / 500}
                            progressColor={'#007AFF'}
                            backgroundColor={'#E5E5E5'}
                            strokeWidth={8}
                        />
                        <View style={styles.progressTextContainer}>
                            <Text style={styles.score}>{awarenessScore}</Text>
                            <Text style={styles.scoreLabel}>Fair</Text>
                        </View>
                    </View>
                    <Text style={styles.scoreDescription}>
                        Your awareness score shows how prepared you are to
                        handle scams. Complete more modules to boost your score!
                    </Text>
                </View>

                {/* Completed Courses */}
                <View style={styles.completedCoursesCard}>
                    <Text style={styles.cardTitle}>Completed Courses</Text>
                    <Text style={styles.completedCount}>13</Text>
                </View>

                {/* Badges Section */}
                <Text style={styles.badgeTitle}>Your Badges</Text>
                <View style={styles.badgeContainer}>
                    <View style={styles.badge}>
                        <Image
                            source={require('../../../assets/images/cautius-clicker.png')}
                            style={styles.badgeIcon}
                        />
                        <Text style={styles.badgeText}>Cautious Clicker</Text>
                    </View>
                    <View style={styles.badge}>
                        <Image
                            source={require('../../../assets/images/fraud-fighter.png')}
                            style={styles.badgeIcon}
                        />
                        <Text style={styles.badgeText}>Fraud Fighter</Text>
                    </View>
                    <View style={styles.badge}>
                        <Image
                            source={require('../../../assets/images/fast-learner.png')}
                            style={styles.badgeIcon}
                        />
                        <Text style={styles.badgeText}>Fast Learner</Text>
                    </View>
                    <View style={styles.badge}>
                        <Image
                            source={require('../../../assets/images/privacy-pro.png')}
                            style={styles.badgeIcon}
                        />
                        <Text style={styles.badgeText}>Privacy Pro</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    style={styles.navItem}
                >
                    <Feather name="home" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Learning')}
                    style={styles.navItem}
                >
                    <Feather name="book-open" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AskMilo')}
                    style={styles.navItem}
                >
                    <Feather name="message-circle" size={24} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE4C7'
    },
    scrollContainer: {
        padding: 16
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 40
    },
    subheading: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 4
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        color: '#555',
        marginBottom: 20
    },
    awarenessCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        marginBottom: 12
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10
    },
    progressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    progressCircle: {
        height: 120,
        width: 120
    },
    progressTextContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    score: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    scoreLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#555'
    },
    scoreDescription: {
        fontSize: 12,
        textAlign: 'center',
        color: '#555',
        marginTop: 6
    },
    completedCoursesCard: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        marginBottom: 12
    },
    completedCount: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 6
    },
    badgeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10
    },
    badgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    badge: {
        width: '48%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        alignItems: 'center',
        padding: 10,
        marginBottom: 12
    },
    badgeIcon: {
        width: 50,
        height: 50,
        marginBottom: 8
    },
    badgeText: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        backgroundColor: '#FFA14A'
    },
    navItem: {
        alignItems: 'center'
    }
})

export default AchievementsScreen
