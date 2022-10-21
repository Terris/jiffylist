import { StyleSheet, View } from 'react-native';
import { colors } from '../styles/colors';
import { firstLetter } from '../utils/stringUtils';
import type { UserProfileProps } from '../types/models.types';
import Text from './Text';

type AvatarUserProfile = Pick<UserProfileProps, 'username'>;

interface UserAvatarProps {
  userProfile: AvatarUserProfile;
  size?: number;
}

function UserAvatar({ userProfile, size }: UserAvatarProps) {
  return (
    <View style={[styles.avatar, { width: size ?? 24, height: size || 24 }]}>
      <Text style={{ color: colors.white, textAlign: 'center' }}>
        {userProfile.username ? firstLetter(userProfile.username) : '?'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
});

export default UserAvatar;
