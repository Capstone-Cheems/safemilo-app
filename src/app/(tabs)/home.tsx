import { Box } from '@/components/ui/box'
import { NewsSection } from '@/src/features/news/news-section'
import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native'

const Home = (): ReactNode => {
    return (
        <ScrollView>
            <Box className="flex justify-center">
                <NewsSection />
            </Box>
        </ScrollView>
    )
}

export default Home
