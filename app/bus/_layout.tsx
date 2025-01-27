import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '@/components/NavbarBus';
import Header from '@/components/HeaderBus';
import { usePathname } from 'expo-router';
export default function LoginLayout() {
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      {/* Header  */} <Header /> {/* Contenu principal */}{' '}
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
  none: { display: 'none' },
  pepole: {
    width: 280,
    height: 200,
    top: -135,
    display: 'flex',
    alignSelf: 'center',
  },
  content: {
    flex: 1,
  },
});
