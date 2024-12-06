import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

function TopUp() {
    const router = useRouter();

    const [price, setPrice] = useState<string>('');

    const handleTopUp = (cardType: string, priceInput: number) => {
        let formattedPrice = priceInput.toFixed(2); // Conversion en format 0.00

        router.push({
            pathname: '/wallet/PaymentDisplay',
            params: { cardType, price: formattedPrice },
        });
    };

    const prices: number[] = [5.0, 10.0, 15.0, 20.0, 25.0];

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Let’s TopUp your card!
                </Text>

                {prices.map((presetPrice, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../../assets/images/TopUpCard.png')}
                                style={styles.image}
                                resizeMode="cover"
                            />
                        </View>
                        <Text style={styles.price}>{presetPrice}€</Text>
                        <TouchableOpacity
                            style={styles.topUpButton}
                            onPress={() => handleTopUp('TopUp', presetPrice)}
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
                            value={price}
                            onChangeText={(text) => setPrice(text)}
                            keyboardType="numeric"
                            placeholder="Enter amount"
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.topUpButton}
                        onPress={() => {
                            const numericPrice = parseFloat(price);
                            if (!isNaN(numericPrice) && numericPrice > 0) {
                                handleTopUp('TopUp', numericPrice);
                            } else {
                                alert('Please enter a valid amount');
                            }
                        }}
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
    content: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
    },
    title: {
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
