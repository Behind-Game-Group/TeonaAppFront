import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  Image,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import OrangeButton from '@/components/TopUpButton';

export default function TeoBiom() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
        <View style={styles.imageContent}>
          <Image
            source={require('@/assets/images/TeoBio.png')}
            style={styles.BioImage}
          />
          <View style={styles.topLeftCorner} />
          <View style={styles.topRightCorner} />
          <View style={styles.bottomLeftCorner} />
          <View style={styles.bottomRightCorner} />
        </View>
        </View>
        <Text style={styles.text}>
          {' '}
          Experience seamless and contactless travel with Georgina Sky facial
          recognition technology at selected airports
        </Text>
        <OrangeButton
          title={'Create GBH profile'}
          onPress={() => {
            router.push('/sky/sky');
          }}
          color={'#FFA500'}
          backgroundColor={'#FFFFFF'}
        />
        <Text style={styles.subText}> Learn more about Georgina Sky Biometrics (GBH)</Text>
      </View>
    </View>
  );
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const cornerSize = 20;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#606060',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    gap: 30,
    flex: 1,
  },
  imageContainer: {
    width: width * 0.2,
    height: height * 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContent: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  BioImage: {
    width: width * 0.2,
    height: height * 0.2,
    resizeMode: 'contain',
    margin: 0,
    padding: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftCorner: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: cornerSize,
    height: cornerSize,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#FFFFFF',
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: cornerSize,
    height: cornerSize,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFFFFF',
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: cornerSize,
    height: cornerSize,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#FFFFFF',
  },
  bottomRightCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: cornerSize,
    height: cornerSize,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
    maxWidth: width * 0.2,
    margin: 0,
    padding: 0,
  },
  subText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  Button: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: width * 0.5,
  },
});
