import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import CustomButton from '@/components/ButtonWallet';
import { router, useLocalSearchParams } from 'expo-router';
export default function SuccessTransction({ montant = 15 }) {
  const params = useLocalSearchParams();

  const afficheMonant = () => {
    if (params.price != null) {
      montant = Number(params.price);
    }

    return montant.toString().replace('.', ',') === montant.toString()
      ? montant + ',00'
      : montant.toString().replace('.', ',');

    //const price =params.price && !isNaN(Number(params.price)) ? Number(params.price) : 0;
  };

  const onprogress = () => {
    router.push('/wallet/congrat');
  };
  return (
    <SafeAreaView>
      <View style={{ backgroundColor: '#FFFFFF' }}>
        <View style={styles.container}>
          <Image
            source={require('../../../assets/images/logoValidation.png')}
            style={styles.imageValide}
          ></Image>{' '}
          <Text style={styles.montant}>{afficheMonant() + ' $'} </Text>{' '}
        </View>
        <View>
          <Image
            source={require('@/assets/images/MrHappy2.png')}
            style={styles.imageMrHappy}
          ></Image>{' '}
          <TouchableOpacity style={styles.btn}>
            <CustomButton text='OK' onPress={onprogress}></CustomButton>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    //    flex: 1,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    width: 230,

    top: -155,
    borderRadius: 50,
  },
  container: { alignContent: 'center', top: 45, zIndex: 10 },
  montant: {
    color: 'orange',
    fontSize: 28,

    textAlign: 'center',
  },
  imageValide: {
    marginBlockStart: 25,
    width: 300,
    height: 200,
    margin: 8,
    zIndex: 1,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  imageMrHappy: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    left: '-12%',
    margin: 10,
  },
});
// flex: 1,
