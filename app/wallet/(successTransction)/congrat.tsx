import CustomButton from '@/components/ButtonWallet';
import OrangeButton from '@/components/TopUpButton';
import React, { useState } from 'react';
import { Text, Image, View, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
export default function congrat() {
  const para = useLocalSearchParams();
  const card = para?.isCard == 'TopUp';
  const [isCard] = useState(card);
  const button = () => {
    console.log('is Congrat');
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: '#FFF' }}>
        <View style={styles.container}>
          <p>
            <Text style={styles.title}>
              Your card has been charged and is ready to use!
            </Text>
          </p>
          <View style={isCard ? styles.on : styles.off}>
            <Image
              source={require('@/assets/images/TopUpCard.png')}
              style={styles.imageCard}
            ></Image>
          </View>

          <View style={!isCard ? styles.on : styles.off}>
            <Image
              source={require('@/assets/images/CARDS_4.png')}
              style={styles.imagePass}
            ></Image>
          </View>

          <OrangeButton
            title='Read Pass'
            style={styles.btnPass}
            onPress={button}
            light={true}
          ></OrangeButton>
          <Text
            style={{ textAlign: 'center', padding: 10, marginBlockStart: 10 }}
          >
            ( For physical cards only ) <br />
            Or
          </Text>
          <OrangeButton
            style={{ width: 300 }}
            title='Back to my journey'
            onPress={button}
          ></OrangeButton>
        </View>
        <View style={styles.imgBlock}>
          <Image
            source={require('@/assets/images/MrHappy2.png')}
            style={styles.imageMrHappy}
          ></Image>
          <View style={styles.condition}>
            <Image
              source={require('@/assets/images/Add_to_Apple_Wallet_badge.svg.png')}
              style={styles.appleImg}
            ></Image>

            <Text
              style={{
                paddingEnd: 20,
                fontSize: 10,
                width: 200,
                textAlign: 'right',
              }}
            >
              <View>
                {' '}
                (First Card Only)
                <br />
                This ticket allows you to travel on the entire circuit of
                Georgina Bus. This top up will also be transferred on your
                iWatch TeonaPass on your Apple Wallet. This top-up is
                non-refundable and non-exchangeable.
              </View>
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#5285B6',
    fontSize: 30,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  on: { display: 'flex' },
  off: { display: 'none' },
  appleImg: { width: 200, height: 50, resizeMode: 'contain' },
  condition: { alignSelf: 'center' },
  imgBlock: { flexDirection: 'row' },
  container: { flex: 1, alignContent: 'center', alignItems: 'center' },
  btnPass: { width: 200, backgroundColor: '#FFA500' },
  imageMrHappy: {
    width: '50%',
    height: 250,
    resizeMode: 'contain',
    left: '-12%',
    margin: 5,
  },
  imagePass: {
    width: 450,
    height: 320,
    margin: 10,
    alignSelf: 'center',
    left: 10,
    top: -30,
  },
  imageCard: {
    width: 300,
    height: 200,
    resizeMode: 'center',
    borderRadius: 100,
    //margin: 10,
  },
});
