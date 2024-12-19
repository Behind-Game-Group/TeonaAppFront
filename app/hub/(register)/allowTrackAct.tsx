import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import TeoNotif from "@/components/TeoNotif/TeoNotif";
import {router} from "expo-router";

const {width, height} = Dimensions.get('window');
export default function allowTrackAct() {
    return (
        <SafeAreaProvider>
            <ImageBackground
                source={require('@/assets/images/allowtrackact.png')}
                style={styles.backgroundImage}
                >
                <SafeAreaView>
                    <TeoNotif>
                        <Text
                        style={styles.trackActiTitle}>
                            Allow "Teona Passenger" to track your activity across other companies' apps and websites?{'\n'}
                        </Text>
                        <Text style={styles.trackActiText}>
                            By anonymously sharing your data, you will benefit from relevant partners. {'\n'}</Text>
                    <View style={styles.trackActiButton}>
                        <TouchableOpacity onPress={() => router.push('/hub/(register)/BeginInscription')}>
                        <Text> Don't Allow</Text>
                    </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push('/hub/(register)/BeginInscription')}>
                            <Text>Allow</Text>
                        </TouchableOpacity>
                    </View>
                    </TeoNotif>
                </SafeAreaView>
            </ImageBackground>
        </SafeAreaProvider>
    )

};

const styles = StyleSheet.create({
    backgroundImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        height: height,
        resizeMode: 'contain',

    },
    trackActiText:{
    color:"black",
        textAlign: 'center',
        fontSize: 15,

    },
    trackActiTitle:{
        color:"black",
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    trackActiButton:{
        flexDirection:'row',
        padding:10,
        color:'#4387AA',
        fontWeight: 'bold',

    },
})