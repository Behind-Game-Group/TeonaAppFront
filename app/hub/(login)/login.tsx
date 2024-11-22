import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ImageBackground,
} from 'react-native';
import { Link } from 'expo-router';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in both fields.');
            return;
        }

        Alert.alert('Login', `Email: ${email}\nPassword: ${'*'.repeat(password.length)}`);
    };


    return (
        <ImageBackground
            source={require('@/assets/images/bgSignIn.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#888"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    autoCorrect={false}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <View style={styles.forgotPasswordContainer}>
                    <Link href={"/hub/(login)/forgotPassword"} style={styles.forgotPasswordLink}>
                        Forgot your password?
                    </Link>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '85%',
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 12,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
        marginVertical: 5,
    },
    forgotPasswordLink: {
        color: '#2787BB',
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#2787BB',
        borderColor: '#D9D9D9',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
