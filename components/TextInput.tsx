import {
  TextInput as PrimitiveTextInput,
  StyleSheet,
  TextInputProps as PrimitiveTextInputProps,
} from 'react-native';
import { colors } from '../styles/colors';
import Text from './Text';

interface TextInputProps extends PrimitiveTextInputProps {
  label?: string;
  kind?: 'text' | 'email' | 'password' | 'newPassword' | 'url';
  disabled?: boolean;
}

function TextInput({ onChangeText, value, label, placeholder, kind, disabled }: TextInputProps) {
  return (
    <>
      {label && <Text>{label}</Text>}
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
        autoCorrect={
          kind === 'password' || kind === 'newPassword' || kind === 'email' ? false : undefined
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'OpenSans_400Regular',
    backgroundColor: colors.border.primary,
    borderColor: colors.border.primary,
    borderRadius: 3,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
  },
});

export default TextInput;
