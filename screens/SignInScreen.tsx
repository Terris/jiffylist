import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { ScreenWrapper, TextInput, Button, Alert, HideKeyboard } from '../components';

function SignInScreen() {
  const { error, loading, signIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const handleSignIn = useCallback(async () => {
    if (!email || !password) {
      setValidationMessage('All fields are required.');
      return;
    }
    await signIn({ email, password });
  }, [email, password, signIn, setValidationMessage]);

  return (
    <ScreenWrapper>
      <HideKeyboard>
        {error ? <Alert kind="error">{error}</Alert> : null}
        {validationMessage ? <Alert kind="error">{validationMessage}</Alert> : null}
        <TextInput
          label="Email"
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
          kind="email"
          disabled={loading}
        />
        <TextInput
          label="Password"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          kind="password"
          disabled={loading}
        />
        <Button title="Sign In" onPress={handleSignIn} disabled={loading} />
      </HideKeyboard>
    </ScreenWrapper>
  );
}

export default SignInScreen;
