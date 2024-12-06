import React, {useState} from 'react';

import {SafeAreaView, View, Text, useWindowDimensions, StyleSheet, Modal, ScrollView,Image, TouchableOpacity} from "react-native";

import TopUpButton from "@/components/TopUpButton";
import axios from 'axios';
import {TeonaCardModel} from "@/components/TeonaCardModel";
import TeonaCard from "@/components/TeonaCard";
import MenuTop from '@/components/MenuTop';


interface TopupFaresProps {

    totalPrice: number;
    setCurrentBalance: () => void;

}

const cardData: TeonaCardModel[] = [
    {
        id: '1',
        image: require('@/assets/images/teonapassyearly.png'),
        title: 'TeonaPass Yearly Pass',
        price: '540',
    },
    {
        id: '2',
        image: require('@/assets/images/teonapass.png'),
        title: 'TeonaPass Monthly Pass',
        price: '45',
    },
    {
        id: '3',
        image: require('@/assets/images/teonapass.png'),
        title: 'TeonaPass Weekly Pass',
        price: '11.25',
    },
    {
        id: '4',
        image: require('@/assets/images/teonapass.png'),
        title: 'TeonaPass Daily Pass ',
        price: '7.95',
    },
];
const {width, height} = useWindowDimensions();
const TopupFares: React.FC<TopupFaresProps> = ({setCurrentBalance}) => {
    const [selectedCard, setSelectedCard] = useState<TeonaCardModel | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleTopUp = async () => {
        if (!selectedCard) {
            setModalMessage('Merci de bien vouloir selectionner une carte .');
            setModalVisible(true);
            return;
        }

        try {
            const response = await axios.post('XXX', {
                totalPrice: parseFloat(selectedCard.price),
                selectedCard,
            });
            if (response.status === 200) {
                setModalMessage('La carte a bien été ajoutée au panier.');
            } else {
                setModalMessage("Une erreur est survenu lors de l'ajout de la carte.");
            }
        } catch (error) {
            console.error('Erreur durant la transmission des informations:', error);
            setModalMessage('Serveur injoignable , Veuillez réessayer ultérieurement .');
        } finally {
            setModalVisible(true);
        }
    };

    const selectCard = (card: TeonaCardModel) => {
        setSelectedCard(card);
    };

    return (
        <ScrollView style={styles.faresContainer}>
            <SafeAreaView>
                <Text style={styles.headerText}>Let's TopUp your card!</Text>
                <SafeAreaView style={styles.innerContainer}>
                    <View style={styles.faresContent}>
                        {cardData.map((card) => (
                            <TeonaCard
                                key={card.id}
                                card={card}
                                onTopUp={() => selectCard(card)}
                            />
                        ))}
                        <Text style={styles.selectedCardText}> Carte Selectionnée </Text>
                        <View style={styles.faresTotalCard}>

                            {selectedCard && (
                                <TeonaCard card={selectedCard} onTopUp={handleTopUp}/>
                            )}

                        </View>
                    </View>
                </SafeAreaView>
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
    faresContainer: {
        backgroundColor: '#FFFFFF',
        padding: 6,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    innerContainer: {
        flex: 1,
    },
    selectedCardImage: {
        width: width * 0.2,
        height: height * 0.2,
        resizeMode: 'contain',
    },
    faresContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    selectedCardText:{
        justifyContent: 'center',
        alignItems: 'center',
    }
    ,
    faresTotalCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,

       
        resizeMode: 'contain',
    },


    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        width: 300,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
export default TopupFares;