// import React from 'react'
// import {
//     View,
//     Text,
//     StyleSheet,
//     FlatList,
//     Image,
//     ScrollView,
//     TouchableOpacity
// } from 'react-native'
// import { PieChart } from 'react-native-chart-kit'
// import { Dimensions } from 'react-native'
// import { useRouter } from 'expo-router'

// const screenWidth = Dimensions.get('window').width

// const userName = 'Mohit'
// const awarenessScore = 367
// const completedCourses = 13

// const pieData = [
//     { name: 'Completed', score: awarenessScore / 5, color: 'gray' },
//     { name: 'Remaining', score: 500 - awarenessScore / 5, color: '#E0E0E0' }
// ]

// const achievements = [
//     {
//         id: '1',
//         title: 'Scam Spotter',
//         image: 'https://via.placeholder.com/80',
//         earned: true
//     },
//     {
//         id: '2',
//         title: 'Cautious Clicker',
//         image: 'https://via.placeholder.com/80',
//         earned: true
//     },
//     {
//         id: '3',
//         title: 'Badge Name',
//         image: 'https://via.placeholder.com/80',
//         earned: false
//     },
//     {
//         id: '4',
//         title: 'Badge Name',
//         image: 'https://via.placeholder.com/80',
//         earned: false
//     }
// ]

// const AchievementsScreen = (): JSX.Element => {
//     const router = useRouter()
//     return (
//         <ScrollView style={styles.container}>
//             <Text style={styles.header}>Achievements</Text>
//             <Text style={styles.subHeader}>Congratulations, {userName}!</Text>
//             <Text style={styles.description}>
//                 See the points you’ve earned and the badges you’ve unlocked as
//                 you learn to outsmart scammers.
//             </Text>

//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Awareness Points</Text>
//                 <PieChart
//                     data={pieData}
//                     width={screenWidth * 0.9}
//                     height={150}
//                     backgroundColor="transparent"
//                     chartConfig={{
//                         backgroundColor: '#ffffff',
//                         backgroundGradientFrom: '#ffffff',
//                         backgroundGradientTo: '#ffffff',
//                         color: () => '#444'
//                     }}
//                     accessor="score"
//                     paddingLeft="15"
//                     absolute
//                 />

//                 <Text style={styles.scoreText}>Fair {awarenessScore}</Text>
//                 <Text style={styles.infoText}>
//                     Your awareness score shows how prepared you are to handle
//                     scams. Complete more modules to boost your score!
//                 </Text>
//             </View>

//             <View style={styles.section}>
//                 <Text style={styles.sectionTitle}>Completed Courses</Text>
//                 <Text style={styles.courseCount}>{completedCourses}</Text>
//             </View>

//             <Text style={styles.sectionTitle}>Your Badges</Text>
//             <FlatList
//                 data={achievements}
//                 keyExtractor={item => item.id}
//                 numColumns={2}
//                 scrollEnabled={false}
//                 renderItem={({ item }) => (
//                     <View
//                         style={[
//                             styles.badgeCard,
//                             !item.earned && styles.locked
//                         ]}
//                     >
//                         <Image
//                             source={{ uri: item.image }}
//                             style={styles.badge}
//                         />
//                         <Text style={styles.badgeTitle}>{item.title}</Text>
//                     </View>
//                 )}
//             />

//             {/* Navigation Buttons */}
//             <View style={styles.buttonContainer}>
//                 <TouchableOpacity
//                     style={styles.button}
//                     onPress={() => router.push('/learning/LearnDashboard')}
//                 >
//                     <Text style={styles.buttonText}>Back to Learning</Text>
//                 </TouchableOpacity>
//             </View>
//         </ScrollView>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#F9F9F9'
//     },
//     header: {
//         fontSize: 28,
//         fontWeight: 'bold',
//         marginBottom: 5
//     },
//     subHeader: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#444',
//         marginBottom: 10
//     },
//     description: {
//         fontSize: 16,
//         color: '#666',
//         marginBottom: 20
//     },
//     section: {
//         backgroundColor: '#E0E0E0',
//         padding: 16,
//         borderRadius: 10,
//         marginBottom: 16,
//         alignItems: 'center'
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 5
//     },
//     scoreText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginTop: 5
//     },
//     infoText: {
//         fontSize: 14,
//         textAlign: 'center',
//         color: '#444',
//         marginTop: 5
//     },
//     courseCount: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         color: '#000'
//     },
//     badgeCard: {
//         backgroundColor: '#E0E0E0',
//         padding: 16,
//         borderRadius: 10,
//         margin: 8,
//         flex: 1,
//         alignItems: 'center'
//     },
//     locked: {
//         opacity: 0.5
//     },
//     badge: {
//         width: 80,
//         height: 80,
//         marginBottom: 5
//     },
//     badgeTitle: {
//         fontSize: 16,
//         fontWeight: 'bold'
//     },
//     buttonContainer: {
//         marginTop: 20,
//         alignItems: 'center'
//     },
//     button: {
//         backgroundColor: '#444',
//         padding: 12,
//         borderRadius: 5,
//         alignItems: 'center',
//         width: '80%'
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16
//     }
// })

// export default AchievementsScreen

import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { ProgressCircle } from 'react-native-svg-charts'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import image from '../../../assets/images/cautius-clicker.png'

const badges = [
    {
        name: 'Cautious Clicker',
        icon: require('../../../assets/images/cautius-clicker.png')
    },
    { name: 'Fraud Fighter', icon: require('../../../assets/images/fraud-fighter.png') },
    { name: 'Fast Learner', icon: require('../../../assets/images/fast-learner.png') },
    { name: 'Privacy Pro', icon: require('../../../assets/images/assets/privacy-pro.png') }
]

const AchievementsScreen = ({ navigation }) => {
    const awarenessScore = 367

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.backButton}
                >
                    <Feather name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>

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
                    <ProgressCircle
                        style={styles.progressCircle}
                        progress={awarenessScore / 500} // Assuming max 500 points
                        progressColor={'#007AFF'}
                        backgroundColor={'#E5E5E5'}
                        strokeWidth={10}
                    />
                    <Text style={styles.score}>{awarenessScore}</Text>
                    <Text style={styles.scoreLabel}>Fair</Text>
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
                    {badges.map((badge, index) => (
                        <View key={index} style={styles.badge}>
                            <Image
                                source={badge.icon}
                                style={styles.badgeIcon}
                            />
                            <Text style={styles.badgeText}>{badge.name}</Text>
                        </View>
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Feather name="home" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Learning')}
                >
                    <Feather name="book-open" size={24} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('AskMilo')}
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
    backButton: {
        position: 'absolute',
        top: 20,
        left: 16,
        zIndex: 10
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
    progressCircle: {
        height: 120,
        marginBottom: 10
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
        fontWeight: 'bold'
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        backgroundColor: '#FFA14A'
    }
})

export default AchievementsScreen
