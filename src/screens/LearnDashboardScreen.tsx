// // import React from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';

// // const LearnDashboardScreen = (): JSX.Element => {
// //     const navigation = useNavigation();

// //     return (
// //         <View style={styles.container}>
// //             <Text style={styles.header}>Learn</Text>
// //             <Text style={styles.subHeader}>
// //                 Learn how to spot scams, recognize red flags, and take action in time.
// //             </Text>

// //             <Text style={styles.sectionTitle}>Active Courses</Text>
// //             <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('ActiveCourses')}>
// //                 <Text style={styles.cardTitle}>Scam Awareness Basics</Text>
// //                 <Text style={styles.progress}>Lesson 0/10 | 0% Complete</Text>
// //                 <View style={styles.progressBar} />
// //                 <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lesson')}>
// //                     <Text style={styles.buttonText}>Start learning</Text>
// //                 </TouchableOpacity>
// //             </TouchableOpacity>

// //             <TouchableOpacity style={styles.infoCard} onPress={() => navigation.navigate('BrowseCategories')}>
// //                 <Text style={styles.infoTitle}>Browse Scam Categories</Text>
// //                 <Text style={styles.infoText}>Find other learning modules.</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity style={styles.infoCard} onPress={() => navigation.navigate('Achievements')}>
// //                 <Text style={styles.infoTitle}>Check out Your Achievements</Text>
// //                 <Text style={styles.infoText}>Your Awareness Score is: <Text style={styles.score}>367</Text></Text>
// //             </TouchableOpacity>
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 16,
// //         backgroundColor: '#F9F9F9',
// //     },
// //     header: {
// //         fontSize: 28,
// //         fontWeight: 'bold',
// //     },
// //     subHeader: {
// //         fontSize: 16,
// //         color: '#666',
// //         marginBottom: 20,
// //     },
// //     sectionTitle: {
// //         fontSize: 22,
// //         fontWeight: 'bold',
// //         marginBottom: 10,
// //     },
// //     card: {
// //         backgroundColor: '#E0E0E0',
// //         padding: 16,
// //         borderRadius: 10,
// //         marginBottom: 12,
// //     },
// //     cardTitle: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //     },
// //     progress: {
// //         fontSize: 14,
// //         color: '#666',
// //         marginVertical: 5,
// //     },
// //     progressBar: {
// //         height: 10,
// //         backgroundColor: '#ddd',
// //         borderRadius: 5,
// //         marginBottom: 10,
// //     },
// //     button: {
// //         backgroundColor: '#444',
// //         padding: 10,
// //         borderRadius: 5,
// //         alignItems: 'center',
// //     },
// //     buttonText: {
// //         color: '#FFF',
// //         fontSize: 16,
// //     },
// //     infoCard: {
// //         backgroundColor: '#E0E0E0',
// //         padding: 16,
// //         borderRadius: 10,
// //         marginBottom: 12,
// //     },
// //     infoTitle: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //     },
// //     infoText: {
// //         fontSize: 14,
// //         color: '#666',
// //     },
// //     score: {
// //         fontSize: 20,
// //         fontWeight: 'bold',
// //     },
// // });

// // export default LearnDashboardScreen;

// import React from 'react'
// import {
//     View,
//     Text,
//     StyleSheet,
//     TouchableOpacity,
//     FlatList
// } from 'react-native'
// import { useNavigation } from '@react-navigation/native'

// const courses = [
//     { id: '1', title: 'Scam Awareness Basics', progress: 0 },
//     { id: '2', title: 'Phishing Scams 101', progress: 20 },
//     { id: '3', title: 'Online Shopping Fraud', progress: 50 },
//     { id: '4', title: 'Investment Scams', progress: 10 }
// ]

// const LearnDashboardScreen = (): JSX.Element => {
//     const navigation = useNavigation()

//     return (
//         <View style={styles.container}>
//             <Text style={styles.header}>Learn</Text>
//             <Text style={styles.subHeader}>
//                 Learn how to spot scams, recognize red flags, and take action in
//                 time.
//             </Text>

//             <Text style={styles.sectionTitle}>Active Courses</Text>
//             <FlatList
//                 data={courses}
//                 horizontal
//                 showsHorizontalScrollIndicator={false}
//                 keyExtractor={item => item.id}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity
//                         style={styles.card}
//                         onPress={() => navigation.navigate('Lesson')}
//                     >
//                         <Text style={styles.cardTitle}>{item.title}</Text>
//                         <Text style={styles.progress}>
//                             Lesson 0/10 | {item.progress}% Complete
//                         </Text>
//                         <View style={styles.progressBar}>
//                             <View
//                                 style={[
//                                     styles.progressFill,
//                                     { width: `${item.progress}%` }
//                                 ]}
//                             />
//                         </View>
//                         <TouchableOpacity
//                             style={styles.button}
//                             onPress={() => navigation.navigate('Lesson')}
//                         >
//                             <Text style={styles.buttonText}>
//                                 Start learning
//                             </Text>
//                         </TouchableOpacity>
//                     </TouchableOpacity>
//                 )}
//             />

