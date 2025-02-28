import React, { ReactNode } from 'react'
import { Tabs } from 'expo-router'

export default function TabLayout(): ReactNode {
    return (
        <Tabs>
            <Tabs.Screen name="home" />
            <Tabs.Screen name="learn" />
            <Tabs.Screen name="chat" />
        </Tabs>
    )
}
