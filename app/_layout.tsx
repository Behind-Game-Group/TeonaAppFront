import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Stack } from 'expo-router';

// Empêche l'écran de chargement de disparaître automatiquement avant le chargement des ressources.
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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Stack principale */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        {/* Auth Stack */}
        <Stack.Screen name="hub/login" options={{ title: 'Login' }} />
        <Stack.Screen name="hub/register" options={{ title: 'Register' }} />

        {/* Home Stack */}
        <Stack.Screen name="home/index" options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name="home/details" options={{ title: 'Details' }} />

        {/* Wallet Stack */}
        <Stack.Screen name="wallet/wallet" options={{ title: 'Wallet' }} />

        {/* Sky Stack */}
        <Stack.Screen name="sky/sky" options={{ title: 'Sky' }} />

        {/* Bus Stack */}
        <Stack.Screen name="bus/bus" options={{ title: 'Bus' }} />

        {/* Not Found */}
        <Stack.Screen name="+not-found" options={{ title: 'Not Found' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
