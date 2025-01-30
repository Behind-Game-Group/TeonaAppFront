import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';

import { Calendar } from 'react-native-calendars';
import { useState } from 'react';
import CustomBusButton from './Bus_btn';
import { Theme } from 'react-native-calendars/src/types';

export default function ReturnDate() {
  const [showFrom, setShowFrom] = useState<boolean>(false);
  const [showTo, setShowTo] = useState<boolean>(false);
  const [selectedFrom, setSelectedFrom] = useState('');
  const [selectedTo, setSelectedTo] = useState('');

  function hundleCalendarFrom(day: any) {
    console.log(day);
    setSelectedFrom(day.dateString);
    setShowFrom(!showFrom);
  }
  function hundleCalendarTo(day: any) {
    console.log(day);

    setSelectedTo(day.dateString);
    setShowTo(!showTo);
  }
  const asString = (date: string) => {
    return date;
  };
  return (
    <>
      <View style={{ flexDirection: 'row', width: '100%', padding: 10 }}>
        <CustomBusButton
          onPress={() => {
            setShowFrom(!showFrom);
          }}
          color='with'
          text={selectedFrom ? asString(selectedFrom) : 'Departing'}
        />
        <CustomBusButton
          onPress={() => {
            setShowTo(!showTo);
            console.log('to');
          }}
          color='with'
          text={selectedTo ? asString(selectedTo) : 'returning'}
        />
      </View>
      {showFrom && ( //#F58D05
        <Calendar
          markedDates={{
            [selectedFrom]: {
              selected: true,
            },
          }}
          theme={theme}
          style={styles.calendar}
          onDayPress={hundleCalendarFrom}
        ></Calendar>
      )}

      {showTo && (
        <Calendar
          markedDates={{
            [selectedTo]: {
              selected: true,
            },
          }}
          theme={theme}
          style={styles.calendar}
          onDayPress={hundleCalendarTo}
        ></Calendar>
      )}
    </>
  );
}
const theme: Theme = {
  arrowColor: '#F58D05',
  monthTextColor: '#F58D05',
  selectedDayBackgroundColor: '#F58D05',
  selectedDayTextColor: '#ffffff',
  todayTextColor: '#F58D05',
  textDisabledColor: '#eee',
};
const styles = StyleSheet.create({
  calendar: { margin: 10, borderRadius: 5 },
});
