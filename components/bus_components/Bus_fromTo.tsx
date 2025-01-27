import React from 'react';
import {
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  GestureResponderEvent,
  View,
} from 'react-native';

const Bus_FromTo = () => {
  return (
    <View style={styles.view}>
      <Text style={styles.txt}>From</Text>
      <TextInput style={styles.input} placeholder='Paris' />
      <Text style={[styles.to, styles.txt]}>To</Text>
      <TextInput style={styles.input} placeholder='Géorgie' />
    </View>
  );
};

export default Bus_FromTo;

const styles = StyleSheet.create({
  to: { borderTopWidth: 1, borderColor: '#679C70', paddingTop: 10 },
  txt: { margin: 15, fontSize: 18 },
  input: { marginLeft: 15 },
  view: {
    margin: 10,
    height: 200,
    borderWidth: 1,
    borderColor: '#679C70',
    borderRadius: 10,
  },
});
