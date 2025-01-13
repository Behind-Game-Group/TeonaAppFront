import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { IoStarSharp } from 'react-icons/io5';
import { Picker } from '@react-native-picker/picker';

//!isVisible == true ? styles.on : styles.off
export default function RateTheApp() {
  const [selecrStars, setSelectStars] = useState<number>(0);
  const [selectOption1, setSelectOption1] = useState<string>('');
  const [selectOption2, setSelectOption2] = useState<string>('');
  const [option1] = useState<string[]>([
    'A compliment',
    'Something to improve',
    'Technical isssues',
    "It's something else",
  ]);
  const [option2] = useState<string[]>([
    'Flight search & booking',
    'Check-in & boaeding',
    'Trip personalisation (el.Seat)',
    'Travel follow-up (eg.Flight status)',
    'My Teona Group account',
  ]);
  const stars = [1, 2, 3, 4, 5];
  // setCountries(months);
  return (
    <View>
      <Text style={{ margin: 5 }}> what do you think of this app?</Text>
      <Text style={{ textAlign: 'center' }}>
        {stars.map((elem: number) => (
          <Pressable
            onPress={() => {
              setSelectStars(elem);
            }}
          >
            <IoStarSharp
              style={selecrStars < elem ? styles.stars : styles.starsOn}
            />
          </Pressable>
        ))}
      </Text>
      <Picker
        selectedValue={selectOption1}
        onValueChange={(itemValue) => setSelectOption1(itemValue)}
        style={styles.picker}
      >
        <Picker.Item
          label='please choose an option'
          value='please choose an option'
        />
        {option1.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectOption2}
        onValueChange={(itemValue) => setSelectOption2(itemValue)}
        style={styles.picker}
      >
        <Picker.Item
          label='please choose an option'
          value='please choose an option'
        />
        {option2.map((option) => (
          <Picker.Item key={option} label={option} value={option} />
        ))}
      </Picker>
      {}{' '}
    </View>
  );
}
const styles = StyleSheet.create({
  starsOn: { margin: 4, width: 45, height: 45, color: 'yellow' },
  stars: { margin: 4, width: 45, height: 45 },
  picker: { backgroundColor: '#FFF', marginTop: 35, width: '95%' },
});
