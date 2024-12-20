import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import PaymentOptions from '@/components/paymentOption/PaymentOptions';

function TopUpConfirmation() {
  // Récupérez les paramètres de la route
  const { cardType, price } = useLocalSearchParams();

  // Vérifiez si on reçoit les données
  if (!cardType || !price) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Pas de données reçues.</Text>
      </View>
    );
  }

  console.log('params', { cardType, price });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Confirmation</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.info}>Type de Carte: {cardType}</Text>
        <Text style={styles.info}>Prix Total: {price} €</Text>
      </View>

      <View style={styles.separator}></View>

      {/* Affichage des options de paiement */}
      <PaymentOptions price={Number(price)} cardType={String(cardType)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#599AD0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 20,
  },
});

export default TopUpConfirmation;
