// components/HeaderRight.tsx
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

interface User {
  email?: string;
  photoURL?: string;
}

interface HeaderRightProps {
  user?: User;
}

export const HeaderRight: React.FC<HeaderRightProps> = ({ user }) => {
  const router = useRouter();

  return (
    <HStack
      space="lg"
      reversed={false}
      className="pr-2 justify-center items-center"
    >
      <TouchableOpacity
        onPress={() => router.push('/notification/notification')}
      >
        <Icon as={BellIcon} className="text-typography-800" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/profile/profile')}>
        <Avatar size="sm">
          <AvatarFallbackText>{user?.email ?? 'User'}</AvatarFallbackText>
          <AvatarImage source={{ uri: user?.photoURL ?? '' }} />
          <AvatarBadge />
        </Avatar>
      </TouchableOpacity>
    </HStack>
  );
};