import React from 'react';
<<<<<<< HEAD
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Link} from "expo-router";
import AllowNotif from "@/components/TeoNotif/TeoNotif";
=======
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useRouter } from "expo-router";
import CustomButton from '@/components/ButtonInscriptionLogin';
>>>>>>> f22457ec0582f9b89ab6081781164e7bd1afb7fa

const {width, height} = Dimensions.get('window');

<<<<<<< HEAD
export default function startScreen() {
=======
const auth: React.FC = () => {
    const router = useRouter();

>>>>>>> f22457ec0582f9b89ab6081781164e7bd1afb7fa
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/bgImgSign.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome Passenger!</Text>
                </View>

                <View style={styles.buttonsContainer}>
<<<<<<< HEAD
                    <TouchableOpacity style={styles.buttonSignup}>
                        <Link href={'/hub/register'} style={styles.buttonTextSignUp} onPress={AllowNotif}>Sign Up</Link>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonSignIn}>
                        <Link href={'/hub/login'} style={styles.buttonTextSignIn}>Sign In</Link>
                    </TouchableOpacity>
=======
                    <CustomButton
                        text="Sign Up"
                        color="blue"
                        onPress={() => {
                            router.push('/hub/register');
                        }}
                    />

                    <CustomButton
                        text="Sign In"
                        color="white"
                        onPress={() => {
                            router.push('/hub/login');
                        }}
                    />
>>>>>>> f22457ec0582f9b89ab6081781164e7bd1afb7fa
                </View>
            </ImageBackground>
        </View>
    );
};

export default auth;

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
});
