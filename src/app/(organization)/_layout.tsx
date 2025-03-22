import React, { ReactNode, useEffect, useState } from 'react'
import { Tabs } from 'expo-router'
import { ImageURISource, Animated } from 'react-native'

type IconSource = {
    active: ImageURISource
    inactive: ImageURISource
}

export default function OrgTabLayout(): ReactNode {
    const [yourPostsIcon, setYourPostsIcon] = useState<IconSource | null>(null)
    const [postScamIcon, setPostScamIcon] = useState<IconSource | null>(null)

    useEffect(() => {
        setYourPostsIcon({
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            active: require('../../../assets/images/YourPosts-active.png'),
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            inactive: require('../../../assets/images/YourPosts.png')
        })

        setPostScamIcon({
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            active: require('../../../assets/images/PostScam-active.png'),
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            inactive: require('../../../assets/images/PostScam.png')
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
    ): React.JSX.Element => {
        const scaleAnim = new Animated.Value(focused ? 1 : 0)

        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            Animated.timing(scaleAnim, {
                toValue: focused ? 1 : 0,
                duration: 200,
                useNativeDriver: false
            }).start()
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [focused])

        return (
            <Animated.View
                style={{
                    width: focused ? activeWidth : inactiveWidth,
                    height: focused ? activeHeight : inactiveHeight,
                    top: focused ? activeTop : inactiveTop,
                    borderBottomLeftRadius: focused ? 20 : 0,
                    borderBottomRightRadius: focused ? 20 : 0,
                    backgroundColor: focused ? '#ffffff' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Animated.Image
                    source={focused ? icons.active : icons.inactive}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="contain"
                />
            </Animated.View>
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
                        yourPostsIcon &&
                        renderTabIcon(
                            focused,
                            yourPostsIcon,
                            120, // active width
                            70, // inactive width
                            50, // active height
                            45, // inactive height
                            6, // active top
                            12 // inactive top
                        )
                }}
            />

            <Tabs.Screen
                name="newPost"
                options={{
                    tabBarIcon: ({ focused }) =>
                        postScamIcon &&
                        renderTabIcon(
                            focused,
                            postScamIcon,
                            120,
                            70,
                            50,
                            45,
                            6,
                            12
                        )
                }}
            />
        </Tabs>
    )
}
