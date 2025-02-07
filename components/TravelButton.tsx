import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

interface BlueButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: object;
  color?: '#FFFFFF' | '#2787BB';
  backgroundColor?: '#2787BB' | '#FFFFFF';
}

const BlueButton: React.FC<BlueButtonProps> = ({
  title,
  onPress,
  style,
  color = '#2787BB',
  backgroundColor = '#FFFFFF',
}) => {
  const buttonStyles = [
    styles.button,
    color === '#2787BB' ? styles.blueButton : styles.whiteButton,
  ];
  const textStyles = [
    styles.text,
    color === '#2787BB' ? styles.blueText : styles.whiteText,
  ];
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};
export default BlueButton;
const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '70%',
    borderWidth: 2,
  },
  blueButton: {
    backgroundColor: '#2787BB',
    borderColor: '#2787BB',
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#2787BB',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  blueText: {
    color: '#FFFFFF',
  },
  whiteText: {
    color: '#2787BB',
  },
});
