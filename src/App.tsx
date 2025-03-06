import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LearnNavigator from './screens/LearnNavigator'

const App = (): JSX.Element => {
    return (
        <NavigationContainer>
            <LearnNavigator />
        </NavigationContainer>
    )
}

export default App
