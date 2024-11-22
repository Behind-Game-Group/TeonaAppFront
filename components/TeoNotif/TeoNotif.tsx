import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Typage du prop children
interface TeoNotifProps {
    children: React.ReactNode;
}

const TeoNotif: React.FC<TeoNotifProps> = ({ children }) => {
    return (

            <View >
                //ajout des notifications ici
                {children}
            </View>

    );
};



export default TeoNotif;
