import { ReactNode } from 'react';
import { colors } from '../styles/colors';
import Text from './Text';

interface AlertProps {
  children: ReactNode;
  kind?: 'error' | 'success';
}

function Alert({ children, kind }: AlertProps) {
  return (
    <Text
      color={kind === 'error' ? colors.alert : kind === 'success' ? colors.success : colors.black}
      style={{ paddingBottom: 12 }}
    >
      {children}
    </Text>
  );
}

export default Alert;
