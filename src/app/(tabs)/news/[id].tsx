import { Center } from '@/components/ui/center'
import { HStack } from '@/components/ui/hstack'
import { Spinner } from '@/components/ui/spinner'
import { News, useFetchData } from '@/src/shared'
import { VieNews } from '@/src/widget/news'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import React, { ReactNode, useLayoutEffect } from 'react'
import { Text } from '@/components/ui/text'
import { ScrollView } from 'react-native'
import Loader from '@/components/Loader'

const ViewNewsPage = (): ReactNode => {
    const { id } = useLocalSearchParams<{ id: string }>()
    const { data, loading, error } = useFetchData<News>(`news/${id}`)
    const navigation = useNavigation()
    useLayoutEffect(() => {
        navigation.setOptions({ title: 'News' })
    }, [navigation])
    return (
        <ScrollView>
            {loading ? (
                <Center>
                    <HStack>
                        <Loader />
                    </HStack>
                </Center>
            ) : error ? (
                <Text> Error loading.. ${error}</Text>
            ) : data ? (
                <VieNews news={data} />
            ) : (
                <Text>No data found</Text>
            )}
        </ScrollView>
    )
}

export default ViewNewsPage
