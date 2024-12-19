import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';

type CustomButtonProps = {
    text: string;
    color?: 'blue' | 'white';
    onPress: (event: GestureResponderEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ text, color = 'blue', onPress }) => {
    const buttonStyles = [
        styles.button,
        color === 'blue' ? styles.blueButton : styles.whiteButton,
    ];

    const textStyles = [
        styles.text,
        color === 'blue' ? styles.blueText : styles.whiteText,
    ];

    return (
        <TouchableOpacity style={buttonStyles} onPress={onPress}>
            <Text style={textStyles}>{text}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;

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
        backgroundColor: '#4387AA',
        borderColor: '#2787BB',
    },
    whiteButton: {
        backgroundColor: '#FFFFFF',
        borderColor: '#2787BB',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    blueText: {
        color: '#FFFFFF',
    },
    whiteText: {
        color: '#4387AA',
    },
});
