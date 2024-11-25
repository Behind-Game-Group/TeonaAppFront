import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Typage du prop children
interface TeoNotifProps {
    children: React.ReactNode;
}

const TeoNotif: React.FC<TeoNotifProps> = ({ children }) => {
    return (

            <View style={styles.TeoNotif} >
                //ajout des notifications ici
                {children}
            </View>

    );
};



export default TeoNotif;
const styles = StyleSheet.create({
    TeoNotif: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        margin: 20,
        elevation: 0,
        opacity:0.85,
    },
});
