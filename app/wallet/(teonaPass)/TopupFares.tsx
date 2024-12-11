import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  SafeAreaView,
  View,
  Text,
  Dimensions,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import TopUpButton from "@/components/TopUpButton";
import axios from "axios";
import { TeonaCardModel } from "@/components/TeonaCardModel";
import TeonaCard from "@/components/TeonaCard";
import MenuTop from "@/components/MenuTop";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

interface TopupFaresProps {
  totalPrice: number;
  setCurrentBalance: () => void;
}

const cardData: TeonaCardModel[] = [
  {
    id: "1",
    image: require("@/assets/images/teonapassyearly.png"),
    title: "TeonaPass Yearly Pass",
    price: "540",
  },
  {
    id: "2",
    image: require("@/assets/images/teonapass.png"),
    title: "TeonaPass Monthly Pass",
    price: "45",
  },
  {
    id: "3",
    image: require("@/assets/images/teonapass.png"),
    title: "TeonaPass Weekly Pass",
    price: "11.25",
  },
  {
    id: "4",
    image: require("@/assets/images/teonapass.png"),
    title: "TeonaPass Daily Pass ",
    price: "7.95",
  },
];
const [token, setToken] = useState("");
const [userId, setUserId] = useState("");

// useEffect(() => {
//   const fetchUserData = async () => {
//     try {
//       let userId = null;
//       let token = null;

//       if (Platform.OS === "web") {
//         userId = localStorage.getItem("userId");
//         token = localStorage.getItem("authToken");
//       } else {
//         userId = await SecureStore.getItemAsync("userId");
//         token = await SecureStore.getItemAsync("authToken");
//       }

//       if (token) {
//         setToken(token);
//         console.log("Token found:", token);
//       } else {
//         console.warn("Token not found");
//       }

//       if (userId) {
//         setUserId(userId);
//         console.log("User ID found:", userId);
//       } else {
//         console.warn("User ID not found");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   fetchUserData();
// }, []);

const { width, height } = Dimensions.get("window");
const TopupFares: React.FC<TopupFaresProps> = ({
  totalPrice,
  setCurrentBalance,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleTopUp = async (selectedCard: TeonaCardModel) => {
    setLoading(true);

    // console.log("Selected Card:", selectedCard.title, selectedCard.price);

    const payload = {
      cardTitle: selectedCard.title,
      cardPrice: parseFloat(selectedCard.price),
      isActive: true,
      userId: userId,
    };

    try {
      const response = await axios.post(
        "http://localhost:8082/api/add/savePass",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Alert.alert(
          "Success",
          `La carte ${selectedCard.title} a bien été ajoutée au panier.`
        );
      } else {
        Alert.alert(
          "Error",
          "Une erreur empèche l'ajout de votre carte dans le panier."
        );
      }
    } catch (error) {
      console.error("Erreur durant la transmition des données:", error);
      Alert.alert(
        "Erreur",
        "Nous ne pouvons pas contacter le serveur merci de bien vouloir réessayer plus tard ."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ScrollView style={[styles.faresContainer]}>
        <SafeAreaView>
          <Text style={styles.headerText}>Let's TopUp your card!</Text>
          <SafeAreaView style={[{}]}>
            {cardData.map((card) => (
              <TeonaCard
                key={card.id}
                card={card}
                onTopUp={() => handleTopUp(card)}
              />
            ))}

            <View style={styles.faresTotalCard}>
              <Text style={styles.faresTotalPrice}>{`${totalPrice} €`}</Text>
              <View style={styles.faresButtonContainer}>
                <TopUpButton
                  title={loading ? "Loading..." : "TopUp"}
                  onPress={setCurrentBalance}
                  // disabled={loading}
                />
              </View>
            </View>
          </SafeAreaView>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  faresContainer: {
    // flex: 1,

    padding: 6,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  faresContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
    height: height * 0.6,
  },
  faresTotalCard: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  faresTotalPrice: {
    borderColor: "black",
    borderWidth: 3,
    padding: 3,
    textAlign: "center",
    flex: 1,
  },
  faresButtonContainer: {
    alignContent: "center",
    justifyContent: "space-evenly",

    flexDirection: "row",
    flex: 1,
    padding: 10,
  },
});
export default TopupFares;
