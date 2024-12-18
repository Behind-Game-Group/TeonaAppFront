import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Dimensions,
    StyleSheet,
    Alert,
    ScrollView,
    Modal,
    TouchableOpacity,
    Platform,
} from "react-native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import TopUpButton from "@/components/TopUpButton";
import TeonaCard from "@/components/TeonaCard";
import { TeonaCardModel } from "@/components/TeonaCardModel";

const { width, height } = Dimensions.get("window");

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
        title: "TeonaPass Daily Pass",
        price: "7.95",
    },
];

const TopupFares: React.FC<TopupFaresProps> = ({ totalPrice, setCurrentBalance }) => {
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState("");
    const [adressId, setAdressId] = useState("");
    const [selectedCard, setSelectedCard] = useState<TeonaCardModel | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let userId, token, adressId;

                if (Platform.OS === "web") {
                    userId = localStorage.getItem("userId");
                    adressId = localStorage.getItem("addressId");
                    token = localStorage.getItem("authToken");
                } else {
                    userId = await SecureStore.getItemAsync("userId");
                    adressId = await SecureStore.getItemAsync("addressId");
                    token = await SecureStore.getItemAsync("authToken");
                }

                if (userId) setUserId(userId);
                if (adressId) setAdressId(adressId);
                if (token) setToken(token);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleTopUp = async () => {
        if (!selectedCard) {
            setModalMessage("Merci de bien vouloir sélectionner une carte.");
            setModalVisible(true);
            return;
        }

        if (!userId) {
            setModalMessage("User ID not found. Please try again later.");
            setModalVisible(true);
            return;
        }

        setLoading(true);
        const payload = {
            cardTitle: selectedCard.title,
            cardPrice: parseFloat(selectedCard.price),
            isActive: 1,
            userId,
            adressId,
        };

        try {
            const response = await axios.post("http://localhost:8082/api/add/savePass", payload, {
                headers: {
                    "Content-Type": "application/json",
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
            });

            if (response.status === 200) {
                setModalMessage(`La carte ${selectedCard.title} a bien été ajoutée au panier.`);
                router.push("/wallet/(payment)/PaymentDisplay");
            } else {
                setModalMessage("Une erreur empêche l'ajout de votre carte.");
            }
        } catch (error) {
            console.error("Erreur durant la transmission des données:", error);
            setModalMessage("Serveur injoignable. Veuillez réessayer ultérieurement.");
        } finally {
            setModalVisible(true);
            setLoading(false);
        }
    };

    return (
      <ScrollView style={styles.faresContainer}>
          <SafeAreaView>
              <Text style={styles.headerText}>Let's TopUp your card!</Text>
              {cardData.map((card) => (
                <TeonaCard
                  key={card.id}
                  card={card}
                  onTopUp={() => setSelectedCard(card)}
                />
              ))}
              <View style={styles.selectedCardContainer}>
                  <Text style={styles.selectedCardText}>Carte Sélectionnée:</Text>
                  {selectedCard && (
                    <TeonaCard card={selectedCard} onTopUp={() => {}} />
                  )}
              </View>
              <View style={styles.faresTotalCard}>
                  <Text style={styles.faresTotalPrice}>{`${totalPrice} €`}</Text>
                  <TopUpButton
                    title={loading ? "Loading..." : "TopUp"}
                    onPress={handleTopUp}
                  />
              </View>
          </SafeAreaView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
              <View style={styles.modalContainer}>
                  <View style={styles.modalView}>
                      <Text style={styles.modalText}>{modalMessage}</Text>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)}
                      >
                          <Text style={styles.closeButtonText}>Fermer</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Modal>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    faresContainer: { padding: 6 },
    headerText: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
    selectedCardContainer: { marginVertical: 20, alignItems: "center" },
    selectedCardText: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: { fontSize: 18, marginBottom: 20, textAlign: "center" },
    closeButton: {
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: { color: "white", fontSize: 16 },
});

export default TopupFares;
