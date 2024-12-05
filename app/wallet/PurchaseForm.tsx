import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

{
  /*
   ** 
   Pour l'erreur sur axios ; vérifie que tu as bien axios parmis tes dépendances (dans ton fichier package.json) et 
   à l'installer s'il n'est pas présent
   **
   */
}
// import Subtitles from 'react-native-subtitles'
// import {OrderBlueCard} from '/assets/images/OrderBlueCard.png'

// Tu peux créer une interface ici pour typer ta constante d'erreur voir le mettre dans un fichier à part dans un dossier "types" ou "interfaces" à la racine de ton projet avec un export default et pouvoir l'importer ici
interface Errors {
  firstName: string;
  lastName: string;
  streetName: string;
  Optional: string;
  postalCode: string;
  city: string;
  countryCode: string;
  country: string;
}

function PurchaseForm() {
  const router = useRouter();
  //!\   N'omet pas de typer tes constantes /!\
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [streetName, setStreetName] = useState<string>('');
  const [Optional] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  //!\ Utiliser l'interface Errors de la ligne ≃ 27 pour typer les valeurs des champs de cette constante /!\
  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    streetName: '',
    Optional: '',
    postalCode: '',
    city: '',
    countryCode: '',
    country: '',
  });

  const validateFields = () => {
    const newErrors: typeof errors = {
      firstName: firstName ? '' : 'First Name is required.',
      lastName: lastName ? '' : 'Last Name is required.',
      //address: address ? '' : 'Address is required.',
      streetName: streetName ? '' : 'Number and Street  are required.',
      Optional: Optional ? '' : ' is optional.',
      postalCode: postalCode ? '' : 'Postal Code is required.',

      city: city ? '' : 'City is required.',
      countryCode: countryCode ? '' : 'CountryCode is required.',
      country: country ? '' : 'Country is required.',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== '');
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      Alert.alert(
        'Validation Error',
        'Please fill in all the required fields.',
      );
      return;
    }

    setLoading(true);

    try {
      const response = axios.post('XXXXXXXXXXXXXXXXXXXXXXXX', {
        firstName,
        lastName,
        address,
        city,
        postalCode,
      });

      // Cas succès
      Alert.alert('Success', 'Address submitted successfully!');
      router.push('/'); // Redirige après le succès
    } catch (error: unknown) {
      console.error(error);

      let errorMessage = 'An error occurred. Please try again.';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Our cards </Text>

      <Text style={[styles.subtitles, { color: '#df8D22' }]}>
        Fill this out and you will have it delivered to your door
      </Text>
      {/* L'utilisation de la balise <Image/> ce fait comme suit, en utilisant les attributs source et la méthode require pour renseigner le chemin du fichier d'image à afficher ; l'import ne fonctionnait pas pour toi car il te manque le fichier "declarations.d.ts" à la racine de ton projet "./TeonaAppFront/declarations.d.ts" qui permet de définir les différents types de fichier d'image que Typescript doit prendre en compte ; je te fournirais un exemple de ce fichier */}
      <Image
        source={require('../../assets/images/OrderBlueCard.png')}
        style={{
          width: 190,
          height: 203,
          resizeMode: 'contain',
          alignSelf: 'center',
          margin: 10,
        }}
      />
      {/* Exemple de comment structurer tes input sur une ligne en CSS avec un premier conteneur en flexDirection row qui permet d'afficher tous les éléments de se conteneur sur une seule et même ligne ainsi qu'un justifyContent space-between qui permet de positionner chaque élément avec un espace équivalent entre eux.
      Conteneur qui contiendra deux autres conteneurs qui eux contiendront chaque text et chaque input en flexDirection column pour les afficher en colonne et gap 2 pour mettre un espace entre les deux éléments de ces deux conteneurs. */}
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View style={{ width: '49%', flexDirection: 'column', gap: 2 }}>
          <Text> First name*</Text>
          <TextInput
            style={[styles.input, errors.firstName && styles.errorInput]}
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
        <View style={{ width: '49%', flexDirection: 'column', gap: 2 }}>
          <Text>Last Name</Text>
          <TextInput
            style={[styles.input, errors.lastName && styles.errorInput]}
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>

      {errors.firstName ? (
        <Text style={styles.errorText}>{errors.firstName}</Text>
      ) : null}

      {errors.lastName ? (
        <Text style={styles.errorText}>{errors.lastName}</Text>
      ) : null}

      <Text>Address*</Text>

      <TextInput
        style={[styles.input, errors.city && styles.errorInput]}
        placeholder='N° and street name '
        value={streetName}
        onChangeText={setStreetName}
      />
      <TextInput
        style={[styles.input, errors.city && styles.errorInput]}
        placeholder='Address line2 (optional) '
        value={Optional}
      />

      {/* Nouvel exemple de comment structurer tes input sur une ligne en CSS avec un premier conteneur en flexDirection row qui permet d'afficher tous les éléments de ce conteneur sur une seule et même ligne ainsi qu'un justifyContent flex-start qui permet de positionner chaque éléments (au début) à gauche de l'écran. Conteneur qui contiendra deux autres conteneurs qui eux contiendront chaque text et chaque input en flexDirection column pour les afficher en column et gap 2 pour mettre un espace entre les deux éléments de ces deux conteneurs. */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 12,
          width: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'column',
            gap: 2,
            width: '25%',
            height: 'auto',
          }}
        >
          <Text>Post Code*</Text>

          <TextInput
            style={[
              styles.input,
              errors.postalCode && styles.errorInput,
              {
                flex: 1,
                width: 97,
              },
            ]}
            keyboardType='numeric'
            value={postalCode}
            onChangeText={setPostalCode}
          />
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 2,
            width: '25%',
            height: 'auto',
          }}
        >
          <Text>City*</Text>

          <TextInput
            style={[
              styles.input,
              errors.city && styles.errorInput,
              {
                flex: 1,
                width: 97,
              },
            ]}
            value={city}
            onChangeText={setCity}
          />
        </View>
      </View>

      {errors.postalCode ? (
        <Text style={styles.errorText}>{errors.postalCode}</Text>
      ) : null}

      {errors.city ? <Text style={styles.errorText}>{errors.city}</Text> : null}

      <TextInput
        style={[styles.input, errors.postalCode && styles.errorInput]}
        placeholder='+995'
        keyboardType='numeric'
        value={countryCode}
        onChangeText={setCountryCode}
      />
      {errors.countryCode ? (
        <Text style={styles.errorText}>{errors.countryCode}</Text>
      ) : null}

      <Text>Country</Text>
      <TextInput
        style={[styles.input, errors.postalCode && styles.errorInput]}
        value={country}
        onChangeText={setCountry}
      />
      {errors.country ? (
        <Text style={styles.errorText}>{errors.country}</Text>
      ) : null}

      <Text style={{ textAlign: 'center', marginTop: 20 }}>
        Your card will arrive at your door within 7 working days
      </Text>

      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.disabledButton,
          //!\ Petite proposition /!\
          { alignSelf: 'center', marginTop: 30 },
        ]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Submitting...' : 'Continue'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1, fait planter ta scrollView
    paddingInline: 20,
    paddingBottom: 140,
    backgroundColor: '#FFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitles: {
    fontFamily: 'Lucida Grande',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 36,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15, // 15 au lieu de 5 ?
    padding: 5, // 5 au lieu de 15 ?
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 15, // 15 au lieu de 5
    alignItems: 'center',
    height: 50,
    width: 200,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default PurchaseForm;