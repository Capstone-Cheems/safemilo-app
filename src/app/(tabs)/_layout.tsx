import React, { ReactNode, useState, useEffect } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { BellIcon, Icon } from '@/components/ui/icon'
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage
} from '@/components/ui/avatar'
import { HStack } from '@/components/ui/hstack'
import { useAuth } from '@/src/shared'
import { TouchableOpacity, Image, ImageURISource, Animated } from 'react-native'

type IconSource = {
    active: ImageURISource
    inactive: ImageURISource
}

export default function TabLayout(): ReactNode {
    const { user } = useAuth()
    const router = useRouter()

    const [homeIcon, setHomeIcon] = useState<IconSource | null>(null)
    const [learnIcon, setLearnIcon] = useState<IconSource | null>(null)
    const [chatIcon, setChatIcon] = useState<IconSource | null>(null)

    useEffect(() => {
        setHomeIcon({
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            active: require('../../../assets/images/home-active.png'),
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            inactive: require('../../../assets/images/home.png')
        })
        setLearnIcon({
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            active: require('../../../assets/images/learn-active.png'),
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            inactive: require('../../../assets/images/learn.png')
        })
        setChatIcon({
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            active: require('../../../assets/images/chat-active.png'),
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            inactive: require('../../../assets/images/Chat.png')
        })
    }, [])

    const renderTabIcon = (
        focused: boolean,
        icons: IconSource,
        activeWidth: number,
        inactiveWidth: number,
        activeHeight: number,
        inactiveHeight: number,
        activeTop: number,
        inactiveTop: number
    ) => {
        const scaleAnim = new Animated.Value(focused ? 1 : 0)

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            Animated.timing(scaleAnim, {
                toValue: focused ? 1 : 0,
                duration: 200,
                useNativeDriver: false
            }).start()
        }, [focused])

        const width = scaleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [inactiveWidth, activeWidth]
        })
        const height = scaleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [inactiveHeight, activeHeight]
        })
        const top = scaleAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [inactiveTop, activeTop]
        })

        return (
            <Animated.Image
                source={focused ? icons.active : icons.inactive}
                style={{ width, height, position: 'absolute', top }}
            />
        )
    }

    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center',
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    paddingBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                tabBarStyle: {
                    height: 70,
                    backgroundColor: '#fff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                },
                headerRight: () => (
                    <>
                        <HStack
                            space="lg"
                            reversed={false}
                            className="pr-2 justify-center items-center"
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    router.push('/notification/notification')
                                }
                            >
                                <Icon
                                    as={BellIcon}
                                    className="text-typography-800"
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => router.push('/profile/profile')}
                            >
                                <Avatar size="sm">
                                    <AvatarFallbackText>
                                        {user?.email}
                                    </AvatarFallbackText>
                                    <AvatarImage
                                        source={{
                                            uri: user?.photoURL ?? ''
                                        }}
                                    />
                                    <AvatarBadge />
                                </Avatar>
                            </TouchableOpacity>
                        </HStack>
                    </>
                )
            }}
        >
            {/* <Tabs.Screen name="profile" options={{ title: 'Profile' }} /> */}
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ focused }) =>
                        homeIcon &&
                        renderTabIcon(
                            focused,
                            homeIcon,
                            75, // Active width
                            45, // Inactive width
                            58, // Active height
                            50, // Inactive height
                            -5, // Active top (moves up)
                            5 // Inactive top
                        )
                }}
            />

            <Tabs.Screen
                name="learn"
                options={{
                    tabBarIcon: ({ focused }) =>
                        learnIcon &&
                        renderTabIcon(
                            focused,
                            learnIcon,
                            80, // Active width
                            45, // Inactive width
                            65, // Active height
                            50, // Inactive height
                            -5, // Active top (moves up)
                            5 // Inactive top
                        )
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: ({ focused }) =>
                        chatIcon &&
                        renderTabIcon(
                            focused,
                            chatIcon,
                            75, // Active width
                            65, // Inactive width
                            60, // Active height
                            50, // Inactive height
                            -5, // Active top (moves up)
                            5 // Inactive top
                        )
                }}
            />
        </Tabs>
    )
}
