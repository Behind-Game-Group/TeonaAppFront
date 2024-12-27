import React from 'react';
import { View, Button, Platform, StyleSheet, Alert } from 'react-native';

let stripePromise: any = null;
let stripeReactNative: any = null;

if (Platform.OS === 'web') {
  const { loadStripe } = require('@stripe/stripe-js');
  stripePromise = loadStripe('your-stripe-publishable-key');
} else {
  const { useStripe } = require('@stripe/stripe-react-native');
  stripeReactNative = useStripe;
}

interface PaymentOptionsProps {
  price: number;
  cardType: string;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ price, cardType }) => {
  const stripe = stripeReactNative ? stripeReactNative() : null;

  const showAlert = (method: string) => {
    Alert.alert(`${method}`, `${method} est en cours d'intégration.`);
  };

  const handleCreditCardPaymentWeb = async () => {
    if (!stripePromise) {
      Alert.alert('Error', 'Stripe.js not loaded');
      return;
    }

    const stripe = await stripePromise;
    if (!stripe) {
      Alert.alert('Error', 'Failed to load Stripe.js');
      return;
    }

    try {
      const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: price * 100 }),
      });

      if (!response.ok) {
        Alert.alert('Error', 'Failed to create PaymentIntent.');
        return;
      }

      const { clientSecret } = await response.json();
      const { error } = await stripe.confirmCardPayment(clientSecret);

      if (error) {
        Alert.alert('Payment Error', error.message || 'Payment failed.');
      } else {
        Alert.alert('Payment Successful', `You paid ${price} € successfully.`);
      }
    } catch (err) {
      console.error('Web Payment Error:', err);
      Alert.alert('Error', 'Failed to process payment.');
    }
  };

  const handleCreditCardPaymentNative = async () => {
    if (!stripe) {
      Alert.alert('Error', 'Stripe Native not available');
      return;
    }

    try {
      const { error } = await stripe.initPaymentSheet({
        paymentIntentClientSecret: 'your-client-secret',
        merchantDisplayName: 'Your Business Name',
      });

      if (!error) {
        const { error: presentError } = await stripe.presentPaymentSheet();
        if (presentError) {
          Alert.alert('Payment Error', presentError.message);
        } else {
          Alert.alert(
            'Payment Successful',
            `You paid ${price} € successfully.`,
          );
        }
      }
    } catch (err) {
      console.error('Native Payment Error:', err);
      Alert.alert('Error', 'Failed to process payment.');
    }
  };

  const handleCreditCardPayment = () => {
    if (Platform.OS === 'web') {
      handleCreditCardPaymentWeb();
    } else {
      handleCreditCardPaymentNative();
    }
  };

  const handleSamsungPay = () => {
    showAlert('Samsung Pay');
  };

  return (
    <View style={styles.paymentOptionsContainer}>
      {/* Credit Card Payment */}
      <Button title='Carte bancaire' onPress={handleCreditCardPayment} />

      {/* PayPal */}
      <Button title='PayPal' onPress={() => showAlert('PayPal')} />

      {/* Apple Pay */}
      {Platform.OS === 'ios' && (
        <Button title='Apple Pay' onPress={() => showAlert('Apple Pay')} />
      )}

      {/* Google Pay */}
      {Platform.OS === 'android' && (
        <Button title='Google Pay' onPress={() => showAlert('Google Pay')} />
      )}

      {/* Samsung Pay */}
      {Platform.OS === 'android' && (
        <Button title='Samsung Pay' onPress={handleSamsungPay} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  paymentOptionsContainer: {
    marginTop: 20,
  },
});

export default PaymentOptions;
