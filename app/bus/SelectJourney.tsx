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
} from '@/components/bus_components';
import axios from 'axios';
import CartJourney from '../../components/bus_components/CartJourney';
import useBus from './BusInfoContext/BusInfo';
export default function SelectCard() {
  interface responceBus {
    resDateStart: string;
    resDateEnd: string;
    prices: string;
    detail?: string;
  }
  const uBus = useBus();
  const data = [
    {
      resDateStart: '99h00',
      resDateEnd: '21h00',
      prices: '45.0$',
    },
    {
      resDateStart: '99h00',
      resDateEnd: '21h00',
      prices: '45.0$',
    },
  ];
  const requette = async () => {
    try {
      const response = await axios.post('http://localhost:8082/XXXX', uBus.Bus);
      const resData = response.data;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ScrollView>
      {uBus.Bus.from}
      {data.map((elem) => {
        return (
          <View style={{ margin: 10, flexDirection: 'row' }}>
            <CartJourney data={elem} />
            <button style={styles.btn}>{'>'}</button>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'orange',
    borderWidth: 0,
    marginLeft: 5,
    color: '#eee',
    borderRadius: 5,
  },
});
