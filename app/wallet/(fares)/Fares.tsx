import { View, Text, Image, SafeAreaView, useWindowDimensions, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';

import TopUpButton from '@/components/TopUpButton';
import { Link } from 'expo-router';

interface FaresProps {
}

const { width, height } = useWindowDimensions();
const Fares: React.FC<FaresProps> = ({}) => {
  const [showTextPass, setShowTextPass] = useState(false);
  const [showTextCard, setShowTextCard] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const cardSelect = () => {
    setShowTextCard(!showTextCard);
  };
  const passSelect = () => {
    setShowTextPass(!showTextPass);
  };

  const handleTopUpPress = () => {
    if (showTextCard) {
      // Change redirection logic here if showTextCard is active
      console.log('Checkbox is', isChecked ? 'checked' : 'unchecked');
    } else {
      cardSelect();
    }
  };
  const handleTeonaPassPress =()=>{
    if(showTextPass) {
      console.log('Checkbox is', isChecked ? 'checked' : 'unchecked')
    }else{
      passSelect();
    }
  };
  return (
    <SafeAreaView style={styles.faresContainer}>
      <SafeAreaView style={styles.faresContent}>
        <Text style={styles.faresTitleP}>
          Don'Have a card ? Purshase it <Link href={'/wallet/(topUpCard)/TopUp'}>here</Link>
        </Text>
        <Text style={styles.faresTitleTop}>Topup your teona pass</Text>
        <View style={styles.faresContainerCard}>
          <View style={styles.faresCard}>
            <Image
              style={styles.faresPassImag}
              source={require('@/assets/images/teonaduocard.jpg')}
            />
            <Text>For occasional trips</Text>
          </View>
          <View style={styles.faresContainerCardTop}>
            <Text style={styles.faresTextCard}>TopUp Card</Text>
            {showTextCard ? (
              <>
                <Text style={styles.dynamicTextCard}>
                  Anyone can use it! For occasional trips 5,00€ card fee
                  (optional){' '}
                </Text>
                <View style={styles.containerCheckbox}>
                  <Pressable
                    value={isChecked}
                    onPress={setIsChecked}
                    style={[styles.checkCard, isChecked && styles.checked]}
                  >
                    {' '}
                    {isChecked && <Text style={styles.checkmark}>✓</Text>}
                  </Pressable>
                  <View style={styles.checkboxCont}>
                    <Text style={styles.checkboxTxt}>I want my card sent home to me</Text>
                    <Text style={styles.checkboxSub}> (5,00€ card fee) </Text>
                    <TopUpButton color={'#FFA500'}  title={'Purchase'} onPress={handleTopUpPress} />
                  </View>

                </View>

              </>
            ) : (
              <TopUpButton title={'TopUp'} onPress={handleTopUpPress} />
            )}
            <>
            </>

          </View>
        </View>
        <View style={styles.faresPassContainer}>
          <View style={styles.faresAvaContainer}>
            <Text style={styles.faresTextAva}>My Teona Pass</Text>
            <View style={[styles.faresAvaTop, showTextPass && styles.faresAvaContainerColumn]}>
              {showTextPass ? (
                <>
                  <Text style={styles.dynamicTextPass}>
                    Personal use only For regular communiting Unlimited trips
                    7,50€ card fee
                  </Text>
                  <TopUpButton color={'#FFA500'}  title={'Purchase'} onPress={handleTeonaPassPress} />
                </>
              ) : (
                <>
                  <Image
                    style={styles.faresAvaImag}
                    source={require('@/assets/images/avatarteona.png')}
                  />
                  <TopUpButton title={'TopUp'} onPress={passSelect} />
                </>
              )}

              <>
              </>
            </View>
          </View>
          <View style={styles.faresCardContainer}>
            <Image
              style={styles.faresCardImag}
              source={require('@/assets/images/duopassteona.jpg')}
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
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFA500',
  },
  faresTextCard: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  checkboxCont: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  checkboxTxt: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    color: 'black',
  },
  checkboxSub: {
    fontSize: 5,
    textAlign: 'center',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    color: 'black',

  },
  dynamicTextCard: {
    fontSize: 15,
    whiteSpace: '',
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',
    margin: 0,
    padding: 0,
    color: 'black',
  },
  checked: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
  },
  checkmark: {
    color: '#606060',
    fontSize: 10,
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  dynamicTextPass: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flexDirection: 'row',

    color: 'black',
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
    color: '#FFA500',
    textDecorationLine:'underline',
  },
  faresContent: {
    flex: 1,
    width: width,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faresPassContainer: {
    width:width,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
    flexDirection: 'row',
  },
  faresCard: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    flex:1,
    height: height *0.455,
  },
  faresContainerCardTop: {

    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
    height: height *0.455,
  },
  faresAvaContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
flex:1,
  },
  faresAvaContainerColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faresAvaTop: {
    backgroundColor: '#FFFFFF',

    margin: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
flex:1,
  },
  faresCardContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flexDirection: 'column',
flex:1,
    height: height *0.455,
  },

  faresContainerCard: {

    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  checkCard: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 10,
  },
  faresPassImag: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: width * 0.3,
    height: height * 0.3,
    resizeMode: 'contain',
    margin: 0,
    padding: 0,

  },
  faresCardImag: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.3,
    height: height * 0.3,
    resizeMode: 'contain',
    margin: 0,
    padding: 0,

  },

  faresAvaImag: {
    width: width * 0.3,
    height: height * 0.2,
    margin: 0,
    padding: 0,
    resizeMode: 'contain',
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
