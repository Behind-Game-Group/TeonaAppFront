import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useRouter, RelativePathString, ExternalPathString } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

type MenuTopProps = {
  text: string;
  onPress?: RelativePathString | ExternalPathString;
};

const MenuTop: React.FC<MenuTopProps> = ({ text, onPress }) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(Dimensions.get('window').width >= 1024);
    };
    handleResize(); // Initialiser
    Dimensions.addEventListener('change', handleResize); // Ajouter un écouteur

    return () => {
      Dimensions.removeEventListener('change', handleResize); // Nettoyer
    };
  }, []);

  return (
    <>
      <StatusBar style={'light'} backgroundColor='#599AD0' />
      <View style={[styles.header]}>
        <TouchableOpacity
          style={[styles.viewEnd]}
          onPress={() => {
            // Validation du chemin
            if (onPress) {
              try {
                router.push(onPress); // Naviguer vers une route valide
              } catch (error) {
                console.log(`Navigation error: ${error}`);
              }
            } else {
              router.back(); // Retour si onPress est vide
            }
          }}
        >
          <Image
            source={require('@/assets/images/chevron-bottom-normal.png')}
            style={styles.image}
          />{' '}
          {/* Bouton retour */}
        </TouchableOpacity>
        <View style={[styles.viewCenter]}>
          <Text style={styles.title}>{text}</Text> {/* Titre */}
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
            style={[styles.viewStart]}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Text style={styles.menu}>☰</Text> {/* Menu Burger */}
          </TouchableOpacity>
        )}
      </View>
      {/* Drawer pour le menu burger sur mobile */}
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

      {/* Contenu principal */}
      <View style={styles.content}>
        <Text>Contenu principal de l'application.</Text>
      </View>
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
    paddingVertical: 10,
  },
  viewEnd: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    width: 40,
  },
  viewCenter: {
    height: '100%',
    backgroundColor: 'green',
    justifyContent: 'center',
  },
  viewStart: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '60%',
    width: 40,
  },
  back: {
    color: '#fff',
    fontSize: 18,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  menu: {
    color: '#fff',
    fontSize: 24,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
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
    top: 60,
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
  content: {
    flex: 1,
    padding: 16,
  },
});

export default MenuTop;
