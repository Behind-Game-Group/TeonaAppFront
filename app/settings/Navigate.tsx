import { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Navigation from '../../components/SwitchView';
import TopUpButton from '@/components/TopUpButton';
import { Link, useRouter } from 'expo-router';
const nav = () => {
  const [promo, setPromo] = useState(true);
  const [update, setUpdate] = useState(true);
  return (
    <>
      <ImageBackground
        style={{
          zIndex: 0,
          width: '100%',
          height: '100%',
        }}
        source={require('@/assets/images/pexels-denner-trindade-1570398-17821556.jpg')}
      />
      <View style={styles.modal}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Notifications</Text>
          <Link href={'/'} style={styles.exit}>
            X
          </Link>
        </View>
        <Navigation
          setStrate={setPromo}
          title='Offers and promotions'
          sub='Get notifier with our best offers and promotions'
        />
        <Navigation
          setStrate={setUpdate}
          title='Flight updates'
          sub='You while auto'
        />
        <Link
          style={{
            alignSelf: 'center',
            alignContent: 'center',
            left: '8%',
            width: '60%',
          }}
          href={'/settings/Cookie'}
        >
          {' '}
          <TopUpButton title='Next' onPress={() => {}}></TopUpButton>
        </Link>
      </View>
    </>
  );
}; //
export default nav;
const styles = StyleSheet.create({
  italique: { color: 'orange' },
  modal: {
    bottom: '50%',
    height: '50%',
    marginTop: 2,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#EEE',
    borderBottomColor: '#777777',
  },
  title: {
    fontSize: 18,
    width: '80%',
    marginLeft: '10%',
    paddingTop: 8,
    paddingBottom: 8,
  },
  exit: {
    fontSize: 18,
    backgroundColor: '#AAA',
    width: 24,
    borderRadius: 15,
    textAlign: 'center',
    alignSelf: 'center',
  },
});
