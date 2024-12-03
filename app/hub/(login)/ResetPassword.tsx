import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Alert, ImageBackground, StyleSheet, Dimensions } from "react-native";
import { useLocalSearchParams, useRouter } from 'expo-router'; // Importez useLocalSearchParams
import axios from "axios";
import CustomButton from "@/components/ButtonInscriptionLogin";

// Récupération des dimensions de l'écran
const { width, height } = Dimensions.get("window");

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { token } = useLocalSearchParams(); // Utilisez useLocalSearchParams pour récupérer le token

  useEffect(() => {
    if (!token) {
      Alert.alert("Error", "Token not found.");
    }
  }, [token]);

  const validatePassword = (input: string) => {
    const minLength = 12;
    const maxLength = 50;
    const hasUpperCase = /[A-Z]/.test(input);
    const hasLowerCase = /[a-z]/.test(input);
    const hasNumber = /\d/.test(input);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(input);
    const validLength = input.length >= minLength && input.length <= maxLength;

    setIsPasswordValid(
      hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && validLength
    );
  };

  const handlePasswordChange = (input: string) => {
    setPassword(input);
    validatePassword(input);
  };

  const handleSubmit = async () => {
    if (!isPasswordValid) {
      Alert.alert(
        "Invalid Password",
        "Your password does not meet the required criteria."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Mismatch", "The passwords do not match.");
      return;
    }

    if (!token) {
      Alert.alert("Error", "Token is missing.");
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("http://localhost:8082/api/user/reset-password", {
        token,
        password,
      });

      Alert.alert("Success", "Your password has been successfully reset.");
      router.push("//hub/(login)/Login");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/verifyMailForgotPassword.png")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Reset Your Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your new password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />

        <TextInput
          style={styles.input}
          placeholder="Confirm your new password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <View style={styles.criteriaContainer}>
          <Text style={styles.criteriaTitle}>Password must include:</Text>
          <Text
            style={[styles.criteria, password.length >= 12 && styles.valid]}
          >
            - 12-50 characters
          </Text>
          <Text
            style={[styles.criteria, /[A-Z]/.test(password) && styles.valid]}
          >
            - At least one uppercase letter
          </Text>
          <Text
            style={[styles.criteria, /[a-z]/.test(password) && styles.valid]}
          >
            - At least one lowercase letter
          </Text>
          <Text style={[styles.criteria, /\d/.test(password) && styles.valid]}>
            - At least one number
          </Text>
          <Text
            style={[
              styles.criteria,
              /[!@#$%^&*(),.?":{}|<>]/.test(password) && styles.valid,
            ]}
          >
            - At least one special character
          </Text>
        </View>

        <CustomButton
          text={isLoading ? "Resetting..." : "Reset Password"}
          color="blue"
          onPress={handleSubmit}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "85%",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  criteriaContainer: {
    width: "100%",
    marginVertical: 20,
  },
  criteriaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  criteria: {
    fontSize: 14,
    color: "#888",
    marginVertical: 2,
  },
  valid: {
    color: "#049500",
    fontWeight: "bold",
  },
});

export default ResetPassword;
