import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '@/components/ButtonInscriptionLogin';

const NotificationPreferencesPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [promotionalEmails, setPromotionalEmails] = useState(false);

  const handleSavePreferences = () => {
    let preferences = 'Your preferences:\n';

    preferences += emailNotifications
      ? 'Receive notifications by email\n'
      : 'Do not receive notifications by email\n';

    preferences += promotionalEmails
      ? 'Receive promotional emails\n'
      : 'Do not receive promotional emails\n';

    Alert.alert('Notification Preferences', preferences);
  };

  const toggleCheckbox = (currentValue: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>>) => {
    setValue(!currentValue);
  };

  return (
    <ImageBackground
      source={require('@/assets/images/bgSignIn.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Please set your contact preferences</Text>

        <View style={styles.preferenceContainer}>
          <TouchableOpacity
            style={styles.preferenceRow}
            onPress={() => toggleCheckbox(emailNotifications, setEmailNotifications)}
          >
            <View style={[styles.checkbox, emailNotifications && styles.checkboxChecked]} />
            <Text style={styles.preferenceText}>
              Subscribe to Teona Group updates
            </Text>
          </TouchableOpacity>
          <Text style={styles.preferenceDescription}>
            If you would like to receive emails from TeonaPassenger with updates about the programme and personalized offers from TeonaGroup and its partners, simply subscribe using the toggle above. You can unsubscribe at any time.
          </Text>

          <TouchableOpacity
            style={styles.preferenceRow}
            onPress={() => toggleCheckbox(promotionalEmails, setPromotionalEmails)}
          >
            <View style={[styles.checkbox, promotionalEmails && styles.checkboxChecked]} />
            <Text style={styles.preferenceText}>
              Subscribe to Teona Passenger updates
            </Text>
          </TouchableOpacity>
          <Text style={styles.preferenceDescription}>
            To receive updates and personalized offers from Georgina Passenger and its partners, simply subscribe above. Georgina Passenger will send you updates and offers via e-mail and social media. You can unsubscribe at any time.
          </Text>
        </View>

        <CustomButton
          text="Save Preferences"
          color="blue"
          onPress={handleSavePreferences}
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
  preferenceContainer: {
    width: '100%',
    marginBottom: 20,
  },
  preferenceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#888',
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#2787BB',
  },
  preferenceText: {
    fontSize: 16,
    color: '#333',
  },
  preferenceDescription: {
    fontSize: 14,
    color: '#555',
    marginLeft: 34,
    marginBottom: 10,
    lineHeight: 18,
  },
  linkContainer: {
    marginTop: 10,
  },
  link: {
    color: '#2787BB',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});

export default NotificationPreferencesPage;
