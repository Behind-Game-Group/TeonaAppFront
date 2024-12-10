import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Navbar from '@/components/NavbarWallet';
import Header from '@/components/HeaderWallet';
import { usePathname } from 'expo-router';
export default function LoginLayout() {
  const pathname = usePathname();
  return (
    <View style={styles.container}>
      {/* Header  */} <Header /> {/* Contenu principal */}{' '}
      <View style={{ height: 0, zIndex: 1 }}>
        <Image
          source={require('@/assets/images/happy_people_illustration.png')}
          style={[
            styles.pepole,
            pathname.match('successTransction') ? '' : styles.none,
          ]}
        ></Image>
      </View>
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
