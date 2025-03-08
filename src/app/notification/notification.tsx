import { View, Text } from 'react-native'

import commonStyles from '../../styles/commonStyles'

const Notifications = (): React.JSX.Element => {
    return (
        <View style={commonStyles.container}>
            <Text style={commonStyles.boldText}>Notifications</Text>
        </View>
    )
}

export default Notifications
