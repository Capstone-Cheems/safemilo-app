export type RootStackParamList = {
    Login: undefined
    LoginIndividual: undefined
    Signup: undefined
    SignupIndividual: undefined
    Home: undefined
    'created post': undefined
    'post details': { newsID: string }
    'new post': undefined
    LearnDashboard: undefined
    BrowseCategories: undefined
    SpecificCategory: { categoryName: string }
    Achievements: undefined
    Lesson: { courseId?: string }
    Quiz: { lessonId?: string }
}
