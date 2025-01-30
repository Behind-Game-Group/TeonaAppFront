import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import * as Calendar from 'expo-calendar';
import { useState } from 'react';
import PassagerBike from '@/components/bus_components/PassagerBike';
import CustomBusButton from '@/components/bus_components/Bus_btn';
import Bus_FromTo from '@/components/bus_components/Bus_fromTo';

export default function Bus() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const showOn = () => {
    setIsShow(true);
  };
  const showOff = () => {
    setIsShow(false);
  };
  const SubmitHanddle = () => {
    console.log('clicked');
  };

  async function createCalendar() {
    const newCalendarID = await Calendar.createCalendarAsync({
      title: 'Expo Calendar',
      color: 'blue',
    });
    console.log(`Your new calendar ID is: ${newCalendarID}`);
  }
  return (
    <ScrollView>
      <Text style={styles.title}>Search</Text>
      <Bus_FromTo />
      <View style={{ flexDirection: 'row', width: '100%', padding: 10 }}>
        <CustomBusButton
          onPress={SubmitHanddle}
          color='with'
          text='departing'
        />
        <CustomBusButton
          onPress={SubmitHanddle}
          color='with'
          text='returning'
        />
      </View>

      <TouchableOpacity onPress={showOn} style={styles.picker}>
        Passenger/bike
      </TouchableOpacity>
      {isShow && <PassagerBike onPress={showOff} />}
      <CustomBusButton onPress={SubmitHanddle} text='Search' />
      <TouchableOpacity onPress={createCalendar}>oki</TouchableOpacity>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  picker: {
    height: 50,
    minWidth: '90%',
    marginTop: 15,
    margin: 5,
    paddingTop: 9,
    paddingLeft: 25,
    fontSize: 25,
    borderColor: '#679C70',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: { color: '#F88F04', fontSize: 36, margin: 20 },
});
