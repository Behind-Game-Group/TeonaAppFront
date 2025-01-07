import React, { useState } from 'react';
import { MdStarRate } from 'react-icons/md';
import { FaPhoneAlt } from 'react-icons/fa';
import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { IoAlert, IoStarSharp, IoWalk } from 'react-icons/io5';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { MdOutlinePayment } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa';
export default function Modal() {
  function force(params: React.JSX.Element) {
    return params;
  }
  const cki = () => {
    console.log('zzzz');
  };
  const tabLink = [
    {
      title: 'MyMiles Card',
      link: '/',
      icon: (
        <Image
          style={styles.icon}
          width={1}
          resizeMode='contain'
          source={require('@/assets/images/Help_icon.png')}
        ></Image>
      ),
    },
    {
      title: 'Payement methods',
      link: '/',
      icon: <MdOutlinePayment></MdOutlinePayment>,
    },
    {
      title: 'contact us',
      link: '/',
      icon: <BsFillQuestionCircleFill></BsFillQuestionCircleFill>,
    },
    { title: 'Rate the app', link: '/', icon: <IoStarSharp></IoStarSharp> },
    { title: 'Legal info', link: '/', icon: <IoAlert></IoAlert> },
    {
      title: 'travel compagnon',
      link: '/',
      icon: (
        <Image
          style={styles.icon}
          width={1}
          resizeMode='contain'
          source={require('@/assets/images/user-logo.png')}
        ></Image>
      ),
    },
    {
      title: 'Emergency contacts',
      link: '/',
      icon: <FaPhoneVolume></FaPhoneVolume>,
    },
    {
      title: 'settings ',
      link: '/',
      icon: (
        <Image
          style={styles.icon}
          resizeMode='contain'
          source={require('@/assets/images/setting_icon.png')}
        ></Image>
      ),
    },
  ];
  let res = [<></>];
  tabLink.forEach((element) => {
    res.push(
      <TouchableOpacity onPress={cki} style={[styles.oni]}>
        <View style={styles.iconBlock}>
          {force(element.icon)}
          <Text>{element.title} </Text>
        </View>
      </TouchableOpacity>,
    );
  });
  return (
    <>
      {' '}
      <ImageBackground
        style={{
          zIndex: 0,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        source={require('@/assets/images/pexels-denner-trindade-1570398-17821556.jpg')}
      ></ImageBackground>{' '}
      <Text style={styles.back}> ♪ Back</Text>
      <ScrollView style={styles.topMargin}>{res}</ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  iconBlock: { flexDirection: 'row' },
  icon: { width: 16, height: 16, margin: 10, backgroundColor: '#888' },
  back: { paddingTop: 200, fontSize: 15, paddingLeft: '5%', color: '#FFF' },
  topMargin: {
    alignSelf: 'center',
    width: '90%',
    backgroundColor: '#EEE',
    marginTop: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    height: 'auto',
  },
  oni: {
    backgroundColor: '#EEE',
    borderBottomColor: '#777777',
    padding: 15,
    marginLeft: 5,

    alignItems: 'baseline',
    width: '90%',
    borderBottomWidth: 2,
  },
});
