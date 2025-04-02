import { Center } from '@/components/ui/center'
import { HStack } from '@/components/ui/hstack'
import { Spinner } from '@/components/ui/spinner'
import { Text } from '@/components/ui/text'
import { NewsResponse, useFetchData } from '@/src/shared'
import { NewsList } from '@/src/widget/news'
import React, { ReactNode } from 'react'
import Loader from '@/components/Loader'

export const NewsSection = (): ReactNode => {
    const { data, loading, error } = useFetchData<NewsResponse>('news')
    return (
        <>
            {loading ? (
                <Center>
                    <HStack className="items-center justify-center m-0 p-0">
                        <Loader />
                    </HStack>
                </Center>
            ) : error ? (
                <Text> Error loading..</Text>
            ) : data && data.data && data.data.length > 0 ? (
                <NewsList news={data.data}></NewsList>
            ) : (
                <Text>No data found</Text>
            )}
        </>
    )
}
