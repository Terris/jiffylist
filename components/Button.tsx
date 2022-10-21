import { useState } from 'react';
import { Pressable, StyleSheet, PressableProps } from 'react-native';
import Text from './Text';
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
      <Text bold style={warn ? warnTextStyles : styles.text}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.darkGreen,
    borderColor: colors.darkGreen,
    borderRadius: 6,
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 18,
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonDisabled: {
    opacity: 0.25,
  },
  buttonWarn: {
    backgroundColor: colors.alert,
    color: colors.white,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 2,
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
