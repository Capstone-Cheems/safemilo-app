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
import { TouchableOpacity, Image, ImageURISource } from 'react-native'

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

    const loadIcons = () => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const home = require('../../../assets/images/home.png')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const homeActive = require('../../../assets/images/home.png')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const learn = require('../../../assets/images/learn.png')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const learnActive = require('../../../assets/images/learn.png')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const chat = require('../../../assets/images/Chat.png')
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const chatActive = require('../../../assets/images/Chat.png')

        setHomeIcon({ active: homeActive, inactive: home })
        setLearnIcon({ active: learnActive, inactive: learn })
        setChatIcon({ active: chatActive, inactive: chat })
    }

    useEffect(() => {
        loadIcons()
    }, [])

    const renderTabIcon = (focused: boolean, icons: IconSource) => (
        <Image
            source={focused ? icons.active : icons.inactive}
            style={{ width: 45, height: 45 }}
        />
    )

    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center',
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    padding: 12, // Adjust padding to prevent clipping
                    height: 20, // Ensure the height is sufficient
                    width: 100, // Ensure the width is sufficient
                    justifyContent: 'center', // Center the icon vertically
                    alignItems: 'center' // Center the icon horizontally
                },
                headerRight: () => (
                    <HStack
                        space="lg"
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
                                    {user?.email || 'User'}
                                </AvatarFallbackText>
                                <AvatarImage
                                    source={{ uri: user?.photoURL || '' }}
                                />
                                <AvatarBadge />
                            </Avatar>
                        </TouchableOpacity>
                    </HStack>
                )
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ focused }) =>
                        homeIcon && renderTabIcon(focused, homeIcon)
                }}
            />
            <Tabs.Screen
                name="learn"
                options={{
                    tabBarIcon: ({ focused }) =>
                        learnIcon && renderTabIcon(focused, learnIcon)
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: ({ focused }) =>
                        chatIcon && renderTabIcon(focused, chatIcon)
                }}
            />
        </Tabs>
    )
}
