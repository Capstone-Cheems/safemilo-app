import { Box } from '@/components/ui/box'
import React, { ReactNode } from 'react'
import { ScrollView, Text } from 'react-native'

const Home = (): ReactNode => {
    return (
        <ScrollView>
            <Box className="flex justify-center">
                <Text>Home</Text>
            </Box>
        </ScrollView>
    )
}

export default Home
