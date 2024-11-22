import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Link} from "expo-router";

const {width, height} = Dimensions.get('window');

export default function startScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/bgBeginInscription.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Carry your journey with you</Text>
                    <Text style={styles.detailsContent}>Find a destination, an itinerary, book a trip…<br/>
                        TeonaPassenger app will stay with <br/> you every step of the way.</Text>
                    <TouchableOpacity style={styles.buttonContinue}>
                        <Link href={'/hub/register'} style={styles.buttonTextContinue}>Continue</Link>
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Optionnel si l'image ne charge pas
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '93%',
        marginTop: 635,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.7)' // Opacité sur le fond seulement
    },
    title: {
        fontFamily: 'Lucida Grande',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#606060',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    detailsContent: {
        fontSize: 18,
        color: '#606060',
        textAlign: 'center',
    },
    buttonContinue: {
        backgroundColor: '#2787BB',
        borderColor: '#D9D9D9',
        // Ombre pour iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 }, // Décalage uniquement en bas
        shadowOpacity: 0.2,
        // Ombre pour Android
        elevation: 10,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: width * 0.1,
        borderRadius: 5,
        marginVertical: 10,
        width: '75%',
        alignItems: 'center',
        marginBottom: 20,
     },
    buttonTextContinue: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
     },
});
