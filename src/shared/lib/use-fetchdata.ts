import { RestClient } from '../api'
import { useState, useEffect, useCallback } from 'react'

type UseFetchDataReturn<ResT, ReqT> = {
    data: ResT | null
    loading: boolean
    error: string | null
    fetchData: (
        method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
        body?: ReqT
    ) => Promise<void>
}

export const useFetchData = <ResT, ReqT = undefined>(
    endpoint: string
): UseFetchDataReturn<ResT, ReqT> => {
    const [data, setData] = useState<ResT | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchData = useCallback(
        async (
            method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT',
            body?: ReqT
        ) => {
            try {
                setLoading(true)
                const result = await RestClient<ResT, ReqT>(
                    endpoint,
                    method,
                    body
                )
                setData(result)
            } catch (err) {
                setError('Failed to fetch data: ' + err)
                console.error(err)
            } finally {
                setLoading(false)
            }
        },
        [endpoint]
    )

    useEffect(() => {
        fetchData('GET')
    }, [fetchData])

    return { data, loading, error, fetchData }
}