//             <TouchableOpacity
//                 style={styles.infoCard}
//                 onPress={() => navigation.navigate('BrowseCategories')}
//             >
//                 <Text style={styles.infoTitle}>Browse Scam Categories</Text>
//                 <Text style={styles.infoText}>
//                     Find other learning modules.
//                 </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={styles.infoCard}
//                 onPress={() => navigation.navigate('Achievements')}
//             >
//                 <Text style={styles.infoTitle}>
//                     Check out Your Achievements
//                 </Text>
//                 <Text style={styles.infoText}>
//                     Your Awareness Score is:{' '}
//                     <Text style={styles.score}>367</Text>
//                 </Text>
//             </TouchableOpacity>
//         </View>
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
//         fontWeight: 'bold'
//     },
//     subHeader: {
//         fontSize: 16,
//         color: '#666',
//         marginBottom: 20
//     },
//     sectionTitle: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 10
//     },
//     card: {
//         backgroundColor: '#E0E0E0',
//         padding: 16,
//         borderRadius: 10,
//         marginRight: 12,
//         width: 200
//     },
//     cardTitle: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     },
//     progress: {
//         fontSize: 14,
//         color: '#666',
//         marginVertical: 5
//     },
//     progressBar: {
//         height: 10,
//         backgroundColor: '#ddd',
//         borderRadius: 5,
//         marginBottom: 10
//     },
//     progressFill: {
//         height: '100%',
//         backgroundColor: '#444',
//         borderRadius: 5
//     },
//     button: {
//         backgroundColor: '#444',
//         padding: 10,
//         borderRadius: 5,
//         alignItems: 'center'
//     },
//     buttonText: {
//         color: '#FFF',
//         fontSize: 16
//     },
//     infoCard: {
//         backgroundColor: '#E0E0E0',
//         padding: 16,
//         borderRadius: 10,
//         marginVertical: 8
//     },
//     infoTitle: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     },
//     infoText: {
//         fontSize: 14,
//         color: '#666'
//     },
//     score: {
//         fontSize: 20,
//         fontWeight: 'bold'
//     }
// })

// export default LearnDashboardScreen

import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import ProgressBar from '../Components/ProgressBar'

const courses = [
    { id: '1', title: 'Scam Awareness Basics', progress: 0 },
    { id: '2', title: 'Phishing Scams 101', progress: 20 },
    { id: '3', title: 'Online Shopping Fraud', progress: 50 },
    { id: '4', title: 'Investment Scams', progress: 100 }
]

const LearnDashboardScreen = (): JSX.Element => {
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Learn</Text>
            <Text style={styles.subHeader}>
                Learn how to spot scams, recognize red flags, and take action in
                time.
            </Text>

            <Text style={styles.sectionTitle}>Active Courses</Text>
            <FlatList
                data={courses}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.courseList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Lesson')}
                    >
                        <Text style={styles.cardTitle}>{item.title}</Text>
                        <Text style={styles.progressText}>
                            Lesson 0/10 | {item.progress}% Complete
                        </Text>
                        <ProgressBar progress={item.progress} />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Lesson')}
                        >
                            <Text style={styles.buttonText}>
                                Start learning
                            </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                style={styles.infoCard}
                onPress={() => navigation.navigate('BrowseCategories')}
            >
                <Text style={styles.infoTitle}>Browse Scam Categories</Text>
                <Text style={styles.infoText}>
                    Find other learning modules.
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.infoCard}
                onPress={() => navigation.navigate('Achievements')}
            >
                <Text style={styles.infoTitle}>
                    Check out Your Achievements
                </Text>
                <Text style={styles.infoText}>
                    Your Awareness Score is:{' '}
                    <Text style={styles.score}>367</Text>
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F9F9F9'
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold'
    },
    subHeader: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10
    },
    courseList: {
        paddingBottom: 10
    },
    card: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 10,
        marginRight: 12,
        width: 200,
        justifyContent: 'space-between'
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    progressText: {
        fontSize: 14,
        color: '#666',
        marginVertical: 5
    },
    button: {
        backgroundColor: '#444',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16
    },
    infoCard: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 10,
        marginVertical: 8
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    infoText: {
        fontSize: 14,
        color: '#666'
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default LearnDashboardScreen
