import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native';
import { ScreenWrapper, TextInput, Button, Alert, HideKeyboard } from '../components';
import { useAuth } from '../context/AuthContext';

function SignUpScreen() {
  const { loading, error, signUp } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  const handleSignUp = useCallback(async () => {
    setValidationMessage(null);
    if (password !== passwordConfirmation) {
      setValidationMessage('Passwords do not match');
      return;
    }
    await signUp({ email, password });
  }, [password, passwordConfirmation, email, signUp, setValidationMessage]);

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
        />
        <TextInput
          label="Password"
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          kind="password"
          disabled={loading}
        />
        <TextInput
          label="Confirm password"
          onChangeText={setPasswordConfirmation}
          value={passwordConfirmation}
          placeholder="Confirm Password"
          kind="password"
          disabled={loading}
        />
        <Button title="Sign Up" onPress={() => handleSignUp()} disabled={loading} />
      </HideKeyboard>
    </ScreenWrapper>
  );
}

export default SignUpScreen;
