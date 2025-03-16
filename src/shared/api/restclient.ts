import Constants from 'expo-constants'
import { getAuth } from 'firebase/auth'

export const RestClient = async <ResT, ReqT = undefined>(
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' = 'GET',
    body?: ReqT
): Promise<ResT> => {
    const apiUrl = Constants.expoConfig?.extra?.API_URL
    console.log('API URL' + apiUrl)
    // Prepare headers for the request
    const token = await getAuth().currentUser?.getIdToken()
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    }

    // Prepare the request options (method, headers, body)
    const options: RequestInit = {
        method,
        headers
    }

    // If there's a body (for POST, PATCH, PUT), stringify and add it to options
    if (body && (method === 'POST' || method === 'PATCH' || method === 'PUT')) {
        options.body = JSON.stringify(body)
    }

    try {
        const response = await fetch(`${apiUrl}${endpoint}`, options)

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data: ResT = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}
