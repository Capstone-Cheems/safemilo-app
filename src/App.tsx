import { useEffect, useState, type ReactNode } from 'react'
import { NavigationContainer } from '@react-navigation/native'
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

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App(): ReactNode {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, user => {
            setUser(user)
            setLoading(false)
        })
    }, [])

    if (loading) return null

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    user.email?.includes('@organization.com') ? (
                        <>
                            <Stack.Screen
                                name="created post"
                                component={CreatedPost}
                            />
                            <Stack.Screen
                                name="post details"
                                component={PostDetails}
                            />
                            <Stack.Screen name="new post" component={NewPost} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Home" component={Home} />
                        </>
                    )
                ) : (
                    <>
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
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
