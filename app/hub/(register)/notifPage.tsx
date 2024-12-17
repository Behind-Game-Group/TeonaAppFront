
import React, { useEffect } from "react";

import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  Platform,
  Alert,

} from "react-native";
import CustomButton from "@/components/ButtonInscriptionLogin";
import { useRouter } from "expo-router";
import * as Notifications from "expo-notifications";

export default function NotifAllow() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();


  const askNotificationPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        console.log("Permission granted for notifications!");
      } else {
        console.log("Permission denied for notifications!");
      }
    } else {
      Alert.alert(
        "Notifications not supported",
        "Push notifications are not supported on the web for now.",
        [{ text: "OK", onPress: () => console.log("Alert dismissed") }]
      );
    }
  };


  useEffect(() => {
    askNotificationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground

        source={require("@/assets/images/teohuballow.jpg")}
        style={[styles.backgroundImage, { width, height }]}
        resizeMode="cover"

      >
        {/* Contenu centré avant le conteneur blanc */}
        <View style={styles.topContent}>
          <Text

            style={[styles.title, { fontSize: height * 0.025, color: "white" }]}

          >
            Turn on your notifications to stay up to date about your journey.
          </Text>
          <Text
            style={[
              styles.description,

              { fontSize: height * 0.018, color: "white" },

            ]}
          >
            We'll automatically send you information about your journey in real
            time.
          </Text>
        </View>

        {/* Conteneur blanc avec les informations suivantes */}
        <View style={[styles.content, { marginTop: height * 0.05 }]}>
          <Text style={[styles.title, { fontSize: height * 0.022 }]}>
            Real-time updates
          </Text>
          <View style={styles.overlayContainer}>
            <Text style={[styles.description, { fontSize: height * 0.018 }]}>
              Receive relevant information throughout your trip. Changes in
              itineraries, flight delays, issues with your journey… We got you
              informed at all times.
            </Text>
            <Text style={[styles.description, { fontSize: height * 0.018 }]}>
              "Teona Passenger" would like to send you notifications.
            </Text>
            <Text style={[styles.description, { fontSize: height * 0.018 }]}>
              Notifications may include alerts, sounds and icon badges. These
              can be configured in settings.
            </Text>

            {/* Boutons */}
            <View style={styles.buttonContainer}>
              <CustomButton

                text={"Yes, keep me updated"}
                color="white"
                onPress={() => router.push("/hub/(register)/BeginInscription")}
              />
              <CustomButton
                text={"Maybe later"}
                color="blue"
                onPress={() => router.push("/hub/(register)/BeginInscription")}

              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  topContent: {

    justifyContent: "center",
    alignItems: "center",

    marginTop: 30,
    marginBottom: 15,
  },
  content: {

    width: "80%",
    padding: 12,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    alignSelf: "center",
  },
  overlayContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    color: "black",
    marginBottom: 6,
  },
  buttonContainer: {
    width: "110%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

  },
});
