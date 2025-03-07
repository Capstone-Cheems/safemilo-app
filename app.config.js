import 'dotenv/config'

export default {
    expo: {
        name: 'safemilo',
        slug: 'safemilo',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        newArchEnabled: true,
        splash: {
            image: './assets/images/splash-icon.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff'
        },
        ios: {
            supportsTablet: true
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff'
            }
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png'
        },
        plugins: ['expo-router', 'expo-asset'],
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
            S3_NO_IMAGE: process.env.S3_NO_IMAGE
        }
    }
}
