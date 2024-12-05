import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    ImageBackground,
    StyleSheet,
    Modal,
    Pressable,
    Dimensions,
} from "react-native";
import { Link, useRouter } from "expo-router";
import axios from "axios";
import CustomButton from "@/components/ButtonInscriptionLogin";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const router = useRouter();

    const handleLogin = async () => {
        setEmailError('');
        setPasswordError('');

        if (!email || !password) {
            if (!email) setEmailError('Email is required.');
            if (!password) setPasswordError('Password is required.');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
              "http://localhost:8082/api/user/login",
              {
                  email,
                  password,
              }
            );

            const token = response.data;
            console.log("Token:", token);

            if (Platform.OS === "web") {
                localStorage.setItem("authToken", token);
            } else {
                await SecureStore.setItemAsync("authToken", token);
            }

            setIsAuthenticated(true);
            setModalVisible(true);

        } catch (error: any) {
            console.error(error);

            // Cas erreur
            const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
            if (errorMessage.includes('email')) {
                setEmailError(errorMessage);
            } else if (errorMessage.includes('password')) {
                setPasswordError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    };

    const closeModalAndGoHome = () => {
        setModalVisible(false);
        router.push('/');
    };

    return (
      <View style={[styles.fullScreen, { width, height }]}>
          <ImageBackground
            source={require('@/assets/images/bgSignIn.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
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
                  {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                  {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                  <View style={styles.forgotPasswordContainer}>
                      <Link href="/hub/(login)/ForgotPassword" style={styles.forgotPasswordLink}>
                          Forgot your password?
                      </Link>
                  </View>

                  <CustomButton
                    text={loading ? "Logging in..." : "Login"}
                    color="blue"
                    onPress={handleLogin}
                  />
              </View>

              {/* Modal */}
              {isAuthenticated && (
                <Modal
                  animationType="slide"
                  transparent
                  visible={modalVisible}
                  onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Welcome Back!</Text>
                            <Text style={styles.modalMessage}>Logged in as {email}</Text>
                            <Pressable
                              style={styles.modalButton}
                              onPress={closeModalAndGoHome}
                            >
                                <Text style={styles.modalButtonText}>Go to Home</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
              )}
          </ImageBackground>
      </View>
    );
};

const styles = StyleSheet.create({
    fullScreen: { flex: 1 },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
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
    errorText: {
        color: 'red',
        fontSize: 12,
        alignSelf: 'flex-start',
        marginLeft: 10,
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
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
        color: '#555',
        textAlign: 'center',
    },
    modalButton: {
        backgroundColor: '#2787BB',
        padding: 12,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default LoginPage;
