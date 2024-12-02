import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

function TopUpConfirmation() {
    // Récupérez les paramètres de la route
    const { cardType, price } = useLocalSearchParams();

    // Vérifiez si on reçoit les données
    if (!cardType || !price) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>
                    pas de données
                </Text>
            </View>
        );
    }

    console.log('params', { cardType, price });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Confirmation</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.info}>Card Type: {cardType}</Text>
                <Text style={styles.info}>Price: {price}€</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: 100,
        backgroundColor: '#599AD0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        fontSize: 16,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
    },
});

export default TopUpConfirmation;
