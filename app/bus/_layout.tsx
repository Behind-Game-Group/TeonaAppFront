import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '@/components/NavbarBus';
import Header from '@/components/HeaderBus';
import { usePathname } from 'expo-router';
import { BusProvider } from './BusInfoContext/BusInfo';
export default function LoginLayout() {
  const pathname = usePathname();
  const noHead = pathname == 'LoadingPage';
  return (
    <BusProvider>
      <View style={styles.container}>
        {/* Header  */}
        {noHead && <Header />} {/* Contenu principal */}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
        {/* Footer & Navbar */}
        <Navbar />
      </View>
    </BusProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  none: { display: 'none' },

  content: {
    flex: 1,
  },
});
