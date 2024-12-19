import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { useWallet } from '../userInfoContext/WallletInfo';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
function TopUp() {
  const router = useRouter();
  const walletInfo = useWallet().Wallet;
  const [selectedPrice, setSelectedPrice] = useState('');
  const [token, setToken] = useState('');
  const handleTopUp = (cardType: string, price: string) => {
    // Ajout automatique de deux zéros si le prix est un entier
    if (!price.includes('.')) {
      price = `${price}.00`;
    }
    console.log(walletInfo.firstName + 'kr?');
    isAuthen();
    sendData(cardType, price);
  };
  const isAuthen = async () => {
    let userId = null;
    let getToken = null;
    if (Platform.OS === 'web') {
      userId = localStorage.getItem('userId');
      getToken = localStorage.getItem('authToken');
    } else {
      userId = await SecureStore.getItemAsync('userId');
      getToken = await SecureStore.getItemAsync('authToken');
    }
    if (getToken) {
      setToken(getToken.normalize());
      console.log('Token found:', token);
    } else {
      console.warn('Token not found');
    }
  };

  const prices = ['5.00', '10.00', '15.00', '20.00', '25.00'];
  const sendData = async (cardType: string, price: string) => {
    try {
      const fromData = {
        auth: null,
        data: {
          firstName: walletInfo.firstName,
          lastName: walletInfo.lastName,
          streetName: walletInfo.streetName,
          city: walletInfo.city,
          streetNameOptional: walletInfo.Optional,
          country: walletInfo.country,
          postCode: walletInfo.postalCode,
          phoneNumber: walletInfo.phoneNumber,
          TopUp: price,
        },
        head: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        headToken: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
        isAuth() {
          if (token == '' || token == null) {
            return this.head;
          } else return this.headToken;
        },
      };
      const response = await axios.post(
        'http://localhost:8082/api/add/card',
        fromData.data,
        fromData.isAuth(),
      );

      if (response.status === 200 && response.data) {
        console.log(response.data);
        router.push({
          pathname: '/wallet/PaymentDisplay',
          params: { cardType, price },
        });
      }
    } catch (error: unknown) {
      console.error(error);

      let errorMessage = 'An error occurred. Please try again.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        console.log(errorMessage);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Let’s TopUp your card!</Text>

        {prices.map((price, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/TopUpCard.png')}
                style={styles.image}
                resizeMode='cover'
              />
            </View>
            <Text style={styles.price}>{price}€</Text>
            <TouchableOpacity
              style={styles.topUpButton}
              onPress={() => handleTopUp('TopUp', price)}
            >
              <Text style={styles.topUpButtonText}>TopUp</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Prix personnalisé */}
        <View style={styles.row}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/images/TopUpCard.png')}
              style={styles.image}
              resizeMode='cover'
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>TopUp with your {'\n'} own amount</Text>
            <TextInput
              style={styles.input}
              value={selectedPrice}
              onChangeText={(text) => setSelectedPrice(text)}
              keyboardType='numeric'
              placeholder=''
            />
          </View>
          <TouchableOpacity
            style={styles.topUpButton}
            onPress={() => handleTopUp('TopUp', selectedPrice)}
          >
            <Text style={styles.topUpButtonText}>TopUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#599AD0',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 17,
    color: '#606060',
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 20,
  },
  imageContainer: {
    width: 110,
    height: 60,
    borderRadius: 7,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  price: {
    fontSize: 20,
    color: '#606060',
  },
  topUpButton: {
    marginLeft: 20,
    backgroundColor: '#fff',
    width: 85,
    height: 58,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DF8D22',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topUpButtonText: {
    fontSize: 20,
    color: '#DF8D22',
  },
  inputContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginTop: -10,
  },
  label: {
    fontSize: 10,
    color: '#606060',
    marginBottom: 3,
  },
  input: {
    width: 70,
    height: 30,
    borderWidth: 1,
    borderColor: '#606060',
    fontSize: 16,
    paddingLeft: 7,
    marginLeft: 5,
  },
});

export default TopUp;
