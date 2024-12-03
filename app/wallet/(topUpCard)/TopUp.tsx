import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {useRouter} from 'expo-router';

function TopUp() {
    const router = useRouter();

    const [selectedPrice, setSelectedPrice] = useState('');

    const handleTopUp = (cardType: string, price: string) => {
        console.log({ cardType, price });
        // Ajout automatique de deux zéros si le prix est un entier
        if (!price.includes('.')) {
            price = `${price}.00`;
        }
        router.push({
            pathname:'/wallet/TopUpConfirmation',
            params: {cardType, price},
        });
    };

    const prices = ['5.00', '10.00', '15.00', '20.00', '25.00'];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>TopUp fares</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.secondTitle}>
                    Let’s TopUp your card!
                </Text>

                {prices.map((price, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../../assets/images/TopUpCard.png')}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={styles.price}>{price}€</Text>
                        <TouchableOpacity
                            style={styles.topUpButton}
                            onPress={() => handleTopUp('Visa', price)}
                        >
                            <Text style={styles.topUpButtonText}>TopUp</Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {/* Prix personnalisé */}
                <View style={styles.row}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../../assets/images/TopUpCard.png')}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>TopUp with your {'\n'} own amount</Text>
                        <TextInput
                            style={styles.input}
                            value={selectedPrice}
                            onChangeText={(text) => setSelectedPrice(text)}
                            keyboardType="numeric"
                            placeholder=""
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.topUpButton}
                        onPress={() => handleTopUp('Visa', selectedPrice)}
                    >
                        <Text style={styles.topUpButtonText}>TopUp</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        width: '100%',
        height: 100,
        backgroundColor: '#599AD0',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Roboto',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    secondTitle: {
        fontSize: 17,
        color: '#606060',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: 20,
    },
    imageContainer: {
        width: 110,
        height: 60,
        borderRadius: 7,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    price: {
        fontSize: 20,
        color: '#606060',
    },
    topUpButton: {
        marginLeft: 20,
        backgroundColor: '#fff',
        width: 85,
        height: 58,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#DF8D22',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topUpButtonText: {
        fontSize: 20,
        color: '#DF8D22',
    },
    inputContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        marginTop: -10,
    },
    label: {
        fontSize: 10,
        color: '#606060',
        marginBottom: 3,
    },
    input: {
        width: 70,
        height: 30,
        borderWidth: 1,
        borderColor: '#606060',
        fontSize: 16,
        paddingLeft: 7,
        marginLeft: 5,
    },
});

export default TopUp;
