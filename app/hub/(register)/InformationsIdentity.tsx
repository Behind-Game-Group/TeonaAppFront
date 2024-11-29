import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import ButtonInscriptionLogin from "@/components/ButtonInscriptionLogin";
import { useUser } from "@/app/hub/(register)/userInfoContext/UserInfo";

interface Country {
  name: {
    common: string;
  };
}

function InformationsIdentity() {
  const { user, updateUser } = useUser();

  const [countries, setCountries] = useState<string[]>([]);
  const [selectCountry, setSelectCountry] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const handleContinue = async () => {
    if (!selectCountry || !month || !day || !year || !gender) {
      Alert.alert(
        "Missing Information",
        "Please fill in all the fields before continuing."
      );
      return;
    }

    const data = {
      country: selectCountry,
      dateOfBirth: `${year}-${month}-${day}`,
      gender,
    };

    setIsSubmitting(true);

    updateUser(data);

    router.push("/hub/InformationsEmail");
  };

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data: Country[] = await response.json();
        const countryList = data
          .map((country) => country.name.common)
          .sort((a, b) => a.localeCompare(b));
        setCountries(countryList);
      } catch (error) {
        console.error("Error loading countries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    (async () => {
      await loadCountries();
    })();
  }, []);

  const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const days = Array.from({ length: 31 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const years = Array.from({ length: 100 }, (_, i) => (2024 - i).toString());
  console.log(user);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/bgInformationsIdentity.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <Text style={styles.title}>
            Nice to meet you, {"\n"}
            {user.firstName ?? "Guest"}! Let us know {"\n"} more about you!
          </Text>

          {/* Country */}
          <Text style={styles.label}>Country/Region of residence</Text>
          <View style={[styles.input, styles.inputCountry]}>
            {isLoading ? (
              <ActivityIndicator size="small" color="#606060" />
            ) : (
              <Picker
                selectedValue={selectCountry}
                onValueChange={(itemValue) => setSelectCountry(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select your country" value="" />
                {countries.map((country, index) => (
                  <Picker.Item key={index} label={country} value={country} />
                ))}
              </Picker>
            )}
          </View>

          {/* Date of Birth */}
          <Text style={styles.label}>Date of birth</Text>
          <View style={styles.row}>
            <View style={[styles.input, styles.dateInput]}>
              <Picker
                selectedValue={month}
                onValueChange={(itemValue) => setMonth(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Month" value="" />
                {months.map((month, index) => (
                  <Picker.Item key={index} label={month} value={month} />
                ))}
              </Picker>
            </View>
            <View style={[styles.input, styles.dateInput]}>
              <Picker
                selectedValue={day}
                onValueChange={(itemValue) => setDay(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Day" value="" />
                {days.map((day) => (
                  <Picker.Item key={day} label={day} value={day} />
                ))}
              </Picker>
            </View>
            <View style={[styles.input, styles.dateInput]}>
              <Picker
                selectedValue={year}
                onValueChange={(itemValue) => setYear(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Year" value="" />
                {years.map((year) => (
                  <Picker.Item key={year} label={year} value={year} />
                ))}
              </Picker>
            </View>
          </View>

          {/* Title */}
          <Text style={styles.label}>What is your title?</Text>
          <View style={[styles.input, styles.inputTitle]}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => setGender(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Select your title" value="" />
              <Picker.Item label="Mister" value="Mister" />
              <Picker.Item label="Misses" value="Misses" />
            </Picker>
          </View>

          <ButtonInscriptionLogin
            text={isSubmitting ? "Submitting..." : "Continue"}
            color={"blue"}
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
    marginTop: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#606060",
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    color: "#606060",
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#606060",
    borderRadius: 5,
    backgroundColor: "white",
    height: 50,
    justifyContent: "center",
  },
  inputCountry: {
    width: "100%",
  },
  dateInput: {
    width: "30%",
    marginRight: 8,
  },
  inputTitle: {
    width: "100%",
    marginTop: 10,
  },
  picker: {
    flex: 1,
    color: "#606060",
  },
});

export default InformationsIdentity;
