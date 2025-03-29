/* eslint-disable @typescript-eslint/no-require-imports */
import React, { ReactNode, useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import TabBarIcon, { IconSource } from '@/components/TabBarIcon'

export default function OrgTabLayout(): ReactNode {
    const [yourPostsIcon, setYourPostsIcon] = useState<IconSource | null>(null)
    const [postScamIcon, setPostScamIcon] = useState<IconSource | null>(null)

    useEffect(() => {
        setYourPostsIcon({
            active: require('../../../assets/images/YourPosts-active.png'),
            inactive: require('../../../assets/images/YourPosts.png')
        })
        setPostScamIcon({
            active: require('../../../assets/images/PostScam-active.png'),
            inactive: require('../../../assets/images/PostScam.png')
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
                    backgroundColor: '#ffffff',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20
                }
            }}
        >
            <Tabs.Screen
                name="createdPost"
                options={{
                    tabBarIcon: ({ focused }) =>
                        yourPostsIcon && (
                            <TabBarIcon
                                focused={focused}
                                icons={yourPostsIcon}
                                activeWidth={120}
                                inactiveWidth={70}
                                activeHeight={50}
                                inactiveHeight={45}
                                activeTop={6}
                                inactiveTop={12}
                            />
                        )
                }}
            />

            <Tabs.Screen
                name="newPost"
                options={{
                    tabBarIcon: ({ focused }) =>
                        postScamIcon && (
                            <TabBarIcon
                                focused={focused}
                                icons={postScamIcon}
                                activeWidth={120}
                                inactiveWidth={70}
                                activeHeight={50}
                                inactiveHeight={45}
                                activeTop={6}
                                inactiveTop={12}
                            />
                        )
                }}
            />
        </Tabs>
    )
}
