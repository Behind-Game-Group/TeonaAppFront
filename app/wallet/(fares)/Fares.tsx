import {
  View,
  Text,
  Image,
  SafeAreaView,
  useWindowDimensions,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';

import TopUpButton from '@/components/TopUpButton';
import { Link } from 'expo-router';

// interface FaresProps {}

export const getWindowDimensions = () => {
  return {
    width: useWindowDimensions,
    height: useWindowDimensions,
  };
};

const Fares = () => {
  const [showTextPass, setShowTextPass] = useState<boolean>(false);
  const [showTextCard, setShowTextCard] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
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
  const handleTeonaPassPress = () => {
    if (showTextPass) {
      console.log('Checkbox is', isChecked ? 'checked' : 'unchecked');
    } else {
      passSelect();
    }
  };
  return (
    <SafeAreaView style={styles.faresContainer}>
      <SafeAreaView style={styles.faresContent}>
        <Text style={styles.faresTitleP}>
          Don'Have a card ? Purshase it{' '}
          <Link style={styles.toCardL} href={'/wallet/(topUpCard)/TopUp'}>here</Link>
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
          <View
            style={styles.faresContainerCardTop}
          >
            <Text style={styles.faresTextCard}>TopUp Card</Text>
            {showTextCard ? (
              <>
                <Text style={styles.dynamicTextCard}>
                  Anyone can use it! For occasional trips 5,00€ card fee

                </Text> <Text style={styles.faresTextMem}>
                (optional)  {' '}
              </Text>
                <View
                  style={
                    styles.containerCheckbox}
                >
                  <Pressable
                    // value={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                    style={[
                      styles.checkCard,
                      isChecked && styles.checked

                    ]}
                  >
                    {isChecked && <Text style={styles.checkmark}> ✓</Text>}
                  </Pressable>
                  <View
                    style={styles.checkboxCont}
                  >
                    <Text style={styles.checkboxTxt}>
                      I want my card sent home to me
                    </Text>
                    <Text style={styles.checkboxSub}> (5,00€ card fee) </Text>
                  </View>
                </View>
                <TopUpButton
                  color={'#FFA500'}
                  title={'Purchase'}
                  onPress={handleTopUpPress}
                />
              </>
            ) : (
              <TopUpButton title={'TopUp'} onPress={handleTopUpPress} />
            )}
            <></>
          </View>
        </View>
        <View style={styles.faresPassContainer}>
          <View style={styles.faresAvaContainer}>
            <Text style={styles.faresTextAva}>My Teona Pass</Text>
            <View
              style={[
                styles.faresAvaTop,
                showTextPass && styles.faresAvaContainerColumn,
              ]}
            >

              {showTextPass ? (
                <>
                  <Text style={styles.dynamicTextPass}>
                    Personal use only For regular communiting Unlimited trips
                    7,50€ card fee
                  </Text>
                  <Text style={styles.faresTextMem}>
                    (optional)
                  </Text>
                  <TopUpButton
                    color={'#FFA500'}
                    title={'Purchase'}
                    onPress={handleTeonaPassPress}
                  />
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

              <></>
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
const dimensions = getWindowDimensions();
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
  toCardL:{
    color:'blue',
    textDecorationLine: 'underline',
  },
  checkboxCont: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  checkboxTxt: {
    fontSize: 10,

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
    fontSize: 21,
    lineHeight: 27,
    textAlign: 'center',
    textBreakStrategy: 'simple',
   lineBreakStrategyIOS:'standard',
    maxWidth: '90%',

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
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FFA500',
    // marginBottom: 10,
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  containerCheckbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    padding: 5,
  },
  dynamicTextPass: {
    fontSize: 21,
    lineHeight: 27,
    textAlign: 'center',
    textBreakStrategy: 'simple',
    lineBreakStrategyIOS:'standard',
    maxWidth: '90%',
        margin: 0,
    padding: 0,
    color: 'black',
  },
  faresTextAva: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
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
    textDecorationLine: 'underline',
  },
  faresContent: {
    flex: 1,
    width: '100%',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  faresPassContainer: {
    width: '100%',
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
    flex: 1,
    height: dimensions.height.arguments * 0.455,
  },
  faresContainerCardTop: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flex: 1,
    height: dimensions.height.arguments * 0.455,
  },
  faresAvaContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    margin: 0,
    flex: 1,
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
    flex: 1,
  },
  faresCardContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    flexDirection: 'column',
    flex: 1,
    height: dimensions.height.arguments * 0.455,
  },

  faresContainerCard: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  checkCard: {
    width: 15,
    height: 15,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 5,
    // justifyContent: 'center',
    // alignItems: 'center',
    //backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor:'#FFA500',
    // marginBottom: 10,
  },
  faresPassImag: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: dimensions.width.arguments * 0.3,
    height: dimensions.height.arguments * 0.3,
    resizeMode: 'contain',
    margin: 0,
    padding: 0,
  },
  faresCardImag: {
    alignItems: 'center',
    justifyContent: 'center',
    width: dimensions.width.arguments * 0.3,
    height: dimensions.height.arguments * 0.3,
    resizeMode: 'contain',
    margin: 0,
    padding: 0,
  },

  faresAvaImag: {
    width: dimensions.width.arguments * 0.3,
    height: dimensions.height.arguments * 0.2,
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
