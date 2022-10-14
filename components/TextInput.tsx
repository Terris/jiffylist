import {
  TextInput as PrimitiveTextInput,
  StyleSheet,
  TextInputProps as PrimitiveTextInputProps,
} from 'react-native';
import { colors } from '../styles/colors';

interface TextInputProps extends PrimitiveTextInputProps {
  kind?: 'text' | 'email' | 'password' | 'newPassword' | 'url';
  disabled?: boolean;
}

function TextInput({ onChangeText, value, placeholder, kind, disabled }: TextInputProps) {
  return (
    <PrimitiveTextInput
      style={styles.input}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      keyboardType={kind === 'email' ? 'email-address' : kind === 'url' ? 'url' : 'default'}
      autoCapitalize={kind === 'email' ? 'none' : 'sentences'}
      textContentType={
        kind === 'email'
          ? 'emailAddress'
          : kind === 'password'
          ? 'newPassword'
          : kind === 'newPassword'
          ? 'newPassword'
          : kind === 'url'
          ? 'URL'
          : 'none'
      }
      secureTextEntry={kind === 'password' || kind === 'newPassword'}
      editable={!disabled}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'OpenSans_400Regular',
    borderColor: colors.border.primary,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
  },
});

export default TextInput;
