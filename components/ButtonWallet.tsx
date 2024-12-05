import React from 'react';
import {TouchableOpacity, Text, StyleSheet, GestureResponderEvent, View} from 'react-native';

type CustomButtonProps = {
    text: string
    onPress: (event: GestureResponderEvent) => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({ text,  onPress }) => {

    return (
        <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
        </View>
    );
};

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
        padding: 12,
        borderRadius: 15,
        alignItems: 'center',
        width: 201,
        height: 50,
        backgroundColor: '#599AD0',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});