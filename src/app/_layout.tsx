import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { ReactNode, useEffect } from 'react'
import 'react-native-reanimated'
import { Stack } from 'expo-router'
import SpaceMonoFont from '../../assets/fonts/SpaceMono-Regular.ttf'
import { useColorScheme } from '../../components/useColorScheme'
import { GluestackUIProvider } from '../../components/ui/gluestack-ui-provider'
import '../../global.css'
import { AuthProvider } from '../contexts/AuthContext'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
    initialRouteName: 'onboarding/onboarding'
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout(): ReactNode {
    const [loaded, error] = useFonts({
        SpaceMono: SpaceMonoFont
    })

    useEffect(() => {
        if (error) throw error
    }, [error])

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync()
        }
    }, [loaded])

    if (!loaded) {
        return null
    }

    return (
        <AuthProvider>
            <GluestackUIProvider mode="light">
                <RootLayoutNav />
            </GluestackUIProvider>
        </AuthProvider>
    )
}

function RootLayoutNav(): ReactNode {
    const colorScheme = useColorScheme()

    return (
        <GluestackUIProvider mode="light">
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack />
            </ThemeProvider>
        </GluestackUIProvider>
    )
}
