import { Box } from '@/components/ui/box'
import { Image } from '@/components/ui/image'

import React, { ReactNode } from 'react'
import { ScrollView, Text } from 'react-native'

const Index = (): ReactNode => {
    return (
        <ScrollView>
            <Box>
                <Text className="mt-5">Index</Text>
                <Image
                    size="full"
                    source={{
                        uri: 'https://safemylo.s3.us-east-1.amazonaws.com/no-image-icon.png'
                    }}
                />
            </Box>
        </ScrollView>
    )
}

export default Index
