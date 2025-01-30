import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import {
  ReturnDate,
  PassagerBike,
  CustomBusButton,
  Bus_FromTo,
} from '@/components/bus_components';

export default function Bus() {
  const [isShowBike, setIsShowBike] = useState<boolean>(false);
  const showOffBike = () => {
    setIsShowBike(false);
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Search</Text>
      <Bus_FromTo />
      <ReturnDate />
      <TouchableOpacity
        onPress={() => {
          setIsShowBike(!isShowBike);
        }}
      >
        <Text style={styles.passBike}> Passenger/bike</Text>
      </TouchableOpacity>
      {isShowBike && <PassagerBike onPress={showOffBike} />}
      <CustomBusButton onPress={() => {}} text='Search' />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  calendar: { margin: 10, borderRadius: 5 },
  passBike: {
    height: 50,
    minWidth: '90%',

    margin: 5,
    paddingTop: 11,
    paddingLeft: 25,
    fontSize: 18,
    borderColor: '#679C70',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: { color: '#F88F04', fontSize: 36, margin: 20 },
});
