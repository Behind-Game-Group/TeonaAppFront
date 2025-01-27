import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  View,
} from 'react-native';

type CustomButtonProps = {
  text: string;
  color?: string;
  onPress: (event: GestureResponderEvent) => void;
};

const CustomBusButton: React.FC<CustomButtonProps> = ({
  text,
  onPress,
  color,
}) => {
  return (
    <View style={[styles.container, color ? { width: '50%' } : {}]}>
      <TouchableOpacity
        style={color ? styles.W : styles.button}
        onPress={onPress}
      >
        <Text style={color ? styles.textw : styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomBusButton;

const styles = StyleSheet.create({
  W: {
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#679C70',
    backgroundColor: '#eee',
  },
  container: {
    borderRadius: 5,
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    padding: 10,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    height: 50,
    minWidth: '90%',
    backgroundColor: '#885823',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  textw: {
    fontSize: 18,
    color: 'black',
  },
});
