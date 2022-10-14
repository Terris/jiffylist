import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { ScreenWrapper, TextInput, Button, Alert } from '../components';
import { useAuth } from '../context/AuthContext';

function SignUpScreen() {
  const { signUp, error: serverError, setError: setServerError, loading } = useAuth();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSignUp() {
    setErrorMessage(null);
    if (!email && !password && !passwordConfirmation) {
      setErrorMessage('All fields are required.');
    } else if (password !== passwordConfirmation) {
      setErrorMessage('Password and password confirmation do not match.');
    } else {
      signUp({ email, password });
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
        <TextInput
          onChangeText={setPasswordConfirmation}
          value={passwordConfirmation}
          placeholder="Confirm Password"
          kind="password"
          disabled={loading}
        />
        {errorMessage ? <Alert kind="error">{errorMessage}</Alert> : null}
        <Button title="Sign Up" onPress={handleSignUp} disabled={loading} />
      </SafeAreaView>
    </ScreenWrapper>
  );
}

export default SignUpScreen;
