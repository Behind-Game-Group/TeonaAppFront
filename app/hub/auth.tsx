import React from 'react';
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Link} from "expo-router";
import AllowNotif from "@/components/AllowNotif/AllowNotif";

const {width, height} = Dimensions.get('window');

export default function startScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/bgImgSign.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome Passenger !</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.buttonSignup}>
                        <Link href={'/hub/register'} style={styles.buttonTextSignUp} onPress={AllowNotif}>Sign Up</Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSignIn}>
                        <Link href={'/hub/login'} style={styles.buttonTextSignIn}>Sign In</Link>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    buttonsContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: height * 0.1,
        marginBottom: 20,
    },
    buttonSignup: {
        backgroundColor: '#4387AA',
        borderColor: '#2787BB',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: width * 0.1,
        borderRadius: 5,
        marginVertical: 10,
        width: '60%',
        alignItems: 'center',
    },
    buttonSignIn: {
        backgroundColor: '#fff',
        borderColor: '#2787BB',
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: width * 0.1,
        borderRadius: 5,
        marginVertical: 10,
        width: '60%',
        alignItems: 'center',
    },
    buttonTextSignUp: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonTextSignIn: {
        color: '#4387AA',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
