import React from 'react';
import { View, StyleSheet, Image, useWindowDimensions } from 'react-native';
import { Stack, usePathname } from 'expo-router';
import { UserProvider } from '@/app/hub/(register)/userInfoContext/UserInfo';

export default function LoginLayout() {
  const pathname = usePathname(); // Obtenez le chemin actuel
  const { width } = useWindowDimensions(); // Utilise le hook pour obtenir la largeur dynamique

  // Liste des pages avec lesquels le layout ne doit pas être affiché
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
        {!hideFooter && ( // Condition pour afficher le footer uniquement si ce n'est pas une page exclut
          <View style={styles.footer}>
            <Image
              source={require('@/assets/images/teonaLogo.png')}
              style={[styles.logo, { width: width * 0.4 }]} // Appliquer la largeur dynamique
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
    height: '70%',
    marginBottom: 30,
    marginRight: 140
  }
});
