import { Center } from '@/components/ui/center'
import { HStack } from '@/components/ui/hstack'
import { Spinner } from '@/components/ui/spinner'
import { Text } from '@/components/ui/text'
import { NewsResponse, useFetchData } from '@/src/shared'
import { NewsList } from '@/src/widget/news'
import Constants from 'expo-constants'
import React, { ReactNode } from 'react'

export const NewsSection = (): ReactNode => {
    const { data, loading, error } = useFetchData<NewsResponse>('news')
    return (
        <>
            {loading ? (
                <Center>
                    <HStack space="xl">
                        <Spinner />
                        <Text size="md">Loading..</Text>
                    </HStack>
                </Center>
            ) : error ? (
                <Text> Error loading.. {error}----{Constants.expoConfig?.extra?.API_URL}</Text>
            ) : data && data.data && data.data.length > 0 ? (
                <NewsList news={data.data}></NewsList>
            ) : (
                <Text>No data found</Text>
            )}
        </>
    )
}
