import React, { useState } from 'react';
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
  Platform,
} from 'react-native';
import { FaCheck } from 'react-icons/fa';
import TopUpButton from '@/components/TopUpButton';
import { Link, usePathname, useRouter } from 'expo-router';
export default function Miles() {
  const router = useRouter();
  function click() {
    router.back();
  }
  return (
    <ScrollView style={{ backgroundColor: '#599AD0' }}>
      <Image //todo make array for spacing
        style={styles.pass}
        resizeMode='contain'
        source={require('@/assets/images/duopassteona.png')}
      ></Image>
      <View style={styles.view}>
        <Text>Géoriga Miles</Text>
        <Text style={styles.gras}> 1650 Miles</Text>
      </View>
      <View style={styles.view}>
        <Text>Avable balance in your card</Text>
        <Text style={styles.gras}>351.2 $</Text>{' '}
        <Text style={styles.seeTransact}>
          {' '}
          <Link href={'/'}>see all transaction </Link>
        </Text>
      </View>
      <View style={[styles.view]}>
        <Text style={styles.gras}>My Teona pass béléfique</Text>
        <Text style={styles.textArea}>
          <FaCheck style={{ color: 'green' }} /> Earn 5 Miles for each euro
          spent 15% off
        </Text>
        <Text style={styles.textArea}>
          <FaCheck style={{ color: 'green' }} /> On the first paid bag on
          Géorgia Sky flights Pay for your ticket in Cash & Miles Snend your
        </Text>
        <Text style={styles.textArea}>
          <FaCheck style={{ color: 'green' }} /> Miles on a reward ticket
          Priority check-in, baggage drop-off and
        </Text>
        <Text style={styles.textArea}>
          <FaCheck style={{ color: 'green' }} /> boarding, where available
          Speedy boarding and complimentary access
        </Text>
        <Text style={styles.textArea}>
          <FaCheck style={{ color: 'green' }} /> to preferred seats 24hours
          before departure. Extra check-in baggage
        </Text>
        <Text style={styles.textArea}>
          <FaCheck style={{ color: 'green' }} /> allowance on all Virginia Sky
          flights. For all applicable
        </Text>
        <Text style={styles.textArea}>
          <FaCheck style={{ color: 'green' }} /> conditions, please visit Our
          website.
        </Text>
      </View>
      <View style={{ marginBottom: 10, alignItems: 'center' }}>
        <TopUpButton title='Back' onPress={click}></TopUpButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gras: { color: '#606060', fontSize: 20 },
  seeTransact: {
    top: -10,
    height: 0,
    fontSize: 8,
    textAlign: 'right',
  },
  textArea: { marginTop: 5 },
  pass: { left: 15, height: 400, width: 330, alignSelf: 'center' },
  view: {
    marginTop: 10,
    alignSelf: 'center',
    width: '95%',
    backgroundColor: '#FFF',

    padding: 10,
    paddingTop: 5,
    borderRadius: 10,
  },
});
