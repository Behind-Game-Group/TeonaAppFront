import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import PaymentOptions from "@/components/paymentOption/PaymentOptions";

interface CardPaymentPageProps {
  route: {
    params: {
      cardType: string;
      price: number;
      currentBalance: number;
    };
  };
}

const CardPaymentPage: React.FC<CardPaymentPageProps> = ({ route }) => {
  // const { cardType, price, currentBalance } = route.params;
  const { cardType = "", price = 0, currentBalance = 0 } = route?.params || {};
  const [isFirstCard, setIsFirstCard] = useState<boolean>(true);

  // Calcul des frais de carte si c'est la première carte
  const cardFee = isFirstCard ? 7.5 : 0;
  const total = price + cardFee; // Calcul du total avec frais de carte

  return (
    <View style={styles.container}>
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>Carte : {cardType}</Text>
        <Text style={styles.cardText}>Prix de la carte : {price} €</Text>
        <Text style={styles.cardText}>Solde actuel : {currentBalance} €</Text>
        {isFirstCard && (
          <Text style={styles.cardText}>Frais de carte : {cardFee} €</Text>
        )}
        <Text style={styles.cardText}>Total : {total} €</Text>
      </View>

      {/* Séparateur */}
      <View style={styles.separator}></View>

      {/* Affichage des options de paiement */}
      <PaymentOptions price={total} cardType={cardType} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  cardInfo: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 16,
    marginTop: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
});

export default CardPaymentPage;
