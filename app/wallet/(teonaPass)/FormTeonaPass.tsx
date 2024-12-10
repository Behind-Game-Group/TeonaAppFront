import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import ButtonTeonaPass from '@/components/ButtonTeonaPass';
import * as SecureStore from 'expo-secure-store';
//import jwtDecode from "jwt-decode";
import { Platform } from 'react-native';

function FormTeonaPass() {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [streetNameOptional, setStreetNameOptional] = useState<string>('');
  const [postCode, setPostCode] = useState('');
  const [city, setCity] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission refusée',
        'Nous avons besoin de votre permission pour accéder à la galerie.',
      );
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission refusée',
        'Nous avons besoin de votre permission pour accéder à l’appareil photo.',
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setModalVisible(false);
    }
  };

  const pickImage = async () => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      let userId = null;
      let token = null;
      try {
        if (Platform.OS === 'web') {
          userId = localStorage.getItem('userId');
          token = localStorage.getItem('authToken');
        } else {
          userId = await SecureStore.getItemAsync('userId');
          token = await SecureStore.getItemAsync('authToken');
        }

        if (!userId) {
          console.error('No token found');
          Alert.alert('Error', 'No authentication token found.');
          return;
        }
        if (token) {
          setToken(token);
          console.log('token:', token);
        } else {
          console.error('token not found ');
          Alert.alert('Error', 'Invalid token structure.');
        }
        if (userId) {
          setUserId(userId);
          console.log('User ID:', userId);
        } else {
          console.error('User ID not found');
          Alert.alert('Error', 'Invalid token structure.');
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        Alert.alert('Error', 'Failed to decode token.');
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    try {
      const formData = {
        firstName,
        lastName,
        streetName,
        streetNameOptional,
        postCode,
        city,
        phoneNumber,
        country,
        image,
        ...(userId && { userId }),
      };
      const response = await fetch('http://localhost:8082/api/add/adress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        Alert.alert('Success', 'Form submitted successfully.');
      } else {
        Alert.alert('Error', 'Failed to submit the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Purchase Teona Pass</Text>
        </View>

        <Text style={styles.secondTitle}>
          Fill this out and you will have it {'\n'} delivered to your door.
        </Text>

        <View style={styles.cardImageContainer}>
          {/* Affiche l'image choisie ou un logo par défaut */}
          {image ? (
            <Image source={{ uri: image }} style={styles.profilePic} />
          ) : (
            <Image
              source={require('../../../assets/images/user-logo.png')}
              style={[styles.logoUser, { tintColor: '#606060' }]}
            />
          )}

          {/* Bouton pour ajouter une image */}
          <TouchableOpacity
            style={styles.addImageButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.addImageButtonText}>+</Text>
          </TouchableOpacity>

          {/* Modal pour les options */}
          <Modal
            transparent={true}
            animationType='slide'
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText1} onPress={takePhoto}>
                  Take new photo
                </Text>
                <View style={styles.line} />
                <Text style={styles.modalText2} onPress={pickImage}>
                  Select photo
                </Text>
                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.form}>
          <View style={styles.inputRow}>
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
          </View>

          <TextInput
            style={styles.inputAddress}
            placeholder='N° and street name'
            placeholderTextColor='#888'
            value={streetName}
            onChangeText={setStreetName}
          />

          <TextInput
            style={styles.inputAddress}
            placeholder='Address line 2 (optional)'
            placeholderTextColor='#888'
            value={streetNameOptional}
            onChangeText={setStreetNameOptional}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputPostCode}
              placeholder='Post code'
              placeholderTextColor='#888'
              value={postCode}
              onChangeText={setPostCode}
            />

            <TextInput
              style={styles.inputCity}
              placeholder='City'
              placeholderTextColor='#888'
              value={city}
              onChangeText={setCity}
            />
          </View>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputNumber}
              placeholder='+995'
              placeholderTextColor='#888'
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />

            <TextInput
              style={styles.inputCountry}
              placeholder='Country'
              placeholderTextColor='#888'
              value={country}
              onChangeText={setCountry}
            />
          </View>
          <Text style={styles.details}>
            Your card will arrive to your door within the next 7 working days).
          </Text>
        </View>
        <ButtonTeonaPass text='Continue' onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    width: '100%',
    height: 100,
    backgroundColor: '#599AD0',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Roboto',
    marginBottom: 20,
  },
  secondTitle: {
    fontSize: 17,
    color: '#606060',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardImageContainer: {
    width: 122,
    height: 122,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#606060',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    position: 'relative',
    overflow: 'hidden',
    marginLeft: 240,
  },
  profilePic: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  logoUser: {
    width: 390,
    height: 180,
    resizeMode: 'contain',
    marginTop: 23,
  },
  addImageButton: {
    position: 'absolute',
    top: 4,
    right: 5,
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#606060',
  },
  addImageButtonText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    alignItems: 'flex-start',
    marginTop: 15,
    paddingLeft: 20,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
    width: '100%',
  },
  inputFirstName: {
    width: 172,
    padding: 12,
    height: 37,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 10,
    backgroundColor: '#D9D9D9BF',
    fontSize: 16,
  },
  inputLastName: {
    width: 172,
    padding: 12,
    height: 37,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 10,
    backgroundColor: '#D9D9D9BF',
    fontSize: 16,
    marginLeft: 5,
  },
  inputAddress: {
    width: 350,
    padding: 12,
    height: 37,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 10,
    backgroundColor: '#D9D9D9BF',
    fontSize: 16,
    marginBottom: 15,
  },
  inputPostCode: {
    width: 100,
    padding: 12,
    height: 37,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 10,
    backgroundColor: '#D9D9D9BF',
    fontSize: 16,
  },
  inputCity: {
    width: 100,
    padding: 12,
    height: 37,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 10,
    backgroundColor: '#D9D9D9BF',
    fontSize: 16,
    marginLeft: 5,
  },
  inputNumber: {
    width: 62,
    padding: 12,
    height: 37,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 10,
    backgroundColor: '#D9D9D9BF',
    fontSize: 16,
  },
  inputCountry: {
    width: 138,
    padding: 12,
    height: 37,
    borderWidth: 1,
    borderColor: '#606060',
    borderRadius: 10,
    backgroundColor: '#D9D9D9BF',
    fontSize: 16,
    marginLeft: 5,
  },
  details: {
    color: '#606060',
    fontSize: 12,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 70,
    width: '100%',
    backgroundColor: '#DF8D22',
  },
  rowImages: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    tintColor: '#606060',
  },
  logoBus: {
    width: 65,
    height: 65,
    resizeMode: 'contain',
  },
  //Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    position: 'absolute',
    borderColor: '#606060',
    borderWidth: 1,
    borderTopLeftRadius: 67,
    borderTopRightRadius: 67,
    bottom: 70,
    height: 200,
  },
  modalText1: {
    color: '#606060',
    fontSize: 20,
    marginTop: 30,
  },
  modalText2: {
    color: '#606060',
    fontSize: 20,
    marginTop: 10,
  },
  line: {
    width: '85%',
    height: 1,
    backgroundColor: '#606060',
    marginTop: 10,
  },
  modalButton: {
    width: '50%',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    borderColor: '#599AD0',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 35,
  },
  modalButtonText: {
    color: '#599AD0',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FormTeonaPass;
