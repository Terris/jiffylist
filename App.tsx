import { useCallback, useEffect } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  useFonts,
  OpenSans_400Regular,
  OpenSans_700Bold,
  OpenSans_400Regular_Italic,
  OpenSans_700Bold_Italic,
} from '@expo-google-fonts/open-sans';
import HomeScreen from './screens/HomeScreen';
import AddListItemScreen from './screens/AddListItemScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import { colors } from './styles/colors';
import { RootTabsParamList, RootStackParamList } from './types/navigation.types';
import { AuthContextProvider, useAuth } from './context/AuthContext';

type glyph = keyof typeof Feather.glyphMap;

SplashScreen.preventAutoHideAsync();

const menuIconMap: { [key: string]: glyph } = {
  Home: 'home',
  New: 'plus-circle',
  Friends: 'users',
  Settings: 'settings',
  'Sign Up': 'user-plus',
  'Sign In': 'log-in',
};

export default function App() {
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_700Bold,
    OpenSans_400Regular_Italic,
    OpenSans_700Bold_Italic,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <AuthContextProvider>
          <NavigationContainer>
            <Routes />
          </NavigationContainer>
        </AuthContextProvider>
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabsParamList>();

function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleStyle: {
          fontFamily: 'OpenSans_400Regular',
        },
        headerBackTitleStyle: {
          fontFamily: 'OpenSans_400Regular',
          fontSize: 12,
        },
      }}
    >
      <Stack.Screen name="RootTabs" component={RootTabs} />
    </Stack.Navigator>
  );
}

function RootTabs() {
  const { session } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleStyle: {
          color: colors.darkGreen,
          fontFamily: 'OpenSans_400Regular',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'OpenSans_400Regular',
        },
        tabBarIcon: ({ color }) => {
          if (menuIconMap[route.name]) {
            return <Feather name={menuIconMap[route.name]} size={24} color={color} />;
          }
          return;
        },
        tabBarActiveTintColor: colors.darkGreen,
        tabBarInactiveTintColor: colors.lightGreen,
      })}
    >
      {session && session.user ? (
        <>
          <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Your List' }} />
          <Tab.Screen name="New" component={AddListItemScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name="Sign Up" component={SignUpScreen} />
          <Tab.Screen name="Sign In" component={SignInScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}
