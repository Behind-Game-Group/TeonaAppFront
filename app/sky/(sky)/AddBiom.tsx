import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { router } from 'expo-router';
import axios from 'axios';
import OrangeButton from '@/components/TopUpButton';
import BlueButton from '@/components/TravelButton';
import IdButton from '@/components/IdTeoButton';

const AddBiom = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageSelection = (uri: string) => {
    setImageUri(uri);
  };

  const sendImageToBackend = async () => {
    if (imageUri) {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });

      try {
        const response = await axios.post('YOUR_BACKEND_URL', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.content}>
      <Text style={styles.text}>Please provide the following information:</Text>
      <IdButton
        iconSource={require('@/assets/images/teo-face-id.png')}
        title={'Scan your face'}
        onImageSelected={handleImageSelection}
        color={'#FFA500'}
        backgroundColor={'#FFFFFF'}
      />
      <OrangeButton
        iconSource={require('@/assets/images/icon-passeport-teo.png')}
        title={'Scan your passeport'}
        onPress={() => {
          router.push('/sky/sky');
        }}
        color={'#FFA500'}
        backgroundColor={'#FFFFFF'}
      />
      <View style={styles.backValid}>
        <BlueButton
          style={styles.validation}
          title={'Create account'}
          onPress={sendImageToBackend}
          color={'#2787BB'}
          backgroundColor={'#FFFFFF'}
        />
      </View>
    </View>
  );
};

export default AddBiom;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#606060',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    gap: 30,
    flex: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 0,
    padding: 0,
  },
  backValid: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  validation: {
    color: '#2787BB',
  },
});