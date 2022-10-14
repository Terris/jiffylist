import { ReactNode } from 'react';
import { Keyboard, Pressable } from 'react-native';

interface HideKeyboardProps {
  children: ReactNode;
}

function HideKeyboard({ children }: HideKeyboardProps) {
  return (
    <Pressable onPress={Keyboard.dismiss} accessible={false} style={{ flex: 1 }}>
      {children}
    </Pressable>
  );
}

export default HideKeyboard;
