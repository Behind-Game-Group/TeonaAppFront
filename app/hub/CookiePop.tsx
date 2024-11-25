import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, ImageBackground, StyleSheet, Text, Touchable, View} from "react-native";
import TeoNotif from "@/components/TeoNotif/TeoNotif";
import CustomButton from "@/components/ButtonInscriptionLogin";
import {router} from "expo-router";

const {width, height} = Dimensions.get('window');
export default function CookiePop() {
    return (
        <SafeAreaProvider>
            <ImageBackground
                source={require('@/assets/images/cookiepop.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >

            <SafeAreaView style={styles.content}>

                <TeoNotif>
                    <Text
                        style={styles.cookieTitle}
                    > Teona Passenger uses cookies</Text>
                    <Text
                        style={styles.cookieText}>
                        Teona Passenger uses cookies and similar technologies when you visit the TeonaGroup.com website
                        and related websites and our app (hereinafter called “our website”). We always use functional
                        and analytical cookies to make sure our website works properly and to analyse and improve the
                        use of our pages. With your consent, we also use cookies to (i) analyse the effectiveness of our
                        marketing campaigns (“Marketing cookies for performance”) and to (ii) help us make our content
                        and advertisements more relevant to your interests (“Marketing cookies for advertisement and
                        social media”). By placing these cookies, Teona Passenger and third parties can track your click
                        behavior accross the web. By clicking on “Accept”, you consent to the placing of all marketing
                        cookies. By clicking on “Reject”, we will only place functional and analytical cookies. You can
                        change. Your cookie preferences or withdraw your consent at any time.
                    </Text>

                    <View style={styles.notifCookieButton}>
                        <CustomButton
                            onPress={() => router.push('/hub/beginInscription')}
                            text="Change cookie settings "
                            color="white"
                        />
                        <CustomButton
                            onPress={() => router.push('/hub/beginInscription')}
                            text="Read teona Passenger's cookie policy"
                            color="white"
                        />
                        <CustomButton
                            onPress={() => router.push('/hub/beginInscription')}
                            text="Check the full list of cookies and third parties used on our website "
                            color="white"
                        />
                    </View>
                </TeoNotif>

                <View style={styles.cookieButton}>
                    <CustomButton
                        onPress={() => router.push('/hub/allowTrackAct')}
                        text="Accept"
                        color="blue"
                    />
                    <CustomButton
                        onPress={() => router.push('/hub/beginInscription')}
                        text="Reject"
                        color="white"
                    />
                </View>
            </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {

        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cookieText: {
        textAlign: 'center',
        fontSize: 12,
        color: 'black',

    },
    cookieTitle: {
        textAlign:'center',
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',

    },
    cookieButton: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: height * 0.1,

    },
    notifCookieButton : {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',

    }
});