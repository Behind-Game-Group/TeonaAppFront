import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface OrangeButtonProps {
  title: string; // Texte du bouton
  onPress: () => void; // Fonction à exécuter lors du clic
  style?: object; // Style supplémentaire optionnel
}

const OrangeButton: React.FC<OrangeButtonProps> = ({
  title,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    borderColor: '#FFA500',
    borderWidth: 3,
    borderRadius: 9,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFA500',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrangeButton;
