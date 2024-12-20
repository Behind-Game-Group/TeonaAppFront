import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

interface OrangeButtonProps {
  title: string; // Texte du bouton
  onPress: (event: GestureResponderEvent) => void; // Fonction à exécuter lors du clic
  style?: object; // Style supplémentaire optionnel
  color?: '#FFA500' | '#FFFFFF';
  backgroundColor?: '#FFA500' | '#FFFFFF';
}

const OrangeButton: React.FC<OrangeButtonProps> = ({
  title,
  onPress,
  style,
  color = '#FFA500',
  backgroundColor = '#FFFFFF',
}) => {
  const buttonStyles = [
    styles.button,
    color === '#FFA500' ? styles.orangeButton : styles.whiteButton,
  ];
  const textStyles = [
    styles.text,
    color === '#FFA500' ? styles.orangeText : styles.whiteText,
  ];
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress}>
      <Text style={textStyles}>{title}</Text>
    </TouchableOpacity>
  );
};
export default OrangeButton;
const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '70%',
    borderWidth: 2,
  },
  orangeButton: {
    backgroundColor: '#FFA500',
    borderColor: '#FFA500',
  },
  whiteButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFA500',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  orangeText: {
    color: '#FFFFFF',
  },
  whiteText: {
    color: '#FFA500',
  },
});
