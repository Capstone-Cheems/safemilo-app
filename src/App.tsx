import { useEffect, useState, type ReactNode } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from './screens/Login';
import CreatedPost from './screens/CreatedPost';
import NewPost from './screens/NewPost';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import PostDetails from './screens/PostDetails';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
    return (
        <InsideStack.Navigator>
            <InsideStack.Screen name="created post" component={CreatedPost} />
            <InsideStack.Screen name="post details" component={PostDetails} />
            <InsideStack.Screen name="new post" component={NewPost} />
        </InsideStack.Navigator>
    );
}

export default function App(): ReactNode {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            console.log('user', user);
            setUser(user);
        });
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                {user ? (
                    <Stack.Screen name='Inside' component={InsideLayout} options={{ headerShown: false }} />
                ) : (
                    <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
