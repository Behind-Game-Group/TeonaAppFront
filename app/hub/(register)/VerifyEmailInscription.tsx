import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import VerifyPinCode from '@/components/verifyPinCode/VerifyPinCode';
import { Alert } from 'react-native';

const ForgotPasswordVerifyEmail: React.FC = () => {
  const router = useRouter();

  const handleVerification = async (pinCode: string) => {
    if (!pinCode) {
      Alert.alert('Error', 'Please enter the PIN code.');
      return;
    }

    try {
      // Remplacez l'URL par celle de votre API
      const response = await axios.post('xxxxx', {
        pinCode,
      });

      if (response.status === 200 && response.data.valid) {
        // Le code PIN est valide, on redirige l'utilisateur
        router.push('/hub/(register)/ContactPreferences');
      } else {
        Alert.alert('Invalid PIN', 'The PIN code you entered is incorrect.');
      }
    } catch (error) {
      console.error('Error verifying PIN:', error);
      Alert.alert('Error', 'An error occurred while verifying your PIN.');
    } finally {
    }
  };

  return (
    <VerifyPinCode
      title="Verify Your Email"
      subtitle="Please enter the PIN code sent to your email address."
      pinNotReceivedLink="/hub/auth"
      onSubmit={handleVerification}
    />
  );
};

export default ForgotPasswordVerifyEmail;
