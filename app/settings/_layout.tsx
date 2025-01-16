import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '@/components/NavbarWallet';
import MenuTop from '@/components/MenuTop';
import { usePathname } from 'expo-router';
export default function LoginLayout() {
  const pathname = usePathname();
  const isHead =
    pathname == '/settings/modal' ||
    pathname == '/settings/Cookie' ||
    pathname == '/settings/Navigate';
  const head = isHead ? <></> : <MenuTop />;
  return (
    <View style={styles.container}>
      {/* Header  */}
      {head}
      {/* Contenu principal */}
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      {/* Footer & Navbar */}
      <Navbar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
