import { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

interface ScreenWrapperProps {
  children: ReactNode;
}

function ScreenWrapper({ children }: ScreenWrapperProps) {
  return <View style={styles.wrapper}>{children}</View>;
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 20,
  },
});

export default ScreenWrapper;
