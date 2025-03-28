import 'dotenv/config'

export default {
    expo: {
        name: 'SafeMilo',
        slug: 'safemilo',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        newArchEnabled: true,
        owner: 'uvoleti00-org',
        splash: {
            image: './assets/images/splash-icon.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff'
        },
        ios: {
            supportsTablet: true,
            googleServicesFile: './GoogleService-Info.plist',
            bundleIdentifier: 'com.safemilo.app'
        },
        android: {
            package: 'com.safemilo.app',
            googleServicesFile: './google-services.json',
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff'
            },
            Permissions: [
                'android.permission.BIND_SCREENING_SERVICE',
                'android.permission.BIND_NOTIFICATION_LISTENER_SERVICE',
                'android.permission.INTERNET'
            ],
            intentFilters: [
                {
                    action: 'VIEW',
                    data: {
                        scheme: 'http'
                    }
                }
            ]
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png'
        },
        plugins: [
            'expo-router',
            'expo-asset',
            '@react-native-firebase/app',
            '@react-native-firebase/auth',
            [
                'expo-build-properties',
                {
                    ios: {
                        useFrameworks: 'static'
                    },
                    android: {
                        usesCleartextTraffic: true,
                        networkSecurityConfig: './network_security_config.xml'
                    }
                }
            ],
            [
                'expo-dev-client',
                {
                    launchMode: 'most-recent'
                }
            ],
            [
                'expo-font',
                {
                    fonts: [
                        './assets/fonts/Montserrat-Regular.ttf',
                        './assets/fonts/Montserrat-Medium.ttf',
                        './assets/fonts/Montserrat-SemiBold.ttf',
                        './assets/fonts/Montserrat-Bold.ttf',
                        './assets/fonts/Montserrat-ExtraBold.ttf'
                    ]
                }
            ]
        ],
        extra: {
            FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
            FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
            FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
            FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
            FIREBASE_MESSAGING_SENDER_ID:
                process.env.FIREBASE_MESSAGING_SENDER_ID,
            FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
            API_URL: process.env.API_URL,
            S3_IMAGE_URL: process.env.S3_IMAGE_URL,
            S3_NO_IMAGE: process.env.S3_NO_IMAGE,
            eas: {
                projectId: '167efeae-ffda-4722-89c6-a4abff155ed6'
            }
        }
    }
}
