/* eslint-disable @typescript-eslint/no-require-imports */
import { ImageSourcePropType } from 'react-native'

export const scamTypeImages: Record<string, ImageSourcePropType> = {
    'Internet Scam': require('@/assets/images/internet-scam.jpg'),
    'Banking Scam': require('@/assets/images/banking-scam.jpg'),
    'Government Fraud': require('@/assets/images/government-fraud.jpg'),
    'Phone Scam': require('@/assets/images/phone-scam.jpg'),
    'Shopping Scam': require('@/assets/images/shopping-scam.jpg'),
    'Financial Scam': require('@/assets/images/financial-scam.jpg'),
    'Parking Scam': require('@/assets/images/parking-scam.jpg'),
    'Package Delivery Scam': require('@/assets/images/package-delivery-scam.jpg')
}

export const DEFAULT_SCAM_IMAGE: ImageSourcePropType = require('@/assets/images/default-scam.jpg')
