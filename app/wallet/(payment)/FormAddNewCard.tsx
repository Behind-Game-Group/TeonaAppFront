import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const CardPaymentPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [dateExpiration, setDateExpiration] = useState<string>('');
  const [securityCode, setSecurityCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [walletId, setWalletId] = useState('');
  const [token, setToken] = useState('');

  const handleCardNumberChange = (text: string) => {
    let formattedText = text.replace(/\D/g, '');

    if (formattedText.length > 16) {
      formattedText = formattedText.slice(0, 16);
    }

    if (formattedText.length > 4) {
      formattedText = formattedText.replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    setCardNumber(formattedText);
  };

  const handleExpirationDateChange = (text: string) => {
    let formattedText = text.replace(/\D/g, '');

    if (formattedText.length > 4) {
      formattedText = formattedText.slice(0, 4);
    }

    if (formattedText.length > 2) {
      formattedText = formattedText.replace(/^(\d{2})(\d{0,2})$/, '$1/$2');
    }

    setDateExpiration(formattedText);
  };

  const handleSecurityCodeChange = (text: string) => {
    let formattedText = text.replace(/\D/g, '');

    if (formattedText.length > 3) {
      formattedText = formattedText.slice(0, 3);
    }

    setSecurityCode(formattedText);
  };
  console.log('App component mounted');
  useEffect(() => {
    console.log('useEffect triggered');
    const fetchUserAndWallet = async () => {
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
          setLoading(false);
          return;
        }
        setUserId(userId);
        setToken(token);

        const walletResponse = await axios.get(
          `http://localhost:8082/api/has-wallet/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log('Wallet response:', walletResponse);
        if (walletResponse.data && walletResponse.data.walletId) {
          setWalletId(walletResponse.data.walletId);
          console.log('Set wallet ID:', walletResponse.data.walletId);
        } else {
          alert('No wallet found for this user.');
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
        alert('Failed to fetch wallet. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndWallet();
  }, []);

  const handleSaveCard = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:8082/api/visacard/add',
        {
          walletId: walletId,
          cardOwner: name,
          lastFourDigits: cardNumber.slice(-4),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Card saved successfully', response.data);
      alert('Card saved successfully!');
    } catch (error) {
      console.error('Error saving card', error);
      setError('Failed to save card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD A NEW BANK / CREDIT CARD</Text>

      <View style={styles.content}>
        <View style={styles.line}></View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name on Card</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder='Enter your name'
        />
      </View>

      <View style={styles.content}>
        <View style={styles.line}></View>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bank/credit card number</Text>
        <TextInput
          style={styles.input}
          value={cardNumber}
          onChangeText={handleCardNumberChange}
          placeholder='Enter your card number'
          keyboardType='numeric'
        />
      </View>

      <View style={styles.content}>
        <View style={styles.line}></View>
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainerCard}>
          <Text style={styles.label}>Expiration date</Text>
          <TextInput
            style={styles.input}
            value={dateExpiration}
            onChangeText={handleExpirationDateChange}
            placeholder='MM/YY'
            keyboardType='numeric'
          />
        </View>

        <View style={styles.inputContainerCard}>
          <Text style={styles.label}>Security code</Text>
          <TextInput
            style={styles.input}
            value={securityCode}
            onChangeText={handleSecurityCodeChange}
            placeholder='i.e. 123'
            keyboardType='numeric'
          />
        </View>
      </View>

      <Text style={styles.text}>
        The information linked to your card is securely encrypted.
      </Text>

      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={handleSaveCard}>
          <Text style={styles.textButton}>Save Card</Text>
        </TouchableOpacity>
      </View>
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
    color: '#606060',
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 30,
  },
  content: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  line: {
    width: '100%',
    color: '#606060',
    borderWidth: 1,
  },
  inputContainer: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputContainerCard: {
    width: '48%',
    paddingLeft: 20,
  },
  label: {
    fontSize: 15,
    color: '#606060',
    fontWeight: 'bold',
    marginTop: 5,
  },
  input: {
    color: '#606060',
    marginBottom: 5,
    height: 25,
    borderWidth: 0,
    borderColor: 'transparent',
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5,
  },
  text: {
    fontSize: 14,
    color: '#606060',
    marginTop: 20,
  },
  containerButton: {
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    padding: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: 220,
    height: 50,
    backgroundColor: '#DF8D22',
  },
  textButton: {
    fontSize: 20,
    color: 'white',
  },
});

export default CardPaymentPage;
