import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Extraire manuellement le token depuis l'URL
    const queryParams = new URLSearchParams(pathname.split("?")[1]);
    const tokenParam = queryParams.get("token");
    setToken(tokenParam);

    if (!tokenParam) {
      Alert.alert("Error", "No token found in the URL.");
    }
  }, [pathname]);

  const handleSubmit = async () => {
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

      await axios.post("http://localhost:8082/api/user/reset-password",
        {
          token,
          password
        });

      Alert.alert("Success", "Your password has been successfully reset.");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Your Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your new password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm your new password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Button
        title={isLoading ? "Resetting..." : "Reset Password"}
        onPress={handleSubmit}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default ResetPassword;
