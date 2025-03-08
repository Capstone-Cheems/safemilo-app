import React, { createContext, useState, useEffect, ReactNode } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Define the context type
export interface FontSizeContextType {
    fontSize: number
    setFontSize: (size: number) => void
}

// Create Context
export const FontSizeContext = createContext<FontSizeContextType>({
    fontSize: 16, // Default size
    setFontSize: () => {}
})

// Create Provider Component
export const FontSizeProvider = ({
    children
}: {
    children: ReactNode
}): JSX.Element => {
    const [fontSize, setFontSize] = useState<number>(16) // Default to 16

    useEffect(() => {
        const loadFontSize = async (): Promise<void> => {
            const storedSize = await AsyncStorage.getItem('textSize')
            if (storedSize) {
                setFontSize(parseInt(storedSize, 10))
            }
        }
        loadFontSize()
    }, [])

    const updateFontSize = async (size: number): Promise<void> => {
        await AsyncStorage.setItem('textSize', size.toString())
        setFontSize(size)
    }

    return (
        <FontSizeContext.Provider
            value={{ fontSize, setFontSize: updateFontSize }}
        >
            {children}
        </FontSizeContext.Provider>
    )
}
