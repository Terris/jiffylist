import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Welcome: undefined;
  RootTabs: undefined;
};

export type RootTabsParamList = {
  Home: undefined;
  New: undefined;
  Settings: undefined;
  'Sign In': undefined;
  'Sign Up': undefined;
};

export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type RootTabsNavigationProps = BottomTabNavigationProp<RootTabsParamList>;
