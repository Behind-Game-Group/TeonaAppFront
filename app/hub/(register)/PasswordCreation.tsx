import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import { useUser } from '@/app/hub/(register)/userInfoContext/UserInfo';
import CustomButton from '@/components/ButtonInscriptionLogin';
import { useRouter } from 'expo-router';

const PasswordCreation: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | null
  >(null);

  const { updateUser } = useUser();
  const router = useRouter();

  const { width, height } = useWindowDimensions();

  const validatePassword = (input: string) => {
    const minLength = 12;
    const maxLength = 50;
    const hasUpperCase = /[A-Z]/.test(input);
    const hasLowerCase = /[a-z]/.test(input);
    const hasNumber = /\d/.test(input);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(input);
    const validLength = input.length >= minLength && input.length <= maxLength;

    setIsPasswordValid(
      hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSpecialChar &&
        validLength,
    );
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    validatePassword(input);
    setPasswordError(null); // Clear error when user starts typing
  };

  const handleConfirmPasswordChange = (input: string) => {
    setConfirmPassword(input);
    setConfirmPasswordError(null); // Clear error when user starts typing
  };

  const handleSubmit = () => {
    let isValid = true;

    // Check if password is empty
    if (!password) {
      setPasswordError('Password cannot be empty.');
      isValid = false;
    } else if (!isPasswordValid) {
      setPasswordError('Your password does not meet the required criteria.');
      isValid = false;
    }

    // Check if confirm password is empty
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password.');
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('The passwords do not match.');
      isValid = false;
    }

    if (!isValid) return;

    setIsLoading(true);
    updateUser({ password });

    router.push('/hub/(register)/InformationsGeneralConditions');

    setIsLoading(false);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/bgPasswordCreation.png')}
      style={[styles.backgroundImage, { width, height }]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Create a Password</Text>

        <TextInput
          style={[styles.input, passwordError ? styles.inputError : {}]}
          placeholder='Enter your password'
          placeholderTextColor='#888'
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

        <TextInput
          style={[styles.input, confirmPasswordError ? styles.inputError : {}]}
          placeholder='Confirm your password'
          placeholderTextColor='#888'
          secureTextEntry
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        {confirmPasswordError && (
          <Text style={styles.errorText}>{confirmPasswordError}</Text>
        )}

        <View style={styles.criteriaContainer}>
          <Text style={styles.criteriaTitle}>Password must include:</Text>
          <Text
            style={[styles.criteria, password.length >= 12 && styles.valid]}
          >
            - 12-50 characters
          </Text>
          <Text
            style={[styles.criteria, /[A-Z]/.test(password) && styles.valid]}
          >
            - At least one uppercase letter
          </Text>
          <Text
            style={[styles.criteria, /[a-z]/.test(password) && styles.valid]}
          >
            - At least one lowercase letter
          </Text>
          <Text style={[styles.criteria, /\d/.test(password) && styles.valid]}>
            - At least one number
          </Text>
          <Text
            style={[
              styles.criteria,
              /[!@#$%^&*(),.?":{}|<>]/.test(password) && styles.valid,
            ]}
          >
            - At least one special character
          </Text>
        </View>

        <CustomButton
          text={isLoading ? 'Creating...' : 'Create Password'}
          color='blue'
          onPress={handleSubmit}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
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
  inputError: {
    borderColor: 'red',
  },
  criteriaContainer: {
    width: '100%',
    marginVertical: 20,
  },
  criteriaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  criteria: {
    fontSize: 14,
    color: '#888',
    marginVertical: 2,
  },
  valid: {
    color: '#049500',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default PasswordCreation;
