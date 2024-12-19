import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { UserProvider } from '@/app/hub/(register)/userInfoContext/UserInfo';

const { width } = Dimensions.get('window');

export default function LoginLayout() {
  const pathname = usePathname(); // Obtenez le chemin actuel

  // Liste des pages où le layout ne doit pas être affiché
  const excludedPages = ['/hub/BeginInscription', '/hub/CookiePPop'];

  // Déterminez si le footer doit être masqué
  const hideFooter = excludedPages.includes(pathname);

  return (
    <UserProvider>
    <View style={styles.container}>
      {/* Contenu principal */}
        <View style={styles.content}>
          <Stack screenOptions={{ headerShown: false }} />
        </View>


      {/* Footer avec le logo Teona */}
      {!hideFooter && ( // Condition pour afficher le footer uniquement si ce n'est pas une page exclue
        <View style={styles.footer}>
          <Image
            source={require('@/assets/images/teonaLogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      )}
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
    width: width * 0.4,
    height: '70%',
    marginBottom: 30,
    marginRight: 140
  }
});
