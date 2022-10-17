import { useState } from 'react';
import { Pressable, Text, StyleSheet, PressableProps } from 'react-native';
import { colors } from '../styles/colors';

interface ButtonProps extends PressableProps {
  title: string;
  disabled?: boolean;
  warn?: boolean;
}

function Button({ title, disabled, warn, onPress }: ButtonProps) {
  const [pressed, setPressed] = useState<boolean>(false);

  return (
    <Pressable
      disabled={disabled}
      style={
        disabled ? disabledStyles : warn ? warnStyles : pressed ? pressedStyles : styles.button
      }
      onPress={onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <Text style={warn ? warnTextStyles : styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 3,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 14,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  buttonDisabled: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
  },
  buttonWarn: {
    backgroundColor: colors.alert,
    color: colors.white,
  },
  text: {
    fontFamily: 'OpenSans_400Regular',
    width: '100%',
    textAlign: 'center',
    color: colors.white,
  },
  warnText: {
    color: colors.white,
  },
});

const pressedStyles = StyleSheet.flatten([styles.button, styles.buttonPressed]);
const disabledStyles = StyleSheet.flatten([styles.button, styles.buttonDisabled]);
const warnStyles = StyleSheet.flatten([styles.button, styles.buttonWarn]);
const warnTextStyles = StyleSheet.flatten([styles.text, styles.warnText]);

export default Button;
