import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import ButtonInscriptionLogin from '@/components/ButtonInscriptionLogin';

function BeginInscription() {
  const router = useRouter(); //

  const handleContinue = () => {
    router.push('/hub/InformationsName');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/bgBeginInscription.png')}
        style={styles.backgroundImage}
        resizeMode='cover'
      >
        <View style={styles.content}>
          <Text style={styles.title}>Carry your journey with you</Text>
          <Text style={styles.detailsContent}>
            Find a destination, an itinerary, book a trip…{'\n'}
            TeonaPassenger app will stay with {'\n'} you every step of the way.
          </Text>

          <ButtonInscriptionLogin
            text={'Continue'}
            color={'blue'}
            onPress={handleContinue}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '93%',
    marginTop: 580,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    height: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#606060',
    textAlign: 'center',
    paddingBottom: 5,
  },
  detailsContent: {
    fontSize: 15,
    color: '#606060',
    textAlign: 'center',
  },
});

export default BeginInscription;
