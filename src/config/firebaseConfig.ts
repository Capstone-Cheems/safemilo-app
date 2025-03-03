import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import Constants from 'expo-constants'

const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
    authDomain: Constants.expoConfig?.extra?.FIREBASE_AUTH_DOMAIN,
    projectId: Constants.expoConfig?.extra?.FIREBASE_PROJECT_ID,
    storageBucket: Constants.expoConfig?.extra?.FIREBASE_STORAGE_BUCKET,
    messagingSenderId:
        Constants.expoConfig?.extra?.FIREBASE_MESSAGING_SENDER_ID,
    appId: Constants.expoConfig?.extra?.FIREBASE_APP_ID
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
export const FIRESTORE_DB = getFirestore(FIREBASE_APP)
