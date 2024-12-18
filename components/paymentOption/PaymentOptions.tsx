import React from 'react';
import { View, Button, Platform, StyleSheet, Alert } from 'react-native';
// import { useStripe } from '@stripe/stripe-react-native'; // Pour React Native
import { loadStripe } from '@stripe/stripe-js'; // Pour le Web

interface PaymentOptionsProps {
  price: number; // Montant du paiement
  cardType: string;
}

// Charger Stripe.js pour le Web
const stripePromise = Platform.OS === 'web' ? loadStripe('') : null;

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ price, cardType }) => {
  // const stripeReactNative = useStripe(); // Utilisé pour React Native

  // Fonction générique d'alerte pour méthodes non implémentées
  const showAlert = (method: string) => {
    Alert.alert(`${method}`, `${method} est en cours d'intégration.`);
  };

  // Paiement par carte bancaire avec Stripe React Native
  // const handleCreditCardPaymentNative = async () => {
  //   if (!stripeReactNative) return;

  //   try {
  //     const { error } = await stripeReactNative.initPaymentSheet({
  //       paymentIntentClientSecret: 'your-client-secret', // Obligatoire
  //       merchantDisplayName: 'Teona Groups', // Obligatoire
  //     });

  //     if (!error) {
  //       const { error: presentError } = await stripeReactNative.presentPaymentSheet();
  //       if (presentError) {
  //         Alert.alert('Payment Error', presentError.message);
  //       } else {
  //         Alert.alert('Payment successes', `You paid ${price} €`);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Erreur avec initPaymentSheet', error);
  //     Alert.alert('Erreur', 'Impossible de lancer le paiement');
  //   }
  // };

  // Paiement par carte bancaire avec Stripe.js
  const handleCreditCardPaymentWeb = async () => {
    const stripe = await stripePromise;
    if (!stripe) {
      Alert.alert('Erreur', 'Stripe.js non chargé');
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
      // Vérifier la réponse
      if (!response.ok) {
        Alert.alert('Erreur', 'Impossible de créer le PaymentIntent.');
        return;
      }

      const { clientSecret } = await response.json();

      // Confirmer le paiement avec Stripe.js
      const { error } = await stripe.confirmCardPayment(clientSecret);

      if (error) {
        Alert.alert(
          'Erreur de paiement',
          error.message || 'Une erreur est survenue lors du paiement.',
        );
      } else {
        Alert.alert(
          'Paiement réussi',
          `Vous avez payé ${price} € avec succès.`,
        );
      }
    } catch (err) {
      console.error('Erreur lors du paiement', err);
      Alert.alert('Erreur', 'Impossible de traiter le paiement.');
    }
  };

  // Paiement Apple Pay via Stripe React Native
  // const handleApplePay = async () => {
  //   try {
  //     const { error } = await stripeReactNative.initPaymentSheet({
  //       merchantDisplayName: 'Your Merchant Name',
  //       applePay: {
  //         merchantCountryCode: 'FR',
  //         paymentSummaryItems: [
  //           { label: 'Total', amount: `${price}` },
  //         ],
  //       },
  //     });

  //     if (!error) {
  //       const { error: presentError } = await stripeReactNative.presentPaymentSheet();
  //       if (presentError) {
  //         Alert.alert('Erreur Apple Pay', presentError.message);
  //       } else {
  //         Alert.alert('Paiement réussi', 'Paiement Apple Pay terminé');
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Erreur Apple Pay', err);
  //     Alert.alert('Erreur', 'Impossible de lancer Apple Pay');
  //   }
  // };

  // Paiement Google Pay via Stripe React Native
  // const handleGooglePay = async () => {
  //   try {
  //     const { error } = await stripeReactNative.initGooglePay({
  //       merchantDisplayName: 'Your Merchant Name',
  //       googlePay: {
  //         merchantCountryCode: 'FR',
  //         currencyCode: 'EUR',
  //         totalPrice: `${price}`,
  //       },
  //     });

  //     if (!error) {
  //       const { error: presentError } = await stripeReactNative.presentGooglePay();
  //       if (presentError) {
  //         Alert.alert('Erreur Google Pay', presentError.message);
  //       } else {
  //         Alert.alert('Paiement réussi', 'Paiement Google Pay terminé');
  //       }
  //     }
  //   } catch (err) {
  //     console.error('Erreur Google Pay', err);
  //     Alert.alert('Erreur', 'Impossible de lancer Google Pay');
  //   }
  // };

  // Paiement Samsung Pay (non directement supporté par Stripe, nécessite des solutions tierces)
  const handleSamsungPay = () => {
    showAlert('Samsung Pay');
  };

  // Appeler la bonne méthode de paiement selon la plateforme
  const handleCreditCardPayment = () => {
    if (Platform.OS === 'web') {
      handleCreditCardPaymentWeb();
    } else {
      // handleCreditCardPaymentNative();
    }
  };

  return (
    <View style={styles.paymentOptionsContainer}>
      {/* Paiement par carte bancaire */}
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
