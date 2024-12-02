import React from 'react';
import { View, Button, Platform, StyleSheet } from 'react-native';

interface PaymentOptionsProps {
  price: number;
  cardType: string;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ price, cardType }) => {
  const handleCreditCardPayment = () => {
    console.log("Lancer paiement par carte bancaire");
  };

  const handlePayPalPayment = () => {
    console.log("Lancer PayPal");
  };

  const handleApplePayPayment = () => {
    console.log("Lancer Apple Pay");
  };

  const handleGooglePayPayment = () => {
    console.log("Lancer Google Pay");
  };

  const handleSamsungPayPayment = () => {
    console.log("Lancer Samsung Pay");
  };

  return (
    <View style={styles.paymentOptionsContainer}>
      {/* Bouton de paiement par carte */}
      <Button title="Carte bancaire" onPress={handleCreditCardPayment} />
      <Button title="PayPal" onPress={handlePayPalPayment} />

      {/* Options spécifiques à iOS (Apple Pay) */}
      {Platform.OS === 'ios' && (
        <Button title="Apple Pay" onPress={handleApplePayPayment} />
      )}

      {/* Options spécifiques à Android (Google Pay et Samsung Pay) */}
      {Platform.OS === 'android' && (
        <>
          <Button title="Google Pay" onPress={handleGooglePayPayment} />
          <Button title="Samsung Pay" onPress={handleSamsungPayPayment} />
        </>
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
