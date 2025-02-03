import React from 'react';
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

export default function SkyLoading() {
  return (  <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/SkyLoading.png')}
        style={styles.ImgBack}
      >
        <View style={styles.Header}>
          <Image source={require('@/assets/images/GeorginaSky.png')} />
        </View>
        <View style={styles.content}>
          <Text style={styles.TextL}>Where are you headed?</Text>
          <Pressable style={styles.PressableT}
                     onPress={() => {
                       router.push('/sky/(sky)/TeoBiom');
                     }}
          >
            <Text style={styles.TextPress}>touch</Text>
          </Pressable>
        </View>

        <View style={styles.Footer}>
          <Image
            source={require('@/assets/images/teonaLogo.png')}
            style={styles.ImageFooter}
          />
          <Text style={styles.TextFooter}>Here to get you there</Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImgBack: {
    flex: 1,
    width: '100%',
    resizeMode: 'cover',
    justifyContent: 'space-between',
  },
  Header: {
    alignItems: 'flex-start',
    margin: 20,

    width: width * 0.8,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextL: {
    color: '#FFFFFF',
    fontSize: 30,
    textAlign: 'center',
  },
  PressableT:{
    alignItems: 'center',
  },
  TextPress:{
    color: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
  },
  Footer: {
    position: 'absolute',
    justifyContent: 'space-around',
    bottom: 0,
    flexDirection: 'column',

    width: width,
  },
  ImageFooter: {

    padding: 15,
    margin: 15,

    resizeMode: 'contain',

  },
  TextFooter: {

    color: '#F88F04',
    textAlign: 'left',
  },
});
