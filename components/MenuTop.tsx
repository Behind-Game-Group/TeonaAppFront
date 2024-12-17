import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {
  useRouter,
  RelativePathString,
  ExternalPathString,
  usePathname,
} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { NavigationOptions } from 'expo-router/build/global-state/routing';
import { SafeAreaView } from 'react-native-safe-area-context';

// type MenuTopProps = {
//   text: string;
//   onPress: () => void;
// };

type RoutePath =
  | '/'
  | '/wallet/TopUp'
  | '/wallet/PaymentDisplay'
  | '/wallet/FormTeonaPass';

type PathOption = { path: string; title: string; back: RoutePath };

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const MenuTop: React.FC = (
  {
    // text,
    // onPress
  },
) => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  // useEffect(() => {
  //       const handleResize = () => {
  //           setIsDesktop(Dimensions.get('window').width >= 1024);
  //       };
  //       handleResize(); // Initialiser
  //       Dimensions.addEventListener('change', handleResize ); // Ajouter un écouteur

  //       return () => {
  //           Dimensions.removeEventListener('change', handleResize);  // Nettoyer
  //       };
  //   }, []);

  /**
   * Test à partir de la doc : "https://reactnative.dev/docs/0.74/dimensions"
   */
  /**
   * Tableau des différents chemin "path" possible
   * ainsi que le "title" des pages qui y sont liées
   * et "back" pour la route du retour en arrière
   */
  const pathOptions: PathOption[] = [
    { path: '/wallet/TopUp', title: 'TopUp Fares', back: '/' },
    { path: '/wallet/PaymentDisplay', title: 'Payment', back: '/wallet/TopUp' },
    { path: '/wallet/FormTeonaPass', title: 'Our Cards', back: '/' },
    { path: '/wallet/PurchaseForm', title: 'Our Cards', back: '/' },
    { path: '/wallet/successTransction', title: ' ', back: '/' },
    { path: '/wallet/congrat', title: 'congrats !', back: '/' },
  ];
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      },
    );
    return () => subscription?.remove();
  });
  useEffect(() => {
    setIsDesktop(dimensions.window.width >= 1024 ? true : false);
    // console.log(isDesktop);
  }, [dimensions]);

  const pathname = usePathname();

  // console.log('pathname : ', pathname);

  return (
    <>
      <StatusBar style={'light'} backgroundColor='#599AD0' />
      <View
        style={[
          styles.header,
          pathname.match('successTransction') ? styles.darck : '',
        ]}
      >
        <TouchableOpacity
          style={styles.viewEnd}
          onPress={() => {
            const currentOption = pathOptions.find(
              (option) => option.path === pathname,
            );
            if (currentOption?.back) {
              try {
                router.push(currentOption.back);
              } catch (error) {
                console.error(`Navigation error: ${error}`);
              }
            } else {
              router.back();
            }
          }}
        >
          <Image
            source={require('@/assets/images/chevron-bottom-normal.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <View style={[styles.viewCenter]}>
          <Text style={styles.title}>
            {
              /*Rechercher l'objet correspondant au path dans pathOptions et afficher la valeur du title lié en tant que titre*/
              pathOptions.find((option) => option.path === pathname)?.title ||
                'Page Not Found'
            }
          </Text>
        </View>{' '}
        {/* Titre */}
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
      {/* <View style={styles.content}>
      <Text>Contenu principal de l'application.</Text>
    </View> */}
    </>
  );
};

// Styles
const styles = StyleSheet.create({
  darck: { backgroundColor: '#606060' },
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
    // backgroundColor: 'green',
    justifyContent: 'center',
  },
  viewStart: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '60%',
    width: 40,
    // backgroundColor: 'red',
  },
  back: {
    color: '#FFF',
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
    zIndex: 2,
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
});

export default MenuTop;
