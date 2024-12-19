import {
  View,
  Text,
  Image,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import TopUpButton from '@/components/TopUpButton';

interface FaresProps {}

const { width, height } = useWindowDimensions();
const Fares: React.FC<FaresProps> = ({}) => {
  return (
    <SafeAreaView style={styles.faresContainer}>
      <SafeAreaView style={styles.faresContent}>
        <Text style={styles.faresTitleP}>
          Don'Have a card ? Purshase it here
        </Text>
        <Text style={styles.faresTitleTop}>Topup your teona pass</Text>
        <View style={styles.faresContainerCard}>
          <View style={styles.faresCard}>
            <Image
              resizeMode='contain'
              style={styles.faresPassImag}
              source={require('@/assets/images/teonaduocard.png')}
            />
            <Text>For occasional trips</Text>
          </View>
          <View style={styles.faresContainerCardTop}>
            <Text style={styles.faresTextCard}>TopUp Card</Text>
            <TopUpButton
              title={'TopUp'}
              onPress={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
          </View>
        </View>
        <View style={styles.faresPass}>
          <View style={styles.faresAvaContainer}>
            <Text style={styles.faresTextAva}>My Teona Pass</Text>
            <View style={styles.faresAvaTop}>
              <Image
                resizeMode='contain'
                style={styles.faresAvaImag}
                source={require('@/assets/images/avatarteona.png')}
              />
              <TopUpButton
                title={'TopUp'}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
          </View>
          <View style={styles.faresCardContainer}>
            <Image
              resizeMode='contain'
              style={[styles.faresCardImag]}
              source={require('@/assets/images/duopassteona.png')}
            />
            <Text style={styles.faresTextMem}>
              For Teona Passenger members only
            </Text>
            <Text style={styles.faresTextSub}>
              Subscribe to Teona Passenger
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  faresContainer: {
    flex: 1,
  },
  faresTitleP: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  faresTitleTop: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  faresTextCard: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  faresTextAva: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 0,
    margin: 0,
  },
  faresTextMem: {
    fontSize: 6,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    marginTop: 0,
  },
  faresTextSub: {
    fontSize: 5,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  faresContent: {
    flex: 1,
    width: width,
    backgroundColor: '#FF5F6F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faresPass: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flexDirection: 'row',
    backgroundColor: '#BBBBBF',
  },
  faresCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
  },
  faresContainerCardTop: {
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
  },
  faresAvaContainer: {
    backgroundColor: '#DD8C6C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
    margin: 0,
  },
  faresAvaTop: {
    backgroundColor: '#DD8C6C',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 0,
    flexDirection: 'row',
    flex: 1,
  },
  faresCardContainer: {
    backgroundColor: '#BB8C6C',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
  },

  faresContainerCard: {
    width: width,
    backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  faresPassImag: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width * 0.3,
    height: height * 0.3,
    // resizeMode: 'contain',
    margin: 0,
    padding: 0,
  },
  faresCardImag: {
    width: width * 0.3,
    height: height * 0.3,
    // resizeMode: 'contain',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    marginBottom: 0,
  },
  faresAvaImag: {
    width: width * 0.3,
    height: height * 0.2,
    margin: 0,
    padding: 0,
    // resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  faresText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
export default Fares;
