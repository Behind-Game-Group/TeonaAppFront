import React from 'react';
import {
    Dimensions,
    ImageBackground,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useRouter } from "expo-router";
import CustomButton from '@/components/ButtonInscriptionLogin';
import AllowNotif from "@/app/hub/(login)/allowNotif";


const { width, height } = Dimensions.get('window');

const StartScreen: React.FC = () => {
    const router = useRouter();

    const handleSignUp = () => {
        AllowNotif();
        router.push('/hub/register');
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('@/assets/images/bgImgSign.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Welcome Passenger!</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <CustomButton
                        text="Sign Up"
                        color="blue"
                        onPress={handleSignUp}
                    />
                    <CustomButton
                        text="Sign In"
                        color="white"
                        onPress={() => router.push('/hub/login')}
                    />
                </View>
            </ImageBackground>
        </View>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: width,
        height: height,
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
    },
});
