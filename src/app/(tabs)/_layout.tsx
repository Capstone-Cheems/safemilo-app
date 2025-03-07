import React, { ReactNode } from 'react'
import { Tabs } from 'expo-router'
import { BellIcon, Icon } from '@/components/ui/icon'
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage
} from '@/components/ui/avatar'
import { HStack } from '@/components/ui/hstack'
import { useAuth } from '@/src/shared'

export default function TabLayout(): ReactNode {
    const { user } = useAuth()
    return (
        <Tabs
            screenOptions={{
                headerTitleAlign: 'center',
                headerRight: () => (
                    <>
                        <HStack
                            space="lg"
                            reversed={false}
                            className="pr-2 justify-center items-center"
                        >
                            <Icon
                                as={BellIcon}
                                className="text-typography-800"
                            />
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
                        </HStack>
                    </>
                )
            }}
        >
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="learn" options={{ title: 'Learn' }} />
            <Tabs.Screen name="chat" options={{ title: 'Chat' }} />
        </Tabs>
    )
}
