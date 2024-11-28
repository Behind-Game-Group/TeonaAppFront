import {SafeAreaProvider} from "react-native-safe-area-context";
import {SafeAreaView, View, Text, Button, Image, Dimensions,StyleSheet, TouchableOpacity} from "react-native";
import {number} from "prop-types";
import TopUpButton from "@/components/TopUpButton";

const {width, height} = Dimensions.get('window');
const buttonColor :string = 'orange';
const Props = {
    totalPrice: number,
}
export default function TopupFares({totalPrice}: Props) {
    return (
        <SafeAreaProvider style={styles.faresContainer}>

            <SafeAreaView style={styles.faresContent}>
                <Text>Let's TopUp your card!</Text>
                <View
                    style={styles.faresCard}>
                    <Image source={require('@/assets/images/teonapassyearly.png')}/>
                    <Text>TeonaPass Yearly pass 540 </Text>
                <View style={styles.faresButtons}>
                    <TopUpButton

                        title="top up"
                        onPress={'wallet'}
                    />
                </View>
                </View>
                <View style={styles.faresCard}>
                    <Image source={require('@/assets/images/teonapass.png')}/>
                    <Text
                        style={styles.faresCardText}>TeonaPass Yearly pass 45 </Text>
                    <View style={styles.faresButtons}>
                        <TopUpButton

                            title="top up"
                            onPress={'wallet'}
                        />
                    </View>
                </View>
                <View style={styles.faresCard}>
                    <Image source={require('@/assets/images/teonapass.png')}/>
                    <Text>TeonaPass Yearly pass 11,25 </Text>
                    <View style={styles.faresButtons}>
                        <TopUpButton

                            title="top up"
                            onPress={'wallet'}
                        />
                    </View>
                </View>
                <View style={styles.faresCard}>
                    <Image source={require('@/assets/images/teonapass.png')}/>
                    <Text>TeonaPass Yearly pass 7,95 </Text>
                    <View style={styles.faresButtons}>
                        <TopUpButton

                            title="top up"
                            onPress={'wallet'}
                        />
                    </View>
                </View>
                <View style={styles.validCardFares}>
                    <Text style={styles.faresPrice}>`${totalPrice}` €</Text>

                    <TopUpButton

                        title="TopUp"
                        onPress={'wallet'}
                    />

                </View>
            </SafeAreaView>

        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    faresContainer: {
        flex: 1, // Prend tout l'espace disponible
        padding: 6, // Ajoute un padding pour éviter que les éléments touchent les bords
    },
    faresContent: {
        flex:1,
        borderWidth: 3,//test

        borderColor:'black',//test
        justifyContent: 'center', // Centre verticalement les éléments
        alignItems: 'center', // Centre horizontalement les éléments
    padding:15,
    },
    faresCard: {
        flexDirection: 'row', // Positionne les enfants horizontalement
        alignItems: 'center',
        borderWidth: 3,//test

        borderColor:'black',//test
width:'100%',


    },
    faresButtons: {
        flexDirection: 'row', // Positionne les boutons horizontalement
        justifyContent: 'center', // Aligne les boutons à droite
        alignItems: 'center', // Centre verticalement les boutons
        marginTop: 6, // Ajoute un espacement au-dessus des boutons
        color:'orange',
        borderColor:'orange',
        borderBottomColor :'orange',
        padding:6,
    },
    validCardFares:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    faresPrice:{
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderColor:"black",
        borderWidth: 3,
    },
    faresCardText:{

    },
});