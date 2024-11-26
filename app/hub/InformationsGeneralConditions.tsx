import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Pressable
} from 'react-native';
import LayoutLogo from './(register)/_layout';
import ButtonInscriptionLogin from "@/components/ButtonInscriptionLogin";
import {useRouter} from "expo-router";

export default function InformationsGeneralConditions() {
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => setIsChecked(!isChecked);
    const router = useRouter();

    const handleContinue = () => {
        router.push("/hub/InformationsIdentity"); // La faut changer la direction
    };
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/bgInformationsGeneralConditions.png')}
                style={styles.backgroundImage}
            >
                <View style={styles.content}>
                    <View style={styles.contentBox}>
                        <Text style={styles.title}>We’re almost there!</Text>
                        <Text style={styles.detailsContent}>TeonaGroup is Georgina Sky, Georgina Bus and
                            Marika Cruiser joint loyalty programme. We share the responsibility for handling
                            your personal data. Your data is processed in accordance with the TeonaGroup privacy
                            policy. You have the right to refuse the processing of your personal data.
                            Please go to the TeonaGroup privacy policy for more information. You can edit your
                            preference in your profile at any time. </Text>

                        <View style={styles.containerCheckbox}>
                            <Pressable
                                style={[styles.checkbox, isChecked && styles.checked]}
                                onPress={toggleCheckbox}
                            >
                                {isChecked && <Text style={styles.checkmark}>✓</Text>}
                            </Pressable>
                            <Text style={styles.label}>I agree with the TeonaGroup General Conditions</Text>
                        </View>
                    </View>
                    <ButtonInscriptionLogin text={"Create an account"} color={"blue"} onPress={handleContinue}/>
                </View>
                <LayoutLogo/>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '90%',
        height: '41%',
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
    contentBox: {
        width: '75%',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#606060',
        textAlign: 'center',
        marginTop: 20,
    },
    detailsContent: {
        fontSize: 11,
        color: '#606060',
        paddingTop: 10,
        textAlign: 'left'
    },
    containerCheckbox: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    checkbox: {
        width: 35,
        height: 36,
        borderWidth: 1,
        borderColor: '#606060',
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 10,
    },
    checked: {
        backgroundColor: "orange",
        borderColor: "orange",
    },
    checkmark: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
    label: {
        fontSize: 11,
        color: '#606060',
        marginLeft: 10,
    },
});
