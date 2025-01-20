import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const NavbarWallet = () => {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      {/* Bouton "Home" */}
      <TouchableOpacity onPress={() => router.push('/home')}>
        <Image
          source={require('@/assets/images/home-wallet-footer.png')}
          style={styles.footerIcon}
          resizeMode='contain'
        />
      </TouchableOpacity>

      {/* Bouton "Bus" */}
      <TouchableOpacity onPress={() => router.push('/')}>
        <Image
          source={require('@/assets/images/bus-wallet-footer.png')}
          style={styles.footerIcon}
          resizeMode='contain'
        />
      </TouchableOpacity>

      {/* Bouton "Teona" */}
      <TouchableOpacity onPress={() => router.push('/')}>
        <Image
          source={require('@/assets/images/teona-wallet-footer.png')}
          style={styles.footerIcon}
          resizeMode='contain'
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: height * 0.1,
    width: width,
    backgroundColor: '#DF8D22',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  footerIcon: {
    width: width * 0.09,
    height: height * 0.101,
  },
});

export default NavbarWallet;
