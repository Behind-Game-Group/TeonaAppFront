import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    Image,
    TouchableOpacity,
    Modal,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import ButtonWallet from "@/components/ButtonWallet";

function FormTeonaPass() {
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [streetName, setStreetName] = useState<string>('');
    const [streetNameOptional, setStreetNameOptional] = useState<string>('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState<string>('');
    const [image, setImage] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Demander la permission d'accéder à la bibliothèque multimédia
    const requestPermissions = async () => {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission refusée',
                'Nous avons besoin de votre permission pour accéder à la galerie.'
            );
            return false;
        }
        return true;
    };

    // Fonction pour prendre une nouvelle photo
    const takePhoto = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission refusée', 'Nous avons besoin de votre permission pour accéder à l’appareil photo.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setModalVisible(false);
        }
    };

    // Choisir une image à partir de la bibliothèque multimédia
    const pickImage = async () => {
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        // Ouvrir la galerie pour sélectionner une image
        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 1, // Qualité maximale de l'image
        });

        if (!result.canceled) {
            // Si l'utilisateur a choisi une image, on la met dans l'état
            setImage(result.assets[0].uri);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.secondTitle}>
                    Fill this out and you will have it {'\n'} delivered to your door.
                </Text>

                <View style={styles.cardImageContainer}>
                    {/* Affiche l'image choisie ou un logo par défaut */}
                    {image ? (
                        <Image source={{uri: image}} style={styles.profilePic}/>
                    ) : (
                        <Image
                            source={require('../../../assets/images/user-logo.png')}
                            style={[styles.logoUser, {tintColor: '#606060'}]}
                        />
                    )}

                    {/* Bouton pour ajouter une image */}
                    <TouchableOpacity style={styles.addImageButton} onPress={() => setModalVisible(true)}>
                        <Text style={styles.addImageButtonText}>+</Text>
                    </TouchableOpacity>

                    {/* Modal pour les options */}
                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={styles.modalText1} onPress={takePhoto}>Take new photo</Text>
                                <View style={styles.line}/>
                                <Text style={styles.modalText2} onPress={pickImage}>Select photo</Text>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View>

                <View style={styles.form}>
                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.inputFirstName}
                            placeholder="First Name"
                            placeholderTextColor="#888"
                            value={firstName}
                            onChangeText={setFirstName}
                        />

                        <TextInput
                            style={styles.inputLastName}
                            placeholder="Last Name"
                            placeholderTextColor="#888"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                    </View>

                    <TextInput
                        style={styles.inputAddress}
                        placeholder="N° and street name"
                        placeholderTextColor="#888"
                        value={streetName}
                        onChangeText={setStreetName}
                    />

                    <TextInput
                        style={styles.inputAddress}
                        placeholder="Address line 2 (optional)"
                        placeholderTextColor="#888"
                        value={streetNameOptional}
                        onChangeText={setStreetNameOptional}
                    />

                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.inputPostCode}
                            placeholder="Post code"
                            placeholderTextColor="#888"
                            value={postCode}
                            onChangeText={setPostCode}
                        />

                        <TextInput
                            style={styles.inputCity}
                            placeholder="City"
                            placeholderTextColor="#888"
                            value={city}
                            onChangeText={setCity}
                        />
                    </View>

                    <View style={styles.inputRow}>
                        <TextInput
                            style={styles.inputNumber}
                            placeholder="+995"
                            placeholderTextColor="#888"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                        />

                        <TextInput
                            style={styles.inputCountry}
                            placeholder="Country"
                            placeholderTextColor="#888"
                            value={country}
                            onChangeText={setCountry}
                        />
                    </View>
                    <Text style={styles.details}>
                        Your card will arrive to your door within the next 7 working days).
                    </Text>
                </View>
                <ButtonWallet text="Continue" onPress={() => console.log('Purchased')}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    header: {
        width: '100%',
        height: 100,
        backgroundColor: '#599AD0',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'Roboto',
        marginBottom: 20,
    },
    secondTitle: {
        fontSize: 17,
        color: '#606060',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    cardImageContainer: {
        width: 122,
        height: 122,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#606060",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        position: "relative",
        overflow: "hidden",
        marginLeft: 240,
    },
    profilePic: {
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },
    logoUser: {
        width: 390,
        height: 180,
        resizeMode: "contain",
        marginTop: 23,
    },
    addImageButton: {
        position: "absolute",
        top: 4,
        right: 5,
        width: 25,
        height: 25,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#606060",
    },
    addImageButtonText: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 4,
        fontWeight: "bold",
    },
    form: {
        width: '100%',
        alignItems: 'flex-start',
        marginTop: 15,
        paddingLeft: 20,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 15,
        width: '100%',
    },
    inputFirstName: {
        width: 172,
        padding: 12,
        height: 37,
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 10,
        backgroundColor: '#D9D9D9BF',
        fontSize: 16,
    },
    inputLastName: {
        width: 172,
        padding: 12,
        height: 37,
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 10,
        backgroundColor: '#D9D9D9BF',
        fontSize: 16,
        marginLeft: 5,
    },
    inputAddress: {
        width: 350,
        padding: 12,
        height: 37,
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 10,
        backgroundColor: '#D9D9D9BF',
        fontSize: 16,
        marginBottom: 15,
    },
    inputPostCode: {
        width: 100,
        padding: 12,
        height: 37,
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 10,
        backgroundColor: '#D9D9D9BF',
        fontSize: 16,
    },
    inputCity: {
        width: 100,
        padding: 12,
        height: 37,
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 10,
        backgroundColor: '#D9D9D9BF',
        fontSize: 16,
        marginLeft: 5,
    },
    inputNumber: {
        width: 62,
        padding: 12,
        height: 37,
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 10,
        backgroundColor: '#D9D9D9BF',
        fontSize: 16,
    },
    inputCountry: {
        width: 138,
        padding: 12,
        height: 37,
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 10,
        backgroundColor: '#D9D9D9BF',
        fontSize: 16,
        marginLeft: 5,
    },
    details: {
        color: '#606060',
        fontSize: 12,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 70,
        width: '100%',
        backgroundColor: '#DF8D22',
    },
    rowImages: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
        tintColor: '#606060',
    },
    logoBus: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
    },
    //Modal
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        position: 'absolute',
        borderColor: '#606060',
        borderWidth: 1,
        borderTopLeftRadius: 67,
        borderTopRightRadius: 67,
        bottom: 70,
        height: 200,
    },
    modalText1: {
        color: '#606060',
        fontSize: 20,
        marginTop: 30,
    },
    modalText2: {
        color: '#606060',
        fontSize: 20,
        marginTop: 10,
    },
    line: {
        width: '85%',
        height: 1,
        backgroundColor: '#606060',
        marginTop: 10,
    },
    modalButton: {
        width: '50%',
        padding: 15,
        borderRadius: 5,
        backgroundColor: '#fff',
        borderColor: '#599AD0',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        height: 35,
    },
    modalButtonText: {
        color: '#599AD0',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default FormTeonaPass;
