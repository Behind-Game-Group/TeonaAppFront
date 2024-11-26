import {Text, ImageBackground, StyleSheet, View, Dimensions, Image} from "react-native";
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

            >
                <SafeAreaView style={styles.allContent}>


                    <View style={styles.notifAllow}>
                        <TeoNotif>
                            <View style={styles.notifContainer}>
                                <Text style={styles.titleAll}> Turn on your notifications to stay up to date about your
                                    journey.</Text>
                                <Text style={styles.optTitleAll}> We'll automatically send you information about your journey in
                                    real time . </Text>
                            </View>
                            <Text>
                                Real-time updates
                                Receive relevant information throughout your trip.
                                Changes in itineraries, flight delays, issues with your journey ...
                                We got you informed at all times
                            </Text>
                            <View style={styles.allowButtContainer}>
                            <CustomButton
                                onPress={() => router.push('/hub/register/notifAllow')}
                                text="Yes,keep me updated"
                                color="blue"

                            />
                            <CustomButton
                                onPress={() => router.push('/hub/register/notifAllow')}
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
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({

    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        resizeMode: 'contain',
    },
    allContainer: {
        flex: 1,
    },
    allContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: height * 0.8,
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    titleAll: {
        textAlign:'center' ,
        fontSize: 15,

        color: 'black',
    },
    optTitleAll: {
        textAlign:'center' ,
        fontSize: 15,
        color: "blue",
    },
    notifContainer: {

    },
    notifAllow: {
        padding: height * 0.05,
    },
    allowButtContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        
        alignItems: 'center',
    },


});