import { Box } from '@/components/ui/box'
import { NewsSection } from '@/src/features/news/news-section'
import { useNavigation } from 'expo-router'
import React, { ReactNode, useLayoutEffect } from 'react'
import { ScrollView } from 'react-native'

const BrowsePosts = (): ReactNode => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({ title: 'Browse News', headerShown: true })
    }, [navigation])

    return (
        <ScrollView>
            <Box className="flex justify-center bg-white">
                <NewsSection />
            </Box>
        </ScrollView>
    )
}

export default BrowsePosts
