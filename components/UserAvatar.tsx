import { StyleSheet, View } from 'react-native';
import { Text } from '../components';
import { colors } from '../styles/colors';
import { firstLetter } from '../utils/stringUtils';
import type { UserProfileProps } from '../types/db.types';

type AvatarUserProfile = Pick<UserProfileProps, 'name'>;
interface UserAvatarProps {
  userProfile: AvatarUserProfile;
  size?: number;
}

function UserAvatar({ userProfile, size }: UserAvatarProps) {
  return (
    <View style={[styles.avatar, { width: size ?? 24, height: size || 24 }]}>
      <Text style={{ color: colors.white, textAlign: 'center' }}>
        {userProfile.name ? firstLetter(userProfile.name) : '?'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.rifleGreen,
    borderRadius: 100,
  },
});

export default UserAvatar;
