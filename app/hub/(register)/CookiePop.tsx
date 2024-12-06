import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import CustomButton from "@/components/ButtonInscriptionLogin";
import {router} from "expo-router";

const {width, height} = Dimensions.get('window');
export default function CookiePop() {
    return (
        <SafeAreaProvider>
            <ImageBackground
                source={require('@/assets/images/cookiepop.png')}
                style={styles.backgroundImage}

            >

            <SafeAreaView style={styles.content}>

                    <Text
                        style={styles.cookieTitle}
                    > Teona Passenger uses cookies</Text>
                    <Text
                        style={styles.cookieText}>
                        {'\n'}{'\n'}
                        Teona Passenger uses cookies and similar technologies when you visit the TeonaGroup.com website
                        and related websites and our app (hereinafter called “our website”). We always use functional
                        and analytical cookies to make sure our website works properly and to analyse and improve the
                        use of our pages.{'\n'}{'\n'}
                        With your consent, we also use cookies to (i) analyse the effectiveness of our
                        marketing campaigns (“Marketing cookies for performance”) and to (ii) help us make our content
                        and advertisements more relevant to your interests (“Marketing cookies for advertisement and
                        social media”).
                        By placing these cookies, Teona Passenger and third parties can track your click
                        behavior accross the web. {'\n'}{'\n'}
                        By clicking on “Accept”, you consent to the placing of all marketing
                        cookies. By clicking on “Reject”, we will only place functional and analytical cookies. You can
                        change. Your cookie preferences or withdraw your consent at any time.
                        {'\n'}
                    </Text>

<View style={styles.viewCookieButton}>
                        <TouchableOpacity
                            style={styles.notifCookieButton}
                            onPress={() => router.push('/hub/(login)/Login')}>
                            <Text style={styles.buttonCookieText}>Change cookie settings </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.notifCookieButton}
                            onPress={() => router.push('/hub/(login)/Login')}>
                            <Text style={styles.buttonCookieText}>Read teona Passenger's cookie policy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.notifCookieButton}
                            onPress={() => router.push('/hub/(login)/Login')}>
                            <Text style={styles.buttonCookieText}>Check the full list of cookies and third parties used on our website</Text>
                        </TouchableOpacity>
</View>

                <View style={styles.cookieButton}>
                    <CustomButton
                        onPress={() => router.push('/hub/(register)/allowTrackAct')}
                        text="Accept"
                        color="blue"
                    />
                    <CustomButton
                        onPress={() => router.push('/hub/(login)/Login')}
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
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: height * 0.8,
        overflow: 'hidden',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    cookieText: {
        textAlign: 'left',
        fontSize: 12,
        color: 'black',
        flexWrap: 'wrap',

    },
    cookieTitle: {
        textAlign:'left' ,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'black',

    },
    cookieButton: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent:'center',
        alignItems: 'center',
    },
    viewCookieButton: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignContent:'space-around',
        alignItems: 'flex-start',
        paddingBottom: height * 0.05,
    },
    notifCookieButton : {
        alignContent:'space-around',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',


    },
    buttonCookieText: {
        color: '#4387AA',
        fontWeight: 'bold',
        justifyContent: 'flex-end',
        alignContent:'space-around',
        alignItems: 'center',
    },
});