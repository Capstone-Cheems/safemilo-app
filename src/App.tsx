import { useEffect, useState, type ReactNode } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login'
import LoginIndividual from './screens/LoginIndividual'
import Signup from './screens/Signup'
import SignupIndividual from './screens/SignupIndividual'
import Home from './screens/Home'
import CreatedPost from './screens/CreatedPost'
import NewPost from './screens/NewPost'
import { onAuthStateChanged, User } from 'firebase/auth'
import { FIREBASE_AUTH } from '../FirebaseConfig'
import PostDetails from './screens/PostDetails'
import { RootStackParamList } from '../types/types'
import Learn from './screens/Learn'
import Chat from './screens/Chat'

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator()

const HomeStack = (): React.JSX.Element => (
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
)

const LearnStack = (): React.JSX.Element => (
    <Stack.Navigator>
        <Stack.Screen name="Learn" component={Learn} />
    </Stack.Navigator>
)

const ChatStack = (): React.JSX.Element => (
    <Stack.Navigator>
        <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
)

export default function App(): ReactNode {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, user => {
            setUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    if (loading) return null

    return (
        <NavigationContainer>
            {user ? (
                <Tab.Navigator>
                    <Tab.Screen name="Home" component={HomeStack} />
                    <Tab.Screen name="Learn" component={LearnStack} />
                    <Tab.Screen name="Chat" component={ChatStack} />
                </Tab.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen
                        name="LoginIndividual"
                        component={LoginIndividual}
                    />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen
                        name="SignupIndividual"
                        component={SignupIndividual}
                    />
                    <Stack.Screen name="Signup" component={Signup} />
                </Stack.Navigator>
            )}
        </NavigationContainer>
    )
}
