import React, { ReactNode } from 'react'
import { Tabs } from 'expo-router'

export default function TabLayout(): ReactNode {
    return (
        <Tabs>
            <Tabs.Screen name="createdPost" />
            <Tabs.Screen name="newPost" />
        </Tabs>
    )
}
