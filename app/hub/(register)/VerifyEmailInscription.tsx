import React, { useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import VerifyPinCode from "@/components/verifyPinCode/VerifyPinCode";
import { Alert } from "react-native";
import { useUser } from "@/app/hub/(register)/userInfoContext/UserInfo";

const ForgotPasswordVerifyEmail: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

  const handleVerification = async (code: string) => {
    if (!code) {
      Alert.alert("Error", "Please enter the PIN code.");
      return;
    }

    router.push("/hub/(register)/CookiePop");

    try {
      const email = user.email;

      const response = await axios.post(
        "http://localhost:8082/api/user/verify",
        {
          email,
          code,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response from backend:", response);
      if (response.status === 200 && response.data.status === "success") {
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
