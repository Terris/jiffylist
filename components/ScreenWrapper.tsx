import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

interface ScreenWrapperProps {
  children: ReactNode;
}

function ScreenWrapper({ children }: ScreenWrapperProps) {
  return <View style={styles.wrapper}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    width: '100%',
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 20,
  },
});

export default ScreenWrapper;
