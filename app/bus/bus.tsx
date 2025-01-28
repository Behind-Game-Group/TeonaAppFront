import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import CustomBusButton from '@/components/bus_components/Bus_btn';
import Bus_FromTo from '@/components/bus_components/Bus_fromTo';

export default function Bus() {
  const [select, setSelect] = useState<number>(0);
  const [selectOption] = useState<string[]>([
    'Please choose an option',
    'Passager',
    'Bike',
    'Bike / Passager',
  ]);
  const SubmitHanddle = () => {
    console.log('clicked');
  };
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

      <Picker
        selectedValue={select}
        onValueChange={(itemValue) => setSelect(itemValue)}
        style={styles.picker}
      >
        {selectOption.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>

      <CustomBusButton onPress={SubmitHanddle} text='Search' />
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  picker: {
    height: 50,
    minWidth: '90%',
    marginTop: 15,
    margin: 5,
    borderColor: '#679C70',
    backgroundColor: '#eee',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: { color: '#F88F04', fontSize: 36, margin: 20 },
});
