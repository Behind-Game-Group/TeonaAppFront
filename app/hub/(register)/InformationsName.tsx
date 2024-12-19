import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import ButtonInscriptionLogin from '@/components/ButtonInscriptionLogin';
import { useUser } from '@/app/hub/(register)/userInfoContext/UserInfo';

function InformationsName() {
    const router = useRouter();
    const { updateUser } = useUser();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleContinue = async () => {
        if (!firstName || !lastName) {
            Alert.alert('Error', 'Please fill in both fields.');
            return;
        }

        // Met à jour les données de l'utilisateur dans le contexte
        updateUser({ firstName, lastName });

        router.push('/hub/InformationsIdentity');
    };

    return (
      <View style={styles.container}>
          <ImageBackground
            source={require('../../../assets/images/bgInformationsName.png')}
            style={styles.backgroundImage}
          >
              <View style={styles.content}>
                  <Text style={styles.title}>
                      Let’s get started! {'\n'}
                      Let’s start with your {'\n'} name
                  </Text>
                  <Text style={styles.detailsContent}>
                      Enter your first and last name exactly as written on your passport or ID card.
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    placeholderTextColor="#888"
                    value={firstName}
                    onChangeText={setFirstName}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    placeholderTextColor="#888"
                    value={lastName}
                    onChangeText={setLastName}
                  />

                  <ButtonInscriptionLogin text="Continue" color="blue" onPress={handleContinue} />
              </View>
          </ImageBackground>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '70%',
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#606060',
        textAlign: 'center',
    },
    detailsContent: {
        fontSize: 20,
        color: '#606060',
        textAlign: 'center',
        paddingTop: 10,
        marginBottom: 10,
    },
    input: {
        width: '93%',
        padding: 12,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        fontSize: 16,
    },
});

export default InformationsName;