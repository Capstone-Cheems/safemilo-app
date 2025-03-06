import { Center } from '@/components/ui/center'
import { HStack } from '@/components/ui/hstack'
import { Spinner } from '@/components/ui/spinner'
import { News, useFetchData } from '@/src/shared'
import { VieNews } from '@/src/widget/news'
import { useLocalSearchParams } from 'expo-router'
import React, { ReactNode } from 'react'
import { Text } from '@/components/ui/text'
import { ScrollView } from 'react-native'

const ViewNewsPage = (): ReactNode => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data, loading, error } = useFetchData<News>(`news/${id}`)
    return (
        <ScrollView>
            {loading ? (
                <Center>
                    <HStack space="xl">
                        <Spinner />
                        <Text size="md">Loading..</Text>
                    </HStack>
                </Center>
            ) : error ? (
                <Text> Error loading.. ${error}</Text>
            ) : data ? (
                <VieNews news={data} coverImage={id}></VieNews>
            ) : (
                <Text>No data found</Text>
            )}
        </ScrollView>
    )
}

export default ViewNewsPage
