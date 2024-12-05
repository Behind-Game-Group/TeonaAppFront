import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { useRouter } from "expo-router";
import ButtonInscriptionLogin from "@/components/ButtonInscriptionLogin";
import { useUser } from "@/app/hub/(register)/userInfoContext/UserInfo";

function InformationsName() {
  const router = useRouter();
  const { updateUser } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({ firstName: "", lastName: "" });

  const { width, height } = useWindowDimensions();

  const handleContinue = async () => {
    let hasErrors = false;
    const newErrors = { firstName: "", lastName: "" };

    if (!firstName) {
      newErrors.firstName = "First name is required.";
      hasErrors = true;
    }

    if (!lastName) {
      newErrors.lastName = "Last name is required.";
      hasErrors = true;
    }

    setErrors(newErrors);

    if (hasErrors) return;

    // Met à jour les données de l'utilisateur dans le contexte
    updateUser({ firstName, lastName });
    router.push("/hub/InformationsIdentity");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/bgInformationsName.png")}
        style={[styles.backgroundImage, { width, height }]}
      >
        <View style={[styles.content, { marginTop: height * 0.01 }]}>
          <Text style={[styles.title, { fontSize: height * 0.025 }]}>
            Let’s get started! {"\n"} Let’s start with your {"\n"} name
          </Text>
          <Text style={[styles.detailsContent, { fontSize: height * 0.02 }]}>
            Enter your first and last name exactly as written on your passport
            or ID card.
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { fontSize: height * 0.02 },
                errors.firstName ? styles.inputError : null,
              ]}
              placeholder="First Name"
              placeholderTextColor="#888"
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                if (text) setErrors((prev) => ({ ...prev, firstName: "" }));
              }}
            />
            {errors.firstName ? (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[
                styles.input,
                { fontSize: height * 0.02 },
                errors.lastName ? styles.inputError : null,
              ]}
              placeholder="Last Name"
              placeholderTextColor="#888"
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                if (text) setErrors((prev) => ({ ...prev, lastName: "" }));
              }}
            />
            {errors.lastName ? (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            ) : null}
          </View>

          <ButtonInscriptionLogin
            text="Continue"
            color="blue"
            onPress={handleContinue}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "70%",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontWeight: "bold",
    color: "#606060",
    textAlign: "center",
  },
  detailsContent: {
    color: "#606060",
    textAlign: "center",
    paddingTop: 10,
    marginBottom: 10,
  },
  inputContainer: {
    width: "100%",
  },
  input: {
    width: "93%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#606060",
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -8,
    marginBottom: 10,
    marginLeft: "3.5%",
  },
});

export default InformationsName;
