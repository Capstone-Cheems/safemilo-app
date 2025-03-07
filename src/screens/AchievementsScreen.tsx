import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../types/types'

const screenWidth = Dimensions.get('window').width

type AchievementsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'Achievements'
>

const userName = 'Mohit'
const awarenessScore = 367
const completedCourses = 13

const pieData = [
    { name: 'Completed', score: awarenessScore / 5, color: 'gray' },
    { name: 'Remaining', score: 500 - awarenessScore / 5, color: '#E0E0E0' }
]

const achievements = [
    {
        id: '1',
        title: 'Scam Spotter',
        image: 'https://via.placeholder.com/80',
        earned: true
    },
    {
        id: '2',
        title: 'Cautious Clicker',
        image: 'https://via.placeholder.com/80',
        earned: true
    },
    {
        id: '3',
        title: 'Badge Name',
        image: 'https://via.placeholder.com/80',
        earned: false
    },
    {
        id: '4',
        title: 'Badge Name',
        image: 'https://via.placeholder.com/80',
        earned: false
    }
]

const AchievementsScreen = (): JSX.Element => {
    const navigation = useNavigation<AchievementsScreenNavigationProp>()

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Achievements</Text>
            <Text style={styles.subHeader}>Congratulations, {userName}!</Text>
            <Text style={styles.description}>
                See the points you’ve earned and the badges you’ve unlocked as
                you learn to outsmart scammers.
            </Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Awareness Points</Text>
                <PieChart
                    data={pieData}
                    width={screenWidth * 0.9}
                    height={150}
                    backgroundColor="transparent"
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        color: () => '#444'
                    }}
                    accessor="score"
                    paddingLeft="15"
                    absolute
                />

                <Text style={styles.scoreText}>Fair {awarenessScore}</Text>
                <Text style={styles.infoText}>
                    Your awareness score shows how prepared you are to handle
                    scams. Complete more modules to boost your score!
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Completed Courses</Text>
                <Text style={styles.courseCount}>{completedCourses}</Text>
            </View>

            <Text style={styles.sectionTitle}>Your Badges</Text>
            <FlatList
                data={achievements}
                keyExtractor={item => item.id}
                numColumns={2}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.badgeCard,
                            !item.earned && styles.locked
                        ]}
                    >
                        <Image
                            source={{ uri: item.image }}
                            style={styles.badge}
                        />
                        <Text style={styles.badgeTitle}>{item.title}</Text>
                    </View>
                )}
            />

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('LearnDashboard')}
                >
                    <Text style={styles.buttonText}>Back to Learning</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
        fontWeight: 'bold',
        marginBottom: 5
    },
    subHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 10
    },
    description: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20
    },
    section: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 10,
        marginBottom: 16,
        alignItems: 'center'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    },
    scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 5
    },
    infoText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#444',
        marginTop: 5
    },
    courseCount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#000'
    },
    badgeCard: {
        backgroundColor: '#E0E0E0',
        padding: 16,
        borderRadius: 10,
        margin: 8,
        flex: 1,
        alignItems: 'center'
    },
    locked: {
        opacity: 0.5
    },
    badge: {
        width: 80,
        height: 80,
        marginBottom: 5
    },
    badgeTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    buttonContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#444',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        width: '80%'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16
    }
})

export default AchievementsScreen
