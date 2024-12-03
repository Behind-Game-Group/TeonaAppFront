import React, {useState} from 'react';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {SafeAreaView, View, Text, Dimensions, StyleSheet, Alert, Image, ScrollView} from "react-native";

import TopUpButton from "@/components/TopUpButton";
import axios from 'axios';
import {TeonaCardModel} from "@/components/TeonaCardModel";
import TeonaCard from "@/components/TeonaCard";




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
const {width, height} = Dimensions.get('window');
const TopupFares: React.FC<TopupFaresProps> = ({totalPrice, setCurrentBalance}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const handleTopUp = async (selectedCard: TeonaCardModel) => {
        setLoading(true);
        try {
            const response = await axios.post('XXX', {
                cardId: selectedCard.id,
                cardTitle: selectedCard.title,
                cardPrice: selectedCard.price,
            });
            if (response.status === 200) {
                Alert.alert('Success', `La carte ${selectedCard.title} a bien été ajoutée au panier.`);
            } else {
                Alert.alert('Error', "Une erreur empèche l'ajout de votre carte dans le panier.");
            }
        } catch (error) {
            console.error('Erreur durant la transmition des données:', error);
            Alert.alert('Erreur', 'Nous ne pouvons pas contacter le serveur merci de bien vouloir réessayer plus tard .');
        } finally {
            setLoading(false);
        }
    };
    return (
        <ScrollView style={styles.faresContainer}>
            <View >
            <Text style={styles.headerText}>Let's TopUp your card!</Text>
            <View  style={[{}]}>
            <View style={styles.faresContent}>
                <View style={styles.faresCard}>

                {cardData.map((card) => (
                    <TeonaCard
                        key={card.id}
                                card={card}
                                onTopUp={() => handleTopUp(card)}
                    />
                ))}

                    </View>

                <View style={styles.faresTotalCard}>

                    <Text style={styles.faresTotalPrice}>{`${totalPrice} €`}</Text>
                    <View style={styles.faresButtonContainer}>
                        <TopUpButton title={loading ? 'Loading...' : 'TopUp'}
                                     onPress={setCurrentBalance}
                                     disabled={loading} />
                    </View>
                </View>
            </View>
            </View>
            </View >
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    faresContainer: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    faresContent: {
        backgroundColor: 'blue',
        alignItems: 'center',
        flex: 1,


    },
    headerText: {
        fontSize: 20,
        color: '#606060',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
        fontFamily: 'Roboto',
    },
    innerContainer: {
        flex: 1,
    },

    faresTotalCard: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        width: '100%',
    },
    faresTotalPrice: {
        borderColor: 'black',
        borderWidth: 3,
        textAlign: 'center',
        flex: 1,
    },
    faresButtonContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    faresCard :{
        padding: 0,
    },
});
export default TopupFares;