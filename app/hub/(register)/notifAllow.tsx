import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TeoNotif from "@/components/TeoNotif/TeoNotif";
import CustomButton from "@/components/ButtonInscriptionLogin";
import {View, Text, ImageBackground, StyleSheet, Dimensions} from "react-native";
import {router} from "expo-router";

const {width, height} = Dimensions.get('window');
export default function NotifAllow() {
    return (
        <SafeAreaProvider style={styles.notifAllowContainer} >
            <ImageBackground
                source={require('@/assets/images/teohuballow.jpg')}
                style={styles.backgroundImage}
              >




            <SafeAreaView>
                <Text style={styles.notifAllowTitle}>
                    Turn on your notifications to stay up to date about your journey.
                </Text>
                <View style={styles.notifAllowContent}>
                    <TeoNotif>
                        <Text  style={styles.notifAllowText} >
                            "Teona Passenger" would like to send you notifications.
                        </Text>
                        <Text  style={styles.notifAllowText}>
                            Notification may include alerts, sounds and icon badges. These can be configured in settings.
                        </Text>
                        <View style={styles.allowButtons}>
                        <CustomButton text={"Don't Allow"}
                                      onPress={() => router.push('/hub/beginInscription')}
                                      color='white'/>
                        <CustomButton text={"Allow"} onPress={() => router.push('/hub/beginInscription')} color='blue'/>
                        </View>
                        </TeoNotif>
                </View>

            </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        resizeMode: 'contain',
    },
    notifAllowContainer:{
        flex:1,
    },
    notifAllowContent:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: height * 0.9,
        overflow: 'hidden',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    notifAllowTitle:{
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',
    },
    notifAllowText:{
        textAlign: 'center',
        fontSize: 12,
        color: 'black',
        marginHorizontal: 20,
    },
    allowButtons:{
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent:'center',
        alignItems: 'center',
    },

})