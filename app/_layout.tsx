import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { StripeProvider } from '@stripe/stripe-react-native';

import { useColorScheme } from '@/hooks/useColorScheme';
import UserProvider from './hub/(register)/userInfoContext/UserInfo';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StripeProvider publishableKey='pk_test_51QSEyz086BcD82hOp9pgmAXCy9TMzhg7CM7ODfoJnnE8k5U7QyY25EZc1mn31LwZZEtQDbjkPXMcTXDdeF5LDXi400f879f9HS'>
      <UserProvider>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
            <Stack.Screen name='+not-found' />
          </Stack>
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </UserProvider>
    </StripeProvider>
  );
}
