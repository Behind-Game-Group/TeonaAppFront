import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

type CustomButtonProps = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    width: 201,
    height: 50,
    backgroundColor: '#599AD0',
    marginLeft: 92,
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
