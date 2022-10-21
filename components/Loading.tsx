import { ActivityIndicator } from 'react-native';
import { colors } from '../styles/colors';

function Loading() {
  return <ActivityIndicator color={colors.green} />;
}

export default Loading;
