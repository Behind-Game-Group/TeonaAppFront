import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useRouter, useSegments } from 'expo-router';

const Header = () => {
  const router = useRouter();
  const segments = useSegments();

  const width = Dimensions.get('window').width;
  const route = () => {
    router.push('/');
  };
  return (
    <>
      {' '}
      <Image
        style={{ width: '100%' }}
        resizeMode={width > 300 ? 'repeat' : 'cover'}
        source={require('@/assets/images/headTeonaBus.png')}
      ></Image>{' '}
      <View style={{ height: 0 }}>
        <TouchableOpacity style={styles.back} onPress={route}>
          <Image
            source={require('@/assets/images/chevron-bottom-normal.png')}
          />
        </TouchableOpacity>{' '}
        <Image
          resizeMode='center'
          style={styles.logo}
          source={require('@/assets/images/BusService.png')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  back: { top: -60 },
  logo: {
    height: 36,
    top: -71,
    alignSelf: 'flex-end',
  },

  backButton: {
    position: 'absolute',
    left: 16,
    top: 18,
    zIndex: 1,
  },
});

export default Header;
