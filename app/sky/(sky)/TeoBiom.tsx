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
import React from "react";
import OrangeButton from '@/components/TopUpButton';
export default function TeoBiom () {
  return(
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Image
            source={require('@/assets/images/TeoBio.png')}
            style={styles.BioImage}
          />
          <Text> Experience seamless and contactless travel with Georgina Sky facial recognition technology at selected airports</Text>
          <OrangeButton
            title={'Learn more about Georgina Sky Biometrics (GBH)'}
            onPress={() => {
              router.push('/sky/sky');
            }}
            color={'#FFFFFF'}
            backgroundColor={'#FFA451'}
          />
          <Text>  Learn more about Georgina Sky Biometrics (GBH)</Text>
        </View>

      </View>
    </View>
  );
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({ });