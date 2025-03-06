// // import React, { useEffect, useState, type ReactNode } from 'react'
// // import { NavigationContainer } from '@react-navigation/native'
// // import { createNativeStackNavigator } from '@react-navigation/native-stack'
// // import Login from './screens/Login'
// // import LoginIndividual from './screens/LoginIndividual'
// // import Signup from './screens/Signup'
// // import SignupIndividual from './screens/SignupIndividual'
// // import Home from './screens/Home'
// // import CreatedPost from './screens/CreatedPost'
// // import NewPost from './screens/NewPost'
// // import { onAuthStateChanged, User } from 'firebase/auth'
// // import { FIREBASE_AUTH } from '../FirebaseConfig'
// // import PostDetails from './screens/PostDetails'
// // import { RootStackParamList } from '../types/types'

// // const Stack = createNativeStackNavigator<RootStackParamList>()

// // export default function App(): ReactNode {
// //     const [user, setUser] = useState<User | null>(null)
// //     const [loading, setLoading] = useState(true)

// //     useEffect(() => {
// //         onAuthStateChanged(FIREBASE_AUTH, user => {
// //             setUser(user)
// //             setLoading(false)
// //         })
// //     }, [])

// //     if (loading) return null

// //     return (
// //         <NavigationContainer>
// //             <Stack.Navigator>
// //                 {user ? (
// //                     user.email?.includes('@organization.com') ? (
// //                         <>
// //                             <Stack.Screen
// //                                 name="created post"
// //                                 component={CreatedPost}
// //                             />
// //                             <Stack.Screen
// //                                 name="post details"
// //                                 component={PostDetails}
// //                             />
// //                             <Stack.Screen name="new post" component={NewPost} />
// //                         </>
// //                     ) : (
// //                         <>
// //                             <Stack.Screen name="Home" component={Home} />
// //                         </>
// //                     )
// //                 ) : (
// //                     <>
// //                         <Stack.Screen
// //                             name="LoginIndividual"
// //                             component={LoginIndividual}
// //                         />
// //                         <Stack.Screen name="Login" component={Login} />
// //                         <Stack.Screen
// //                             name="SignupIndividual"
// //                             component={SignupIndividual}
// //                         />
// //                         <Stack.Screen name="Signup" component={Signup} />
// //                     </>
// //                 )}
// //             </Stack.Navigator>
// //         </NavigationContainer>
// //     )
// // }

// import React from 'react'
// import { SafeAreaView, ScrollView } from 'react-native'
// import CourseCard from './Components/CourseCard'
// import LessonCard from './Components/LessonCard'
// import QuizQuestion from './Components/QuizQuestion'
// import Badge from './Components/Badge'
// import ProgressBar from './Components/ProgressBar'
// import VideoPlayer from './Components/Videoplayer'

// export default function App() {
//     return (
//         <SafeAreaView style={{ flex: 1, padding: 20 }}>
//             <ScrollView>
//                 {/* CourseCard Component */}
//                 <CourseCard
//                     title="Scam Awareness Basics"
//                     progress={50}
//                     onPress={() => alert('Course Clicked!')}
//                 />
//                 {/* LessonCard Component */}
//                 <LessonCard
//                     title="Lesson 1: Introduction"
//                     lessonNumber={1}
//                     completed={false}
//                     onPress={() => alert('Lesson Clicked!')}
//                 />
//                 QuizQuestion Component
//                 <QuizQuestion
//                     question="What should you do if someone calls claiming to be from the government and demands payment?"
//                     options={[
//                         'Pay immediately to avoid trouble',
//                         'Hang up and verify independently',
//                         'Give your personal details to confirm'
//                     ]}
//                     correctAnswer="Hang up and verify independently"
//                     onAnswer={isCorrect =>
//                         alert(isCorrect ? 'Correct!' : 'Wrong Answer!')
//                     }
//                 />
//                 {/* Badge Component */}
//                 <Badge name="Scam Spotter" />
//                 {/* ProgressBar Component */}
//                 <ProgressBar progress={75} />
//                 {/* VideoPlayer Component */}
//                 <VideoPlayer uri="https://www.w3schools.com/html/mov_bbb.mp4" />
//             </ScrollView>
//         </SafeAreaView>
//     )
// }

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LearnNavigator from '../screens/LearnNavigator';


const App = (): JSX.Element => {
    return (
        <NavigationContainer>
            <LearnNavigator />
        </NavigationContainer>
    )
}

export default App
