import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { Link } from 'expo-router';
import CustomButton from '@/components/ButtonInscriptionLogin';

interface VerifyEmailProps {
  title: string;
  subtitle: string;
  pinNotReceivedLink: string;
  onSubmit: (pinCode: string) => void;
}

const VerifyEmailComponent: React.FC<VerifyEmailProps> = ({
  title,
  subtitle,
  pinNotReceivedLink,
  onSubmit,
}) => {
  const [pinCode, setPinCode] = useState('');

  const handleVerify = () => {
    if (!pinCode) {
      Alert.alert('Error', 'Please enter the PIN code.');
      return;
    }
    onSubmit(pinCode);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/verifyMailForgotPassword.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>

        <TextInput
          style={styles.input}
          placeholder='Enter PIN Code'
          placeholderTextColor='#888'
          keyboardType='numeric'
          value={pinCode}
          onChangeText={setPinCode}
          maxLength={6}
        />

        <View style={styles.pinNotReceivedContainer}>
          <Link href={pinNotReceivedLink} style={styles.pinNotReceivedLink}>
            Pin code not received?
          </Link>
        </View>

        <CustomButton text='Verify' color='blue' onPress={handleVerify} />
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
    width: '85%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
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
  subtitle: {
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
    textAlign: 'center',
  },
  pinNotReceivedContainer: {
    alignSelf: 'center',
    marginVertical: 5,
  },
  pinNotReceivedLink: {
    color: '#2787BB',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
    alignSelf: 'center',
  },
});

export default VerifyEmailComponent;
