import { Box } from '@/components/ui/box'
import React, { ReactNode } from 'react'
import { ScrollView } from 'react-native'
import LearnDashboardScreen from '../learning/LearnDashboard'

const Learn = (): ReactNode => {
    return (
        <ScrollView>
            <Box>
                <LearnDashboardScreen />
            </Box>
        </ScrollView>
    )
}

export default Learn
