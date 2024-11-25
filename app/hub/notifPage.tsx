import {Alert, Button, Text, ImageBackground, StyleSheet, View} from "react-native";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TeoNotif from "@/components/TeoNotif/TeoNotif";
import CustomButton from "@/components/ButtonInscriptionLogin";
import {router} from "expo-router";

export default function NotifPage() {

    return (
        <SafeAreaProvider style={styles.allContainer}>
            <ImageBackground
                source={require('@/assets/images/allowcontainer1.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <SafeAreaView style={styles.allContent}>

                    <View style={styles.notifContainer}>
                        <Text style={styles.titleAll}> Turn on your notifications to stay up to date about your
                            journey.</Text>
                        <Text style={styles.optTitleAll}> We'll automatically send you information about your journey in
                            real time . </Text>
                    </View>
                    <View style={styles.notifAllow}>
                        <TeoNotif>
                            <Text>
                                Real-time updates
                                Receive relevant information throughout your trip.
                                Changes in itineraries, flight delays, issues with your journey ...
                                We got you informed at all times
                            </Text>
                            <View style={styles.allowButtContainer}>
                            <CustomButton
                                onPress={() => router.push('/hub/login')}
                                text="Yes,keep me updated"
                                color="blue"

                            />
                            <CustomButton
                                onPress={() => router.push('/hub/login')}
                                text="Maybe,later"
                                color="white"

                            />
                            </View>
                            <Text>
                                Change your mind ? switch off commercial offers from all Georgina transport and third
                                parties at any time in the app's notification settings.
                            </Text>

                        </TeoNotif>

                    </View>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({

    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    allContainer: {},
    allContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleAll: {
        color: "black",
    },
    optTitleAll: {
        color: "blue",
    },
    notifContainer: {
        backgroundColor: "#fff",
    },
    notifAllow: {
        backgroundColor: "#fff",
    },
    allowButtContainer: {

    },


});