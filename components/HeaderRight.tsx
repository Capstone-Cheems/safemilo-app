import React from 'react';
import { useRouter } from 'expo-router';
import { BellIcon, Icon } from '@/components/ui/icon';
import {
    Avatar,
    AvatarBadge,
    AvatarFallbackText,
    AvatarImage,
} from '@/components/ui/avatar';
import { HStack } from '@/components/ui/hstack';
import { TouchableOpacity } from 'react-native';
import { useAuth } from '@/src/shared';

interface User {
    email?: string;
    photoURL?: string;
    displayname?: string; // Added displayname property
}

interface HeaderRightProps {
    user?: User; // User is optional
}

export const HeaderRight: React.FC<HeaderRightProps> = ({ user }) => {
    const router = useRouter();
     const { user: authUser } = useAuth()

    return (
        <HStack space="2xl" className="pr-4 justify-center items-center">
            <TouchableOpacity
                onPress={() => router.push('/notification/notification')}
            >
                <Icon
                    as={BellIcon}
                    style={{fill:'#0A2941', stroke: '#0A2941', height: 30, width: 30 }}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/profile/profile')}>
                <Avatar size="md" className='bg-[#0A2941]'>
                    <AvatarFallbackText>
                        {authUser?.displayName  || authUser?.email }{/* Fallback if no email */}
                    </AvatarFallbackText>
                    {user?.photoURL && (
                        <AvatarImage
                            source={{
                                uri: user?.photoURL ?? authUser?.photoURL ?? undefined, // Ensure uri is string or undefined
                            }}
                        />
                    )}
                    <AvatarBadge />
                </Avatar>
            </TouchableOpacity>
        </HStack>
    );
};