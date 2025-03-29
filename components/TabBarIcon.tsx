import React, { useEffect, useRef } from 'react'
import { Animated, ImageURISource } from 'react-native'

export type IconSource = {
    active: ImageURISource
    inactive: ImageURISource
}

interface TabBarIconProps {
    focused: boolean
    icons: IconSource
    activeWidth: number
    inactiveWidth: number
    activeHeight: number
    inactiveHeight: number
    activeTop: number
    inactiveTop: number
}

const TabBarIcon: React.FC<TabBarIconProps> = ({
    focused,
    icons,
    activeWidth,
    inactiveWidth,
    activeHeight,
    inactiveHeight,
    activeTop,
    inactiveTop
}) => {
    const scaleAnim = useRef(new Animated.Value(focused ? 1 : 0)).current

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
            resizeMode="contain"
        />
    )
}

export default TabBarIcon
