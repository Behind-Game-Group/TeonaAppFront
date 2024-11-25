import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ImageBackground, ActivityIndicator,
} from 'react-native';
import LayoutLogo from './(register)/_layout';
import {Picker} from "@react-native-picker/picker";

interface Country {
    name: {
        common: string;
    };
}

export default function informationsIdentity() {

    const [countries, setCountries] = useState<string[]>([]);
    const [selectCountry, setSelectCountry] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fonction pour récupérer les pays depuis une API
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data: Country[] = await response.json();
                // Trier les pays par ordre alphabétique et récupérer leurs noms
                const countryList = data
                    .map((country) => country.name.common)
                    .sort();
                setCountries(countryList);
                setIsLoading(false);
            } catch (error) {
                console.error('Erreur lors du chargement des pays:', error);
                setIsLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December',
    ];
    const days = Array.from({length: 31}, (_, i) => i + 1);
    const years = Array.from({length: 100}, (_, i) => 2024 - i);

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/bgInformationsIdentity.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.content}>
                    <Text style={styles.title}>Nice to meet you, {'\n'}
                        Mariam ! Let us know {'\n'} more about you!
                    </Text>

                    {/* Pays */}
                    <Text style={styles.label}>Country/Region of residence</Text>
                    <View style={[styles.input, styles.inputCountry]}>
                        {isLoading ? (
                            <ActivityIndicator size="small" color="#606060"/>
                        ) : (
                            <Picker
                                selectedValue={selectCountry}
                                onValueChange={(itemValue) => setSelectCountry(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Georgia" value=""/>
                                {countries.map((country, index) => (
                                    <Picker.Item key={index} label={country} value={country}/>
                                ))}
                            </Picker>
                        )}
                    </View>

                    {/* Date de naissance */}
                    <Text style={styles.label}>Date of birth</Text>
                    <View style={styles.row}>
                        <View style={[styles.input, styles.dateInputMonth]}>
                            <Picker
                                selectedValue={month}
                                onValueChange={(itemValue) => setMonth(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Month" value=""/>
                                {months.map((month, index) => (
                                    <Picker.Item key={index} label={month} value={month}/>
                                ))}
                            </Picker>
                        </View>

                        {/* Jour */}
                        <View style={[styles.input, styles.dateInputDay]}>
                            <Picker
                                selectedValue={day}
                                onValueChange={(itemValue) => setDay(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Day" value=""/>
                                {days.map((day) => (
                                    <Picker.Item key={day} label={day.toString()} value={day.toString()}/>
                                ))}
                            </Picker>
                        </View>

                        {/* Année */}
                        <View style={[styles.input, styles.dateInputYear]}>
                            <Picker
                                selectedValue={year}
                                onValueChange={(itemValue) => setYear(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="Year" value=""/>
                                {years.map((year) => (
                                    <Picker.Item key={year} label={year.toString()} value={year.toString()}/>
                                ))}
                            </Picker>
                        </View>
                    </View>

                    {/* Title */}
                    <Text style={styles.label}>What is your title?</Text>
                    <View style={[styles.input, styles.inputTitle]}>
                        <Picker
                            selectedValue={title}
                            onValueChange={(itemValue) => setTitle(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Title" value=""/>
                            <Picker.Item label="Monsieur" value="Monsieur"/>
                            <Picker.Item label="Madame" value="Madame"/>
                        </Picker>
                    </View>

                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>

                </View>
                <LayoutLogo/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        color: 'red'
    },
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
        marginTop: 100,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#606060',
        textAlign: 'center',
    },
    label: {
        fontSize: 18,
        color: '#606060',
        alignSelf: 'flex-start',
        marginTop: 15,
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    input: {
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#606060',
        borderRadius: 5,
    },
    inputCountry: {
        width: '95%',
        marginRight: 20,
    },
    dateInputMonth: {
        width: '30%',
        marginRight: 7,
    },
    dateInputDay: {
        width: '15%',
        marginRight: 7,
    },
    dateInputYear: {
        width: '20%',
    },
    inputTitle: {
        width: '95%',
        marginRight: 20,
    },
    picker: {
        height: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        color: '#606060',
        borderRadius: 5,
    },
    button: {
        marginTop: 20,
        marginBottom: 12,
        backgroundColor: '#2787BB',
        borderColor: '#D9D9D9',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '85%',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
