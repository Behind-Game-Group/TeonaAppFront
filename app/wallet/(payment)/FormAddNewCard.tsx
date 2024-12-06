import React, { useState } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

const CardPaymentPage: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [cardNumber, setCardNumber] = useState<string>('');
    const [dateExpiration, setDateExpiration] = useState<string>('');
    const [securityCode, setSecurityCode] = useState<string>('');

    const handleCardNumberChange = (text: string) => {
        let formattedText = text.replace(/\D/g, '');

        if (formattedText.length > 16) {
            formattedText = formattedText.slice(0, 16);
        }

        if (formattedText.length > 4) {
            formattedText = formattedText.replace(/(\d{4})(?=\d)/g, '$1 ');
        }

        setCardNumber(formattedText);
    };

    const handleExpirationDateChange = (text: string) => {
        let formattedText = text.replace(/\D/g, '');

        if (formattedText.length > 4) {
            formattedText = formattedText.slice(0, 4);
        }

        if (formattedText.length > 2) {
            formattedText = formattedText.replace(/^(\d{2})(\d{0,2})$/, '$1/$2');
        }

        setDateExpiration(formattedText);
    };

    const handleSecurityCodeChange = (text: string) => {
        let formattedText = text.replace(/\D/g, '');

        if (formattedText.length > 3) {
            formattedText = formattedText.slice(0, 3);
        }

        setSecurityCode(formattedText);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>ADD A NEW BANK / CREDIT CARD</Text>

            <View style={styles.content}>
                <View style={styles.line}></View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name on Card</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Enter your name"
                />
            </View>

            <View style={styles.content}>
                <View style={styles.line}></View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Bank/credit card number</Text>
                <TextInput
                    style={styles.input}
                    value={cardNumber}
                    onChangeText={handleCardNumberChange}
                    placeholder="Enter your card number"
                    keyboardType="numeric"
                />
            </View>

            <View style={styles.content}>
                <View style={styles.line}></View>
            </View>
            <View style={styles.row}>
                <View style={styles.inputContainerCard}>
                    <Text style={styles.label}>Expiration date</Text>
                    <TextInput
                        style={styles.input}
                        value={dateExpiration}
                        onChangeText={handleExpirationDateChange}
                        placeholder="MM/YY"
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.inputContainerCard}>
                    <Text style={styles.label}>Security code</Text>
                    <TextInput
                        style={styles.input}
                        value={securityCode}
                        onChangeText={handleSecurityCodeChange}
                        placeholder="i.e. 123"
                        keyboardType="numeric"
                    />
                </View>
            </View>

            <Text style={styles.text}>The information linked to your card is securely encrypted.</Text>

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.textButton}>Save Card</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        color: '#606060',
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 30,
    },
    content: {
        width: '100%',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    line: {
        width: '100%',
        color: '#606060',
        borderWidth: 1,
    },
    inputContainer: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    inputContainerCard: {
        width: '48%',
        paddingLeft: 20,
    },
    label: {
        fontSize: 15,
        color: '#606060',
        fontWeight: 'bold',
        marginTop: 5,
    },
    input: {
        color: '#606060',
        marginBottom: 5,
        height: 25,
        borderWidth: 0,
        borderColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
    },
    text: {
        fontSize: 14,
        color: '#606060',
        marginTop: 20,
    },
    containerButton: {
        justifyContent: 'center',
    },
    button: {
        marginTop: 20,
        padding: 12,
        borderRadius: 30,
        alignItems: 'center',
        width: 220,
        height: 50,
        backgroundColor: '#DF8D22',
    },
    textButton: {
        fontSize: 20,
        color: 'white',
    },
});

export default CardPaymentPage;
