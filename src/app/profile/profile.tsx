import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    TextInput,
    Image,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import commonStyles from '../../styles/commonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { HeaderRight } from '../../../components/HeaderRight';
import {
    Montserrat_300Light,
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold
} from '@expo-google-fonts/montserrat';
import { useAuth } from '@/src/shared';
import { getAuth } from '@react-native-firebase/auth';
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage
} from '@/components/ui/avatar';

const Profile = (): React.JSX.Element => {
    const [textSize, setTextSize] = useState(28); // Default text size
    const [isBold, setIsBold] = useState(false);

    const navigation = useNavigation();
    const router = useRouter();
    const { logout } = useAuth();

    interface UserData {
        displayName: string | null;
        email: string;
        uid: string;
        providerData: { providerId: string }[];
        photoURL: string | null;
    }

    // Function to load settings
    const loadSettings = useCallback(async () => {
        try {
            const storedSize = await AsyncStorage.getItem('textSize');
            const storedBold = await AsyncStorage.getItem('isBold');

            if (storedSize) {
                setTextSize(parseInt(storedSize));
            }

            if (storedBold) {
                setIsBold(storedBold === 'true');
            }
        } catch (error) {
            console.error('Error loading settings:', error);
        }
    }, []);

    // Load settings when the screen is focused
    useFocusEffect(
        useCallback(() => {
            loadSettings();
        }, [loadSettings])
    );

    // Set the header with HeaderRight (no title in header)
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <HeaderRight />
            // headerLeft: () => (
            //     <TouchableOpacity onPress={() => navigation.goBack()}>
            //         <Image
            //             source={require('../../../assets/images/Back-arrow.png')} // Custom back button image
            //             style={{ width: 30, height: 30, marginLeft: 10 }} // Adjust size as needed
            //         />
            //     </TouchableOpacity>
            // ),
        });
    }, [navigation]);

    const [fontsLoaded] = useFonts({
        Montserrat_400Regular,
        Montserrat_700Bold,
        Montserrat_500Medium,
        Montserrat_300Light,
        Montserrat_600SemiBold,
    });

    if (!fontsLoaded) {
        return (
            <View style={commonStyles.loadingContainer}>
                <ActivityIndicator size="large" color="#000000" />
                <Text>{!fontsLoaded ? 'Loading Fonts...' : 'Loading saved posts...'}</Text>
            </View>
        );
    }

    const handleLogout = async () => {
        try {
            logout();
            Alert.alert('Success', 'You have been logged out!');
        } catch (error) {
            Alert.alert('Logout Failed', (error as Error).message);
        }
    };

    const navigateTo = (path: string) => {
        router.push(path);
    };

    return (
        <View style={commonStyles.profilecontainer}>
            {/* Static Profile text hooked to the top-left */}
            <View
                style={{ position: 'absolute', top: 0, left: 5, padding: 10 }}
            >
                <Text
                    style={{
                        fontSize: textSize + 10,
                        fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                    }}
                >
                    Profile
                </Text>
            </View>

            <View style={styles.container}>
                <Avatar size="2xl">
                    <AvatarFallbackText>
                        {getAuth()?.currentUser?.displayName}
                    </AvatarFallbackText>
                    <AvatarImage
                        source={{
                            uri: getAuth().currentUser?.photoURL ?? '',
                        }}
                    />
                    <AvatarBadge />
                </Avatar>
            </View>

            <Text
                style={{
                    fontSize: textSize + 6,
                    fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                }}
            >
                {getAuth().currentUser?.displayName}
            </Text>

            <Text
                style={{
                    fontSize: textSize - 9,
                    fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                    marginBottom: 10,
                }}
            >
                {getAuth() ? getAuth().currentUser?.email : 'Guest'}
            </Text>

            {/* Buttons */}
            <TouchableOpacity
                onPress={() => navigateTo('./settings')}
                style={commonStyles.toplargeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3.5,
                            fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                        },
                    ]}
                >
                    Settings
                </Text>
                <Image
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: textSize - 3.5, height: textSize - 3.5, marginLeft: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./saved-posts')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3.5,
                            fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                        },
                    ]}
                >
                    Saved Posts
                </Text>
                <Image
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: textSize - 3.5, height: textSize - 3.5, marginLeft: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./feature-walkthrough')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3.5,
                            fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                        },
                    ]}
                >
                    Feature Walkthrough
                </Text>
                <Image
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: textSize - 3.5, height: textSize - 3.5, marginLeft: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./faq')}
                style={commonStyles.largeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3.5,
                            fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                        },
                    ]}
                >
                    FAQ's
                </Text>
                <Image
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: textSize - 3.5, height: textSize - 3.5, marginLeft: 10 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateTo('./report-bug')}
                style={commonStyles.bottomlargeformButton}
            >
                <Text
                    style={[
                        commonStyles.ptext,
                        {
                            fontSize: textSize - 3.5,
                            fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_500Medium',
                        },
                    ]}
                >
                    Report a Bug
                </Text>
                <Image
                    source={require('../../../assets/images/profile-arrow.png')}
                    style={{ width: textSize - 3.5, height: textSize - 3.5, marginLeft: 10 }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
                <Text
                    style={[
                        commonStyles.ltext,
                        {
                            fontSize: textSize + 3,
                            fontFamily: isBold ? 'Montserrat_700Bold' : 'Montserrat_600SemiBold',
                        },
                    ]}
                >
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 2,
        borderColor: '#ccc',
        marginBottom: 10,
    },
});

export default Profile;