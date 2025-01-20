import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

type RoutePath =
  | '/'
  | '/wallet/TopUp'
  | '/wallet/PaymentDisplay'
  | '/wallet/FormTeonaPass';

type PathOption = { path: string; title: string; back: RoutePath };

const MenuTop: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [showMenu, setShowMenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Gérer les dimensions de l'écran
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(Dimensions.get('window').width >= 1024);
    };
    handleResize();
    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => subscription?.remove();
  }, []);

  // Options de navigation
  const pathOptions: PathOption[] = [
    { path: '/wallet/Fares', title: 'Our Cards', back: '/' },
    { path: '/wallet/TopUp', title: 'TopUp Fares', back: '/' },
    { path: '/wallet/FormTeonaPass', title: 'Our Cards', back: '/' },
    { path: '/settings/TravelSettings', title: 'Settings', back: '/'},
    { path: '/wallet/PaymentInformations', title: 'Payment Informations', back: '/'},
    {
      path: '/wallet/PaymentDisplayCard',
      title: 'Payment',
      back: '/wallet/TopUp',
    },
  ];

  return (
    <>
      <StatusBar style='light' backgroundColor='#599AD0' />
      <View
        style={[
          styles.header,
          pathname.includes('successTransction') && styles.darkHeader,
        ]}
      >
        {/* Bouton de retour */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            const currentOption = pathOptions.find(
              (option) => option.path === pathname,
            );
            if (currentOption?.back) {
              router.push(currentOption.back);
            } else {
              router.back();
            }
          }}
        >
          <Image
            source={require('@/assets/images/chevron-bottom-normal.png')}
            style={styles.backImage}
          />
        </TouchableOpacity>

        {/* Titre */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {pathOptions.find((option) => option.path === pathname)?.title ||
              'Page Not Found'}
          </Text>
        </View>

        {/* Menu Burger ou Navbar */}
        {isDesktop ? (
          <View style={styles.navbar}>
            <Text style={styles.navItem}>Home</Text>
            <Text style={styles.navItem}>About</Text>
            <Text style={styles.navItem}>Contact</Text>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Drawer pour le menu burger */}
      {showMenu && !isDesktop && (
        <View style={styles.drawer}>
          <Text style={styles.drawerItem} onPress={() => setShowMenu(false)}>
            Home
          </Text>
          <Text style={styles.drawerItem} onPress={() => setShowMenu(false)}>
            About
          </Text>
          <Text style={styles.drawerItem} onPress={() => setShowMenu(false)}>
            Contact
          </Text>
        </View>
      )}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#599AD0',
    height: 140,
    paddingHorizontal: 16,
  },
  darkHeader: {
    backgroundColor: '#606060',
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: '100%',
  },
  backImage: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  menuButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: '100%',
  },
  menuIcon: {
    color: '#fff',
    fontSize: 24,
  },
  navbar: {
    flexDirection: 'row',
    gap: 16,
  },
  navItem: {
    color: '#FFFFFF',
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  drawer: {
    position: 'absolute',
    top: 140,
    right: 0,
    backgroundColor: '#FFFFFF',
    width: '50%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  drawerItem: {
    fontSize: 18,
    marginVertical: 8,
    color: '#333',
  },
});

export default MenuTop;
