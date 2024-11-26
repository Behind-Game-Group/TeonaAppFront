import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    ImageBackground, ActivityIndicator,
} from 'react-native';
import ButtonInscriptionLogin from "@/components/ButtonInscriptionLogin";
import {Picker} from "@react-native-picker/picker";
import { useRouter } from 'expo-router';

interface Country {
    languages?: Record<string, string>;
}

function InformationsEmail() {

    const [email, setEmail] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('+995');
    const [language, setLanguage] = useState(null);
    const [languages, setLanguages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const fetchLanguages = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data: Country[] = await response.json();

                const languageOptions: string[] = data
                    .flatMap((country) => country.languages ? Object.values(country.languages) : [])
                    .filter((value, index, self) => self.indexOf(value) === index);

                setLanguages(languageOptions.toSorted((a, b) => a.localeCompare(b)));
            } catch (error) {
                console.error('Erreur lors de la récupération des langues :', error);
            } finally {
                setLoading(false);
            }
        };

        // Appel explicite avec void pour indiquer qu'on ignore la promesse
        void fetchLanguages();
    }, []);

    const handleContinue = () => {
        if (!email.trim()) {
            alert("Please enter a valid email address.");
            return;
        }

        router.push("/hub/VerifyEmailInscription");
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../assets/images/bgInformationsEmail.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>How can we reach you, {'\n'} Mariam?</Text>
                    <Text style={styles.subtitle}>
                        We’ll send newsletters you {'\n'} subscribe to and any changes to {'\n'}
                        your journey to this email address.{'\n'} You will also use it to login.
                    </Text>

                    {/* Email adresse */}
                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={[styles.input, styles.inputEmail]}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                    />

                    {/* Langue préférée */}
                    <Text style={styles.label}>Preferred language</Text>
                    {loading ? (
                        <ActivityIndicator size="large" color="#2787BB"/>
                    ) : (
                        <View style={styles.input}>
                            <Picker
                                selectedValue={language}
                                onValueChange={(itemValue) => setLanguage(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="English" value=""/>
                                {languages.map((lang) => (
                                    <Picker.Item key={lang} label={lang} value={lang}/>
                                ))}
                            </Picker>
                        </View>
                    )}

                    {/* Phone number */}
                    <Text style={styles.label}>Phone number</Text>
                    <Text style={styles.details}>If you provide your phone number, we can send you
                        updates about any changes to your trip</Text>
                    <View style={styles.phoneRow}>
                        <TextInput
                            style={[styles.input, styles.inputCountryCode]}
                            value={countryCode}
                            onChangeText={setCountryCode}
                            keyboardType="phone-pad"
                        />
                        <TextInput
                            style={[styles.input, styles.inputPhone]}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                        />
                    </View>
                    <ButtonInscriptionLogin
                      text="Continue"
                      color="blue"
                      onPress={handleContinue}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // Optionnel si l'image ne charge pas
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '85%',
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#606060',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#606060',
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        color: '#606060',
        alignSelf: 'flex-start',
        marginTop: 15,
    },
    details: {
        fontSize: 12,
        color: '#606060',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#606060',
        borderRadius: 5,
    },
    inputEmail: {
        height: 35,
        padding: 5,
    },
    picker: {
        height: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        color: '#606060',
        borderRadius: 5,
    },
    phoneRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    inputCountryCode: {
        width: '15%',
        marginRight: 10,
        height: 35,
        fontSize: 15,
        padding: 5,
    },
    inputPhone: {
        height: 35,
        width: '55%',
        fontSize: 15,
        padding: 5,
    },
});

export default InformationsEmail;
