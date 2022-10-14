import { useState } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Button, TextInput } from '../components';

function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, signUp, error, loading } = useAuth();

  const handleSignIn = async () => {
    await signIn({ email, password });
  };

  const handleSignUp = async () => {
    await signUp({ email, password });
    signIn({ email, password });
  };

  return (
    <View>
      <Text>Sign Up or Sign In:</Text>
      <View>
        <TextInput placeholder="email" autoCapitalize="none" onChangeText={setEmail} />
      </View>
      <View>
        <TextInput placeholder="password" secureTextEntry onChangeText={setPassword} />
      </View>
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}

export default LoginView;
