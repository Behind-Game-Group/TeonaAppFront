import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import { IoStarSharp } from 'react-icons/io5';
import { GoChevronDown } from 'react-icons/go';
import Modal from './modal';

//!isVisible == true ? styles.on : styles.off
export default function RateTheApp() {
  const [selecrStars, setSelectStars] = useState<number>(0);
  const [selectOption1, setSelectOption1] = useState<string>(
    'please choose an option',
  );
  const [selectOption2, setSelectOption2] = useState<string>(
    'please choose an option',
  );
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
  const [modal, setModal] = useState<boolean>(false);
  const [hover, setHover] = useState<number>(0);
  const [modal2, setModal2] = useState<boolean>(false);
  const [hover2, setHover2] = useState<number>(0);
  const stars = [1, 2, 3, 4, 5];
  const changeModal = () => {
    setModal(!modal);
  };
  const changeModal2 = () => {
    setModal2(!modal2);
  };
  // setCountries(months);
  return (
    <View>
      <Text style={{ margin: 15, fontSize: 20 }}>
        {' '}
        what do you think of this app?
      </Text>
      <Text style={{ textAlign: 'center' }}>
        {stars.map((elem: number) => (
          <Pressable
            onPress={() => {
              setSelectStars(elem);
            }}
          >
            <IoStarSharp
              style={styles.stars}
              color={selecrStars < elem ? '#606060' : '#EDEF72'}
            />
          </Pressable>
        ))}
      </Text>
      {}
      <Pressable style={styles.picker} onPress={changeModal}>
        <Text style={{ width: '95%' }}> {selectOption1}</Text>
        <GoChevronDown style={{ textAlign: 'right' }} />
      </Pressable>
      <View style={modal ? styles.modal : styles.off}>
        {' '}
        {option1.map((option, id) => (
          <Pressable
            style={id == hover ? styles.test : { padding: 5 }}
            onHoverIn={() => {
              setHover(id);
            }}
            onPress={() => {
              setSelectOption1(option);
              changeModal();
            }}
          >
            {option}
          </Pressable>
        ))}
      </View>
      <Pressable style={styles.picker} onPress={changeModal2}>
        <Text style={{ width: '95%' }}> {selectOption2}</Text>
        <GoChevronDown style={{ textAlign: 'right' }} />
      </Pressable>

      <View style={modal2 ? styles.modal : styles.off}>
        {' '}
        {option2.map((option, id) => (
          <Pressable
            style={id == hover2 ? styles.test : { padding: 5 }}
            onHoverIn={() => {
              setHover2(id);
            }}
            onPress={() => {
              setSelectOption2(option);
              changeModal2();
            }}
          >
            {option}
          </Pressable>
        ))}
      </View>
      <Text style={{ paddingLeft: '3%', top: 30 }}>Give us more details:</Text>
      <TextInput
        style={[styles.picker, { padding: 5 }]} //margin padding
        multiline={true}
        numberOfLines={5}
      ></TextInput>
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {
    display: 'flex',
    top: 20,
    backgroundColor: '#FFF',
    borderColor: '#888',
    borderRadius: 15,
    borderWidth: 2,
    padding: 5,
    paddingLeft: 10,
    alignSelf: 'center',
    width: '95%',
  },
  off: { display: 'none' },
  test: {
    backgroundColor: '#AAA', //orange
    borderRadius: 5,

    margin: 5, //lol5
    paddingLeft: 5,
  },
  stars: { margin: 8, width: 60, height: 60 },
  picker: {
    backgroundColor: '#FFF',
    marginTop: 35,
    minHeight: 25,
    paddingLeft: 10,
    width: '95%',
    alignSelf: 'center',
    borderColor: '#888',
    borderRadius: 15,
    borderWidth: 2,
    flexDirection: 'row',
  },
});
