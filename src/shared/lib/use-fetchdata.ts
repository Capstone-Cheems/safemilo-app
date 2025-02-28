import { RestClient } from '../api'
import { useState, useEffect, useCallback } from 'react'

type UseFetchDataReturn<T> = {
    data: T | null
    loading: boolean
    error: string | null
    fetchData: (
        method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
        body?: T
    ) => Promise<void>
}

export const useFetchData = <T>(endpoint: string): UseFetchDataReturn<T> => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(
        async (
            method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
            body?: T
        ) => {
            try {
                setLoading(true)
                const result = await RestClient<T>(endpoint, method, body)
                setData(result)
            } catch (err) {
                setError('Failed to fetch data')
                console.error(err)
            } finally {
                setLoading(false)
            }
        },
        [endpoint]
    )

    useEffect(() => {
        fetchData('GET') // Default to GET method on mount
    }, [fetchData])

    return { data, loading, error, fetchData }
}
