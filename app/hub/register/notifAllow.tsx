import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import TeoNotif from "@/components/TeoNotif/TeoNotif";
import CustomButton from "@/components/ButtonInscriptionLogin";
import {View, Text, ImageBackground, StyleSheet} from "react-native";
import {router} from "expo-router";

export default function NotifAllow() {
    return (
        <SafeAreaProvider>
            <ImageBackground
                source={require('@/assets/images/teohuballow.jpg')}
                style={styles.backgroundImage}
                resizeMode="cover">

            </ImageBackground>


            <SafeAreaView>
                <Text>
                    Turn on your notifications to stay up to date about your journey.
                </Text>
                <View>
                    <TeoNotif>
                        <Text>
                            "Teona Passenger" would like to send you notifications.
                        </Text>
                        <Text>
                            Notification may include alerts, sounds and icon badges. These can be configured in settings.
                        </Text>
                        <CustomButton text={"Don't Allow"}
                                      onPress={() => router.push('/hub/register/register')}
                                      color='white'/>
                        <CustomButton text={"Allow"} onPress={() => router.push('/hub/register/register')} color='white'/>
                    </TeoNotif>
                </View>

            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }

})