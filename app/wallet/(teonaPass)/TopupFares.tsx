import React, {useState} from 'react';

import {SafeAreaView, View, Text, useWindowDimensions, StyleSheet, Alert, ScrollView} from "react-native";

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
    const [selectedCards, setSelectedCards] = useState<TeonaCardModel[]>([]);

    const handleTopUp = async () => {
        const totalPrice = selectedCards.reduce((sum, card) => sum + parseFloat(card.price), 0);

        try {
            const response = await axios.post('XXX', {
                totalPrice,
                selectedCards,
            });
            if (response.status === 200) {
                Alert.alert('Success', 'The selected cards have been successfully added to the cart.');
            } else {
                Alert.alert('Error', 'An error occurred while adding the cards to the cart.');
            }
        } catch (error) {
            console.error('Error during data transmission:', error);
            Alert.alert('Error', 'We cannot contact the server. Please try again later.');
        }
    };

    const toggleCardSelection = (card: TeonaCardModel) => {
        setSelectedCards(prevSelectedCards => {
            if (prevSelectedCards.includes(card)) {
                return prevSelectedCards.filter(selectedCard => selectedCard.id !== card.id);
            } else {
                return [...prevSelectedCards, card];
            }
        });
    };

    return (
        <ScrollView
            style={[{},styles.faresContainer]}
            >
            <SafeAreaView>
                <Text style={styles.headerText}>Let's TopUp your card!</Text>
                <SafeAreaView
                    style={styles.innerContainer}>
                    <View style={styles.faresContent}>
                        {cardData.map((card) => (
                            <TeonaCard
                                key={card.id}
                                card={card}
                                onTopUp={() => toggleCardSelection(card)}
                            />
                        ))}
                        <View style={styles.faresTotalCard}>
                            <Text style={styles.faresTotalPrice}>
                                {`${selectedCards.reduce((sum, card) => sum + parseFloat(card.price), 0)} €`}
                            </Text>
                            <View style={styles.faresButtonContainer}>
                                <TopUpButton
                                    title='TopUp'
                                    onPress={handleTopUp}
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </SafeAreaView>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    faresContainer: {
        // flex: 1,
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
    faresCard: {
        width: width,
    },
    faresContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,

    },
    faresTotalCard: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,

        backgroundColor: 'red',
        width: width,

    },
    faresTotalPrice: {
        borderColor: "black",
        borderWidth: 3,
        borderRadius: 9,
        paddingVertical: 12,
        paddingHorizontal: 24,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    faresButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',

    },
});
export default TopupFares;