import {
  View,
  Text,
  TextInput,
  Image,
  SafeAreaView,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { IoIosAddCircle } from 'react-icons/io';
import { Link, useRouter } from 'expo-router';
import TopUpButton from '@/components/TopUpButton';

//!isVisible == true ? styles.on : styles.off
export default function EmergencyContact() {
  const [isFocused, setFocused] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.title}>
        <Text style={{ fontSize: 20 }}>emergency contact </Text>
        <Text style={{ textAlign: 'right', width: '60%' }}>
          {' '}
          <IoIosAddCircle size={30} color='orange' />
        </Text>
      </TouchableOpacity>{' '}
      <ScrollView style={{ marginLeft: 1, width: '100%' }}>
        <View
          style={{
            backgroundColor: '#EEE',

            alignItems: 'center',
          }}
        >
          {' '}
          <TouchableOpacity style={styles.oni}>
            {' '}
            <Text>title</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oni}>
            <TextInput placeholder='First Name'></TextInput>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oni}>
            <TextInput placeholder='Last Name'></TextInput>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oni}>
            <TextInput placeholder='date of dird'></TextInput>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oni}>
            <TextInput placeholder='addres email (optional)'></TextInput>
          </TouchableOpacity>
          <TouchableOpacity style={styles.oni}>
            <TopUpButton title='save' onPress={() => {}}></TopUpButton>
          </TouchableOpacity>
        </View>{' '}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'green',
    width: '100%',
    borderBlockColor: 'blue',
    borderWidth: 1,
  },
  title: {
    padding: 15,
    flexDirection: 'row',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginTop: -20,

    height: 60,
    alignItems: 'baseline',
    width: '100%',
    backgroundColor: '#FFF',
  },
  oni: {
    backgroundColor: '#FFF',
    borderBottomColor: '#777777',
    padding: 15,

    height: 100,
    alignItems: 'baseline',
    width: '100%',
    borderBottomWidth: 2,
  },
});
