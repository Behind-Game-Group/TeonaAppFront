import { useState } from 'react';
import { View, StyleSheet, Text, ImageBackground } from 'react-native';
import Navigation from '../../components/SwitchView';
import { Link } from 'expo-router';

const cookie = () => {
  const [promo, setPromo] = useState(true);
  const [update, setUpdate] = useState(true);
  const [media, setMedia] = useState(true);
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
          <Text style={styles.title}>Cookies</Text>
          <Link href={'/'} style={styles.exit}>
            X
          </Link>
        </View>
        <Navigation
          setStrate={setPromo}
          title='Functionl and analytical cookies'
        />
        <Navigation
          setStrate={setUpdate}
          title='Marketing cookies for performance'
        />
        <Navigation
          setStrate={setPromo}
          title='Marketing cookies , advertisement and social media'
        />
      </View>
    </>
  );
}; //
export default cookie;
const styles = StyleSheet.create({
  italique: { color: 'orange' },
  modal: {
    bottom: '65%',
    height: '65%',
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
    paddingTop: 10,
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
