import { Platform } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import UserProvider from './hub/(register)/userInfoContext/UserInfo';
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
import Constants from 'expo-constants';

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
  const STRIPE_PUBLIC_KEY = Constants.expoConfig?.extra?.stripePublicKey;
  return (
    // Only render StripeProvider if the platform is not web
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}> */}
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
          <Stack.Screen name='+not-found' />
        </Stack>
        {/* <StatusBar style="auto" /> */}
        {/* </StripeProvider> */}
      </ThemeProvider>
    </UserProvider>
    // <UserProvider>
    //   <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    //     {/* Platform-specific rendering */}
    //     {Platform.OS !== 'web' ? (
    //       // iOS/Android platform
    //       <StripeProvider publishableKey={STRIPE_PUBLIC_KEY}>
    //         <Stack screenOptions={{ headerShown: false }}>
    //           <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    //           <Stack.Screen name='+not-found' />
    //         </Stack>
    //       </StripeProvider>
    //     ) : (
    //       // Web platform
    //       <>
    //         {/* Web-specific rendering */}
    //         <View style={{ padding: 20, alignItems: 'center' }}>
    //           <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
    //             Welcome to our app on the Web!
    //           </Text>
    //           <Text style={{ marginTop: 10 }}>
    //             Stripe functionality will not be available on the web here.
    //           </Text>
    //         </View>
    //         <Stack screenOptions={{ headerShown: false }}>
    //           <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
    //           <Stack.Screen name='+not-found' />
    //         </Stack>
    //       </>
    //     )}
    //   </ThemeProvider>
    // </UserProvider>
  );
}
