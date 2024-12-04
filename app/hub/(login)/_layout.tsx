import React from 'react';
import { View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { UserProvider } from '@/app/hub/(register)/userInfoContext/UserInfo';

export default function LoginLayout() {
  const { width } = useWindowDimensions();


  return (
    <UserProvider>
      <View style={styles.container}>
        {/* Contenu principal */}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>

        {/* Footer avec le logo Teona */}
          <View style={styles.footer}>
            <Image
              source={require('@/assets/images/teonaLogo.png')}
              style={[styles.logo, { width: width * 0.4 }]}
              resizeMode="contain"
            />
          </View>
      </View>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '10%',
    width: '100%',
    backgroundColor: 'rgba(96, 96, 96, 0.35)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    height: '70%',
    marginBottom: 30,
    marginRight: 140
  }
});
