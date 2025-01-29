import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ButtonWallet from '@/components/ButtonWallet';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import axios from 'axios';

const PaymentInformationsCard: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const toggleCheckbox = () => setIsChecked(!isChecked);
  const params = useLocalSearchParams();
  const price =
    params.price && !isNaN(Number(params.price)) ? Number(params.price) : 0;
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [visacardDetails, setVisaCardDetails] = useState<{
    cardOwner: string;
    id: number;
    lastFourDigits: string;
  } | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState('');

  const cardPrice =
    typeof params.price === 'string' ? parseFloat(params.price) : 0;
  // const userId = params.userId;
  const adressId = params.adressId;
  const isActive = params.isActive;
  const cardTitle = params.cardTitle;
  const total = params.total;

  console.log('Received Params to payment information:', {
    cardPrice,
    isActive,
    userId,
    adressId,
    cardTitle,
    total,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        let userId = null;
        let token = null;

        if (Platform.OS === 'web') {
          userId = localStorage.getItem('userId');
          token = localStorage.getItem('authToken');
        } else {
          userId = await SecureStore.getItemAsync('userId');
          token = await SecureStore.getItemAsync('authToken');
        }

        if (!userId || !token) {
          alert('User ID or token not found.');

          return;
        }
        setUserId(userId);
        setToken(token);
        console.log('User ID:', userId);
        const response = await axios.get(
          `http://localhost:8082/api/visacard/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('visa card response:', response.data);
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setVisaCardDetails(response.data[0]);
          // console.log('Set wallet ID:', response.id);
        } else {
          alert('No visacard found for this user.');

          return;
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
        alert('Failed to fetch wallet. Please try again.');
      } finally {
      }
    };

    fetchUser();
  }, []);

  const handleAddNewCard = () => {
    router.push('/wallet/(payment)/FormAddNewCard' as any);
  };
  const handlePayment = async () => {
    if (!isChecked) {
      Alert.alert(
        'Terms and Conditions',
        'You must accept the terms and conditions before continuing.',
      );
      return;
    }

    const totalAmount =
      typeof params.total === 'string'
        ? parseFloat(params.total)
        : parseFloat(params.total[0] || '0');

    if (isNaN(totalAmount)) {
      Alert.alert('Invalid Amount', 'The amount provided is not valid.');
      return;
    }

    const amountInCents = Math.round(totalAmount * 100);
    const paymentMethodId = 'pm_card_visa';
    try {
      // Step 1: Create the PaymentIntent
      const response = await fetch(
        'http://localhost:8082/api/payment/create-payment-intent',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountInCents,
            currency: 'eur',
          }),
        },
      );

      if (!response.ok) {
        throw new Error('Failed to create a payment session.');
      }

      const data = await response.json();
      console.log('create-payment-intent response:', data);
      const paymentIntentId = data.payment_intent_id;
      setPaymentIntentId(paymentIntentId);
      const clientSecret = data.client_secret;

      if (!clientSecret || !paymentIntentId) {
        throw new Error('No client secret received.');
      }

      const confirmationResponse = await fetch(
        'http://localhost:8082/api/payment/confirm-payment',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clientSecret: clientSecret,
            paymentIntentId: paymentIntentId,
            PaymentMethodId: paymentMethodId,
          }),
        },
      );

      if (!confirmationResponse.ok) {
        throw new Error('Error confirming payment.');
      }

      const confirmationData = await confirmationResponse.json();
      console.log('confirmation status', confirmationData);

      if (confirmationData.success === true) {
        Alert.alert('Payment Successful', 'Your payment was successful!');
        console.log('Saving pass to the database...');

        const payload = {
          cardPrice: cardPrice,
          isActive: isActive,
          userId: userId,
          adressId: adressId,
          cardTitle: cardTitle,
        };

        const savePassResponse = await axios.post(
          'http://localhost:8082/api/add/saveCard',
          payload,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
            params: {
              paymentIntentId: paymentIntentId,
              paymentMethodId: paymentMethodId,
            },
          },
        );

        if (savePassResponse.status !== 200) {
          throw new Error('Error saving pass.');
        }

        console.log('Pass saved successfully:', savePassResponse.data);
        router.push({
          pathname: '/wallet/(successTransction)/successTransction',
          params: {
            cardPrice: cardPrice,
          },
        });
      } else {
        Alert.alert('Payment Failed', 'The payment confirmation failed.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Payment Error',
        'An error occurred while processing your payment.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.textBalance}>Balance due:</Text>
        <Text style={styles.textPrice}>{params.total} €</Text>
      </View>

      <View>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/cb.png')}
            style={styles.image}
            resizeMode='cover'
          />
        </View>
      </View>

      <View style={styles.contentCard}>
        <View style={styles.row}>
          <View>
            <Text style={styles.titleCard}>Credit card number</Text>
            <Text style={styles.text}>
              4242 4242 4242 {visacardDetails?.lastFourDigits || 'XXXX'}
            </Text>
          </View>

          <Pressable onPress={handleAddNewCard}>
            <Text style={styles.linkText}>ADD NEW CARD</Text>
          </Pressable>
        </View>

        <Text style={styles.titleCard}>Credit Card owner</Text>
        <Text style={styles.text}>{visacardDetails?.cardOwner || 'N/A'}</Text>

        <View style={styles.row}>
          <View>
            <Text style={styles.titleCard}>Expires</Text>
            <Text style={styles.text}>12/34</Text>
          </View>
          <View>
            <Text style={styles.titleCard}>Code</Text>
            <Text style={styles.text}>123</Text>
          </View>
        </View>
      </View>

      <View style={styles.containerCheckbox}>
        <Pressable
          style={[styles.checkbox, isChecked && styles.checked]}
          onPress={toggleCheckbox}
        >
          {isChecked && <Text style={styles.checkmark}>✓</Text>}
        </Pressable>
        <Text style={styles.textCheckbox}>
          I have read and accept the General Conditions {'\n'}
          of Sale and the Fare conditions.{'\n'}I have read the Legal notices.
          {'\n'}I have read and accept the Conditions of Sale{'\n'}
          for the seat option.
        </Text>
      </View>

      <ButtonWallet text='Continue' onPress={handlePayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 55,
  },
  textBalance: {
    fontSize: 17,
    color: '#606060',
    fontWeight: 'bold',
  },
  textPrice: {
    fontSize: 17,
    color: '#599AD0',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: 355,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentCard: {
    width: '85%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginTop: 10,
  },
  titleCard: {
    fontSize: 14,
    color: '#606060',
    fontWeight: 'bold',
  },
  text: {
    color: '#606060',
  },
  linkText: {
    fontSize: 14,
    color: '#606060',
    textDecorationLine: 'underline',
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
    marginTop: 20,
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
    marginTop: 20,
    marginBottom: 15,
  },
});

export default PaymentInformationsCard;
