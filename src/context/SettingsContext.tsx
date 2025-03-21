import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

// Define context type
interface SettingsContextType {
    textSize: number
    setTextSize: (size: number) => void
    isBold: boolean
    setIsBold: (bold: boolean) => void
}

const SettingsContext = createContext<SettingsContextType | undefined>(
    undefined
)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
    children
}) => {
    const [textSize, setTextSize] = useState<number>(20)
    const [isBold, setIsBold] = useState<boolean>(false)

    // Load saved settings when the app starts
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const savedTextSize = await AsyncStorage.getItem('textSize')
                const savedIsBold = await AsyncStorage.getItem('isBold')
                if (savedTextSize !== null) setTextSize(Number(savedTextSize))
                if (savedIsBold !== null) setIsBold(savedIsBold === 'true')
            } catch (error) {
                console.error('Failed to load settings:', error)
            }
        }

        loadSettings()
    }, [])

    // Save settings whenever they change
    useEffect(() => {
        AsyncStorage.setItem('textSize', textSize.toString())
    }, [textSize])

    useEffect(() => {
        AsyncStorage.setItem('isBold', isBold.toString())
    }, [isBold])

    return (
        <SettingsContext.Provider
            value={{ textSize, setTextSize, isBold, setIsBold }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

// Custom hook to use settings context
export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}
