import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from '@/components/NavbarWallet';
import Header from '@/components/HeaderWallet';
import { WalletProvider } from '../userInfoContext/WallletInfo';

export default function LoginLayout() {
  return (
    <WalletProvider>
      <View style={styles.container}>
        {/* Header  */}
        <Header />
        {/* Contenu principal */}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>
        {/* Footer & Navbar */}
        <Navbar />
      </View>
    </WalletProvider>
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
