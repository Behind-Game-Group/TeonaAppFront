import React, { useEffect, useState } from 'react';
// import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';

import TopUpButton from '@/components/TopUpButton';
import axios from 'axios';
import { TeonaCardModel } from '@/components/TeonaCardModel';
import TeonaCard from '@/components/TeonaCard';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useRouter } from 'expo-router';

interface TopupFaresProps {
  totalPrice: number;
  setCurrentBalance: () => void;
}

const TopupFares: React.FC<TopupFaresProps> = ({
  totalPrice,
  setCurrentBalance,
}) => {
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [adressId, setAdressId] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [passDetails, setPassDetails] = useState('');
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userId = null;
        let token = null;
        let adressId = null;

        if (Platform.OS === 'web') {
          userId = localStorage.getItem('userId');
          adressId = localStorage.getItem('addressId');
          token = localStorage.getItem('authToken');
        } else {
          userId = await SecureStore.getItemAsync('userId');
          adressId = await SecureStore.getItemAsync('addressId');
          token = await SecureStore.getItemAsync('authToken');
        }

        if (token) setToken(token);
        if (userId) setUserId(userId);
        if (adressId) setAdressId(adressId);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const cardData: TeonaCardModel[] = [
    {
      id: '1',
      image: require('@/assets/images/teonapassyearly.png'),
      title: 'TeonaPass Yearly Pass',
      price: '540',
    },
    {
      id: '2',
      image: require('@/assets/images/teonapass.png'),
      title: 'TeonaPass Monthly Pass',
      price: '45',
    },
    {
      id: '3',
      image: require('@/assets/images/teonapass.png'),
      title: 'TeonaPass Weekly Pass',
      price: '11.25',
    },
    {
      id: '4',
      image: require('@/assets/images/teonapass.png'),
      title: 'TeonaPass Daily Pass',
      price: '7.95',
    },
  ];

  const handleTopUp = async (selectedCard: TeonaCardModel) => {
    if (!userId) {
      Alert.alert('Error', 'User ID not found. Please try again later.');
      return;
    }

    setLoading(true);
    const payload = {
      cardTitle: selectedCard.title,
      cardPrice: parseFloat(selectedCard.price),
      isActive: 1,
      userId,
      adressId,
    };

    try {
      const response = await axios.post(
        'http://localhost:8082/api/add/savePass',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      if (
        response.status === 200 &&
        response.data &&
        response.data.cardPrice !== undefined
      ) {
        Alert.alert('Success', response.data.message);
        const data = response.data;
        setPassDetails(data);
        const price = response.data.cardPrice;
        console.log('Price from API Response:', price);

        if (isNaN(price)) {
          console.error('Invalid price value:', price);
          Alert.alert('Error', 'Invalid price returned from the API.');
          return;
        }
        const queryParams = new URLSearchParams({
          cardType: 'TopUp',
          price: price.toString(),
        });
        console.log(
          'Navigating to:',
          `/wallet/(payment)/PaymentDisplay?${queryParams.toString()}`,
        );

        router.push({
          pathname: '/wallet/(payment)/PaymentDisplayPass',
          params: {
            cardType: 'TopUp',
            price: price.toString(),
          },
        });
      } else {
        console.error('Error in API response:', response);
        Alert.alert('Error', "Une erreur empêche l'ajout de votre carte.");
      }
    } catch (error) {
      console.error('Erreur durant la transmission des données:', error);
      Alert.alert('Erreur', 'Nous ne pouvons pas contacter le serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.faresContainer}>
      <SafeAreaView>
        <Text style={styles.headerText}>Let's TopUp your card!</Text>
        {cardData.map((card) => (
          <TeonaCard
            key={card.id}
            card={card}
            onTopUp={() => handleTopUp(card)}
          />
        ))}
        <View style={styles.faresTotalCard}>
          <Text style={styles.faresTotalPrice}>{`${totalPrice} €`}</Text>
          <View style={styles.faresButtonContainer}>
            <TopUpButton
              title={loading ? 'Loading...' : 'TopUp'}
              onPress={setCurrentBalance}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  faresContainer: { padding: 6 },
  headerText: { fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  faresTotalCard: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  faresTotalPrice: {
    borderColor: 'black',
    borderWidth: 3,
    padding: 3,
    textAlign: 'center',
    flex: 1,
  },
  faresButtonContainer: { flexDirection: 'row', flex: 1, padding: 10 },
});

export default TopupFares;
