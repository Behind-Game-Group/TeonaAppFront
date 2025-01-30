import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import ButtonWallet from '@/components/ButtonWallet';
import { useRouter, useLocalSearchParams } from 'expo-router';

type RootStackParamList = {
  Wallet: { price: number };
};

const CardPaymentPage: React.FC = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [email, setEmail] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const route = useRoute<RouteProp<RootStackParamList, 'Wallet'>>();
  const { price } = route.params;
  const numericPrice = Number(price);
  const total = (numericPrice + 5.0).toFixed(2);
  const toggleCheckbox = () => setIsChecked(!isChecked);
  const adressId = params.adressId;
  const isActive = params.isActive;
  const cardTitle = params.cardTitle;

  console.log('Received Params to display CARD:', {
    isActive,
    adressId,
    cardTitle,
    price,
    total,
  });
  const goToPaymentCard = () => {
    router.push({
      pathname: '/wallet/(payment)/PaymentInformationsCard',
      params: {
        price: price.toString(),
        isActive,
        adressId,
        total,
        cardTitle,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let’s TopUp your purchased card!</Text>

      <View style={styles.row}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../../assets/images/TopUpCard.png')}
              style={styles.image}
              resizeMode='cover'
            />
          </View>
        </View>

        <View>
          <Text style={styles.text}>Card Fee : 5.00 €</Text>
          <Text style={styles.text}>TopUp : {numericPrice.toFixed(2)}€</Text>
          <View style={styles.line}></View>
          <Text style={styles.text}>
            Balance : {(numericPrice + 5.0).toFixed(2)}€
          </Text>
        </View>
      </View>

      <Text style={styles.textType}>Choose payment type</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Pay with Apple Pay</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={goToPaymentCard}>
        <Text style={styles.buttonText}>Debit/credit card</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>PayPal </Text>
      </TouchableOpacity>

      <Text style={styles.textEmail}>
        Enter your email address to receive an invoice {'\n'} for your purchase
      </Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder='Email address'
      />

      <View style={styles.containerCheckbox}>
        <Pressable
          style={[styles.checkbox, isChecked && styles.checked]}
          onPress={toggleCheckbox}
        >
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </Pressable>
        <Text style={styles.textCheckbox}>
          I accept the terms of sale and the terms of use
        </Text>
      </View>

      <ButtonWallet text='Continue' onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    color: '#DF8D23',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    marginTop: 25,
  },
  imageContainer: {
    width: 90,
    height: 141,
    borderRadius: 7,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 18,
    marginLeft: 60,
    color: '#606060',
    marginTop: 2,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 50,
  },
  line: {
    height: 1,
    backgroundColor: '#606060',
    width: '80%',
    marginLeft: 50,
    marginTop: 2,
  },
  textType: {
    fontSize: 18,
    color: '#606060',
    marginTop: 10,
    marginRight: 150,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#DF8D2259',
    width: '100%',
    height: 50,
    marginTop: 6,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    marginLeft: 30,
    color: '#606060',
  },
  textEmail: {
    fontSize: 15,
    color: '#606060',
    marginTop: 20,
    fontWeight: 'bold',
    marginRight: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#DF8D2259',
    marginTop: 5,
    paddingLeft: 27,
    color: '#606060',
  },
  containerCheckbox: {
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 22,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginRight: 10,
  },
  checked: {
    backgroundColor: 'orange',
    borderColor: 'orange',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textCheckbox: {
    fontSize: 14,
    color: '#606060',
  },
});

export default CardPaymentPage;
