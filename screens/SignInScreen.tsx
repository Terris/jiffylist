import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ScreenWrapper, TextInput, Button, Alert } from '../components';
import { useAuth } from '../context/AuthContext';

function SignInScreen() {
  const { signIn, error: serverError, setError: setServerError, loading } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSignIn() {
    setErrorMessage(null);
    if (!email && !password) {
      setErrorMessage('All fields are required.');
    } else {
      signIn({ email, password });
    }
  }

  useEffect(() => {
    if (serverError) {
      setErrorMessage(serverError);
      setServerError(null);
    }
  }, [serverError]);

  return (
    <ScreenWrapper>
      <SafeAreaView style={{ width: '100%' }}>
        <TextInput onChangeText={setEmail} value={email} placeholder="Email" kind="email" />
        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          kind="password"
          disabled={loading}
        />
        {errorMessage ? <Alert kind="error">{errorMessage}</Alert> : null}
        <Button title="Sign In" onPress={handleSignIn} disabled={loading} />
      </SafeAreaView>
    </ScreenWrapper>
  );
}

export default SignInScreen;
