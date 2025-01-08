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
import { IoIosSettings } from 'react-icons/io';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
export default function Modal() {
  const router = useRouter();
  function force(params: React.JSX.Element | number) {
    if (typeof params != 'number') return params;
    else
      return (
        <Image
          style={styles.icon}
          width={1}
          resizeMode='contain'
          source={are[params]}
        ></Image>
      );
  }
  const are = [
    require('@/assets/images/Help_icon.png'),
    require('@/assets/images/user-logo.png'),
    require('@/assets/images/pexels-denner-trindade-1570398-17821556.jpg'),
  ];

  const tabLink = [
    {
      icon: 0,
      title: 'MyMiles Card',
      link: () => {
        router.push('/settings/milesFouthen');
      },
    },
    {
      icon: <MdOutlinePayment></MdOutlinePayment>,
      title: 'Payement methods',
      link: () => {
        router.push('/settings/milesFouthen');
      },
    },
    {
      icon: <BsFillQuestionCircleFill></BsFillQuestionCircleFill>,
      title: 'contact us',
      link: () => {
        router.push('/settings/milesFouthen');
      },
    },
    {
      icon: <IoStarSharp></IoStarSharp>,
      title: 'Rate the app',
      link: () => {
        router.push('/settings/milesFouthen');
      },
    },
    {
      icon: <IoAlert></IoAlert>,
      title: 'Legal info',
      link: () => {
        router.push('/settings/milesFouthen');
      },
    },
    {
      icon: 1,
      title: 'travel compagnon',
      link: () => {
        router.push('/settings/milesFouthen');
      },
    },
    {
      icon: <FaPhoneVolume></FaPhoneVolume>,
      title: 'Emergency contacts',
      link: () => {
        router.push('/settings/milesFouthen');
      },
    },
    {
      icon: <IoIosSettings></IoIosSettings>,
      title: 'settings ',
      link: () => {
        router.push('/settings/milesFouthen');
      },
    },
  ];
  let res = [<></>];
  tabLink.forEach((element) => {
    //todo do a component
    res.push(
      <TouchableOpacity onPress={element.link} style={[styles.oni]}>
        <View style={styles.iconBlock}>
          {force(element.icon)}
          <Text style={styles.text}>{element.title} </Text>
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
        source={are[2]}
      ></ImageBackground>{' '}
      <Pressable
        onPress={() => {
          router.push('/');
        }}
        style={styles.back}
      >
        ♪ Back
      </Pressable>
      <ScrollView style={styles.topMargin}>{res}</ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  iconBlock: { flexDirection: 'row' },
  text: { left: 10, top: -2 },
  icon: {
    width: 16,
    height: 16,
    backgroundColor: '#888',
    borderRadius: 20,
  },
  icon2: {
    width: 16,
    height: 20,
    backgroundColor: '#888',
    borderRadius: 5,
  },
  back: { paddingTop: 170, fontSize: 15, paddingLeft: '5%', color: '#FFF' },
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
