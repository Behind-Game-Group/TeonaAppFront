import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import ButtonInscriptionLogin from "@/components/ButtonInscriptionLogin";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { useUser } from "@/app/hub/(register)/userInfoContext/UserInfo";

interface Country {
  languages?: Record<string, string>;
}

function InformationsEmail() {
  const { user, updateUser } = useUser();

  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+995");
  const [language, setLanguage] = useState<string | undefined>("English");
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [languageError, setLanguageError] = useState<string | null>(null);
  const router = useRouter();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneNumberRegex = /^[+][0-9]{1,4}[0-9]{7,}$/;

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();

        const languageOptions: string[] = data
          .flatMap((country) =>
            country.languages ? Object.values(country.languages) : []
          )
          .filter((value, index, self) => self.indexOf(value) === index);

        setLanguages(languageOptions.toSorted((a, b) => a.localeCompare(b)));
      } catch (error) {
        console.error("Erreur lors de la récupération des langues :", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchLanguages();
  }, []);

  const handleContinue = () => {
    let valid = true;

    // Vérification de l'email
    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError(null);
    }

    // Vérification du numéro de téléphone
    if (!phoneNumber.trim() || !phoneNumberRegex.test(`${countryCode}${phoneNumber}`)) {
      setPhoneError("Please enter a valid phone number.");
      valid = false;
    } else {
      setPhoneError(null);
    }

    if (!language) {
      setLanguageError("Please select a language.");
      valid = false;
    } else {
      setLanguageError(null);
    }

    if (!valid) return;

    updateUser({ email, phoneNumber, language });

    router.push("/hub/(register)/ContactPreferences");
  };

  const handlePhoneNumberChange = (text: string) => {
    // On ne permet que les chiffres et le "+"
    const cleanedText = text.replace(/[^0-9+]/g, "");
    setPhoneNumber(cleanedText);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/bgInformationsEmail.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            How can we reach you, {"\n"} {user.firstName ?? "Guest"}?
          </Text>
          <Text style={styles.subtitle}>
            We’ll send newsletters you {"\n"} subscribe to and any changes to{" "}
            {"\n"} your journey to this email address.{"\n"} You will also use
            it to login.
          </Text>

          {/* Email adresse */}
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={[styles.input, styles.inputEmail]}
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          {emailError && <Text style={styles.error}>{emailError}</Text>}

          {/* Langue préférée */}
          <Text style={styles.label}>Preferred language</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#2787BB" />
          ) : (
            <View style={styles.input}>
              <Picker
                selectedValue={language}
                onValueChange={(itemValue) => setLanguage(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="English" value="English" />
                {languages.map((lang) => (
                  <Picker.Item key={lang} label={lang} value={lang} />
                ))}
              </Picker>
            </View>
          )}
          {languageError && <Text style={styles.error}>{languageError}</Text>}

          {/* Phone number */}
          <Text style={styles.label}>Phone number</Text>
          <Text style={styles.details}>
            If you provide your phone number, we can send you updates about
            any changes to your trip
          </Text>
          <View style={styles.phoneRow}>
            <TextInput
              style={[styles.input, styles.inputCountryCode]}
              value={countryCode}
              onChangeText={setCountryCode}
            />
            <TextInput
              style={[styles.input, styles.inputPhone]}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
            />
          </View>
          {phoneError && <Text style={styles.error}>{phoneError}</Text>}

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
    backgroundColor: "#000", // Optionnel si l'image ne charge pas
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "85%",
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#606060",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#606060",
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    color: "#606060",
    alignSelf: "flex-start",
    marginTop: 15,
  },
  details: {
    fontSize: 12,
    color: "#606060",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#606060",
    borderRadius: 5,
  },
  inputEmail: {
    height: 35,
    padding: 5,
  },
  picker: {
    height: 35,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#606060",
    borderRadius: 5,
  },
  phoneRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  inputCountryCode: {
    width: "15%",
    marginRight: 10,
    height: 35,
    fontSize: 15,
    padding: 5,
  },
  inputPhone: {
    height: 35,
    width: "55%",
    fontSize: 15,
    padding: 5,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    alignSelf: "flex-start",
  },
});

export default InformationsEmail;