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
import ContactUs from '@/components/ContactUs';
import { Link, useRouter } from 'expo-router';
import { IoAlert, IoStarSharp, IoWalk } from 'react-icons/io5';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { MdOutlinePayment } from 'react-icons/md';
import { FaPhoneVolume } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import { on } from 'events';
export default function Modal() {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(false);
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
        setVisible(true);
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
        router.push('/settings/Travel');
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
      <View style={[styles.modal, visible ? styles.on : styles.off]}>
        <Text>You will leave the app and be directed to our website</Text>{' '}
        <View style={styles.box}>
          <Pressable
            onPress={() => {
              router.push('https://google.fr');
            }}
            style={styles.btn}
          >
            ok
          </Pressable>
          <Pressable
            onPress={() => {
              setVisible(false);
            }}
            style={styles.btn}
          >
            Cancel
          </Pressable>
        </View>
      </View>
      <Text>
        {' '}
        <Pressable
          onPress={() => {
            router.push('/');
          }}
          style={styles.back}
        >
          ♪ Back
        </Pressable>
      </Text>
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
  on: { display: 'flex' },
  off: { display: 'none' },
  box: {
    flexDirection: 'row',
  },
  modal: {
    zIndex: 2,
    top: '50%',
    backgroundColor: '#EEE',
    borderColor: '#777777',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 3,
    width: '90%',
  },
  btn: {
    borderColor: '#777777',
    top: 5,
    fontSize: 20,
    margin: 15,
    right: '30%',
    borderRadius: 10,
    borderWidth: 2,
    padding: 5,
    width: '60%',
  },
});
