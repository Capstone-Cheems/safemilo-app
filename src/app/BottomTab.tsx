/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react'
import { Tabs, useRouter } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage
} from '@/components/ui/avatar'
import { HStack } from '@/components/ui/hstack'
import { BellIcon, Icon } from '@/components/ui/icon'
import { useAuth } from '@/src/shared'
import TabBarIcon, { IconSource } from '@/components/TabBarIcon'

const BottomTab = (): React.JSX.Element => {
    const { user } = useAuth()
    const router = useRouter()

    const [homeIcon, setHomeIcon] = useState<IconSource | null>(null)
    const [learnIcon, setLearnIcon] = useState<IconSource | null>(null)
    const [chatIcon, setChatIcon] = useState<IconSource | null>(null)

    useEffect(() => {
        setHomeIcon({
            active: require('../../assets/images/home-active.png'),
            inactive: require('../../assets/images/home.png')
        })
        setLearnIcon({
            active: require('../../assets/images/learn-active.png'),
            inactive: require('../../assets/images/learn.png')
        })
        setChatIcon({
            active: require('../../assets/images/chat-active.png'),
            inactive: require('../../assets/images/Chat.png')
        })
    }, [])

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
                    <HStack
                        space="lg"
                        className="pr-2 justify-center items-center"
                    >
                        <TouchableOpacity
                            onPress={() =>
                                router.push(
                                    '../src/app/notification/notification'
                                )
                            }
                        >
                            <Icon
                                as={BellIcon}
                                className="text-typography-800"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() =>
                                router.push(
                                    '../src/app/notification/notification'
                                )
                            }
                        >
                            <Avatar size="md">
                                <AvatarFallbackText>
                                    {user?.email || 'User'}
                                </AvatarFallbackText>
                                <AvatarImage
                                    source={{
                                        uri:
                                            user?.photoURL ||
                                            'https://via.placeholder.com/150'
                                    }}
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
                        homeIcon && (
                            <TabBarIcon
                                focused={focused}
                                icons={homeIcon}
                                activeWidth={75}
                                inactiveWidth={45}
                                activeHeight={58}
                                inactiveHeight={50}
                                activeTop={-5}
                                inactiveTop={5}
                            />
                        )
                }}
            />

            <Tabs.Screen
                name="learn"
                options={{
                    tabBarIcon: ({ focused }) =>
                        learnIcon && (
                            <TabBarIcon
                                focused={focused}
                                icons={learnIcon}
                                activeWidth={80}
                                inactiveWidth={45}
                                activeHeight={65}
                                inactiveHeight={50}
                                activeTop={-5}
                                inactiveTop={5}
                            />
                        )
                }}
            />

            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: ({ focused }) =>
                        chatIcon && (
                            <TabBarIcon
                                focused={focused}
                                icons={chatIcon}
                                activeWidth={75}
                                inactiveWidth={65}
                                activeHeight={60}
                                inactiveHeight={50}
                                activeTop={-5}
                                inactiveTop={5}
                            />
                        )
                }}
            />
        </Tabs>
    )
}

export default BottomTab
