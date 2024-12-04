import React, {useState} from 'react';

import {SafeAreaView, View, Text,  Dimensions, StyleSheet,  Alert, ScrollView} from "react-native";

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
        <>

            <ScrollView style={[styles.faresContainer]}>
            <SafeAreaView>
            <Text style={styles.headerText}>Let's TopUp your card!</Text>
            <SafeAreaView style={[{}]}>

                {cardData.map((card) => (
                    <TeonaCard  key={card.id}
                                card={card}
                                onTopUp={() => handleTopUp(card)} // Envoyer les données au backend lors du clic
                    />
                ))}


                <View style={styles.faresTotalCard}>
                    <Text style={styles.faresTotalPrice}>{`${totalPrice} €`}</Text>
                    <View style={styles.faresButtonContainer}>
                        <TopUpButton title={loading ? 'Loading...' : 'TopUp'}
                                     onPress={setCurrentBalance}
                                     disabled={loading} />
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
backgroundColor:'#FFFFFF',
        padding: 6,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    faresContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width*0.8,
        height:height *0.6,
       },
    faresTotalCard: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
       

    },
    faresTotalPrice: {
        borderColor: "black",
        borderWidth: 3,
        padding:3,
        textAlign: 'center',
        flex: 1,
    },
    faresButtonContainer: {
        alignContent: 'center',
        justifyContent:'space-evenly',

        flexDirection :'row',
        flex: 1,
padding:10,
    },
});
export default TopupFares;