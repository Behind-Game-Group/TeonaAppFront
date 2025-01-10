import {
  Alert,
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SettingsUsrForm from '@/components/SettingsUsrForm';
import TopUpButton from '@/components/TopUpButton';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { useRouter } from 'expo-router';

function TravelSettings() {
  const settingFormUsr = ['M', 'Mme', 'Mlle', 'No binaire'];

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [mail, setMail] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [adressId, setAdressId] = useState('');
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [travelTittleHeader, setEmergencyTittleHeader] =
    useState('TRAVEL COMPAGNION');
  const [travelSubHeader, setEmergencySubHeader] = useState(
    'Please make sure these details exactly match their identity documents',
  );

  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
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

        if (token) {
          setToken(token);
          console.log('Token found:', token);
        } else {
          console.warn('Token not found');
        }

        if (userId) {
          setUserId(userId);

          console.log('User ID found:', userId);
        } else {
          console.warn('User ID not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (showEmergencyForm) {
      setEmergencyTittleHeader('EMERGENCY CONTACTS');
      setEmergencySubHeader('');
    }
  }, [showEmergencyForm]);

  const handleSave = async () => {
    try {
      const formUsrSettings = {
        firstName,
        lastName,
        birthDate,
        mail,
        userId,
      };

      const response = await axios.post(
        'http://localhost:8082/api/add/saveAddress',
        formUsrSettings,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      if (response.status === 200 || (response.data && response.data.id)) {
        const { id } = response.data;
        console.log('the id of the address:', response.data.id);
        setAdressId(id);
        if (Platform.OS === 'web') {
          localStorage.setItem('addressId', id);
        } else {
          await SecureStore.setItemAsync('addressId', id);
          console.log('Address ID saved to SecureStore:', id);
        }

        Alert.alert('Success', 'Form submitted successfully.');
        setShowEmergencyForm(true);
      } else {
        Alert.alert('Error', 'Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleEmergencyFormSave = async () => {
    try {
      const emergencyFormSettings = {
        travelTittleHeader,
        travelSubHeader,
        userId,
      };

      const response = await axios.post(
        'http://localhost:8082/api/add/saveEmergenecyForm',
        emergencyFormSettings,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        },
      );

      if (response.status === 200) {
        Alert.alert('Success', 'Second form submitted successfully.');
        router.push('/wallet/TopupFares');
      } else {
        Alert.alert('Error', 'Failed to submit the second form.');
      }
    } catch (error) {
      console.error('Error submitting second form:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.travelSetContainer}>
        <View style={styles.travelSetContainent}>
          <View style={styles.travelSetHeader}>
            <View style={styles.travelImgHeader}>
              <Image
                style={styles.travelImage}
                source={require('@/assets/images/settingpic.png')}
              />
            </View>
            <View style={styles.travelTxtHeader}>
              <Text style={styles.travelSubHeader}>{travelSubHeader}</Text>
              <Text style={styles.travelTittleHeader}>
                {travelTittleHeader}
              </Text>
            </View>
          </View>

          {!showEmergencyForm ? (
            <>
              <SettingsUsrForm
                style={styles.inputTittle}
                label='title'
                settingFormUsr={settingFormUsr}
              />
              <TextInput
                style={styles.inputFirstName}
                placeholder='First Name'
                placeholderTextColor='#888'
                value={firstName}
                onChangeText={setFirstName}
              />
              <TextInput
                style={styles.inputLastName}
                placeholder='Last Name'
                placeholderTextColor='#888'
                value={lastName}
                onChangeText={setLastName}
              />
              <TextInput
                style={styles.inputBirthDate}
                placeholder='Date of Birth'
                placeholderTextColor='#888'
                value={birthDate}
                onChangeText={setBirthDate}
              />
              <TextInput
                style={styles.inputMail}
                placeholder='E-mail address (optional)'
                placeholderTextColor='#888'
                value={mail}
                onChangeText={setMail}
              />
              <TopUpButton
                color={'#FFA500'}
                title={'Save'}
                onPress={(e) => (e.preventDefault(), handleSave())}
              />
            </>
          ) : (
            <>
              <TextInput
                style={styles.inputFirstName}
                placeholder='Travel Title Header'
                placeholderTextColor='#888'
                value={travelTittleHeader}
                onChangeText={setEmergencyTittleHeader}
              />
              <TextInput
                style={styles.inputLastName}
                placeholder='Travel Sub Header'
                placeholderTextColor='#888'
                value={travelSubHeader}
                onChangeText={setEmergencySubHeader}
              />
              <TopUpButton
                color={'#FFA500'}
                title={'Save Second Form'}
                onPress={handleEmergencyFormSave}
              />
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  travelSetContainer: {
    flex: 1,
  },
  travelSetContainent: {
    backgroundColor: '#FFFFFF',
    width: width,
    height: height,
    borderRadius: 30,
    marginTop: 0,
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  travelSetHeader: {
    margin: 0,
    padding: 0,
    backgroundColor: 'blue',
    width: width,
  },
  travelImage: {
    width: width * 0.25,
    height: height * 0.25,
    backgroundColor: 'red',
    justifyContent: 'center',
    resizeMode: 'contain',
    margin: 0,
    padding: 0,
  },
  travelImgHeader: {
    flex: 1,
    justifyContent: 'flex-end',
    alignContent: 'rigth',
  },
  travelTittleHeader: {
    flex: 1,
    fontSize: 30,
    color: '#FFA500',
    textAlign: 'left',
  },
  travelTxtHeader: {
    textAlign: 'center',
  },
  travelSubHeader: {
    color: '#FFA500',
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
  },
  inputTittle: {
    alignItems: 'flex-start',
  },
  inputFirstName: {
    width: width,
    padding: 15,
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    fontSize: 35,
    borderBottomColor: 'black',
  },
  inputLastName: {
    width: width,
    padding: 15,
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    fontSize: 35,
    borderBottomColor: 'black',
  },
  inputBirthDate: {
    width: width,
    padding: 15,
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    fontSize: 35,
    borderBottomColor: 'black',
  },
  inputMail: {
    width: width,
    padding: 15,
    height: 40,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    fontSize: 35,
  },
});
export default TravelSettings;
