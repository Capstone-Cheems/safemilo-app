export const RestClient = async <T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' = 'GET',
    body?: T
): Promise<T> => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL
    //const token = process.env.EXPO_PUBLIC_API_KEY

    // Prepare headers for the request
    const headers: HeadersInit = {
        'Content-Type': 'application/json'
        //Authorization: `Bearer ${token}`
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
            throw new Error('Network response was not ok')
        }

        const data: T = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching data:', error)
        throw error
    }
}
