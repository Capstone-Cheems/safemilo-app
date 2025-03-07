import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { ReactNode, useEffect } from 'react'
import 'react-native-reanimated'
import { Stack, useRouter } from 'expo-router'
import SpaceMonoFont from '../../assets/fonts/SpaceMono-Regular.ttf'
import { useColorScheme } from '../../components/useColorScheme'
import { GluestackUIProvider } from '../../components/ui/gluestack-ui-provider'
import '../../global.css'
import { AuthProvider, useAuth } from '../shared'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
    initialRouteName: '/'
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
            <RootLayoutNav />
        </AuthProvider>
    )
}

function RootLayoutNav(): ReactNode {
    const colorScheme = useColorScheme()

    const { user } = useAuth() // Get auth state
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.replace('/auth/login') // Redirect if not authenticated
        }
    }, [user, router])

    return (
        <GluestackUIProvider mode="light">
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack screenOptions={{ gestureEnabled: false }}>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="(organization)"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </ThemeProvider>
        </GluestackUIProvider>
    )
}
