import React, { useState } from 'react';

import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import CustomButton from '@/components/ButtonInscriptionLogin';

const ForgotPassword: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleResetPassword = async (): Promise<void> => {
    if (!email) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(
        'http://localhost:8082/api/user/forgot-password',
        {
          email,
        },
      );

      // Success
      setSuccessMessage(
        response.data.message || `A reset link has been sent to ${email}.`,
      );
      setEmail('');
      router.push('/hub/(login)/ResetPassword');
    } catch (error: any) {
      // Error
      const errorMessage =
        error.response?.data?.message || 'An error occurred. Please try again.';

      setErrorMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/images/bgSignIn.png')}
      style={[styles.backgroundImage, { height: height }]}
    >
      <View style={[styles.container, { width: width * 0.85 }]}>
        <Text style={styles.title}>Forgot Your Password?</Text>
        <Text style={styles.instructions}>
          Enter your email address below, and we’ll send you a link to reset
          your password.
        </Text>

        <TextInput
          style={styles.input}
          placeholder='Email Address'
          placeholderTextColor='#888'
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />

        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        {successMessage && (
          <Text style={styles.successMessage}>{successMessage}</Text>
        )}

        <CustomButton
          text={loading ? 'Sending...' : 'Send Reset Link'}
          color='blue'
          onPress={handleResetPassword}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 10,

    alignItems: 'center',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    // shadowColor: "#000",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 14,
    marginVertical: 5,
  },
  successMessage: {
    color: 'green',
    fontSize: 14,
    marginVertical: 5,
  },
});

export default ForgotPassword;
