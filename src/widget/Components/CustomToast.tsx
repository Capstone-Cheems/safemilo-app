// components/CustomToast.tsx
import React from 'react'
import { View, Text } from 'react-native'
import commonStyles from '../../styles/commonStyles'

type CustomToastProps = {
    visible: boolean
    message: string
}

const CustomToast: React.FC<CustomToastProps> = ({ visible, message }) => {
    if (!visible) return null

    return (
        <View style={commonStyles.toastContainer}>
            <Text style={commonStyles.toastText}>{message}</Text>
        </View>
    )
}

export default CustomToast
