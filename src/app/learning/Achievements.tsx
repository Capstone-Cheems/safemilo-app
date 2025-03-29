// export default AchievementsScreen
/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useCallback, useState } from 'react'
import Svg, { Circle, Defs, RadialGradient, Stop, Path } from 'react-native-svg'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const { width } = Dimensions.get('window')

const AchievementsScreen = (): JSX.Element => {
    const [displayName, setDisplayName] = useState<string>('')
    const [completedCount, setCompletedCount] = useState<number>(0)

    const awarenessScore = completedCount * 50
    const maxScore = 500
    const progress = Math.min(awarenessScore / maxScore, 1)

    const getScoreLabel = (): string => {
        if (awarenessScore >= 400) return 'Excellent'
        if (awarenessScore >= 300) return 'Good'
        if (awarenessScore >= 200) return 'Fair'
        return 'Beginner'
    }

    useFocusEffect(
        useCallback(() => {
            // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
            const fetchUserData = async () => {
                const user = await AsyncStorage.getItem('user')
                if (user) {
                    const parsed = JSON.parse(user)
                    setDisplayName(parsed.displayName || '')
                }

                const keys = await AsyncStorage.getAllKeys()
                const completedKeys = keys.filter(key =>
                    key.startsWith('completedModule_')
                )
                setCompletedCount(completedKeys.length)
            }

            fetchUserData()
        }, [])
    )
    const badges = [
        {
            id: '1',
            title: 'Cautious Clicker',
            icon: require('../../../assets/images/cautius-clicker.png')
        },
        {
            id: '2',
            title: 'Fraud Fighter',
            icon: require('../../../assets/images/fraud-fighter.png')
        },
        {
            id: '3',
            title: 'Fast Learner',
            icon: require('../../../assets/images/fast-learner.png')
        },
        {
            id: '4',
            title: 'Privacy Pro',
            icon: require('../../../assets/images/privacy-pro.png')
        }
    ]

    return (
        <View style={styles.container}>
            {/* Wavy Background */}
            <View style={styles.wavyBackground}>
                <Svg height="160" width={width} viewBox={`0 0 ${width} 160`}>
                    <Path
                        d={`M0,0 Q${width / 2},160 ${width},0 L${width},160 L0,160 Z`}
                        fill="#FFA14A"
                    />
                </Svg>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.heading}>Achievements</Text>
                <Text style={styles.subheading}>
                    Congratulations{displayName ? `, ${displayName}` : ''}!
                </Text>
                <Text style={styles.description}>
                    See the points you’ve earned and the badges you’ve unlocked
                    as you learn to outsmart scammers.
                </Text>

                {/* Awareness Points Section */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Awareness Points</Text>
                    <View style={styles.arcWrapper}>
                        <Svg width={200} height={120}>
                            <Path
                                d="M10 110 A90 90 0 0 1 190 110"
                                fill="none"
                                stroke="#D1D1D1"
                                strokeWidth={15}
                            />
                            <Path
                                d="M10 110 A90 90 0 0 1 190 110"
                                fill="none"
                                stroke="#1980F5"
                                strokeWidth={15}
                                strokeDasharray="283"
                                strokeDashoffset={283 * (1 - progress)}
                            />
                        </Svg>
                        <View style={styles.arcText}>
                            <Text style={styles.score}>{awarenessScore}</Text>
                            <Text style={styles.scoreLabel}>
                                {getScoreLabel()}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.scoreDescription}>
                        Your awareness score shows how prepared you are to
                        handle scams. Complete more modules to boost your score!
                    </Text>
                </View>

                {/* Completed Courses */}
                <View style={styles.completedCoursesCard}>
                    <View style={styles.completedCoursesContent}>
                        <Text style={styles.completedCoursesLabel}>
                            Completed{'\n'}Courses
                        </Text>
                        <View style={styles.verticalDivider} />
                        <Text style={styles.completedCount}>
                            {completedCount}
                        </Text>
                    </View>
                </View>

                {/* Badges */}
                <Text style={styles.badgeTitle}>Your Badges</Text>
                <View style={styles.badgeContainer}>
                    {badges.map(badge => (
                        <View key={badge.id} style={styles.badgeWrapper}>
                            <View style={styles.badgeSquare}>
                                <Image
                                    source={badge.icon}
                                    style={styles.badgeIcon}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.badgeLabel}>{badge.title}</Text>
                        </View>
                    ))}
                </View>
                <View style={styles.topBackground}>
                    <Svg height="100%" width="100%" viewBox="0 0 100 100">
                        <Defs>
                            <RadialGradient id="grad" cx="50%" cy="0%" r="100%">
                                <Stop
                                    offset="0%"
                                    stopColor="#FFD8A9"
                                    stopOpacity="1"
                                />
                                <Stop
                                    offset="100%"
                                    stopColor="#FFE4C7"
                                    stopOpacity="1"
                                />
                            </RadialGradient>
                        </Defs>
                        <Circle cx="50" cy="-20" r="100" fill="url(#grad)" />
                    </Svg>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wavyBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width,
        zIndex: -1
    },
    content: {
        padding: 16,
        paddingTop: 40
    },
    heading: {
        fontSize: 28,
        textAlign: 'left',
        marginBottom: 0,
        fontFamily: 'Montserrat-Bold'
    },
    subheading: {
        fontSize: 18,
        textAlign: 'left',
        marginVertical: 0,
        fontFamily: 'Montserrat-SemiBold'
    },
    description: {
        fontSize: 16,
        textAlign: 'left',
        color: '111',
        marginBottom: 20,
        fontFamily: 'Montserrat-Medium'
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 16
    },
    cardTitle: {
        fontSize: 20,
        fontFamily: 'Montserrat-Bold',
        marginBottom: 10
    },
    score: {
        fontSize: 28,
        fontFamily: 'Montserrat-Bold',
        color: '#1C1C1C'
    },
    scoreLabel: {
        fontSize: 14,
        fontFamily: 'Montserrat-Bold',
        color: '#111',
        marginTop: -2
    },
    scoreDescription: {
        fontSize: 16,
        textAlign: 'center',
        color: '#111',
        marginTop: 10,
        fontFamily: 'Montserrat-SemiBold'
    },
    badgeTitle: {
        fontSize: 24,
        marginBottom: 12,
        fontFamily: 'Montserrat-Bold'
    },
    badgeBox: {
        width: '48%',
        aspectRatio: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    badgeText: {
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Montserrat-Bold'
    },
    arcWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12
    },
    arcText: {
        position: 'absolute',
        top: 70,
        alignItems: 'center'
    },
    completedCoursesCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        paddingVertical: 24,
        paddingHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    completedCoursesContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 60
    },
    completedCoursesLabel: {
        fontSize: 18,
        fontFamily: 'Montserrat-Bold',
        color: '#1C1C1C',
        marginLeft: 30
    },
    completedCount: {
        fontSize: 24,
        fontFamily: 'Montserrat-Bold',
        color: '#1C1C1C',
        marginRight: 30
    },
    verticalDivider: {
        height: 24,
        width: 1,
        backgroundColor: '#D1D1D1',
        marginHorizontal: 16
    },
    badgeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 12,
        gap: 20
    },
    badgeWrapper: {
        width: '47%',
        alignItems: 'center'
    },
    badgeSquare: {
        width: 170,
        height: 170,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3
    },
    badgeIcon: {
        width: 100,
        height: 100
    },
    badgeLabel: {
        fontSize: 14,
        textAlign: 'center',
        marginTop: 10,
        color: '#1C1C1C',
        fontFamily: 'Montserrat-SemiBold'
    },
    topBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 370,
        zIndex: -1
    },
    container: {
        flex: 1,
        backgroundColor: '#FFA14A'
    }
})

export default AchievementsScreen
