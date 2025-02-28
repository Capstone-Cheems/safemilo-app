import FontAwesome from '@expo/vector-icons/FontAwesome'
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { ReactNode, useEffect } from 'react'
import 'react-native-reanimated'
import SpaceMonoFont from '../../assets/fonts/SpaceMono-Regular.ttf'
import { useColorScheme } from '../../components/useColorScheme'
import { GluestackUIProvider } from '../../components/ui/gluestack-ui-provider'
import '../../global.css'

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary
} from 'expo-router'

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(tabs)'
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout(): ReactNode {
    const [loaded, error] = useFonts({
        SpaceMono: SpaceMonoFont,
        ...FontAwesome.font
    })

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
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
        <GluestackUIProvider mode="light">
            <RootLayoutNav />
        </GluestackUIProvider>
    )
}

function RootLayoutNav(): ReactNode {
    const colorScheme = useColorScheme()

    return (
        <GluestackUIProvider mode="light">
            <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
            >
                <Stack>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </ThemeProvider>
        </GluestackUIProvider>
    )
}
