import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface OrangeButtonProps {
    title: string; // Texte du bouton
    onPress: () => void; // Fonction à exécuter lors du clic
    style?: object; // Style supplémentaire optionnel
    light?: boolean;
}

const OrangeButton: React.FC<OrangeButtonProps> = ({
                                                       title,
                                                       onPress,
                                                       style,
                                                       light,
                                                   }) => {
    console.log(onPress);
    return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
          <Text style={[styles.buttonText, light && styles.light]}>{title}</Text>
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
    light: {
        color: '#FFFFFF',
    },
});

export default OrangeButton;