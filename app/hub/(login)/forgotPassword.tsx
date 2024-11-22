import React, { useState } from 'react';
import {
    Alert,
    ImageBackground,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from "@/components/ButtonInscriptionLogin";

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const router = useRouter();

    const handleResetPassword = (): void => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        Alert.alert('Password Reset', `A reset link has been sent to ${email}`);
        router.push('//hub(login)\verifyEmail');
    };

    return (
        <ImageBackground
            source={require('@/assets/images/bgSignIn.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Forgot Your Password?</Text>
                <Text style={styles.instructions}>
                    Enter your email address below, and we’ll send you a link to reset your password.
                </Text>

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

                <CustomButton
                    text="Send Reset Link"
                    color="blue"
                    onPress={handleResetPassword}
                />
            </View>
        </ImageBackground>
    );
};

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
        marginBottom: 10,
    },
    instructions: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
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
});

export default ForgotPassword;
