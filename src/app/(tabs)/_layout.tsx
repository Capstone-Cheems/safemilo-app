import React, { ReactNode } from 'react'
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
import { TouchableOpacity, Image } from 'react-native'

export default function TabLayout(): ReactNode {
    const { user } = useAuth()
    const router = useRouter()
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
            <Tabs.Screen name="home" options={{ title: 'Home' }} />
            <Tabs.Screen name="learn" options={{ title: 'Learn' }} />
            <Tabs.Screen
                name="chat"
                options={{
                    tabBarIcon: () => (
                        <Image
                            // eslint-disable-next-line @typescript-eslint/no-require-imports
                            source={require('../../../assets/images/ChatIcon.png')}
                        />
                    ),
                    title: 'Chat with Milo'
                }}
            />
        </Tabs>
    )
}
