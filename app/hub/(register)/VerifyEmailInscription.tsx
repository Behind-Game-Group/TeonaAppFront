import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import VerifyPinCode from "@/components/verifyPinCode/VerifyPinCode";
import { Alert } from "react-native";

const ForgotPasswordVerifyEmail: React.FC = () => {
  const router = useRouter();

  const handleVerification = async (pinCode: string) => {
    if (!pinCode) {
      Alert.alert("Error", "Please enter the PIN code.");
      return;
    }

    router.push("/hub/(register)/CookiePop");

    try {
      const response = await axios.post(
        "http://localhost:8082/api/user/verify",
        {
          pinCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 && response.data.valid) {
        router.push("/hub/(register)/ContactPreferences");
      } else {
        Alert.alert("Invalid PIN", "The PIN code you entered is incorrect.");
      }
    } catch (error) {
      console.error("Error verifying PIN:", error);
      Alert.alert("Error", "An error occurred while verifying your PIN.");
    }
  };

  return (
    <VerifyPinCode
      title="Verify Your Email"
      subtitle="Please enter the PIN code sent to your email address."
      pinNotReceivedLink="/hub/auth"
      onSubmit={handleVerification}
    />
  );
};

export default ForgotPasswordVerifyEmail;
