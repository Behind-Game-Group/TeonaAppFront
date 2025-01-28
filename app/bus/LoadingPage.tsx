import {
  View,
  Image,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from 'react-native';
export default function LoadingPage() {
  const dimention = Dimensions.get('window');

  return (
    <View>
      <ImageBackground
        style={{
          position: 'absolute',
          height: dimention.height,
          width: dimention.width,
        }}
        resizeMode='cover'
        source={require('@/assets/images/pexels-elijah.jpg')}
      />
      <Image
        style={styles.logo}
        width={200}
        resizeMode='cover'
        source={require('@/assets/images/BusService.png')}
      />{' '}
      <Text style={styles.text}>Where are you headed</Text>
      <Text style={styles.text}>Loading...</Text>
      <View
        style={{
          top: dimention.height - 600,
          marginLeft: 50,
          alignSelf: 'baseline',
        }}
      >
        {' '}
        <Image
          style={{ width: 200, height: 50, alignSelf: 'center' }}
          resizeMode='contain'
          source={require('@/assets/images/teonaLogo.png')}
        />{' '}
        <Text style={styles.text3}>Here to get there...</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    right: 5,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 30,
    margin: 20,
    color: '#eee',
  },
  text3: {
    alignSelf: 'center',
    fontSize: 15,
    bottom: 15,
    color: 'orange',
  },
  logo: { right: 10, alignSelf: 'center', marginTop: 40, marginBottom: 150 },
});
