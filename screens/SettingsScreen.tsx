import { View } from 'react-native';
import { ScreenWrapper, Button, Text } from '../components';
import { useAuth } from '../context/AuthContext';

function SettingsScreen() {
  const { user, signOut } = useAuth();

  return (
    <ScreenWrapper>
      <View style={{ width: '100%' }}>
        <Text style={{ paddingBottom: 12, fontSize: 21 }}>{user?.profile.email}</Text>
        <Text style={{ paddingBottom: 21 }}>{user?.profile.email}</Text>
        <Button title="Log Out" onPress={signOut} />
      </View>
    </ScreenWrapper>
  );
}

export default SettingsScreen;
