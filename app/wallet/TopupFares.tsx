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
            <Text
                style={styles.faresCardText}

            >Let's TopUp your card!</Text>
            <SafeAreaView style={styles.faresContent}>


                <View
                    style={styles.faresCard}>
                    <Image
                        style={styles.faresCardImage}
                        source={require('@/assets/images/teonapassyearly.png')}/>
                    <Text>TeonaPass Yearly pass 540 </Text>
                <View style={styles.faresButtons}>
                    <TopUpButton

                        title="TopUp"
                        onPress={'wallet'}
                    />
                </View>
                </View>
                <View style={styles.faresCard}>
                    <Image
                        style={styles.faresCardImage}
                        source={require('@/assets/images/teonapass.png')}/>
                    <Text
                      >TeonaPass Yearly pass 45 </Text>
                    <View style={styles.faresButtons}>
                        <TopUpButton

                            title="TopUp"
                            onPress={'wallet'}
                        />
                    </View>
                </View>
                <View style={styles.faresCard}>
                    <Image
                        style={styles.faresCardImage}
                        source={require('@/assets/images/teonapass.png')}/>
                    <Text>TeonaPass Yearly pass 11,25 </Text>
                    <View style={styles.faresButtons}>
                        <TopUpButton

                            title="TopUp"
                            onPress={'wallet'}
                        />
                    </View>
                </View>
                <View style={styles.faresCard}>
                    <Image
                        style={styles.faresCardImage}
                        source={require('@/assets/images/teonapass.png')}/>
                    <Text>TeonaPass Yearly pass 7,95 </Text>
                    <View style={styles.faresButtons}>
                        <TopUpButton

                            title="TopUp"
                            onPress={'wallet'}
                        />
                    </View>
                </View>
                <View style={styles.validCardFares}>
                    <Text style={styles.faresPrice}>`${totalPrice}` €</Text>
                    <View style={styles.faresButtons}>
                    <TopUpButton

                        title="TopUp"
                        onPress={'wallet'}
                    />
                    </View>
                </View>

            </SafeAreaView>

        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    faresContainer: {
        flex: 1,
        padding: 6,
    },
    faresContent: {
        flex:1,

        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },
    faresCard: {
        flexDirection: 'row',
        alignItems: 'center',


        width: '100%',


    },
    faresButtons: {
        flexDirection:'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 6,
        color: 'orange',
        borderColor: 'orange',
        borderBottomColor: 'orange',
        padding: 6,
    },
    validCardFares: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'flex-end',
        width: '100%',
    },
    faresPrice: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderColor: "black",
        borderWidth: 3,
    },
    faresCardText: {
        width: '100%',
        flexDirection: 'flex-start',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    faresCardImage: {

        width: width * 0.2,
        height: height * 0.2,
        resizeMode: 'contain',
    },
});