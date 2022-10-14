import { useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface BackButtonProps {
  onPress: () => void;
}

function BackButton({ onPress }: BackButtonProps) {
  const [pressed, setPressed] = useState<boolean>(false);
  return (
    <Pressable
      onPress={onPress}
      style={pressed ? pressedStyles : styles.backButton}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Feather name="chevron-left" size={24} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    marginLeft: -14,
  },
  backButtonPressed: {
    opacity: 0.5,
  },
});

const pressedStyles = StyleSheet.flatten([styles.backButton, styles.backButtonPressed]);

export default BackButton;
