import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    Alert,
    Image,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import ButtonWallet from "@/components/ButtonWallet";
import * as SecureStore from "expo-secure-store";
//import jwtDecode from "jwt-decode";
import { useRouter } from "expo-router";
import axios from "axios";

function FormTeonaPass() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [streetName, setStreetName] = useState<string>("");
  const [streetNameOptional, setStreetNameOptional] = useState<string>("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [adressId, setAdressId] = useState("");

  const router = useRouter();

    // Fonction pour prendre une nouvelle photo
    const takePhoto = async () => {
        console.log("Requesting camera permissions...");
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
            console.log("Camera permission denied.");
            setMessage('Camera permission is required to take a photo.');
            setAlertModalVisible(true);
            return;
        }

        console.log("Launching camera...");
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            console.log("Photo taken:", result.assets[0].uri);
            setImage(result.assets[0].uri);
            setModalVisible(false);
        }
    };

    // Choisir une image à partir de la bibliothèque multimédia
    const pickImage = async () => {
        console.log("Requesting media library permissions...");
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            console.log("Media library permission denied.");
            setMessage('We need your permission to access the gallery');
            setAlertModalVisible(true);
            return;
        }

        console.log("Opening media library...");
        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
        });

        if (!result.canceled) {
            console.log("Image selected:", result.assets[0].uri);
            setImage(result.assets[0].uri);
        }
    };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let userId = null;
        let token = null;

        if (Platform.OS === "web") {
          userId = localStorage.getItem("userId");
          token = localStorage.getItem("authToken");
        } else {
          userId = await SecureStore.getItemAsync("userId");
          token = await SecureStore.getItemAsync("authToken");
        }

        if (token) {
          setToken(token);
          console.log("Token found:", token);
        } else {
          console.warn("Token not found");
        }

        if (userId) {
          setUserId(userId);
          console.log("User ID found:", userId);
        } else {
          console.warn("User ID not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
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
        userId,
      };
      const response = await axios.post(
        "http://localhost:8082/api/add/saveAddress",
        formData,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        }
      );

      if (response.status === 200 || (response.data && response.data.id)) {
        const { id } = response.data;
        console.log("the id of the adress:", response.data.id);
        setAdressId(id);
        if (Platform.OS === "web") {
          localStorage.setItem("addressId", id);
          console.log("Address ID saved to localStorage:", id);
        } else {
          await SecureStore.setItemAsync("addressId", id);
          console.log("Address ID saved to SecureStore:", id);
        }

        Alert.alert("Success", "Form submitted successfully.");

        router.push("/wallet/TopupFares");
      } else {
        Alert.alert("Error", "Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Alert.alert("Error", "An unexpected error occurred.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
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

          <Modal
            transparent={true}
            animationType='fade'
            visible={alertModalVisible}
            onRequestClose={() => setAlertModalVisible(false)}
          >
            <View style={styles.modalContainerA}>
              <View style={styles.modalContentA}>
                <Text style={styles.modalTextA}>{message}</Text>
                <TouchableOpacity
                  style={styles.modalButtonA}
                  onPress={() => setAlertModalVisible(false)}
                >
                  <Text style={styles.modalButtonTextA}>Authorize</Text>
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
            Your card will arrive to your door within the next 7 working days.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <ButtonWallet text='Continue' onPress={handleSubmit} />
        </View>
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
  title: {
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
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
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
  // Modal alerte
  modalContainerA: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentA: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 250,
  },
  modalTextA: {
    fontSize: 16,
    marginBottom: 20,
    color: '#606060',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalButtonA: {
    backgroundColor: '#606060',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  modalButtonTextA: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FormTeonaPass;

