import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Stack } from 'expo-router';

const { width } = Dimensions.get('window');

export default function LoginLayout() {
  return (

    <View style={styles.container}>
      {/* Contenu principal */}
      <View style={styles.content}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
      {/* Footer avec le logo Teona*/}
      <View style={styles.footer}>
        <Image
          source={require('@/assets/images/teonaLogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
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
    width: width * 0.4,
    height: '70%',
    marginBottom: 30,
    marginRight: 140
  }
});
