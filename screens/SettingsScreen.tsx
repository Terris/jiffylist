import { useState } from 'react';
import { View } from 'react-native';
import { ScreenWrapper, Button, TextInput, HideKeyboard } from '../components';
import { useAuth } from '../context/AuthContext';

function SettingsScreen() {
  const { loading, session, userProfile, updateUserProfile, signOut } = useAuth();
  const [username, setUsername] = useState<string>(userProfile?.username || '');

  return (
    <ScreenWrapper>
      <HideKeyboard>
        <TextInput label="Email" value={session?.user?.email} disabled />
        <TextInput
          label="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          disabled={loading}
        />
        <View style={{ marginBottom: 12 }} />
        <Button title="Update" onPress={() => updateUserProfile({ username })} disabled={loading} />
        <View style={{ flex: 1 }} />
        <Button title="Sign Out" onPress={() => signOut()} />
      </HideKeyboard>
    </ScreenWrapper>
  );
}

export default SettingsScreen;
